import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { format } from "date-fns";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon width={scale(100)} height={verticalScale(70)} />

        <Text style={styles.title}>Worlde</Text>

        <Text style={styles.text}>Get 6 chances to guess a 5-letter word.</Text>
      </View>

      <View style={styles.menu}>
        <Link
          href={"/game"}
          asChild
          style={[styles.btn, { backgroundColor: "#000" }]}
        >
          <Pressable>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Log in</Text>
        </Pressable>

        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Subscribe</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerDate}>
          {format(new Date(), "MMMM, d, yyyy")}
        </Text>
        <Text style={styles.footerText}>No. 1151</Text>
        <Text style={styles.footerText}>Made by Simon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: scale(50),
    gap: verticalScale(40),
  },
  header: {
    alignItems: "center",
    gap: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(40),
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  text: {
    fontSize: moderateScale(26),
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(10),
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerDate: {
    fontSize: moderateScale(14),
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  footerText: {
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(30),
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    maxWidth: scale(200),
  },
  btnText: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    fontSize: moderateScale(16),
    color: "#333333",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  primaryItem: {
    backgroundColor: "#000",
  },
  primaryText: {
    color: "#FFF",
  },
});
