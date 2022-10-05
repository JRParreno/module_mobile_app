import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
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
import { ExamParamList, LeksyonParamList } from "../../types";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";
import Activity from "../../models/Activity";
import ACTIVITY from "../../data/ACTIVITY";
import { PoppinText } from "../../components/StyledText";

type IType = {
  params: ExamParamList["ExamList"];
};

export default function LectureActivityScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [lectures, setLectures] = useState<
    Array<{
      lecture: Lecture;
      activities: Array<Activity>;
    }>
  >([]);

  const route = useRoute<RouteProp<IType, "params">>();
  const quarter = route.params.quarter;
  const navigation = useNavigation();
  const handleGetLectures = () => {
    const lecturesData = LEKSYON().filter(
      (data: Lecture) => data.quarter_pk === quarter.pk
    );
    let tempData: Array<{ lecture: Lecture; activities: Array<Activity> }> = [];
    lecturesData.map((data: Lecture) => {
      const acitvitiesData = ACTIVITY().filter(
        (activity: Activity) => activity.lesson_pk === data.pk
      );
      if (acitvitiesData.length > 0) {
        tempData.push({ activities: acitvitiesData, lecture: data });
      }
    });
    setLectures(tempData);
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
              source={require("../../assets/lottie/101088-kids-studying-from-home.json")}
              autoPlay={true}
              loop={true}
              style={{
                flex: 1,
              }}
            />
          </View>
          <View style={{ flex: 3 }}>
            {lectures.map(
              (
                data: { lecture: Lecture; activities: Array<Activity> },
                index: number
              ) => (
                <View
                  key={index.toString()}
                  style={[styles.listStyle, { padding: 10 }]}
                >
                  <PoppinText
                    style={{ color: DefaultColor.white, marginBottom: 10 }}
                  >
                    Lesson {index + 1}
                  </PoppinText>
                  {data.activities.map((activity: Activity, index: number) => (
                    <ListItem
                      key={index.toString()}
                      bottomDivider
                      hasTVPreferredFocus={undefined}
                      tvParallaxProperties={undefined}
                      containerStyle={[
                        styles.listStyle,
                        data.activities.length > 1 && { marginBottom: 5 },
                      ]}
                      onPress={() => {
                        // @ts-ignore
                        navigation.navigate("ExamView", { activity: activity });
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title style={styles.listTextStyle}>
                          Activity {index + 1}
                        </ListItem.Title>
                      </ListItem.Content>
                      <ListItem.Chevron tvParallaxProperties />
                    </ListItem>
                  ))}
                </View>
              )
            )}
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
