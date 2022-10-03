import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { Choice } from "../../models/GameQuestion";
import { PoppinQuestiobText } from "../StyledText";

interface IProps {
  data: Choice;
  onSelected: () => void;
  selected: boolean;
}

export default function ChoiceCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, onSelected, selected } = props;
  const { answer, choice, description, image } = data;

  return (
    <TouchableOpacity onPress={onSelected}>
      <View
        style={[
          styles.container,
          selected && { borderColor: DefaultColor.yellow },
        ]}
      >
        <PoppinQuestiobText>
          {choice}. {description}
        </PoppinQuestiobText>
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: DefaultColor.white,
    borderWidth: 5,
    borderColor: DefaultColor.main,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
