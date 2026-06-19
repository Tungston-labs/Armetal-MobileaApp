import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LeaveAllScreen from "../screens/LeaveAll-screen";
import LeaveApproveScreen from "../screens/LeaveApprove-screen";
import LeaveRejectedScreen from "../screens/LeaveRejected-screen";
import LeavePendingScreen from "../screens/LeavePending-screen";
// import LeaveRequestFormScreen from "../screens/LeaveRequestForm-screen";
import RequestApprovedScreen from "../screens/RequesrApproved-screen";
import RequestPending from "../screens/RequestPending-screen";
import RequestRejected from "../screens/RequestRejected-screen";

const Stack = createNativeStackNavigator();

export default function LeaveStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeaveAllScreen" component={LeaveAllScreen} />
      <Stack.Screen name="LeaveApproveScreen" component={LeaveApproveScreen} />
      <Stack.Screen name="LeaveRejectedScreen" component={LeaveRejectedScreen} />
      <Stack.Screen name="LeavePendingScreen" component={LeavePendingScreen} />
      {/* <Stack.Screen
        name="LeaveRequestFormScreen"
        component={LeaveRequestFormScreen}
      /> */}
      <Stack.Screen
        name="RequestApprovedScreen"
        component={RequestApprovedScreen}
      />
      <Stack.Screen name="RequestPending" component={RequestPending} />
      <Stack.Screen name="RequestRejected" component={RequestRejected} />
    </Stack.Navigator>
  );
}