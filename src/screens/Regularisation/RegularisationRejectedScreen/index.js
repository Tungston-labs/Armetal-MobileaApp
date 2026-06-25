import React from "react";
import RegularisationList from "../RegularisationListScreen";

const data = [
  {
    id: 1,
    type: "Missed Punch In",
    date: "15-06-2026",
    reason: "Forgot to punch in",
    status: "Rejected",
  },
];

export default function RegularisationRejectedScreen() {
  return <RegularisationList data={data} />;
}