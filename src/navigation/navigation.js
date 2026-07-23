import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

// Import screens
import LoginScreen from "../screens/login-screen";
import PunchinScreen from "../screens/punch-in-screen";
import AttendanceScreen from "../screens/Attendance-screen";
import PunchOutSuccessScreen from "../screens/punchOut-success-screen";
import DepartmentScreen from "../screens/department-screen";
import CalendarScreen from "../screens/calendar-screen";
import LeaveAllScreen from "../screens/LeaveAll-screen";
import LeaveApproveScreen from "../screens/LeaveApprove-screen";
import LeaveRejectedScreen from "../screens/LeaveRejected-screen";
import LeavePendingScreen from "../screens/LeavePending-screen";
import LeaveRequestFormScreen from "../screens/LeaveRequestForm-screen";
import RequestApprovedScreen from "../screens/RequesrApproved-screen";
import LeaveHeader from "../screens/LeaveHeader-screen";
import RequestPending from "../screens/RequestPending-screen";
import RequestRejected from "../screens/RequestRejected-screen";
import TaskUpdateScreen from "../screens/TaskUpdate-screen";
import ProfileScreen from "../screens/Profile-screen";
import SalarySlipScreen from "../screens/SalarySlip-screen";
import DocumentsScreen from "../screens/Document-screen";
import ForgotPasswordScreen from "../screens/ForgotPassword-screen";
import VerificationScreen from "../screens/Verification-screen";
import SetNewPasswordScreen from "../screens/SetNewPassword-screen";
import CreateNewPasswordScreen from "../screens/CreateNewPassword-screen";
import TaskModal from "../screens/TaskModal";
import FullImageViewer from "../screens/Document-screen/FullImageViewer";
import WorkingDaySummary from "../screens/WorkingDaySummary-screen";
import ReimbursementScreen from "../screens/Reimbursement-screen";
import ReimbursementlistScreen from "../screens/reimbursements-list-screen";
import ReimbursementForm from "../screens/ReimbursementForm-screen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import BottomTabs from "./BottomTabs"
import LeaveStack from "./LeaveStack";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { accessToken, loading } = useSelector((state) => state.auth);

  // Show splash/loading while restoring session
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {accessToken ? (
          // Authenticated screens
          <>
            <Stack.Screen
      name="MainTabs"
      component={BottomTabs}
    />
            <Stack.Screen
              name="PunchOutSuccessScreen"
              component={PunchOutSuccessScreen}
            />
            <Stack.Screen name="DepartmentScreen" component={DepartmentScreen} />
            <Stack.Screen
              name="LeaveRequestFormScreen"
              component={LeaveRequestFormScreen}
            />
           <Stack.Screen name="LeaveStack" component={LeaveStack} />
            <Stack.Screen name="TaskUpdateScreen" component={TaskUpdateScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="SalarySlipScreen" component={SalarySlipScreen} />
            <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
            <Stack.Screen name="TaskModal" component={TaskModal} />
            <Stack.Screen name="FullImageViewer" component={FullImageViewer} />
            <Stack.Screen
              name="WorkingDaySummary"
              component={WorkingDaySummary}
            />
            <Stack.Screen
              name="ReimbursementScreen"
              component={ReimbursementScreen}
            />
            <Stack.Screen
              name="ReimbursementlistScreen"
              component={ReimbursementlistScreen}
            />
            <Stack.Screen
              name="ReimbursementForm"
              component={ReimbursementForm}
            />
            <Stack.Screen
              name="CreateNewPasswordScreen"
              component={CreateNewPasswordScreen}
            />
          </>
        ) : (
          // Unauthenticated screens
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
            <Stack.Screen
              name="SetNewPasswordScreen"
              component={SetNewPasswordScreen}
            />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
