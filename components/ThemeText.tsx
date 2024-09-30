import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

const ThemeText = ({ style, children, ...rest }: TextProps) => {
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? "light"].text;

  return (
    <Text style={[style, { color: color }]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemeText;

const styles = StyleSheet.create({});
