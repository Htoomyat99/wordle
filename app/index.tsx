import Icon from "@/assets/images/wordle-icon.svg";
import { Link, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {
  moderateScale,
  s,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemeText from "@/components/ThemeText";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SubscribeModal from "@/components/SubscribeModal";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const subscribeModalRef = useRef<BottomSheetModal>(null);

  const { signOut } = useAuth();
  const router = useRouter();

  const handlePresentSubscribeModal = () => {
    subscribeModalRef.current?.present();
  };

  return (
    <View style={[styles.container, {}]}>
      <SubscribeModal ref={subscribeModalRef} />

      <View style={styles.header}>
        <Icon width={scale(100)} height={verticalScale(70)} />

        <ThemeText style={styles.title}>Worlde</ThemeText>

        <ThemeText style={styles.text}>
          Get 6 chances to guess a 5-letter word.
        </ThemeText>
      </View>

      <View style={styles.menu}>
        <Link
          href={"/game"}
          asChild
          style={[
            styles.btn,
            { backgroundColor: colorScheme === "light" ? "#000" : "#4a4a4a" },
          ]}
        >
          <Pressable>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </Pressable>
        </Link>

        <SignedOut>
          <Pressable
            onPress={() => router.push("/login")}
            style={[styles.btn, { borderColor: textColor }]}
          >
            <ThemeText style={styles.btnText}>Log in</ThemeText>
          </Pressable>
        </SignedOut>

        <SignedIn>
          <Pressable
            onPress={() => signOut()}
            style={[styles.btn, { borderColor: textColor }]}
          >
            <ThemeText style={styles.btnText}>Sign out</ThemeText>
          </Pressable>
        </SignedIn>

        <Pressable
          onPress={handlePresentSubscribeModal}
          style={[styles.btn, { borderColor: textColor }]}
        >
          <ThemeText style={styles.btnText}>Subscribe</ThemeText>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <ThemeText style={styles.footerDate}>
          {format(new Date(), "MMMM, d, yyyy")}
        </ThemeText>
        <ThemeText style={styles.footerText}>No. 1151</ThemeText>
        <ThemeText style={styles.footerText}>Made by Simon</ThemeText>
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
