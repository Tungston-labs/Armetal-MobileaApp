import React from "react";
import RegularisationList from "../RegularisationListScreen";

const data = [
  {
    id: 1,
    type: "Late Punch In",
    date: "22-06-2026",
    reason: "Traffic due to heavy rain",
    status: "Pending",
  },
  {
    id: 2,
    type: "Missed Punch Out",
    date: "20-06-2026",
    reason: "Forgot to punch out",
    status: "Pending",
  },
];

export default function RegularisationPendingScreen() {
  return <RegularisationList data={data} />;
}