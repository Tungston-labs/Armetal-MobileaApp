import React from "react";
import RegularisationList from "../RegularisationListScreen";

const data = [
  {
    id: 1,
    type: "Late Punch In",
    date: "18-06-2026",
    reason: "Bus breakdown",
    status: "Approved",
  },
];

export default function RegularisationApproveScreen() {
  return <RegularisationList data={data} />;
}