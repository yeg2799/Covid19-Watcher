import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchDailyData } from "../Api";

const AreaChart = ({ country }) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchCountryDailyData = async () => {
      const data = await fetchDailyData(country);
      setDailyData(data);
    };
    fetchCountryDailyData();
  }, [country]);

  return (
    <div id="chart">
      <Chart
        options={{
          chart: {
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: dailyData.map((item) => item.Date),
          },
          tooltip: {
            x: {
              format: "dd/MM/y",
            },
          },
        }}
        series={[
          {
            name: "Confirmed",
            data: dailyData.map((item) => item.Confirmed),
          },
          {
            name: "Death",
            data: dailyData.map((item) => item.Deaths),
          },
          {
            name: "Recovered",
            data: dailyData.map((item) => item.Recovered),
          },
          {
            name: "Active",
            data: dailyData.map((item) => item.Active),
          },
        ]}
        style={{ marginTop: 250, }}
        height={450}
      />
    </div>
  );
};

export default AreaChart;
