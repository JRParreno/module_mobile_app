import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { Choice, GameQuestion } from "../../models/GameQuestion";
import { PoppinQuestiobText } from "../StyledText";
import ChoiceCard from "./ChoiceCard";

interface IProps {
  data: GameQuestion;
  index: number;
  onSelected: (data: Choice) => void;
  selected: Choice | null;
  correctAnswer: (data: Choice) => void;
}

export default function GameCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, index, onSelected, selected, correctAnswer } = props;
  const questions = data.questions;
  const dataImage = data.image;
  const { choices, pk, question, image } = questions[0];

  const handleGetCorrectAnswer = () => {
    choices.map((choice: Choice) => {
      if (choice.answer) {
        correctAnswer(choice);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetCorrectAnswer();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PoppinQuestiobText>
        {index + 1}. {question}
      </PoppinQuestiobText>
      {dataImage !== undefined ? (
        <View style={styles.imageContainer}>
          <Image
            source={dataImage}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </View>
      ) : (
        <React.Fragment>
          {image !== undefined ? (
            <View style={styles.imageContainer}>
              <Image
                source={image}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </View>
          ) : (
            <View></View>
          )}
        </React.Fragment>
      )}
      {choices.length > 0 &&
        choices.map((data: Choice) => (
          <ChoiceCard
            key={data.choice}
            data={data}
            onSelected={() => {
              onSelected(data);
            }}
            selected={selected !== null && selected === data}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: DefaultColor.white,
    padding: 10,
    borderWidth: 5,
    borderColor: DefaultColor.custom,
    borderRadius: 10,
    margin: 10,
  },
  imageContainer: {
    flex: 0,
    height: 300,
    borderWidth: 2,
    borderColor: DefaultColor.pink,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    marginVertical: 10,
  },
});
