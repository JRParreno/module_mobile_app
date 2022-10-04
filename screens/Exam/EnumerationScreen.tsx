import * as React from "react";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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
import { DefaultColor } from "../../constants/Colors";
import Activity from "../../models/Activity";
import ACTIVITY from "../../data/ACTIVITY";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

type IType = {
  params: LeksyonParamList["LeksyonView"];
};

export default function EnumerationScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
        <View style={styles.storyContainer}>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
            }}
          >
            <View style={styles.btnViewStyle}>
              <Ionicons name="book" size={24} />
              <PoppinText> Show Activity</PoppinText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {activity && (
        <Modal
          testID={"modal"}
          isVisible={isModalVisible}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.modalContainer}>
            <WebView
              source={activity.story}
              style={{ borderWidth: 1, borderColor: DefaultColor.white }}
            />

            <Pressable onPress={toggleModal} style={styles.closeContainer}>
              <PoppinText
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 14,
                  color: DefaultColor.white,
                }}
              >
                close
              </PoppinText>
            </Pressable>
          </View>
        </Modal>
      )}
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  storyContainer: {
    flex: 0,
  },
  btnViewStyle: {
    minWidth: 80,
    maxWidth: 150,
    flexDirection: "row",
    backgroundColor: DefaultColor.pink,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderWidth: 2,
    borderColor: DefaultColor.white,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 0,
    height: Dimensions.get("screen").height * 0.9,
    backgroundColor: DefaultColor.white,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    overflow: "hidden",
  },
  closeContainer: {
    flex: 0,
    alignItems: "center",
    backgroundColor: DefaultColor.danger,
    padding: 5,
    margin: 20,
    borderWidth: 1,
    borderColor: DefaultColor.danger,
    borderRadius: 20,
  },
});
