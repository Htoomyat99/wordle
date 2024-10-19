import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ms, s, verticalScale, vs } from "react-native-size-matters";

interface onKeyBoardProps {
  onKeyPress: (key: string) => void;
  greenLetters: string[];
  yellowLetters: string[];
  grayLetters: string[];
}

export const ENTER = "ENTER";
export const BACKSPACE = "BACKSPACE";

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [ENTER, "z", "x", "c", "v", "b", "n", "m", BACKSPACE],
];

const OnScreenKeyBoard = ({
  onKeyPress,
  greenLetters,
  yellowLetters,
  grayLetters,
}: onKeyBoardProps) => {
  const { width } = useWindowDimensions();
  const keyWidth =
    Platform.OS === "web" ? s(60) : (width - s(60)) / keys[0].length;
  const keyHeght = vs(40);

  const isSpecailKey = (key: string) => ["ENTER", "BACKSPACE"].includes(key);
  const isInLetter = (key: string) =>
    [...greenLetters, ...yellowLetters, ...grayLetters].includes(key);

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((key, keyIndex) => (
            <Pressable
              style={({ pressed }) => [
                styles.key,
                { height: keyHeght, width: keyWidth },
                isSpecailKey(key) && { width: keyWidth * 1.5 },
                {
                  backgroundColor: greenLetters.includes(key)
                    ? Colors.light.green
                    : yellowLetters.includes(key)
                    ? Colors.light.yellow
                    : grayLetters.includes(key)
                    ? Colors.light.gray
                    : "#DDD",
                },
                pressed && { backgroundColor: "#868686" },
              ]}
              key={`key-${keyIndex}`}
              onPress={() => onKeyPress(key)}
            >
              <Text
                style={[
                  styles.keyText,
                  key === "ENTER" && {
                    fontSize: ms(12),
                    fontFamily: '"FrankRuhlLibre_800ExtraBold',
                  },
                  isInLetter(key) && { color: "#FFF" },
                ]}
              >
                {isSpecailKey(key) ? (
                  key === "ENTER" ? (
                    "ENTER"
                  ) : (
                    <Ionicons
                      name="backspace-outline"
                      color={"#000"}
                      size={ms(20)}
                    />
                  )
                ) : (
                  key
                )}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default OnScreenKeyBoard;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(40),
    alignSelf: "center",
    gap: vs(4),
  },
  row: {
    flexDirection: "row",
    gap: s(5),
    justifyContent: "center",
  },
  key: {
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    fontSize: ms(20),
    textTransform: "uppercase",
    fontFamily: '"FrankRuhlLibre_500Medium"',
  },
});
