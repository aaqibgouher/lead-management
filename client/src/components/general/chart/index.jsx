import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const BarChart = ({ topLeads }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [], // Categories will be populated dynamically
        title: {
          text: "Leads", // x-axis label
        },
      },
      yaxis: {
        title: {
          text: "Amount",
        },
      },
      fill: {
        opacity: 1,
        colors: ["#d73c46"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  });

  useEffect(() => {
    if (topLeads && topLeads.length > 0) {
      // Process topLeads to extract categories and series data
      const categories = topLeads.map((item) => item.name);
      const seriesData = topLeads.map((item) => item.totalNetPrice);

      // Update the chart data
      setChartData((prevData) => ({
        ...prevData,
        series: [
          {
            name: "Total Amount",
            data: seriesData,
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: categories,
          },
        },
      }));
    }
  }, [topLeads]); // Re-run whenever topLeads changes

  return (
    <div className="chart-container">
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
