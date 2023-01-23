import styles from "../styles/Home.module.css";
import Tweet from "../components/tweet";
import Navbar from "../components/Navbar";
import useSmartTweet from "../hooks/useSmartTweet";

import { Grid, Textarea, Button, Radio } from "@nextui-org/react";

export default function Home() {
  const {
    tweet,
    generate,
    type,
    setType,
    emotion,
    setEmotion,
    tag,
    setTag,
    tags,
    emotions,
    types,
  } = useSmartTweet();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Grid.Container
          alignContent="center"
          justify="center"
          direction="column"
          gap={3}
        >
          <Grid xs={12}>
            {!tweet && <Tweet text={tweet.text} date={tweet.date} />}
          </Grid>
          <Grid>
            <Radio.Group
              label="Options"
              defaultValue="1"
              orientation="horizontal"
              onChange={(e) => setType(e)}
            >
              {types.options.map((type) => (
                <Radio key={type.id} value={type.id}>
                  {type.name}
                </Radio>
              ))}
            </Radio.Group>
            <select>
              {emotions.options.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
          </Grid>
          <Grid xs={12}>
            <Textarea
              fullWidth
              bordered
              placeholder="Type here..."
              style={{ width: "100%", height: 200 }}
            />
          </Grid>
          <Grid xs={12}>
            <Button>Tweet</Button>
          </Grid>
        </Grid.Container>
      </main>
    </>
  );
}
