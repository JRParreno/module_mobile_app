import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { DefaultColor } from "../../constants/Colors";
import Enumeration from "../../models/Enumeration";
import { PoppinText } from "../StyledText";
import Video from 'react-native-video';
import ModalViewLocalImage from "../Modal/ModalViewLocalImage";

interface IProps {
  data: Enumeration;
  index: number;
  setEnum: (_: Enumeration) => void;
  setAnswer: (_: string) => void;
}

export default function EnumerationCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [visibleImage, setVisibleImage] = useState(false);

  const { data, index, setAnswer, setEnum } = props;
  const { activity_pk, answer, pk, question, direction, question_image, question_video } = data;

  useFocusEffect(
    useCallback(() => {
      setEnum(data);
      setText("");
    }, [data])
  );

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
        <TouchableOpacity
          onPress={() => {
            setVisibleImage(true);
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={question_image}
              height={"100%"}
              width={"100%"}
              resizeMode={"contain"}
              style={{ borderWidth: 1, flex: 1, height: "100%", width: "100%" }}
            />
          </View>
        </TouchableOpacity>
      }

      {
        question_video != undefined &&
        <View style={styles.video}>
          <Video
            style={styles.video}
            source={question_video}
            controls
            resizeMode="contain"
            fullscreen={true}
          />
        </View>
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
        {
          question_image &&
          <ModalViewLocalImage
            title="Image"
            uri={question_image}
            visible={visibleImage}
            onClose={() => {
              setVisibleImage(false);
            }}
          />
        }

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
    height: 200,
    borderWidth: 1,
  },
  imageContainer: {
    flex: 1,
    height: 200,
    borderWidth: 2,
    borderColor: DefaultColor.pink,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    marginVertical: 10,
  },
});
