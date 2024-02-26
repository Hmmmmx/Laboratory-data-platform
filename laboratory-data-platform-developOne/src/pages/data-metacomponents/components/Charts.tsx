/* @jsxImportSource @emotion/react */
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { EChartsOption } from "echarts";

type BaseChartProps = {
  options: EChartsOption,
  style: CSSProperties
};

const Charts: React.FC<BaseChartProps> = ({ options, style }) => {

  const chartRef = useRef<HTMLInputElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  const initChart = () => {
    const handleResize = () => {
      newChart.resize();
    };
    if (chart) {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    }
    const newChart = echarts?.init(chartRef?.current as HTMLElement);
    newChart.setOption(options, true);
    window.addEventListener("resize", handleResize);
    setChart(newChart);
  };
  useEffect(() => {
    initChart();
  }, [options, style])
  return <div ref={chartRef} style={style} />
};

export { Charts };
