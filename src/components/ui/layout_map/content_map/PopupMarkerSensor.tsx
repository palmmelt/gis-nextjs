"use client";
import { useMenu } from "@/contexts/MenuContext";
import React, { useState } from "react";

interface PopupMarkerSensorProps {
    markerValue: number;
    markerName: string;
  }
type Props = {};

function PopupMarkerSensor({
  markerValue,
  markerName,
}: {
  markerValue: number;
  markerName: string;
}) {
//   const { controlMonitor, toggleSubdataStatus } = useMenu();

  return (
    <div>
      {markerName}
      ระดับน้ำ {markerValue}
    </div>
  );
}

export default PopupMarkerSensor;
