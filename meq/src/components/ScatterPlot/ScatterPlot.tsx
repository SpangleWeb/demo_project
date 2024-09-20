import { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { SampleDataArray } from '../../../types/SampleData';

type ScatterChartProps = {
  allData: SampleDataArray;
  xAxisField: string;
  yAxisField: string;
};

export const ScatterChart: FC<ScatterChartProps> = ({ allData, xAxisField, yAxisField }) => {
  
  const scatterData = allData.map(
    (item): { x: number; y: number; date: string; pic: string; hscw: number | null; imf: number | null; lmy: number | null; glq: number | null } | null => {
      
      const xValue = item[xAxisField as keyof typeof item];
      const yValue = item[yAxisField as keyof typeof item];

      if (xValue !== null && yValue !== null) {
        const result = {
          x: Number(xValue),  // Ensure x is a number to not lose the plot
          y: Number(yValue),  // Ensure x is a number to not lose the plot
          date: item.DATE,
          pic: item.PIC,
          hscw: item.HSCW,
          imf: item.IMF,
          lmy: item.LMY,
          glq: item.GLQ
        };

        return result;
      }
      return null;
    }
  ).filter((item): item is { x: number; y: number; date: string; pic: string; hscw: number; imf: number | null; lmy: number | null; glq: number | null } => item !== null);

  const series = [{
    name: 'Trace',
    id: 'trace',
    marker: {
      symbol: 'circle'
    },
    data: scatterData,
  }];

  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: `${xAxisField} vs ${yAxisField}`
    },
    xAxis: {
      title: {
        text: xAxisField,
      }
    },
    yAxis: {
      title: {
        text: yAxisField
      }
    },
    tooltip: {
      pointFormat: `
        Date: <strong>{point.date}</strong> <br/> 
        PIC: <strong>{point.pic}</strong> <br/> 
        HSCW: <strong>{point.hscw}</strong> <br/> 
        IMF: <strong>{point.imf}</strong> <br/> 
        LMY: <strong>{point.lmy}</strong> <br/> 
        GLQ: <strong>{point.glq}</strong>`
    },
    series
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
