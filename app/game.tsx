import OnScreenKeyBoard from "@/components/OnScreenKeyBoard";
import SettingModal from "@/components/SettingModal";
import { Colors } from "@/constants/Colors";
import { allWords } from "@/utils/allWords";
import { words } from "@/utils/targetWords";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, useColorScheme, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import { moderateScale, ms, s, vs } from "react-native-size-matters";

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

  const settingModalRef = useRef<BottomSheetModal>(null);
  const handlePresentSettingModal = () => {
    settingModalRef.current?.present();
  };

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
      shakeRow();
      return;
    }

    if (!allWords.includes(currentWord)) {
      shakeRow();
      return;
    }

    flipRows();

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
        router.push({
          pathname: "/end",
          params: {
            word: word,
            gameField: JSON.stringify(rows),
            win: "true",
          },
        });
      } else if (currentRow + 1 >= rows.length) {
        router.push({
          pathname: "/end",
          params: {
            word: word,
            gameField: JSON.stringify(rows),
            win: "false",
          },
        });
      }
    }, 1500);

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

  //Animations
  const offsetShakes = Array.from({ length: ROWS }, () => useSharedValue(0));

  const rowStyles = Array.from({ length: ROWS }, (_, index) =>
    useAnimatedStyle(() => {
      return {
        transform: [{ translateX: offsetShakes[index].value }],
      };
    })
  );

  const shakeRow = () => {
    const TIME = 80;
    const OFFSET = 10;

    offsetShakes[currentRow].value = withSequence(
      withTiming(-OFFSET, { duration: TIME / 2 }),
      withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
      withTiming(0, { duration: TIME / 2 })
    );
  };

  //FLIPS

  const tileRotates = Array.from({ length: ROWS }, () =>
    Array.from({ length: 5 }, () => useSharedValue(0))
  );

  const cellBackgrounds = Array.from({ length: ROWS }, () =>
    Array.from({ length: 5 }, () => useSharedValue("transparent"))
  );

  const cellBorder = Array.from({ length: ROWS }, () =>
    Array.from({ length: 5 }, () => useSharedValue(Colors.light.gray))
  );

  const tileStyles = Array.from({ length: ROWS }, (_, index) => {
    return Array.from({ length: 5 }, (_, tileIndex) =>
      useAnimatedStyle(() => {
        return {
          transform: [{ rotateX: `${tileRotates[index][tileIndex].value}deg` }],
          borderColor: cellBorder[index][tileIndex].value,
          backgroundColor: cellBackgrounds[index][tileIndex].value,
        };
      })
    );
  });

  const flipRows = () => {
    const TIME = 300;
    const OFFSET = 90;

    tileRotates[currentRow].forEach((tileStyle, index) => {
      tileStyle.value = withDelay(
        index * 100,
        withSequence(
          withTiming(OFFSET, { duration: TIME }),
          withTiming(0, { duration: TIME })
        )
      );
    });
  };

  const setCellColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (currentRow > rowIndex) {
      if (wordLetters[cellIndex] === cell) {
        cellBackgrounds[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(Colors.light.green)
        );
      } else if (wordLetters.includes(cell)) {
        cellBackgrounds[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(Colors.light.yellow)
        );
      } else {
        cellBackgrounds[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(grayColor)
        );
      }
    } else {
      cellBackgrounds[rowIndex][cellIndex].value = withTiming("transparent", {
        duration: 100,
      });
    }
  };

  const setBorderColer = (
    cell: string,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (currentRow > rowIndex && cell !== "") {
      if (wordLetters[cellIndex] === cell) {
        cellBorder[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(Colors.light.green)
        );
      } else if (wordLetters.includes(cell)) {
        cellBorder[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(Colors.light.yellow)
        );
      } else {
        cellBorder[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(grayColor)
        );
      }
    }
  };

  useEffect(() => {
    if (currentRow === 0) return;

    rows[currentRow - 1].map((cell, cellIndex) => {
      setCellColor(cell, currentRow - 1, cellIndex);
      setBorderColer(cell, currentRow - 1, cellIndex);
    });
  }, [currentRow]);

  //Web

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        addKey("ENTER");
      } else if (e.key === "Backspace") {
        addKey("BACKSPACE");
      } else if (e.key.length === 1) {
        addKey(e.key);
      }
    };

    if (Platform.OS === "web") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (Platform.OS === "web") {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [currnetCol]);

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <SettingModal ref={settingModalRef} />

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
                onPress={handlePresentSettingModal}
              />
            </View>
          ),
        }}
      />

      <View style={styles.gameField}>
        {rows.map((row, rowIndex) => (
          <Animated.View
            style={[styles.gameFieldRow, rowStyles[rowIndex]]}
            key={`row-${rowIndex}`}
          >
            {row.map((cell, cellIndex) => (
              <Animated.View
                entering={ZoomIn.delay(50 * cellIndex)}
                key={`cell-${rowIndex}-${cellIndex}`}
              >
                <Animated.View
                  style={[styles.cell, tileStyles[rowIndex][cellIndex]]}
                >
                  <Animated.Text
                    style={[
                      styles.cellText,
                      {
                        color: currentRow > rowIndex ? "#fff" : textColor,
                      },
                    ]}
                  >
                    {cell}
                  </Animated.Text>
                </Animated.View>
              </Animated.View>
            ))}
          </Animated.View>
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
