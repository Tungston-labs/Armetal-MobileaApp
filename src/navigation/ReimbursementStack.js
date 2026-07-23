import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReimbursementlistScreen from "../screens/reimbursements-list-screen";
import ReimbursementScreen from "../screens/Reimbursement-screen";
import ReimbursementForm from "../screens/ReimbursementForm-screen";

const Stack = createNativeStackNavigator();

export default function ReimbursementStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReimbursementlistScreen"
        component={ReimbursementlistScreen}
      />
      <Stack.Screen
        name="ReimbursementScreen"
        component={ReimbursementScreen}
      />
      <Stack.Screen
        name="ReimbursementForm"
        component={ReimbursementForm}
      />
    </Stack.Navigator>
  );
}