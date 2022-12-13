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
import Lecture from "../../models/Lecture";
import { ExamParamList, LeksyonParamList } from "../../types";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";
import Activity from "../../models/Activity";
import ACTIVITY from "../../data/ACTIVITY";
import { PoppinText } from "../../components/StyledText";
import { useSelector } from "react-redux";
import { AppStateStore } from "../../redux/store";
import { QuizScore } from "../../models/Score";
import LECTURE from "../../data/LECTURE";

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
  const appState = useSelector((state: AppStateStore) => state.score);
  const route = useRoute<RouteProp<IType, "params">>();
  const quarter = route.params.quarter;
  const navigation = useNavigation();
  const handleGetLectures = () => {
    const lecturesData = LECTURE().filter(
      (data: Lecture) => data.quarter_pk === quarter.pk
    );
    let tempData: Array<{ lecture: Lecture; activities: Array<Activity> }> = [];
    lecturesData.map((data: Lecture) => {
      const acitvitiesData = ACTIVITY().filter(
        (activity: Activity) => activity.leksyon_pk === data.pk
      );
      if (acitvitiesData.length > 0) {
        tempData.push({ activities: acitvitiesData, lecture: data });
      }
    });
    setLectures(tempData);
    setLoading(false);
  };

  const getActivityScores = (pk: string) => {
    const quizzes = appState.score.quizzes;
    let myQuizzes: Array<QuizScore> = [];
    if (quizzes.length > 0) {
      myQuizzes = quizzes.filter((data: QuizScore) => data.activity_pk === pk);
    }
    return myQuizzes;
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
                  style={[styles.listStyle, { padding: 10, borderRadius: 10, marginBottom: 10 }]}
                >
                  <PoppinText
                    style={{ color: DefaultColor.white, marginBottom: 10 }}
                  >
                    Lesson {index + 1}
                  </PoppinText>
                  {data.activities.map((activity: Activity, index: number) => (
                    <React.Fragment key={index.toString()}>
                      <ListItem
                        bottomDivider
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        containerStyle={[
                          styles.listStyle,
                          {
                            borderBottomWidth:
                              getActivityScores(activity.pk).length > 0 ? 0 : 1,
                          },
                          data.activities.length > 1 && { marginBottom: 5 },
                        ]}
                        onPress={() => {
                          // @ts-ignore
                          navigation.navigate("ExamView", {
                            activity: activity,
                          });
                        }}
                      >
                        <ListItem.Content>
                          <ListItem.Title style={styles.listTextStyle}>
                            Activity {index + 1}
                          </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron tvParallaxProperties />
                      </ListItem>
                      {getActivityScores(activity.pk).length > 0 && (
                        <ListItem
                          key={index.toString()}
                          bottomDivider
                          hasTVPreferredFocus={undefined}
                          tvParallaxProperties={undefined}
                          containerStyle={[
                            styles.listStyle,
                            { borderTopWidth: 0 },
                            data.activities.length > 1 && { marginBottom: 5 },
                          ]}
                          onPress={() => {
                            // @ts-ignore
                            navigation.navigate("ExamScore", {
                              quizzes: getActivityScores(activity.pk),
                            });
                          }}
                        >
                          <ListItem.Content>
                            <ListItem.Title style={styles.listTextStyle}>
                              Score
                            </ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron tvParallaxProperties />
                        </ListItem>
                      )}
                    </React.Fragment>
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
    height: 200,
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
  },
  listTextStyle: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: DefaultColor.white,
  },
});
