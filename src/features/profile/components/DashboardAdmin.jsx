import { color } from "motion";
import { useEffect } from "react";
import { Area, AreaChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const DashboardAdmin = () => {
  const data01 = [
    { name: "January", value: 50, age: 21 },
    { name: "February", value: 80, age: 25 },
    { name: "March", value: 70, age: 35 },
    { name: "April", value: 42, age: 25 },
    { name: "May", value: 52, age: 15 },
    { name: "June", value: 70, age: 21 },
    { name: "July", value: 45, age: 18 },
    { name: "August", value: 35, age: 50 },
    { name: "September", value: 40, age: 25 },
    { name: "October", value: 85, age: 32 },
    { name: "November", value: 60, age: 48 },
    { name: "December", value: 45, age: 31 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        minWidth: "100px",
      }}
    >
      <AreaChart
        data={data01}
        width={"100%"}
        height={"100%"}
        margin={{ top: 10, right: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#202020" />
            <stop offset="40%" stopColor="#5c5c5c" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient id="areaGradient" amplitude={10}>
            <stop offset="100%" stopColor="#fcfcfc2f" />
          </linearGradient>
        </defs>
        <defs>
          <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="6"
              floodColor="#7c3aed"
              floodOpacity="1"
            />
          </filter>
        </defs>

        <XAxis xAxisId={"ageId"} dataKey={"value"} stroke="#6464645e"  />
        <YAxis />
        <Area
          fill="url(#areaGradient)"
          stroke="url(#lineGradient)"
          type="basis"
          activeDot={{ stroke: "gray", r: 2 }}
          dataKey="value"
        />

        <Area
          type="basis"
          dataKey="age"
          fill="url(#areaGradient)"
          stroke="url(#lineGradient)"
          activeDot={{ stroke: "gray", r: 2 }}
        />

        {/* <Tooltip contentStyle={{color: "black", textTransform: "capitalize"}} /> */}
        <Tooltip content={MiTooltip} />
      </AreaChart>
    </div>
  );
};

const MiTooltip = ({ active, payload, label }) => {
  if (!active && payload.length === 0) return;

  const estilos = {
    // backgroundColor: "#f85151",
    backgroundColor: "#0000007c",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    flexDirection: "column",
    color: "#f8f8f8",
    fontSize: "14px",
    border: "1px solid #fff",
  };

  return (
    <div className="flex-center" style={estilos}>
      <span style={{fontWeight: 700, color: "#fdfdfd", textDecoration: "underline"}} >{payload[0].payload.name}</span>
      <p>Value: {payload[0].payload.value}</p>
      <p>Age: {payload[0].payload.age}</p>
    </div>
  );
};

export default DashboardAdmin;
