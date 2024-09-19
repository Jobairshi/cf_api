import ApexCharts from "apexcharts";
import { useEffect } from "react";

interface dataStruct {
  x: number;
  y: number;
}

interface ShowSubmissionGraphProps {
  data: dataStruct[];
}

export default function ShowSubmissionGraph({ data }: ShowSubmissionGraphProps) {
  useEffect(() => {
    if (data && data.length > 0) {
      const options = {
        colors: ["#4F46E5"], 
        series: [
          {
            name: "Problem Submissions",
            data: data,
          },
        ],
        chart: {
          type: "bar",
          height: "320px",
          width:'100%',
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            borderRadius: 6, 
            barHeight: "70%", 
            colors: {
              backgroundBarColors: ['#f3f4f6'],
              backgroundBarOpacity: 1,
            },
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
          },
        },
        stroke: {
          show: true,
          width: 2, 
          colors: ["#f3f4f6"],
        },
        grid: {
          borderColor: '#e5e7eb', 
          strokeDashArray: 4, 
        },
        xaxis: {
          categories: [2100, 1900, 1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000, 900, 800],
          tickAmount: 12,
          labels: {
            style: {
              fontFamily: "Inter, sans-serif",
              fontSize: "12px", 
              colors: "#6b7280", 
            },
          },
          title: {
            text: 'Problem Ratings',
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: "#374151",
            },
          },
        },
        yaxis: {
          title: {
            text: 'Submission Count',
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: "#374151",
            },
          },
          labels: {
            style: {
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              colors: "#6b7280",
            },
          },
        },
        fill: {
          opacity: 0.9, 
        },
        dataLabels: {
          enabled: false, 
        },
      };

      const chartElement = document.getElementById("column-chart");

      if (chartElement && typeof ApexCharts !== "undefined") {
        const chart = new ApexCharts(chartElement, options);
        chart.render();

        return () => {
          chart.destroy();
        };
      }
    }
  }, [data]);

  return (
    <div>
      <div id="column-chart"></div>
    </div>
  );
}
