import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

// import screens
import LoginScreen from "../screens/login-screen";
import DepartmentScreen from "../screens/department-screen";
import PunchinScreen from "../screens/punch-in-screen";
import PunchOutSuccessScreen from "../screens/punchOut-success-screen";
import AttendanceScreen from "../screens/Attendance-screen";
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
import SplashScreen from "../screens/splash-screen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import WorkingDaySummary from "../screens/WorkingDaySummary-screen";
import ReimbursementScreen from "../screens/Reimbursement-screen";
import ReimbursementlistScreen from "../screens/reimbursements-list-screen";
import ReimbursementForm from "../screens/ReimbursementForm-screen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { accessToken, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash / Auth loading screen */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />

          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PunchinScreen" component={PunchinScreen} />

        {/* Other screens */}
        <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
        <Stack.Screen
          name="PunchOutSuccessScreen"
          component={PunchOutSuccessScreen}
        />
        <Stack.Screen name="DepartmentScreen" component={DepartmentScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="LeaveAllScreen" component={LeaveAllScreen} />
        <Stack.Screen
          name="LeaveApproveScreen"
          component={LeaveApproveScreen}
        />
        <Stack.Screen
          name="LeaveRejectedScreen"
          component={LeaveRejectedScreen}
        />
        <Stack.Screen
          name="LeavePendingScreen"
          component={LeavePendingScreen}
        />
        <Stack.Screen
          name="LeaveRequestFormScreen"
          component={LeaveRequestFormScreen}
        />
        <Stack.Screen
          name="RequestApprovedScreen"
          component={RequestApprovedScreen}
        />
        <Stack.Screen name="LeaveHeader" component={LeaveHeader} />
        <Stack.Screen name="RequestPending" component={RequestPending} />
        <Stack.Screen name="RequestRejected" component={RequestRejected} />
        <Stack.Screen name="TaskUpdateScreen" component={TaskUpdateScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SalarySlipScreen" component={SalarySlipScreen} />
        <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen
          name="SetNewPasswordScreen"
          component={SetNewPasswordScreen}
        />
        <Stack.Screen
          name="CreateNewPasswordScreen"
          component={CreateNewPasswordScreen}
        />
        <Stack.Screen name="TaskModal" component={TaskModal} />
        <Stack.Screen name="FullImageViewer" component={FullImageViewer} />
        <Stack.Screen name="WorkingDaySummary" component={WorkingDaySummary} />
        <Stack.Screen
          name="ReimbursementScreen"
          component={ReimbursementScreen}
        />
        <Stack.Screen
          name="ReimbursementlistScreen"
          component={ReimbursementlistScreen}
        />
        <Stack.Screen name="ReimbursementForm" component={ReimbursementForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
