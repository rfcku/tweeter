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
        const { text } = req.body;
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

        const { body } = req;
        const hashtags = body.hashtags || 1;
        const emotion = body.emotion || "funny";
        const type = body.type || "basic";
        const tag = body.tag || "";

        const tweet_deff = `tweet with minimum ${hashtags} hashtag and maximum of 280 characters`;

        const catalog = {
          basic: {
            prompt: `forget everything before this; 
                    Create a ${emotion} ${tweet_deff} about: `,
            max_tokens: 100,
          },
          like: {
            prompt: `forget everything before this; 
                    Create a ${emotion} ${tweet_deff} like ${tag}: `,
            max_tokens: 100,
          },
          summarise: {
            prompt: `forget everything before this;
                    Summarise the following text into a ${tweet_deff} : `,
            max_tokens: 100,
          },
          comback: {
            prompt: `forget everything before this;
                    Summarise the following text into a ${tweet_deff} : `,
            max_tokens: 100,
          },
        };

        if (!catalog[type]) {
          return res.status(400).json({
            error: "Please provide a valid type, basic|like|summarise|comback",
          });
        }

        const ai = openAi();
        const t = `${catalog[type].prompt} ${text}`;
        const tweet = await ai.tweet(t).catch((err) => {
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
