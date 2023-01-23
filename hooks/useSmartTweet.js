import { useState } from "react";

export default function useSmartTweet() {
  const [tweet, setTweet] = useState({
    text: "This is a test",
    date: "2021-01-01",
  });

  const [text, setText] = useState("");

  const [types, setTypes] = useState({
    options: [
      {
        id: "basic",
        name: "Basic",
      },
      {
        id: "new",
        name: "New",
      },
      {
        id: "like",
        name: "Like",
      },
      {
        id: "summarise",
        name: "Summarise",
      },
    ],
    selected: "basic",
  });

  const [emotions, setEmotions] = useState({
    options: ["funny", "sad", "angry", "happy"],
    selected: "funny",
  });

  const [tags, setTags] = useState({
    options: [""],
    selected: "",
  });

  const generate = async () => {
    const resp = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "This is a test",
        date: "2021-01-01",
      }),
    });
    const data = await resp.json();
    // console.log(data);
    setTweet(data);
  };

  const setEmotion = (emotion) => {
    setEmotions({ ...emotions, selected: emotion });
  };

  const setType = (type) => {
    setTypes({ ...types, selected: type });
  };

  const setTag = (tag) => {
    setTags({ ...tags, selected: tag });
  };

  const type = types.selected;
  const emotion = emotions.selected;
  const tag = tags.selected;

  return {
    tweet,
    generate,
    setText,
    text,
    setType,
    type,
    setEmotion,
    emotion,
    setTag,
    tag,
    types,
    emotions,
    tags,
  };
}
