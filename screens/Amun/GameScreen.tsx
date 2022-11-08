import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { GameCard } from "../../components/Game";
import {
  PoppinQuestiobText,
  PoppinText,
  PoppinTextBold,
} from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { GAME_QUESTIONS } from "../../data/GAME_QUESTIONS";
import Answer from "../../models/Answer";
import { Choice, GameQuestion, Question } from "../../models/GameQuestion";
import { AmunStackParamList } from "../../types";
import { AppStateStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addGameScore } from "../../redux/actions/scoreAction";
import { GameScore } from "../../models/Score";

type IType = {
  params: AmunStackParamList["Game"];
};

export default function GameScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const amun = route.params.amun;
  const [questions, setQuestions] = useState<Array<GameQuestion>>([]);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<Choice | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dispatch = useDispatch();

  const toggleIsDoneModal = () => {
    setIsDone(!isDone);
  };
  const handleGetQuestions = () => {
    const getQuestions = GAME_QUESTIONS().filter(
      (data) => data.category_pk === amun.pk
    );
    // @ts-ignore
    setQuestions(getQuestions);
  };

  const getScore = () => {
    let total = 0;
    answers.map((data: Answer) => {
      total += data.is_correct ? 1 : 0;
    });
    // add score
    return {
      score: total,
      quizLength: answers.length,
    };
  };

  useFocusEffect(
    useCallback(() => {
      handleGetQuestions();
    }, [])
  );

  const handleOnNext = () => {
    toggleModal();
    if (currentIndex !== questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (
        questions.length > 0 &&
        currentIndex === questions.length &&
        !isModalVisible
      ) {
        setLoading(true);
        dispatch(addGameScore(new GameScore(answers, amun.pk)));

        setTimeout(() => {
          setLoading(false);
          toggleIsDoneModal();
        }, 2000);
      }
    }, [isModalVisible])
  );

  const handleSubmit = () => {
    if (choice && question) {
      const myAnswer = new Answer(
        amun.pk,
        question.pk,
        choice.description,
        choice.answer
      );
      setAnswers(answers.concat([myAnswer]));
      // setChoice(null);
      // setQuestion(null);
      toggleModal();
      return;
    }
    return Alert.alert("", "Please select");
  };

  return (
    <ViewWithLoading loading={loading}>
      {currentIndex !== questions.length && (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {questions.length > 0 && (
              <GameCard
                key={questions[currentIndex].pk}
                data={questions[currentIndex]}
                index={currentIndex}
                onSelected={(choice: Choice) => {
                  setChoice(choice);
                  setQuestion(questions[currentIndex].questions[0]);
                }}
                selected={choice}
                correctAnswer={setCorrectAnswer}
              />
            )}
            <View style={{ flex: 0, paddingHorizontal: 10 }}>
              <ButtonComponent
                title="Submit"
                onPress={handleSubmit}
                backgroundColor={DefaultColor.brown}
              />
            </View>
          </ScrollView>
        </View>
      )}

      {choice && correctAnswer && (
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
            <View style={styles.titleContainer}>
              <PoppinTextBold
                style={{
                  color: choice.answer
                    ? DefaultColor.main
                    : DefaultColor.danger,
                }}
              >
                {choice.answer ? "CORRECT" : "WRONG"} ANSWER!
              </PoppinTextBold>
              {!choice.answer && (
                <React.Fragment>
                  <PoppinQuestiobText>Correct Answer:</PoppinQuestiobText>
                  <PoppinQuestiobText>
                    {correctAnswer.choice}. {correctAnswer.description}
                  </PoppinQuestiobText>
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
      {choice && correctAnswer && (
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
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
              <PoppinTextBold
                style={{
                  color: choice.answer
                    ? DefaultColor.main
                    : DefaultColor.danger,
                }}
              >
                {getScore().score === 0 ? "Try again" : "CONGRATULATIONS!"}
              </PoppinTextBold>
              <PoppinQuestiobText>
                Your score is{" "}
                {getScore().score.toString() +
                  "/" +
                  getScore().quizLength.toString()}
              </PoppinQuestiobText>
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
                Back to Games
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
  },
  titleContainer: {
    flex: 0,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: DefaultColor.white,
    minHeight: 100,
    padding: 20,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    borderRadius: 20,
  },
  closeContainer: {
    flex: 0,
    alignItems: "center",
    backgroundColor: DefaultColor.danger,
    padding: 5,
    borderWidth: 1,
    borderColor: DefaultColor.danger,
    borderRadius: 20,
  },
});
