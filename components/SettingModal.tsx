import { Colors } from "@/constants/Colors";
import { screenPadding } from "@/constants/Token";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { storage } from "./storage";

export type Ref = BottomSheetModal;

const SettingModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();

  const [hard, setHard] = useMMKVBoolean("hard-mode", storage);
  const [dark, setDark] = useMMKVBoolean("dark-mode", storage);
  const [contrast, setContrast] = useMMKVBoolean("contrast-mode", storage);

  const toggleDark = () => setDark((prev) => !!!prev);
  const toggleHard = () => setHard((prev) => !!!prev);
  const toggleContrast = () => setContrast((prev) => !!!prev);

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

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <View style={styles.contentContainer}>
        <View style={styles.btnContainer}>
          <Text style={styles.containerHeadLine}>SETTINGS</Text>

          <Ionicons
            name="close"
            size={scale(28)}
            color={Colors.light.gray}
            onPress={() => dismiss()}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTextBig}>Hard Mode</Text>
            <Text style={styles.rowTextSmall}>Words are longer and harder</Text>
          </View>

          <Switch
            value={hard}
            onValueChange={toggleHard}
            ios_backgroundColor={"#9a9a9a"}
            trackColor={{ true: "#000" }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTextBig}>Dark Mode</Text>
            <Text style={styles.rowTextSmall}>Change the app's theme</Text>
          </View>

          <Switch
            value={dark}
            onValueChange={toggleDark}
            ios_backgroundColor={"#9a9a9a"}
            trackColor={{ true: "#000" }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowTextBig}>High Contrast Mode</Text>
            <Text style={styles.rowTextSmall}>
              Increase contrast for better visibility
            </Text>
          </View>

          <Switch
            value={contrast}
            onValueChange={toggleContrast}
            ios_backgroundColor={"#9a9a9a"}
            trackColor={{ true: "#000" }}
          />
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
  containerHeadLine: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_900Black",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: screenPadding.horizontal,
    paddingVertical: screenPadding.vertical,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#888",
  },
  rowText: {
    flex: 1,
  },
  rowTextBig: {
    fontSize: moderateScale(18),
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  rowTextSmall: {
    fontSize: moderateScale(14),
    fontFamily: "FrankRuhlLibre_500Medium",
    color: "#5E5E5E",
  },
});

export default SettingModal;
