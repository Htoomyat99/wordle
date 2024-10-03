import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { defaultStyles } from "@/constants/Token";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
}
const Login = () => {
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: Strategy.Google,
  });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: Strategy.Facebook,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];

    try {
      const { setActive, createdSessionId } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.log("error >>>", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Log in or create an account</Text>

      <Text style={styles.subText}>
        By continuing you agree the Terms of Sale, Terms of Service, and Privacy
        Policy.
      </Text>

      <Text style={styles.inputLabel}>Email</Text>

      <TextInput style={styles.input} placeholder="Email" />

      <Pressable style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </Pressable>

      <View style={styles.seperatorView}>
        <View style={styles.line}></View>
        <Text style={styles.seperator}>or</Text>
        <View style={styles.line}></View>
      </View>

      <View style={{ gap: verticalScale(20) }}>
        <Pressable
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons name="logo-google" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </Pressable>

        <Pressable
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons name="logo-facebook" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </Pressable>

        <Pressable
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="logo-apple" size={24} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(40),
    backgroundColor: "#FFF",
  },
  header: {
    fontSize: moderateScale(20),
    fontFamily: "FrankRuhlLibre_600ExtraBold",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(20),
    textAlign: "center",
  },
  subText: {
    fontSize: moderateScale(15),
    color: "#4f4f4f",
    textAlign: "center",
    marginBottom: verticalScale(30),
  },
  input: {
    height: verticalScale(40),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: scale(4),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(15),
  },
  inputLabel: {
    paddingBottom: verticalScale(5),
    fontFamily: "FrankRuhlLibre_500Medium",
    color: "#000",
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    borderBottomColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  seperator: {
    fontFamily: "FrankRuhlLibre_500Medium",
    color: Colors.light.gray,
    fontSize: moderateScale(16),
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    height: verticalScale(40),
    borderRadius: moderateScale(4),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: scale(10),
  },
  btnOutlineText: {
    color: "#000",
    fontSize: moderateScale(16),
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  btnIcon: {
    paddingRight: scale(10),
  },
});
