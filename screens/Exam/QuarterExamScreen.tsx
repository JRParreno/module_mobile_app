import * as React from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";
import QUARTER from "../../data/QUARTER";
import { QuarterCard } from "../../components/Quarter";

export default function QuarterExamScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const quarters = QUARTER();

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <View style={styles.lottieContainer}>
          <Lottie
            source={require("../../assets/lottie/72170-books.json")}
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
              isExam
              title="Quarter test 1"
            />
            <QuarterCard
              quarter={quarters[1]}
              style={{ backgroundColor: DefaultColor.danger }}
              textStyle={{ color: DefaultColor.white }}
              isExam
              title="Quarter test 2"
            />
          </View>
          <View style={styles.childContainer}>
            <QuarterCard
              quarter={quarters[2]}
              style={{ backgroundColor: DefaultColor.pink }}
              isExam
              title="Quarter test 3"
            />
            <QuarterCard
              quarter={quarters[3]}
              style={{ backgroundColor: DefaultColor.dark }}
              textStyle={{ color: DefaultColor.white }}
              isExam
              title="Quarter test 4"
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
