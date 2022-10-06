import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ExamCard } from "../../components/Enumeration";
import ViewWithLoading from "../../components/ViewWithLoading";
import ENUMERATION from "../../data/ENUMERATION";
import { EnumAnswer } from "../../models/Enumeration";
import { ExamParamList } from "../../types";

type IType = {
  params: ExamParamList["OverviewExamScore"];
};

export default function OverviewExamScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const quiz = route.params.quiz;

  const handleGetEnumeration = (pk: string) => {
    const enumerations = ENUMERATION().filter(
      (data) => quiz.activity_pk === data.activity_pk
    );
    const enumeration = enumerations.find((data) => data.pk === pk);
    return enumeration;
  };

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {quiz.enum_answers.map((data: EnumAnswer, index: number) => (
            <React.Fragment key={data.enum_pk}>
              {handleGetEnumeration(data.enum_pk) && (
                <ExamCard
                  data={handleGetEnumeration(data.enum_pk)!}
                  index={index}
                  myAnswer={data.answer}
                  isCorrect={data.is_correct}
                />
              )}
            </React.Fragment>
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
});
