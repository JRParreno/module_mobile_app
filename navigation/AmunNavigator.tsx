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
  );
}
