import React, { useState, useEffect } from "react";
import { fectchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
const Chart = ({data:{confirmed, recovered ,deaths}, country}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fectchDailyData());
    };

    fetchAPI();
  },[]);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Số ca nhiễm bệnh",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ recovered }) => recovered),
            label: "Số hồi phục",
            borderColor: "green",
            backgroundColor: "rgba(0,255,0,0.5)",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Số người chết",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true
          }
      
        ]
      }}
    />
  ) : null;

  const barChar = confirmed ? (
    <Bar
      data={{
        labels: ["Số ca nhiễm bệnh", "Số trường hợp hồi phục", "Số người chết"],

        datasets: [
          {
            label: "Số người",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data:[confirmed.value,recovered.value,deaths.value],
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Khu vực ${country}` }
      }}
    />
  ) : null;
  return <div className={styles.container}>{country ? barChar : lineChart}</div>;
};

export default Chart;
