import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AmunStackParamList } from "../types";
import { AmunHomeScreen, GameScreen } from "../screens/Amun";
import { Ionicons } from "@expo/vector-icons";
import { DefaultColor } from "../constants/Colors";
import { ColorSchemeName, Pressable, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { PoppinText } from "../components/StyledText";
import { Switch } from "react-native-elements";
import { useCallback, useState } from "react";
import { Audio } from 'expo-av';
import { useFocusEffect } from "@react-navigation/native";

const Stack = createNativeStackNavigator<AmunStackParamList>();

export default function AmunNavigator() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [musicChecked, setMusicChecked] = useState(true);
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/mp3/music.mp3')
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

  useFocusEffect(
    useCallback(
      () => {
        playSound();
      },
      [],
    )

  );

  const toggleMusicSwitch = () => {
    if (!musicChecked) {
      playSound();
    } else {
      if (sound != null)
        sound.stopAsync();
    }
    setMusicChecked(!musicChecked);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: true,
          headerRight: () => (
            <Pressable
              onPress={async () => {
                // await AsyncStorage.multiRemove(["skipLanding"]);
                toggleModal();
              }}
            >
              <Ionicons name="settings" size={26} />
            </Pressable>
          ),
          headerBackTitleVisible: false,
          title: "",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: DefaultColor.main },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="AmunHome" component={AmunHomeScreen} />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={(nav) => ({
            title: nav.route.params.amun.title,
          })}
        />
      </Stack.Navigator>
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
          <View style={styles.listContainer}>
            <PoppinText>Music</PoppinText>
            <Switch
              value={musicChecked}
              onValueChange={toggleMusicSwitch}
            />
          </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: DefaultColor.white,
    minHeight: 100,
    padding: 20,
    borderWidth: 1,
    borderColor: DefaultColor.white,
    borderRadius: 20,
  },
  listContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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