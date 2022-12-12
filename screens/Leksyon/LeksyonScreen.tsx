import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { LeksyonParamList } from "../../types";
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Lecture from "../../models/Lecture";
import { PoppinText } from "../../components/StyledText";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { DefaultColor } from "../../constants/Colors";
import Video from 'react-native-video';

type IType = {
  params: LeksyonParamList["LeksyonView"];
};

export default function LeksyonScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [lecture, setLecture] = useState<Lecture | null>(null);

  const route = useRoute<RouteProp<IType, "params">>();
  const lectureRoute = route.params.lecture;

  const handleGetLesson = () => {
    setLoading(true);
    setLecture(lectureRoute);
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
            <Video
              style={styles.video}
              source={lecture.video}
              controls
              resizeMode="contain"
              onError={(e) => {
                console.log(e);
              }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <ButtonComponent
                title="Go to Activity"
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Activities", { lecture: lecture });
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
  video: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
