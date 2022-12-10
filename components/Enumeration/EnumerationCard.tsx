import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { DefaultColor } from "../../constants/Colors";
import Enumeration from "../../models/Enumeration";
import { PoppinText } from "../StyledText";
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

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
  const { activity_pk, answer, pk, question, direction, question_image, question_video } = data;

  useFocusEffect(
    useCallback(() => {
      setEnum(data);
      setText("");
    }, [data])
  );

  console.log(data);
  return (
    <View style={styles.container}>
      {direction &&
        <PoppinText>
          {direction}
        </PoppinText>
      }
      <PoppinText>
        {index + 1}. {question ? question : "Question"}
      </PoppinText>

      {
        question_image != undefined &&
        <View style={styles.imageContainer}>
          <Image
            source={question_image}
            height={"100%"}
            width={"100%"}
          />
        </View>
      }

      {
        question_video != undefined &&
        <Video
          style={styles.video}
          source={{
            uri: question_video,
          }}
          useNativeControls
          isLooping
        />
      }

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
  video: {
    flex: 1,
  },
  imageContainer: {
    flex: 0,
    height: 200,
    borderWidth: 2,
    borderColor: DefaultColor.pink,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    marginVertical: 10,
  },
});
