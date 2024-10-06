import OnScreenKeyBoard from "@/components/OnScreenKeyBoard";
import { Colors } from "@/constants/Colors";
import { allWords } from "@/utils/allWords";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { moderateScale, ms, s, vs } from "react-native-size-matters";
import { words } from "@/utils/targetWords";

const ROWS = 6;

const Page = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].gameBg;
  const textColor = Colors[colorScheme ?? "light"].text;
  const grayColor = Colors[colorScheme ?? "light"].gray;
  const router = useRouter();

  const arr = new Array(ROWS).fill(new Array(5).fill(""));

  const [rows, setRow] = useState<string[][]>(arr);
  const [currentRow, setCurrentRow] = useState(0);
  const [currnetCol, _setCurrentCol] = useState(0);

  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  // const [word, setWord] = useState("their");
  const wordLetters = word.split("");

  const colStateRef = useRef(currnetCol);
  const setCurrentCol = (col: number) => {
    colStateRef.current = col;
    _setCurrentCol(col);
  };

  const checkWord = () => {
    console.log(word);
    const currentWord = rows[currentRow].join("");

    if (currentWord.length < word.length) {
      //TODO show error
      console.log("word not long enough");
      return;
    }

    if (!allWords.includes(currentWord)) {
      //TODO show error
      console.log("word not in words list");
      return;
    }

    const newGreen: string[] = [];
    const newYellow: string[] = [];
    const newGray: string[] = [];

    currentWord.split("").forEach((letter, index) => {
      if (letter === wordLetters[index]) {
        newGreen.push(letter);
      } else if (wordLetters.includes(letter)) {
        newYellow.push(letter);
      } else {
        newGray.push(letter);
      }
    });

    setGreenLetters([...greenLetters, ...newGreen]);
    setYellowLetters([...yellowLetters, ...newYellow]);
    setGrayLetters([...grayLetters, ...newGray]);

    setTimeout(() => {
      if (currentWord === word) {
        //TODO show end screen
        console.log("you win, word found");
      } else if (currentRow + 1 >= rows.length) {
        //TODO show end screen
        console.log("you lose, word not found");
      }
    }, 0);

    setCurrentRow(currentRow + 1);
    setCurrentCol(0);
  };

  const addKey = (key: string) => {
    const newRows = [...rows.map((row) => [...row])];

    // console.log(newRows);

    if (key === "ENTER") {
      checkWord();
      // console.log("option enter");
    } else if (key === "BACKSPACE") {
      console.log(colStateRef.current);
      if (colStateRef.current === 0) {
        newRows[currentRow][0] = "";
        setRow(newRows);
        return;
      }

      newRows[currentRow][colStateRef.current - 1] = "";
      setCurrentCol(colStateRef.current - 1);
      setRow(newRows);
      return;
    } else if (colStateRef.current >= newRows[currentRow].length) {
      //end of line, don't add key
      console.log("option return");
      return;
    } else {
      newRows[currentRow][colStateRef.current] = key;
      setRow(newRows);
      setCurrentCol(colStateRef.current + 1);
    }
  };

  const getCellColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (currentRow > rowIndex) {
      if (wordLetters[cellIndex] === cell) {
        return Colors.light.green;
      } else if (wordLetters.includes(cell)) {
        return Colors.light.yellow;
      } else {
        return grayColor;
      }
    }

    return "transparent";
  };

  const getBorderColer = (
    cell: string,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (currentRow > rowIndex && cell !== "") {
      return getCellColor(cell, rowIndex, cellIndex);
    }

    return Colors.light.gray;
  };

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.iconHeader}>
              <Ionicons
                name="help-circle-outline"
                size={moderateScale(26)}
                color={textColor}
              />
              <Ionicons
                name="podium-outline"
                size={moderateScale(26)}
                color={textColor}
              />
              <Ionicons
                name="settings-sharp"
                size={moderateScale(26)}
                color={textColor}
              />
            </View>
          ),
        }}
      />

      <View style={styles.gameField}>
        {rows.map((row, rowIndex) => (
          <View style={styles.gameFieldRow} key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <View
                key={`cell-${cellIndex}`}
                style={[
                  styles.cell,
                  {
                    backgroundColor: getCellColor(cell, rowIndex, cellIndex),
                    borderColor: getBorderColer(cell, rowIndex, cellIndex),
                  },
                ]}
              >
                <Text
                  style={{
                    ...styles.cellText,
                    color: currentRow > rowIndex ? "#FFF" : textColor,
                  }}
                >
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <OnScreenKeyBoard
        onKeyPress={addKey}
        greenLetters={greenLetters}
        yellowLetters={yellowLetters}
        grayLetters={grayLetters}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vs(40),
  },
  iconHeader: {
    flexDirection: "row",
    gap: s(8),
  },
  gameField: {
    alignItems: "center",
    gap: vs(8),
  },
  gameFieldRow: {
    flexDirection: "row",
    gap: vs(8),
  },
  cell: {
    width: s(50),
    height: s(50),
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: ms(28),
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    textTransform: "uppercase",
  },
});
