import * as React from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";
import QUARTER from "../../data/QUARTER";
import { QuarterCard } from "../../components/Quarter";

export default function QuarterScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const quarters = QUARTER();

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <View style={styles.lottieContainer}>
          <Lottie
            source={require("../../assets/lottie/61281-class-board.json")}
            autoPlay={true}
            loop={true}
            style={{
              flex: 1,
            }}
          />
        </View>
        <View style={styles.quarterContainer}>
          <View style={styles.childContainer}>
            <QuarterCard
              quarter={quarters[0]}
              style={{ backgroundColor: DefaultColor.custom }}
            />
            <QuarterCard
              quarter={quarters[1]}
              style={{ backgroundColor: DefaultColor.danger }}
              textStyle={{ color: DefaultColor.white }}
            />
          </View>
          <View style={styles.childContainer}>
            <QuarterCard
              quarter={quarters[2]}
              style={{ backgroundColor: DefaultColor.pink }}
            />
            <QuarterCard
              quarter={quarters[3]}
              style={{ backgroundColor: DefaultColor.dark }}
              textStyle={{ color: DefaultColor.white }}
            />
          </View>
        </View>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lottieContainer: {
    flex: 1,
    backgroundColor: DefaultColor.brown,
    borderWidth: 5,
    borderColor: DefaultColor.white,
    borderRadius: 10,
  },
  quarterContainer: {
    flex: 2,
    justifyContent: "center",
  },
  childContainer: {
    flex: 0,
    flexDirection: "row",
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
  },
});
