import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { DefaultColor } from "../../constants/Colors";
import Quarter from "../../models/Quarter";
import { PoppinText } from "../StyledText";

interface IProps {
  quarter: Quarter;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function QuarterCard(props: IProps) {
  const navigation = useNavigation();
  const { quarter, style, textStyle } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("LeksyonView", { quarter: quarter });
      }}
      style={[styles.container, style]}
    >
      <PoppinText style={textStyle}>{quarter.title}</PoppinText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 3,
    borderColor: DefaultColor.white,
    backgroundColor: DefaultColor.grey,
    borderRadius: 10,
  },
});
