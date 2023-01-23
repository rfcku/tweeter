// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import openAi from "../../../bin/ai/index.js";
import authorize from "../../../utils/authorize.js";
import mongodb from "../../../bin/mongo.js";
import dayjs from "dayjs";
/**
 * @swagger
 * /api/tweets:
 *   post:
 *     description: Returns a generated tweet based on the text provided
 *     parameters:
 *       - name: text
 *         in: query
 *         description: Port name
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns a generated tweet based on the text provided
 *       404:
 *          description: Text not found
 *       400:
 *         description: Please provide a text
 *       500:
 *         description: Something went wrong
 */

const prompt = (text, hashtags, emotion, type, tag) => {
  const catalog = {
    basic: {
      prompt: `Create a ${emotion} ${tweet_deff} about the following text: ${text}\ntweet: `,
      max_tokens: 100,
    },
    like: {
      prompt: `Create a ${emotion} ${tweet_deff} like ${tag}:\n${text} tweet: `,
      max_tokens: 100,
    },
    summarise: {
      prompt: `Summarise the following text into a ${tweet_deff} "${text}"`,
      max_tokens: 100,
    },
    comback: {
      prompt: `Create a comeback from the the following text into a ${tweet_deff} text: ${text} tweet: `,
      max_tokens: 100,
    },
  };
  return catalog[type];
};

export default async function handler(req, res) {
  const validate = await authorize(req, res);

  if (validate === false) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  switch (req.method) {
    case "POST":
      try {
        const { body } = req;
        const hashtags = body.hashtags || 1;
        const emotion = body.emotion || "funny";
        const type = body.type || "basic";
        const tag = body.tag || "";
        const emojis = body.emojis || 0;

        const tweet_deff = `clever tweet with maximum 280 characters and minimum ${hashtags} hashtag and ${emojis} emojis`;

        let { text } = body;
        if (!text) {
          return res.status(400).json({
            error: "Please provide a text",
          });
        }

        const maxLength = 1000;
        if (text.length >= maxLength) {
          return res.status(400).json({
            error: `Please provide a text less than ${maxLength} characters`,
            length: text.length,
          });
        }
        // 0.0004 / 1000  280
        const catalog = {
          basic: {
            prompt: `Create a ${emotion} ${tweet_deff} about the following text: ${text}\ntweet: `,
            max_tokens: 100,
          },
          like: {
            prompt: `Create a ${emotion} ${tweet_deff} like ${tag}:\n${text} tweet: `,
            max_tokens: 100,
          },
          summarise: {
            prompt: `Summarise the following text into a ${tweet_deff} "${text}"`,
            max_tokens: 100,
          },
          comback: {
            prompt: `Create a comeback from the the following text into a ${tweet_deff} text: ${text} tweet: `,
            max_tokens: 100,
          },
        };

        if (!catalog[type]) {
          return res.status(400).json({
            error: "Please provide a valid type, basic|like|summarise|comback",
          });
        }

        if (type === "like" && !tag) {
          return res.status(400).json({
            error: "Please provide a valid tag",
          });
        }

        const ai = openAi();
        const prompt = `${catalog[type].prompt}`;
        const tweet = await ai.tweet(prompt).catch((err) => {
          console.log("Request Error:", err.response.data.error);
        });

        const client = await mongodb;
        const db = client.db("tweets");

        const save = await db
          .collection("generated")
          .insertOne({ ...req.body, text: tweet, createdAt: dayjs().$d });

        return res.status(200).json({
          tweet: tweet,
          save,
          length: tweet.length,
          prompt,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
