import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Tweet from "@/components/Tweet";

import Navbar from "../components/Navbar";

import { useTheme as useNextTheme } from "next-themes";
import {
  Switch,
  Card,
  useTheme,
  Grid,
  Textarea,
  Button,
  Link,
  Text,
} from "@nextui-org/react";
import useSmartTweet from "../hooks/useSmartTweet";

export default function Home() {
  const { tweet, generate } = useSmartTweet();

  console.log("tweet", tweet);
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Grid.Container
          alignContent="center"
          justify="center"
          direction="row"
          gap={3}
          xs={7}
        >
          <Grid xs={4} style={{ background: "red" }}>
            <Card>
              <Card.Body style={{ textAlign: "center" }}>
                <Text h2>$0.00</Text>
                <Text p>Card</Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={4} style={{ background: "green" }}>
            <Card>
              <Card.Body style={{ textAlign: "center" }}>
                <Text h2>$0.00</Text>
                <Text p>Card</Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={4} style={{ background: "blue" }}>
            <Card>
              <Card.Body style={{ textAlign: "center" }}>
                <Text h2>$0.00</Text>
                <Text p>Card</Text>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </main>
    </>
  );
}
