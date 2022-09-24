import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { PoppinText, PoppinTextBold } from "../StyledText";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";

interface IProps {
  onPress: () => void;
  title: string;
  source: string;
  style?: StyleProp<ViewStyle>;
}

export default function CategoryCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { onPress, title, source, style } = props;
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={[styles.container, style]}
    >
      <View style={styles.lottieContainer}>
        <View style={{ flex: 1 }}>
          <Lottie
            source={source}
            autoPlay={true}
            loop={true}
            style={{
              flex: 1,
            }}
          />
        </View>
        <PoppinTextBold
          style={{
            color: DefaultColor.secondary,
          }}
        >
          {title}
        </PoppinTextBold>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    borderWidth: 5,
    borderColor: DefaultColor.white,
    borderRadius: 20,
    marginBottom: 10,
  },
  lottieContainer: {
    minHeight: 200,
    width: "100%",
  },
});
