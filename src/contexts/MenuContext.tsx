import React, { createContext, useContext, useState, ReactNode } from "react";

import { GiPipes } from "react-icons/gi";
import { MdSensors } from "react-icons/md";
import { RiLineHeight } from "react-icons/ri";
import { GiFlowerTwirl } from "react-icons/gi";
import { GiRoughWound } from "react-icons/gi";
import { GiDam } from "react-icons/gi";
import { MdAmpStories } from "react-icons/md";
import { FaArrowUpFromGroundWater } from "react-icons/fa6";

import pipelineChan from "@/data/chanthaburi/pipeline/PipelineCHAN";
import ct from "@/data/chanthaburi/ct/CT5m_543449216";
import flowdirection from "@/data/chanthaburi/flowdirection/FlowDirectionCHAN5km";
import roughness from "@/data/chanthaburi/roughness/Roughness5m";
import damchan from "@/data/chanthaburi/dam/DAM_CHAN";
import flowdampoint from "@/data/chanthaburi/water-receiving-point/FlowDAM_Point";

import subdam from "@/data/chanthaburi/water-receiving-point/Sub_Sensor_Dam_Sirithan";

// sensor
import sensorDamSirithan from "@/data/chanthaburi/sensor/Sensor_Dam_Sirithan";

// กำหนดชนิดข้อมูล (types) สำหรับเมนู
interface MenuItem {
  id: number;
  name: string;
  status: boolean;
  icon: JSX.Element;
  data?: {
    name: string;
    status: boolean;
    data: any;
    subdata?:any
  }[];
}

// กำหนดชนิดข้อมูลสำหรับค่า Context
interface MenuContextType {
  controlMonitor: MenuItem[];
  handleControlChange: (index: number) => void;
  toggleDataStatus: (itemIndex: number, dataIndex: number) => void;
  toggleSubdataStatus:(controlIndex: number, subdataIndex: number) => void;
}

// สร้าง Context ใหม่ด้วยค่าเริ่มต้นเป็น undefined
const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [controlMonitor, setControlMonitor] = useState<MenuItem[]>([
    {
      id: 0,
      name: "แนวท่อ",
      status: false,
      icon: <GiPipes />,
      data: [
        {
          name: "ท่อน้ำจันทบุรี",
          status: false,
          data: pipelineChan,
        },
      ],
    },
    {
      id: 1,
      name: "เซนเซอร์",
      status: false,
      icon: <MdSensors />,
      data: [
        {
          name: "อ่างเก็บน้ำเขื่อนคิริธาร",
          status: false,
          data: sensorDamSirithan,
          subdata:{
            status: false,
            data:subdam
          }
        },
      ],
    },
    {
      id: 2,
      name: "เส้นชั้นความสูง",
      status: false,
      icon: <RiLineHeight />,
      data: [
        {
          name: "เขาซาก",
          status: false,
          data: ct,
        },
      ],
    },
    {
      id: 3,
      name: "ทิศทางการไหลน้ำ",
      status: false,
      icon: <GiFlowerTwirl />,
      data: [
        {
          name: "จันทบุรี 5 เมตร",
          status: false,
          data: flowdirection,
        },
      ],
    },
    {
      id: 4,
      name: "ความหยาบพื้นผิว",
      status: false,
      icon: <GiRoughWound />,
      data: [
        {
          name: "บริเวณเขาซาก",
          status: false,
          data: roughness,
        },
      ],
    },
    {
      id: 5,
      name: "เขื่อน",
      status: false,
      icon: <GiDam />,
      data: [
        {
          name: "อ่างเก็บน้ำเขื่อนคิริธาร",
          status: false,
          data: damchan,
        },
      ],
    },
    // {
    //   id: 6,
    //   name: "บริเวณเขื่อน",
    //   status: false,
    //   icon: <MdAmpStories />,
    // },
    {
      id: 6,
      name: "จุดรับน้ำ",
      status: false,
      icon: <FaArrowUpFromGroundWater />,
      data: [
        {
          name: "จุดรับน้ำจันทบุรี",
          status: false,
          data: flowdampoint,
        },
      ],
    },
  ]);

  const toggleSubdataStatus = (controlIndex: number, subdataIndex: number) => {
    setControlMonitor(prevState =>
      prevState.map((control, index) => {
        if (index === controlIndex) {
          return {
            ...control,
            data: control.data?.map((item, subIndex) => {
              if (subIndex === subdataIndex) {
                return {
                  ...item,
                  subdata: {
                    ...item.subdata,
                    status: !item.subdata?.status // Toggle status
                  }
                };
              }
              return item;
            })
          };
        }
        return control;
      })
    );
  };

  const handleControlChange = (index: number) => {
    setControlMonitor((prevState) =>
      prevState.map((control, i) => ({
        ...control,
        status: i === index ? true : false,
      }))
    );
  };

  const toggleDataStatus =
    (itemIndex: number, dataIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setControlMonitor((prevState) => {
        return prevState.map((item, i) => {
          if (i === itemIndex && item.data) {
            const updatedData = item.data.map((data, j) => {
              if (j === dataIndex) {
                return { ...data, status: !data.status };
              }
              return data;
            });

            return { ...item, data: updatedData };
          }
          return item;
        });
      });
    };

  return (
    <MenuContext.Provider
      value={{ controlMonitor, handleControlChange, toggleDataStatus,toggleSubdataStatus }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
