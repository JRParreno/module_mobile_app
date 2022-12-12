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
import { LeksyonParamList } from "../../types";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../../constants/Colors";
import Activity from "../../models/Activity";
import ACTIVITY from "../../data/ACTIVITY";

type IType = {
  params: LeksyonParamList["Activities"];
};

export default function ActivitiesScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [activites, setActivities] = useState<Array<Activity>>([]);
  const route = useRoute<RouteProp<IType, "params">>();
  const lecture = route.params.lecture;
  const navigation = useNavigation();
  const handleGetActivities = () => {
    const lecturesData = ACTIVITY().filter(
      (data: Activity) => data.leksyon_pk === lecture.pk
    );
    setActivities(lecturesData);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetActivities();
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
            {activites.map((data: Activity, index: number) => (
              <ListItem
                key={data.pk}
                bottomDivider
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
                containerStyle={styles.listStyle}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Exam", {
                    params: { activity: data },
                    screen: "ExamView",
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
    marginBottom: 5
  },
  listTextStyle: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: DefaultColor.white,
  },
});
