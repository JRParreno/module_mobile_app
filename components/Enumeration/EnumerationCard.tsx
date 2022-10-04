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
  setEnum: (_: Enumeration) => void;
  setAnswer: (_: string) => void;
}

export default function EnumerationCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState("");

  const { data, index, setAnswer, setEnum } = props;
  const { activity_pk, answer, pk, quarter_pk, question } = data;

  useFocusEffect(
    useCallback(() => {
      setEnum(data);
      setText("");
    }, [data])
  );
  return (
    <View style={styles.container}>
      <PoppinText>
        {index + 1}. {question}
      </PoppinText>
      <View style={styles.inputContainer}>
        <TextInput
          label="Sagot"
          value={text}
          onChangeText={(text) => {
            setText(text);
            setAnswer(text);
          }}
          mode={"outlined"}
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