import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AmunStackParamList } from "../types";
import { AmunHomeScreen, GameScreen } from "../screens/Amun";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DefaultColor } from "../constants/Colors";

const Stack = createNativeStackNavigator<AmunStackParamList>();

export default function AmunNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Pressable
            onPress={async () => {
              // await AsyncStorage.multiRemove(["skipLanding"]);
            }}
          >
            <Ionicons name="settings" size={26} />
          </Pressable>
        ),
        headerBackTitleVisible: false,
        title: "",
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="AmunHome"
        component={AmunHomeScreen}
        options={(nav) => ({
          headerLeft: () => (
            <View style={{ flex: 0, zIndex: 1, position: "absolute" }}>
              <Pressable
                onPress={async () => {
                  nav.navigation.goBack();
                }}
              >
                <Ionicons name="chevron-back" size={30} color={"#045CC0"} />
              </Pressable>
            </View>
          ),
          headerBackButtonMenuEnabled: true,
        })}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={(nav) => ({
          title: nav.route.params.amun.title,
        })}
      />
    </Stack.Navigator>
  );
}
