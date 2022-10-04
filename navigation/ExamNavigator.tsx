import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExamParamList } from "../types";
import { AmunHomeScreen, GameScreen } from "../screens/Amun";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DefaultColor } from "../constants/Colors";
import { EnumerationScreen, QuarterExamScreen } from "../screens/Exam";

const Stack = createNativeStackNavigator<ExamParamList>();

export default function ExamNavigator() {
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
      <Stack.Screen name="ExamQuarter" component={QuarterExamScreen} />
      <Stack.Screen
        name="ExamView"
        component={EnumerationScreen}
        options={(nav) => ({
          title: "Pagsusulit",
        })}
      />
    </Stack.Navigator>
  );
}
