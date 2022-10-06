import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { DefaultColor } from "../../constants/Colors";
import Enumeration from "../../models/Enumeration";
import { PoppinText } from "../StyledText";

interface IProps {
  data: Enumeration;
  index: number;
  myAnswer: string;
  isCorrect?: boolean;
}

export default function ExamCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, index, myAnswer, isCorrect } = props;

  const [text, setText] = useState(myAnswer);

  const { activity_pk, answer, pk, question } = data;

  return (
    <View
      style={[
        styles.container,
        {
          borderColor:
            isCorrect === undefined
              ? DefaultColor.brown
              : !isCorrect
              ? DefaultColor.danger
              : DefaultColor.yellow,
        },
      ]}
    >
      <PoppinText>
        {index + 1}. {question}
      </PoppinText>
      <View style={styles.inputContainer}>
        <TextInput
          label="Sagot"
          value={text}
          mode={"outlined"}
          disabled={true}
        />
      </View>
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
    marginBottom: 10,
  },
  inputContainer: {
    flex: 0,
    marginTop: 20,
  },
});
