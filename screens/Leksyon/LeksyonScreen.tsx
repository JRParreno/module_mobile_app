import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { WebView } from "react-native-webview";
import { LeksyonParamList } from "../../types";
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Lecture from "../../models/Lecture";
import LEKSYON from "../../data/LEKSYON";
import { PoppinText } from "../../components/StyledText";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { DefaultColor } from "../../constants/Colors";

type IType = {
  params: LeksyonParamList["LeksyonView"];
};

export default function LeksyonScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [lecture, setLecture] = useState<Lecture | null>(null);

  const route = useRoute<RouteProp<IType, "params">>();
  const quarter = route.params.quarter;

  const handleGetLesson = () => {
    setLoading(true);
    const lectures = LEKSYON();
    const getLecture = lectures.find(
      (data: Lecture) => (data.quarter_pk = quarter.pk)
    );
    if (getLecture) {
      setLecture(getLecture);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        handleGetLesson();
      }, 100);
    }, [useIsFocused()])
  );

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        {!loading && lecture && (
          <React.Fragment>
            <WebView
              source={lecture.lesson}
              javaScriptEnabled={true}
              style={{ backgroundColor: DefaultColor.main }}
              startInLoadingState={true}
            />
            <View style={{ marginHorizontal: 10 }}>
              <ButtonComponent
                title="Go to Activity"
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Exam", {
                    params: { quarter: quarter },
                    screen: "ExamView",
                  });
                }}
                backgroundColor={DefaultColor.danger}
              />
            </View>
          </React.Fragment>
        )}
        {!loading && lecture === null && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <PoppinText>Lecture is empty</PoppinText>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <PoppinText>Go back</PoppinText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});