import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AmunStackParamList } from "../types";
import { AmunHomeScreen } from "../screens/Amun";

const Stack = createNativeStackNavigator<AmunStackParamList>();

export default function AmunNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AmunHome" component={AmunHomeScreen} />
    </Stack.Navigator>
  );
}
