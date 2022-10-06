import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { EnumAnswer } from "../../models/Enumeration";
import { QuizScore } from "../../models/Score";
import { ExamParamList } from "../../types";

type IType = {
  params: ExamParamList["ExamScore"];
};

export default function ExamScoreScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const quizzes = route.params.quizzes;
  const navigation = useNavigation();
  const getTotalScore = (data: QuizScore) => {
    let total = 0;
    let review = 0;
    data.enum_answers.map((answer: EnumAnswer) => {
      if (answer.is_correct !== undefined) {
        total += answer.is_correct ? 1 : 0;
      } else {
        review += 1;
      }
    });
    return {
      total: total,
      review: review,
    };
  };

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {quizzes.map((data, index: number) => (
            <ListItem
              key={index.toString()}
              bottomDivider
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
              containerStyle={[styles.listStyle]}
              onPress={() => {
                // @ts-ignore
                navigation.navigate("OverviewExamScore", {
                  quiz: data,
                });
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.listTextStyle}>
                  Score {getTotalScore(data).total.toString()}/
                  {data.enum_answers.length} {"\n"}
                  Review {getTotalScore(data).review.toString()}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron tvParallaxProperties />
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listStyle: {
    backgroundColor: DefaultColor.danger,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    marginBottom: 5,
  },
  listTextStyle: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: DefaultColor.white,
  },
});
