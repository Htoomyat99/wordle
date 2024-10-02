import { screenPadding } from "@/constants/Token";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale } from "react-native-size-matters";
import ThemeText from "./ThemeText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

export type Ref = BottomSheetModal;

const App = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={dismiss}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleComponent={null}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.btnContainer}>
          <Link href={"/login"} asChild>
            <Text style={styles.btnText}>LOGIN</Text>
          </Link>

          <Ionicons
            name="close"
            size={scale(28)}
            color={Colors.light.gray}
            onPress={() => dismiss()}
          />
        </View>
      </BottomSheetView>
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
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: screenPadding.vertical,
  },
  btnText: {
    fontSize: moderateScale(14),
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  containerHeadLine: {
    fontSize: moderateScale(32),
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: screenPadding.vertical,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_900Black",
  },
});

export default App;
