import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";

export const screenPadding = {
  horizontal: scale(20),
  vertical: verticalScale(20),
};

export const defaultStyles = StyleSheet.create({
  btn: {
    height: verticalScale(40),
    borderRadius: scale(3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  btnText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontFamily: "FrankRuhlLibre_600ExtraBold",
  },
});
