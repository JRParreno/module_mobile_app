import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { ExamParamList } from "../../types";
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
import ENUMERATION from "../../data/ENUMERATION";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import Enumeration, { EnumAnswer } from "../../models/Enumeration";
import { EnumerationCard } from "../../components/Enumeration";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { addQuizScore } from "../../redux/actions/scoreAction";
import { QuizScore } from "../../models/Score";
import Video from 'react-native-video';
import ModalViewLocalImage from "../../components/Modal/ModalViewLocalImage";

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
  const [visibleImage, setVisibleImage] = useState(false);
  const [answers, setAnswers] = useState<Array<EnumAnswer>>([]);

  const [enumerations, setEnumerations] = useState<Array<Enumeration> | null>(
    null
  );
  const [enumeration, setEnumeration] = useState<Enumeration | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isSubmitModal, setIsSubmitModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSubmitModal = () => {
    setIsSubmitModal(!isSubmitModal);
  };
  console.log(activity);

  const handleGetLesson = () => {
    setLoading(true);
    const enumerationsData = ENUMERATION();

    const filterEnumeration = enumerationsData.filter(
      (data: Enumeration) => data.activity_pk === activity.pk
    );
    if (filterEnumeration.length > 0) {
      for (var i = filterEnumeration.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = filterEnumeration[i];
        filterEnumeration[i] = filterEnumeration[j];
        filterEnumeration[j] = temp;
      }
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
        dispatch(addQuizScore(new QuizScore(answers, activity.pk)));

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
        enumeration.answer.length > 0 && answer != null
          ? enumeration.answer.toLowerCase() === answer.toLowerCase()
          : undefined
      );
      console.log(enumeration.answer.toLowerCase());
      console.log(answer!.toLowerCase());
      console.log(enumeration.answer.toLowerCase() === answer!.toLowerCase());

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
      score: total,
      total: `${total.toString()}/${answers.length.toString()}`,
      totalReview: totalReview,
    };
  };


  const boolShowActivity = () => {
    return activity.video !== undefined || activity.image !== undefined;
  }

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        {enumerations && currentIndex !== enumerations.length ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {activity && boolShowActivity() && (
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
            <PoppinText style={{ fontFamily: "poppins-semibold", marginBottom: 10 }}>{activity.direction}</PoppinText>

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
                    ? enumeration.answer.toLowerCase() === answer.toLowerCase()
                      ? DefaultColor.main
                      : DefaultColor.danger
                    : DefaultColor.danger,
                }}
              >
                {enumeration.answer.length > 0 && answer != null
                  ? enumeration.answer.toLowerCase() === answer.toLowerCase()
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
            {
              activity.video &&
              <Video
                style={styles.video}
                source={activity.video}
                controls
                resizeMode="contain"
                onError={(e) => {
                  console.log(e);
                }}
              />
            }

            {
              activity.image &&
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setVisibleImage(true);
                    setModalVisible(false);
                  }}
                >
                  <Image
                    source={activity.image}
                    height={"100%"}
                    width={"100%"}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
            }

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
                {getScore().score === 0 ? "Try again" : "CONGRATULATIONS!"}
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
      {
        activity.image &&

        <ModalViewLocalImage
          title="Image"
          uri={activity.image}
          visible={visibleImage}
          onClose={() => {
            setVisibleImage(false);
            setModalVisible(true);
          }}
        />
      }

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
    padding: 10
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
  video: {
    flex: 1,
    borderWidth: 1,
    borderColor: DefaultColor.main,
    borderRadius: 5
  },
  imageContainer: {
    flex: 1,
    overflow: "hidden",
    padding: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: DefaultColor.main,
    borderRadius: 5
  },
});
