import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { PoppinTextBold } from "../../components/StyledText";
import { CategoryCard } from "../../components/Category";
import { DefaultColor } from "../../constants/Colors";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();


  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../../assets/mp3/music.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    sound.setIsLoopingAsync(true);
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      playSound();
    } else {
      if (sound != null) {
        sound.stopAsync();
      }
    }

    return () => {
      focus
    }
  }, [focus])


  return (
    <ViewWithLoading loading={loading}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <PoppinTextBold>CATEGORYA</PoppinTextBold>
          <CategoryCard
            onPress={() => {
              navigation.navigate("Amun");
            }}
            source={require("../../assets/lottie/115619-learning-english.json")}
            title="AMUN"
            style={{
              backgroundColor: DefaultColor.danger,
            }}
          />
          <CategoryCard
            onPress={() => {
              navigation.navigate("Leksyon");
            }}
            source={require("../../assets/lottie/61281-class-board.json")}
            title="LEKSYON"
            style={{
              backgroundColor: DefaultColor.brown,
            }}
          />
          <CategoryCard
            onPress={() => {
              navigation.navigate("Exam");
            }}
            source={require("../../assets/lottie/72170-books.json")}
            title="PAGSUSULIT"
            style={{
              backgroundColor: DefaultColor.pink,
            }}
          />
          <CategoryCard
            onPress={() => {
              navigation.navigate("Translation");
            }}
            source={require("../../assets/lottie/8852-searching-for-word.json")}
            title="TRANSLATION"
            style={{
              backgroundColor: DefaultColor.dark,
            }}
          />
        </View>
      </ScrollView>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lottieContainer: {
    minHeight: 200,
    width: "100%",
  },
});
