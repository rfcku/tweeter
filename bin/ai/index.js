import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "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",
});

const openai = new OpenAIApi(configuration);

export default function ai() {
  return {
    tweet: async (text) => {
      return await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: text,
          max_tokens: 100,
          temperature: 0,
        })
        .then((resp) => {
          return resp.data.choices[0].text;
        });
    },
    edit: async () => {
      return await openai.createEdit({
        model: "text-davinci-edit-001",
        input: "What day of the wek is it?",
        instruction: "Fix the spelling mistakes",
      });
    },
    image: {
      edit: async () => {
        return await openai.createImageEdit(
          fs.createReadStream("otter.png"),
          fs.createReadStream("mask.png"),
          "A cute baby sea otter wearing a beret",
          2,
          "1024x1024"
        );
      },
      variation: async () => {
        return await openai.createImageVariation(
          fs.createReadStream("otter.png"),
          2,
          "1024x1024"
        );
      },
    },
  };
}