import * as React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ViewWithLoading from "../components/ViewWithLoading";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../constants/Colors";
import { PoppinText } from "../components/StyledText";
import { StackActions, useNavigation } from "@react-navigation/native";
import { storeData } from "../database/StoreData";

export default function LandingScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <Pressable
          onPress={async () => {
            await storeData("skipLanding", "skipLanding");
            navigation.dispatch(StackActions.replace("Root"));
          }}
          style={{
            zIndex: 1,
            position: "absolute",
            right: 10,
            top: 0,
          }}
        >
          <View
            style={{
              flex: 0,
              width: 80,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: DefaultColor.danger,
              borderWidth: 1,
              borderColor: DefaultColor.danger,
              borderRadius: 300,
              alignSelf: "flex-end",
              marginTop: 10,
            }}
          >
            <PoppinText style={{ color: DefaultColor.white }}>
              Continue
            </PoppinText>
          </View>
        </Pressable>
        <View
          style={{
            flex: 0,
            padding: 10,
            margin: 20,
            top: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PoppinText
            style={{
              fontFamily: "poppins-semibold",
              fontSize: 25,
            }}
          >
            MOTHER TOUNGE 1
          </PoppinText>
        </View>
        <View style={{ flex: 0.5, justifyContent: "flex-start" }}>
          <Lottie
            source={require("../assets/lottie/104879-kids.json")}
            autoPlay={true}
            loop={true}
            style={{
              flex: 1,
            }}
          />
        </View>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: DefaultColor.main,
  },
});
