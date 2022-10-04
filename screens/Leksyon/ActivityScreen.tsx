import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { WebView } from "react-native-webview";
import { LeksyonParamList } from "../../types";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { PoppinText } from "../../components/StyledText";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { DefaultColor } from "../../constants/Colors";
import Activity from "../../models/Activity";
import ACTIVITY from "../../data/ACTIVITY";

type IType = {
  params: LeksyonParamList["LeksyonView"];
};

export default function ActivityScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<Activity | null>(null);

  const route = useRoute<RouteProp<IType, "params">>();
  const quarter = route.params.quarter;

  const handleGetLesson = () => {
    setLoading(true);
    const activities = ACTIVITY();

    const getActivity = activities.find(
      (data: Activity) => (data.quarter_pk = quarter.pk)
    );
    if (getActivity) {
      setActivity(getActivity);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetLesson();
    }, [])
  );

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        {!loading && activity && (
          <React.Fragment>
            <WebView
              source={activity.story}
              javaScriptEnabled={true}
              style={{ backgroundColor: DefaultColor.main }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <ButtonComponent
                title="Go to Activity"
                onPress={() => {}}
                backgroundColor={DefaultColor.danger}
              />
            </View>
          </React.Fragment>
        )}
        {!loading && activity === null && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <PoppinText>Activity is empty</PoppinText>
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
