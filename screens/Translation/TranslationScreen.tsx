import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";
import {
  PoppinQuestiobText,
  PoppinText,
  PoppinTextBold,
} from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import TRANSLATION from "../../data/TRANSLATION";
import Translation from "../../models/Translation";
import Modal from "react-native-modal";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function TranslationScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [words, setWords] = useState<Array<Translation>>([]);
  const [word, setWord] = useState<Translation | undefined>(undefined);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [text, setText] = useState("");

  const handleGetWords = (query?: string) => {
    if (query) {
      setLoading(true);
      setWords(
        TRANSLATION().filter((data: Translation) => data.word.includes(query))
      );
    } else {
      setWords(TRANSLATION());
    }
    setLoading(false);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleGetWord = (data: Translation) => {
    setWord(data);
    toggleModal();
  };

  useFocusEffect(
    useCallback(() => {
      handleGetWords();
    }, [])
  );

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            label="Search Word"
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
            mode={"outlined"}
            onEndEditing={() => {
              handleGetWords(text);
            }}
          />
          <View style={{ flex: 0, flexDirection: "row", marginTop: 5 }}>
            <TouchableOpacity
              style={[
                styles.searchBtn,
                { backgroundColor: DefaultColor.pink, marginRight: 10 },
              ]}
              onPress={() => {
                handleGetWords(text);
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="search" size={24} />
                <PoppinText>Search</PoppinText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.searchBtn,
                { backgroundColor: DefaultColor.danger },
              ]}
              onPress={() => {
                handleGetWords();
                setText("");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <PoppinText style={{ color: DefaultColor.white }}>
                  Clear
                </PoppinText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.scrollStyle}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {words.length > 0 &&
              words.map((data: Translation) => (
                <ListItem
                  key={data.pk}
                  bottomDivider
                  hasTVPreferredFocus={undefined}
                  tvParallaxProperties={undefined}
                  onPress={() => {
                    handleGetWord(data);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>{data.word}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron tvParallaxProperties />
                </ListItem>
              ))}
          </ScrollView>
        </View>
        {word && (
          <Modal
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
                    color: DefaultColor.main,
                  }}
                >
                  TRANSLATION
                </PoppinTextBold>
                <PoppinQuestiobText>Word: {word.word}</PoppinQuestiobText>
                <PoppinQuestiobText>
                  Translation: {word.translation}
                </PoppinQuestiobText>
                {word.description && word.description.length > 0 && (
                  <PoppinQuestiobText>
                    Description: {word.description}
                  </PoppinQuestiobText>
                )}
              </View>
              <Pressable onPress={toggleModal} style={styles.closeContainer}>
                <PoppinText
                  style={{
                    fontFamily: "poppins-regular",
                    fontSize: 14,
                    color: DefaultColor.white,
                  }}
                >
                  CLOSE
                </PoppinText>
              </Pressable>
            </View>
          </Modal>
        )}
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    padding: 10,
    margin: 10,
  },
  searchBtn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: DefaultColor.white,
  },
  scrollStyle: {
    flex: 1,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: DefaultColor.danger,
    overflow: "hidden",
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
    minHeight: Dimensions.get("screen").height * 0.2,
    maxHeight: Dimensions.get("screen").height * 0.5,
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
    padding: 10,
  },
});
