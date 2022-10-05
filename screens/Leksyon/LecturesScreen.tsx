import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import ViewWithLoading from "../../components/ViewWithLoading";
import LEKSYON from "../../data/LEKSYON";
import Lecture from "../../models/Lecture";
import { LeksyonParamList } from "../../types";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";

type IType = {
  params: LeksyonParamList["Lectures"];
};

export default function LecturesScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [lectures, setLectures] = useState<Array<Lecture>>([]);
  const route = useRoute<RouteProp<IType, "params">>();
  const quarter = route.params.quarter;
  const navigation = useNavigation();
  const handleGetLectures = () => {
    const lecturesData = LEKSYON().filter(
      (data: Lecture) => data.quarter_pk === quarter.pk
    );
    setLectures(lecturesData);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetLectures();
    }, [])
  );
  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          <View style={{ flex: 3 }}>
            {lectures.map((data: Lecture, index: number) => (
              <ListItem
                key={data.pk}
                bottomDivider
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
                containerStyle={styles.listStyle}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("LeksyonView", { lecture: data });
                }}
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.listTextStyle}>
                    Lesson {index + 1}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron tvParallaxProperties />
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  lottieContainer: {
    flex: 1,
    marginVertical: 30,
    backgroundColor: DefaultColor.danger,
    padding: 20,
    borderWidth: 3,
    borderColor: DefaultColor.white,
    borderRadius: 10,
  },
  listStyle: {
    backgroundColor: DefaultColor.danger,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    borderRadius: 10,
  },
  listTextStyle: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: DefaultColor.white,
  },
});
