
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PunchinScreen from "../screens/punch-in-screen";
import AttendanceScreen from "../screens/Attendance-screen";
import WorkingDaySummary from "../screens/WorkingDaySummary-screen";
import PunchOutSuccessScreen from "../screens/punchOut-success-screen";
import DepartmentScreen from "../screens/department-screen";

const Stack = createNativeStackNavigator();

export default function PunchinStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PunchinScreen"
        component={PunchinScreen}
      />
       <Stack.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
      />
      <Stack.Screen
        name="WorkingDaySummary"
        component={WorkingDaySummary}
      />
      <Stack.Screen
        name="PunchOutSuccessScreen"
        component={PunchOutSuccessScreen}
      />
     
    </Stack.Navigator>
  );
}