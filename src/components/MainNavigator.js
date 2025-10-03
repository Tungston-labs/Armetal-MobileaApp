// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';

// // Import your screens
// import PunchinScreen from '../screens/punch-in-screen';
// import CalendarScreen from '../screens/calendar-screen';
// import LeaveAllScreen from '../screens/LeaveAll-screen';
// import TaskUpdateScreen from '../screens/TaskUpdate-screen';
// import ReimbursementlistScreen from '../screens/Reimbursement-screen';

// import BottomNavbar from '../screens/BottomNavbar';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBar={(props) => <BottomNavbar {...props} />}  // ✅ inject custom navbar
//         screenOptions={{
//           headerShown: false,
//           lazy: false,          // preload all tabs
//           unmountOnBlur: false, // keep screens in memory
//         }}
//       >
//         <Tab.Screen name="PunchinScreen" component={PunchinScreen} />
//         <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
//         <Tab.Screen name="LeaveAllScreen" component={LeaveAllScreen} />
//         <Tab.Screen name="TaskUpdateScreen" component={TaskUpdateScreen} />
//         <Tab.Screen name="ReimbursementlistScreen" component={ReimbursementlistScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import PunchinScreen from '../screens/punch-in-screen';
import CalendarScreen from '../screens/calendar-screen';
import LeaveAllScreen from '../screens/LeaveAll-screen';
import TaskUpdateScreen from '../screens/TaskUpdate-screen';
import ReimbursementlistScreen from '../screens/Reimbursement-screen';

import BottomNavbar from '../screens/BottomNavbar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <BottomNavbar {...props} />}  // ✅ inject custom navbar
        screenOptions={{
          headerShown: false,
          lazy: false,          // preload all tabs
          unmountOnBlur: false, // keep screens in memory
        }}
      >
        <Tab.Screen name="PunchinScreen" component={PunchinScreen} />
        <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
        <Tab.Screen name="LeaveAllScreen" component={LeaveAllScreen} />
        <Tab.Screen name="TaskUpdateScreen" component={TaskUpdateScreen} />
        <Tab.Screen name="ReimbursementlistScreen" component={ReimbursementlistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
