import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Test = () => {
  // Mock data for 16 items
  const gridItems = Array.from(
    { length: 16 },
    (_, index) => `Item ${index + 1}`
  );

  return (
    <View style={styles.container}>
      {gridItems.map((item, index) => (
        <Pressable
          onPress={() => console.log(item)}
          key={index}
          style={styles.box}
        >
          <Text style={styles.boxText}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Align horizontally in the center
    alignItems: "center", // Align vertically in the center
    padding: 10,
  },
  box: {
    width: "20%", // Each box will take up 22% of the container width (including margin)
    aspectRatio: 1, // Ensures the box is a perfect square
    margin: "2%",
    backgroundColor: "#4CAF50", // Example color
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    color: "white",
    fontSize: 16,
  },
});

export default Test;
