// // BottomNavbar.js
// import React from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import styles from './styles';

// // Import SVGs
// import HomeIcon from '../../../assets/images/home.svg';
// import CalendarIcon from '../../../assets/images/calendar.svg';
// import FileIcon from '../../../assets/images/filr.svg';   // ✅ actual filename is filr.svg
// import FolderIcon from '../../../assets/images/folder.svg';
// import BillIcon from '../../../assets/images/bill.svg';

// const ICON_SIZE = 35; // Increased size for better visibility

// const BottomNavbar = ({ navigation, route }) => {
//   return (
//     <View style={styles.bottomTab}>
//       {/* Punchin */}
//       <TouchableOpacity onPress={() => navigation.navigate('PunchinScreen')}>
//         <View
//           style={
//             route.name === 'PunchinScreen'
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <HomeIcon width={ICON_SIZE} height={ICON_SIZE}  />
//         </View>
//       </TouchableOpacity>

//       {/* Calendar */}
//       <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
//         <View
//           style={
//             route.name === 'CalendarScreen'
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           } 
//         >
//           <CalendarIcon width={ICON_SIZE} height={ICON_SIZE}  />
//         </View>
//       </TouchableOpacity>

//       {/* Leave */}
//       <TouchableOpacity onPress={() => navigation.navigate('LeaveAllScreen')}>
//         <View
//           style={
//             route.name === 'LeaveAllScreen'
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <FileIcon width={ICON_SIZE} height={ICON_SIZE}  />
//         </View>
//       </TouchableOpacity>

//       {/* Task Update */}
//       <TouchableOpacity onPress={() => navigation.navigate('TaskUpdateScreen')}>
//         <View
//           style={
//             route.name === 'TaskUpdateScreen'
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <FolderIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
//         </View>
//       </TouchableOpacity>

//       {/* Reimbursement */}
//       <TouchableOpacity
//         onPress={() => navigation.navigate('ReimbursementlistScreen')}
//       >
//         <View
//           style={
//             route.name === 'ReimbursementlistScreen'
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <BillIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BottomNavbar;


// import React from "react";
// import { View, TouchableOpacity } from "react-native";
// import styles from "./styles";

// // Import SVGs
// import HomeIcon from "../../../assets/images/home.svg";
// import CalendarIcon from "../../../assets/images/calendar.svg";
// import FileIcon from "../../../assets/images/filr.svg";
// import FolderIcon from "../../../assets/images/folder.svg";
// import BillIcon from "../../../assets/images/bill.svg";

// const ICON_SIZE = 35;

// const BottomNavbar = ({ navigation, route }) => {
//   const routeName = route?.name;

//   const isHomeActive = [
//     "PunchinScreen",
//     "AttendanceScreen",
//     "WorkingDaySummary",
//   ].includes(routeName);

//   const isCalendarActive = routeName === "CalendarScreen";

//   const isLeaveActive = [
//     "LeaveAllScreen",
//     "LeaveApproveScreen",
//     "LeaveRejectedScreen",
//     "LeaveRequestFormScreen",
//     ""
//   ].includes(routeName);

//   const isTaskActive = routeName === "TaskUpdateScreen";

//   const isReimbursementActive = [
//     "ReimbursementScreen",
//     "ReimbursementlistScreen",
//     "ReimbursementForm",
//   ].includes(routeName);

//   return (
//     <View style={styles.bottomTab}>
//       <TouchableOpacity onPress={() => navigation.navigate("PunchinScreen")}>
//         <View style={isHomeActive ? styles.tabIconActive : styles.tabIconNormal}>
//           <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("CalendarScreen")}>
//         <View
//           style={isCalendarActive ? styles.tabIconActive : styles.tabIconNormal}
//         >
//           <CalendarIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("LeaveAllScreen")}>
//         <View style={isLeaveActive ? styles.tabIconActive : styles.tabIconNormal}>
//           <FileIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("TaskUpdateScreen")}>
//         <View style={isTaskActive ? styles.tabIconActive : styles.tabIconNormal}>
//           <FolderIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => navigation.navigate("ReimbursementlistScreen")}
//       >
//         <View
//           style={isReimbursementActive ? styles.tabIconActive : styles.tabIconNormal}
//         >
//           <BillIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BottomNavbar;

// import React from "react";
// import { View, TouchableOpacity } from "react-native";
// import styles from "./styles";

// import HomeIcon from "../../../assets/images/home.svg";
// import CalendarIcon from "../../../assets/images/calendar.svg";
// import FileIcon from "../../../assets/images/filr.svg";
// import FolderIcon from "../../../assets/images/folder.svg";
// import BillIcon from "../../../assets/images/bill.svg";

// const ICON_SIZE = 35;

// const BottomNavbar = ({ navigation, activeTab, setActiveTab }) => {
//   return (
//     <View style={styles.bottomTab}>
//       <TouchableOpacity
//         onPress={() => setActiveTab("PunchinScreen")}
//       >
//         <View
//           style={
//             activeTab === "PunchinScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("CalendarScreen")}
//       >
//         <View
//           style={
//             activeTab === "CalendarScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <CalendarIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("LeaveAllScreen")}
//       >
//         <View
//           style={
//             activeTab === "LeaveAllScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <FileIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("TaskUpdateScreen")}
//       >
//         <View
//           style={
//             activeTab === "TaskUpdateScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <FolderIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("ReimbursementlistScreen")}
//       >
//         <View
//           style={
//             activeTab === "ReimbursementlistScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <BillIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BottomNavbar;


// import React from "react";
// import { View, TouchableOpacity } from "react-native";
// import styles from "./styles";

// import HomeIcon from "../../../assets/images/home.svg";
// import CalendarIcon from "../../../assets/images/calendar.svg";
// import FileIcon from "../../../assets/images/filr.svg";
// import FolderIcon from "../../../assets/images/folder.svg";
// import BillIcon from "../../../assets/images/bill.svg";

// const ICON_SIZE = 35;

// const BottomNavbar = ({ navigation, activeTab, setActiveTab }) => {
//   return (
//     <View style={styles.bottomTab}>
//       <TouchableOpacity
//         onPress={() => setActiveTab("PunchinScreen")}
//       >
//         <View
//           style={
//             activeTab === "PunchinScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("CalendarScreen")}
//       >
//         <View
//           style={
//             activeTab === "CalendarScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <CalendarIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("LeaveAllScreen")}
//       >
//         <View
//           style={
//             activeTab === "LeaveAllScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <FileIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("TaskUpdateScreen")}
//       >
//         <View
//           style={
//             activeTab === "TaskUpdateScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <FolderIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={() => setActiveTab("ReimbursementlistScreen")}
//       >
//         <View
//           style={
//             activeTab === "ReimbursementlistScreen"
//               ? styles.tabIconActive
//               : styles.tabIconNormal
//           }
//         >
//           <BillIcon width={ICON_SIZE} height={ICON_SIZE} />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BottomNavbar;


import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";

import HomeIcon from "../../../assets/images/home.svg";
import CalendarIcon from "../../../assets/images/calendar.svg";
import FileIcon from "../../../assets/images/filr.svg";
import FolderIcon from "../../../assets/images/folder.svg";
import BillIcon from "../../../assets/images/bill.svg";

const ICON_SIZE = 35;

const BottomNavbar = ({ navigation, activeTab, setActiveTab, currentScreen }) => {
  // Auto-detect and set active tab based on current screen
  useEffect(() => {
    if (
      currentScreen === "PunchinScreen" ||
      currentScreen === "AttendanceScreen" ||
      currentScreen === "WorkingDaySummaryScreen"
    ) {
      setActiveTab("PunchinScreen");
    } else if (
      currentScreen === "CalendarScreen"
    ) {
      setActiveTab("CalendarScreen");
    } else if (
      currentScreen === "LeaveAllScreen" ||
      currentScreen === "LeaveRejectedScreen" ||
      currentScreen === "LeavePendingScreen" ||
      currentScreen === "LeaveApprovalScreen" ||
      currentScreen === "LeaveRequestForm"
    ) {
      setActiveTab("LeaveAllScreen");
    } else if (
      currentScreen === "TaskUpdateScreen"
    ) {
      setActiveTab("TaskUpdateScreen");
    } else if (
      currentScreen === "ReimbursementlistScreen" ||
      currentScreen === "ReimbursementFormScreen"
    ) {
      setActiveTab("ReimbursementlistScreen");
    }
  }, [currentScreen]);

  return (
    <View style={styles.bottomTab}>
      {/* Home */}
      <TouchableOpacity onPress={() => setActiveTab("PunchinScreen")}>
        <View
          style={
            activeTab === "PunchinScreen"
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <HomeIcon width={ICON_SIZE} height={ICON_SIZE} />
        </View>
      </TouchableOpacity>

      {/* Calendar */}
      <TouchableOpacity onPress={() => setActiveTab("CalendarScreen")}>
        <View
          style={
            activeTab === "CalendarScreen"
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <CalendarIcon width={ICON_SIZE} height={ICON_SIZE} />
        </View>
      </TouchableOpacity>

      {/* Leave */}
      <TouchableOpacity onPress={() => setActiveTab("LeaveAllScreen")}>
        <View
          style={
            activeTab === "LeaveAllScreen"
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <FileIcon width={ICON_SIZE} height={ICON_SIZE} />
        </View>
      </TouchableOpacity>

      {/* Task */}
      <TouchableOpacity onPress={() => setActiveTab("TaskUpdateScreen")}>
        <View
          style={
            activeTab === "TaskUpdateScreen"
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <FolderIcon width={ICON_SIZE} height={ICON_SIZE} />
        </View>
      </TouchableOpacity>

      {/* Reimbursement */}
      <TouchableOpacity onPress={() => setActiveTab("ReimbursementlistScreen")}>
        <View
          style={
            activeTab === "ReimbursementlistScreen"
              ? styles.tabIconActive
              : styles.tabIconNormal
          }
        >
          <BillIcon width={ICON_SIZE} height={ICON_SIZE} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavbar;
