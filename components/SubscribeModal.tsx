import { Colors } from "@/constants/Colors";
import { screenPadding } from "@/constants/Token";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
import { Link, useRouter } from "expo-router";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export type Ref = BottomSheetModal;

const SubscribeModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "90%"], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const BENEFITS = [
    "Enjoy full access to Wordle, Spelling Bee, The Crossword and more.",
    "Play new puzzles every day for concentration or relaxation.",
    "Strengthen your strategy with WordleBot.",
    "Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.",
    "Track your stats and streaks on any device.",
  ];

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={dismiss}
      />
    ),
    []
  );

  const goLogin = () => {
    if (Platform.OS === "android") {
      dismiss();
    }

    router.navigate("/login");
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <View style={styles.contentContainer}>
        <View style={styles.btnContainer}>
          <Pressable onPress={goLogin}>
            <Text style={styles.btnText}>LOGIN</Text>
          </Pressable>

          <Ionicons
            name="close"
            size={scale(28)}
            color={Colors.light.gray}
            onPress={() => dismiss()}
          />
        </View>

        <BottomSheetScrollView>
          <Text style={styles.containerHeadLine}>
            Unlimited Play. {"\n"} Try free for 7 days.
          </Text>

          <Image
            source={require("@/assets/images/games.png")}
            style={styles.image}
          />

          <View style={{ marginVertical: screenPadding.vertical }}>
            <MarkedList counterRenderer={disc} lineStyle={styles.listLine}>
              {BENEFITS.map((benefit, index) => (
                <Text key={index} style={styles.listText}>
                  {benefit}
                </Text>
              ))}
            </MarkedList>
          </View>

          <Text style={styles.disclaimer}>
            If you subscribe to The New York Times via this app, payment for
            your subscription will be automatically charged to your Apple ID
            account upon your confirmation of purchase with Apple. Your Apple ID
            account will be automatically charged for renewal at the applicable
            rate shown to you at the time of subscription every calendar month
            (for monthly subscriptions) or every year (for annual subscriptions)
            within 24-hours prior to the start of your next billing period. For
            special introductory offers, you will be automatically charged the
            applicable introductory rate shown to you at the time of
            subscription for the stated introductory period and the standard
            rate rate shown to you at the time of subscription thereafter. You
            will be charged in advance. Subscriptions continue automatically
            until you cancel. Cancellation takes effect at the end of your
            current billing period. You can manage and cancel subscriptions in
            your account settings on the App Store. To cancel, please turn off
            auto-renew at lead; 24-hours before the end of your current billing
            period from your iTunes account settings.
          </Text>
        </BottomSheetScrollView>

        <View style={[styles.footerContainer, { paddingBottom: bottom }]}>
          <Pressable style={styles.footerContent}>
            <Text style={styles.trialText}>Try 7 days free</Text>
          </Pressable>
          <Text style={styles.footerText}>
            2,99 $/month, after 7-day trial. Cancel anytime
          </Text>
        </View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: verticalScale(5),
  },
  btnText: {
    fontSize: moderateScale(14),
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    color: "#000000",
  },
  containerHeadLine: {
    fontSize: moderateScale(32),
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: verticalScale(15),
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_900Black",
  },
  image: {
    alignSelf: "center",
    height: verticalScale(40),
    width: "90%",
  },
  listLine: {
    paddingHorizontal: verticalScale(30),
    gap: scale(10),
    marginVertical: verticalScale(8),
  },
  listText: {
    fontSize: moderateScale(14),
    flexShrink: 1,
    fontFamily: "FrankRuhlLibre_400Regular",
    color: "#4F4F4F",
  },
  disclaimer: {
    fontSize: moderateScale(12),
    color: "#484848",
    marginHorizontal: scale(30),
    marginBottom: verticalScale(20),
    lineHeight: verticalScale(18),
  },
  footerContainer: {
    backgroundColor: "#FFF",
    paddingHorizontal: screenPadding.horizontal,
    marginTop: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    paddingTop: 20,
  },
  footerContent: {
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: moderateScale(5),
  },
  trialText: {
    color: "#FFF",
    fontSize: moderateScale(20),
    paddingVertical: verticalScale(10),
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  footerText: {
    marginTop: verticalScale(5),
    color: "#484848",
    fontSize: moderateScale(12),
    fontFamily: "FrankRuhlLibre_500Medium",
    paddingHorizontal: scale(5),
  },
});

export default SubscribeModal;
