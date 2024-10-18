import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import Icon from "@/assets/images/wordle-icon.svg";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import * as MailComposer from "expo-mail-composer";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/utils/firebaseConfig";

const End = () => {
  const { win, word, gameField } = useLocalSearchParams<{
    win: string;
    word: string;
    gameField?: string;
  }>();

  const { user } = useUser();

  const [userScore, setUserScore] = useState<any>(null);

  useEffect(() => {
    if (user) {
      updateHighScore();
    }
  }, [user]);

  const updateHighScore = async () => {
    console.log("update high score", user);

    if (!user) return;

    const docRef = doc(FIRESTORE_DB, `highscore/${user.id}`);
    const docSnap = await getDoc(docRef);

    console.log("doc >>>", docSnap);

    let newScore = {
      played: 1,
      wins: win === "true" ? 1 : 0,
      lastGame: win === "true" ? "win" : "loss",
      currentSteak: win === "true" ? 1 : 0,
    };

    if (docSnap.exists()) {
      const data = docSnap.data();

      newScore = {
        played: data.played + 1,
        wins: win === "true" ? data.wins + 1 : data.wins,
        lastGame: win === "true" ? "win" : "loss",
        currentSteak:
          win === "true" && data.lastGame === "win"
            ? data.currentSteak + 1
            : win === "true"
            ? 1
            : 0,
      };
    }

    await setDoc(docRef, newScore);
    setUserScore(newScore);
  };

  console.log(win);

  const colorScheme = useColorScheme();

  const router = useRouter();

  const shareGame = () => {
    const game = JSON.parse(gameField!);

    const imageText: string[][] = [];
    const wordLetters = word.split("");

    game.forEach((row: string[], rowIndex: number) => {
      imageText.push([]);

      row.forEach((letter, colIndex) => {
        if (wordLetters[colIndex] === letter) {
          imageText[rowIndex].push("🟩");
        } else if (wordLetters.includes(letter)) {
          imageText[rowIndex].push("🟨");
        } else {
          imageText[rowIndex].push("⬜");
        }
      });

      console.log(imageText);

      const html = `
      <html>
        <head>
          <style>

            .game {
              display: flex;
              flex-direction: column;
            }
              .row {
              display: flex;
              flex-direction: row;

              }
            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
            }

          </style>
        </head>
        <body>
          <h1>Wordle</h1>
          <div class="game">
           ${imageText
             .map(
               (row) =>
                 `<div class="row">${row
                   .map((cell) => `<div class="cell">${cell}</div>`)
                   .join("")}</div>`
             )
             .join("")}
             </div>
           </body>
         </html>
       `;

      MailComposer.composeAsync({
        subject: `I just played Wordle!`,
        body: html,
        isHtml: true,
      });
    });
  };

  const navigateRoot = () => {
    router.dismissAll();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeIconContainer} onPress={navigateRoot}>
        <Ionicons name="close" size={ms(30)} color={Colors.light.gray} />
      </Pressable>

      <View style={styles.header}>
        {win === "true" ? (
          <Image source={require("@/assets/images/win.png")} />
        ) : (
          <Icon width={s(100)} height={vs(70)} />
        )}

        <Text style={styles.title}>
          {win === "true" ? "Congratulations!" : "Thanks for playing today!"}
        </Text>

        <SignedOut>
          <Text style={styles.text}>Want to see your stats and streaks?</Text>

          <Pressable style={styles.btn} onPress={() => router.push("/login")}>
            <Text style={styles.btnText}>Create a free account</Text>
          </Pressable>

          <Text
            onPress={() => router.push("/login")}
            style={styles.registerText}
          >
            Already registered? Log In
          </Text>
        </SignedOut>

        <SignedIn>
          <Text style={styles.text}>Statistics</Text>

          <View style={styles.stats}>
            <View>
              <Text style={styles.score}>{userScore?.played}</Text>

              <Text>Played</Text>
            </View>
            <View>
              <Text style={styles.score}>{userScore?.wins}</Text>

              <Text>Wins</Text>
            </View>
            <View>
              <Text style={styles.score}>{userScore?.currentSteak}</Text>

              <Text>Current Steak</Text>
            </View>
          </View>
        </SignedIn>

        <View style={styles.separator} />

        <Pressable onPress={shareGame} style={styles.iconBtn}>
          <Text style={styles.btnText}>Share</Text>

          <Ionicons name="share-social" size={ms(24)} color={"#FFF"} />
        </Pressable>
      </View>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: s(40),
    paddingVertical: vs(10),
  },
  closeIconContainer: {
    alignSelf: "flex-end",
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: ms(25),
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    textAlign: "center",
    marginTop: vs(10),
  },
  text: {
    fontSize: ms(26),
    textAlign: "center",
    fontFamily: '"FrankRuhlLibre_500Medium"',
    marginTop: vs(10),
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ms(30),
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  btnText: {
    paddingHorizontal: s(14),
    paddingVertical: vs(10),
    fontSize: ms(16),
    color: "#FFF",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  registerText: {
    fontSize: ms(14),
    fontFamily: '"FrankRuhlLibre_500Medium"',
    textAlign: "center",
    color: "#000",
    textDecorationLine: "underline",
    marginTop: vs(7),
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: vs(10),
    width: "100%",
    marginTop: vs(10),
  },
  score: {
    fontSize: ms(20),
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    textAlign: "center",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: "#4E4E4E",
    marginVertical: vs(10),
  },
  iconBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ms(30),
    flexDirection: "row",
    backgroundColor: Colors.light.green,
    width: "60%",
    marginTop: vs(15),
  },
});
