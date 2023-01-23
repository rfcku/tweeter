import Image from "next/image";
import { Text, Card } from "@nextui-org/react";
import Bar from "./bar";
export default function tweet({ text, date }) {
  return (
    <Card
      className="tweet-container"
      style={{ padding: "1rem 2rem" }}
      variant="bordered"
    >
      <div className="title">
        <Image
          src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
          alt="tweet"
          width={50}
          height={50}
        />
        <div className="info">
          <Text className="name" h4>
            Tweet of the Day <br />
            <small className="twitter-handle">@tweetoftheday</small>
          </Text>
        </div>
      </div>
      <div className="tweet">
        <Text>{text}</Text>
      </div>
      <div className="time-and-date">
        <p>
          {date} <span>Twitter for iPhone</span>
        </p>
      </div>
      <Bar />
    </Card>
  );
}
