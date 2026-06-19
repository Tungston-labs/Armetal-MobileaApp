import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PunchinStack from "./PunchinStack";
import CalendarScreen from "../screens/calendar-screen";
import LeaveStack from "./LeaveStack";
import TaskUpdateScreen from "../screens/TaskUpdate-screen";
import ReimbursementStack from "./ReimbursementStack";

import HomeIcon from "../../assets/images/home.svg";
import CalendarIcon from "../../assets/images/calendar.svg";
import FileIcon from "../../assets/images/filr.svg";
import FolderIcon from "../../assets/images/folder.svg";
import BillIcon from "../../assets/images/bill.svg";

const Tab = createBottomTabNavigator();
const ICON_SIZE = 35;

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: false,
        tabBarShowLabel: false,
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={1}
            style={props.style}
          />
        ),
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom,
          left: 0,
          right: 0,
          backgroundColor: "#172554",
          borderTopWidth: 1,
          borderTopColor: "rgb(108, 109, 112)",
          height: 70,
          paddingTop: 15,
          paddingBottom: 0,

        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },
      }}
    >
      <Tab.Screen
        name="PunchinStack"
        component={PunchinStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 28,
                backgroundColor: focused ? "#3352BA" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 28,
                backgroundColor: focused ? "#3352BA" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CalendarIcon width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="LeaveStack"
        component={LeaveStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 28,
                backgroundColor: focused ? "#3352BA" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FileIcon width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="TaskUpdateScreen"
        component={TaskUpdateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 28,
                backgroundColor: focused ? "#3352BA" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FolderIcon width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ReimbursementStack"
        component={ReimbursementStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 28,
                backgroundColor: focused ? "#3352BA" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BillIcon width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}