import * as React from "react";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { WebView } from "react-native-webview";
import { ExamParamList, LeksyonParamList } from "../../types";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  PoppinQuestiobText,
  PoppinText,
  PoppinTextBold,
} from "../../components/StyledText";
import { DefaultColor } from "../../constants/Colors";
import ACTIVITY from "../../data/ACTIVITY";
import ENUMERATION from "../../data/ENUMERATION";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import Enumeration, { EnumAnswer } from "../../models/Enumeration";
import { EnumerationCard } from "../../components/Enumeration";
import { ButtonComponent } from "../../components/Button/StyledButton";
import Pdf from "react-native-pdf";

type IType = {
  params: ExamParamList["ExamView"];
};

export default function EnumerationScreen() {
  const route = useRoute<RouteProp<IType, "params">>();
  const activity = route.params.activity;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(
    activity.story ? true : false
  );
  const [answers, setAnswers] = useState<Array<EnumAnswer>>([]);

  const [enumerations, setEnumerations] = useState<Array<Enumeration> | null>(
    null
  );
  const [enumeration, setEnumeration] = useState<Enumeration | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isSubmitModal, setIsSubmitModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSubmitModal = () => {
    setIsSubmitModal(!isSubmitModal);
  };

  const handleGetLesson = () => {
    setLoading(true);
    const enumerationsData = ENUMERATION();

    const filterEnumeration = enumerationsData.filter(
      (data: Enumeration) => data.activity_pk === activity.pk
    );
    if (filterEnumeration.length > 0) {
      setEnumerations(filterEnumeration);
    }
    setLoading(false);
  };

  const handleOnNext = () => {
    toggleSubmitModal();
    if (enumerations && currentIndex !== enumerations.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const toggleIsDoneModal = () => {
    setIsDone(!isDone);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetLesson();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (
        enumerations &&
        enumerations.length > 0 &&
        currentIndex === enumerations.length &&
        !isSubmitModal
      ) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toggleIsDoneModal();
        }, 2000);
      }
    }, [isSubmitModal])
  );

  const handleSubmit = () => {
    if (enumeration) {
      const myAnswer = new EnumAnswer(
        activity.pk,
        enumeration.pk,
        answer ? answer : "",
        enumeration.answer.length > 0
          ? enumeration.answer === answer
          : undefined
      );
      setAnswers(answers.concat([myAnswer]));
      toggleSubmitModal();
      return;
    }
  };

  const getScore = () => {
    let total = 0;
    let totalReview = 0;
    answers.map((data: EnumAnswer) => {
      if (data.is_correct !== undefined) {
        total += data.is_correct ? 1 : 0;
      } else {
        totalReview += 1;
      }
    });
    return {
      total: `${total.toString()}/${answers.length.toString()}`,
      totalReview: totalReview,
    };
  };

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        {enumerations && currentIndex !== enumerations.length ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {activity && activity.story && (
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
            )}
            {enumerations &&
              currentIndex !== enumerations.length &&
              enumerations.length > 0 && (
                <EnumerationCard
                  key={enumerations[currentIndex].pk}
                  data={enumerations[currentIndex]}
                  index={currentIndex}
                  setEnum={setEnumeration}
                  setAnswer={setAnswer}
                />
              )}
            <ButtonComponent
              title="Submit"
              backgroundColor={DefaultColor.brown}
              onPress={handleSubmit}
            />
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <PoppinText>No data found</PoppinText>
          </View>
        )}
      </View>
      {enumeration && (
        <Modal
          testID={"modal"}
          isVisible={isSubmitModal}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.scoreModalContainer}>
            <View style={styles.titleContainer}>
              <PoppinTextBold
                style={{
                  color: answer
                    ? enumeration.answer === answer
                      ? DefaultColor.main
                      : DefaultColor.danger
                    : DefaultColor.danger,
                }}
              >
                {enumeration.answer.length > 0
                  ? enumeration.answer === answer
                    ? "CORRECT ANSWER!"
                    : "WRONG ANSWER!"
                  : "This question will be check by your teacher"}
              </PoppinTextBold>
              {enumeration.answer.length > 0 && enumeration.answer !== answer && (
                <React.Fragment>
                  <PoppinQuestiobText>Correct Answer:</PoppinQuestiobText>
                  <PoppinQuestiobText>{enumeration.answer}</PoppinQuestiobText>
                </React.Fragment>
              )}
            </View>
            <Pressable onPress={handleOnNext} style={styles.closeContainer}>
              <PoppinText
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 14,
                  color: DefaultColor.white,
                }}
              >
                NEXT
              </PoppinText>
            </Pressable>
          </View>
        </Modal>
      )}
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
            <Pdf
              trustAllCerts={false}
              source={
                Platform.OS === "ios"
                  ? activity.story
                  : {
                      uri: `bundle-assets://${activity.path}`,
                    }
              }
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
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
      {answers.length > 0 && (
        <Modal
          testID={"modal"}
          isVisible={isDone}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.scoreModalContainer}>
            <View style={styles.titleContainer}>
              <PoppinTextBold
                style={{
                  color: DefaultColor.main,
                }}
              >
                CONGRATULATIONS!
              </PoppinTextBold>
              <PoppinQuestiobText>
                Your score is {getScore().total}
              </PoppinQuestiobText>
              {getScore().totalReview > 0 && (
                <PoppinQuestiobText>
                  Will be review {getScore().totalReview.toString()}
                </PoppinQuestiobText>
              )}
            </View>
            <Pressable
              onPress={() => {
                toggleIsDoneModal();
                navigation.goBack();
              }}
              style={styles.closeContainer}
            >
              <PoppinText
                style={{
                  fontFamily: "poppins-regular",
                  fontSize: 14,
                  color: DefaultColor.white,
                }}
              >
                Back
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
    marginBottom: 10,
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
  titleContainer: {
    flex: 0,
    marginBottom: 10,
  },
  scoreModalContainer: {
    backgroundColor: DefaultColor.white,
    minHeight: 100,
    padding: 20,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    borderRadius: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
