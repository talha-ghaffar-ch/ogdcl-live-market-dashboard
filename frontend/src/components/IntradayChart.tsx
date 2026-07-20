import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, LineSeries, CandlestickSeries } from 'lightweight-charts';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';
import type { IntradayDataPoint } from '../types';

interface Props {
  data: IntradayDataPoint[];
  color: string;
}

export const IntradayChart: React.FC<Props> = ({ data, color }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<any> | null>(null);
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#334155', style: 1 },
        horzLines: { color: '#334155', style: 1 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#334155',
      },
      rightPriceScale: {
        borderColor: '#334155',
        autoScale: true,
      },
      crosshair: {
        vertLine: { color: '#cbd5e1', width: 1, style: 1 },
        horzLine: { color: '#cbd5e1', width: 1, style: 1 },
      },
      autoSize: true,
    });

    chartRef.current = chart;
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    if (seriesRef.current) {
      try {
        chartRef.current.removeSeries(seriesRef.current);
      } catch (e) {}
      seriesRef.current = null;
    }

    let localSeries: ISeriesApi<any>;

    if (chartType === 'line') {
      localSeries = chartRef.current.addSeries(LineSeries, {
        color: color,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        lastPriceAnimation: 1,
      });
    } else {
      localSeries = chartRef.current.addSeries(CandlestickSeries, {
        upColor: '#00E676',
        downColor: '#FF3B30',
        borderVisible: false,
        wickUpColor: '#00E676',
        wickDownColor: '#FF3B30',
      });
    }

    seriesRef.current = localSeries;

    return () => {
      if (chartRef.current && localSeries) {
        try {
          chartRef.current.removeSeries(localSeries);
        } catch (e) {}
      }
      if (seriesRef.current === localSeries) {
        seriesRef.current = null;
      }
    };
  }, [chartType, color]);

  useEffect(() => {
    if (!seriesRef.current || data.length === 0) return;

    const formattedData = data.map(d => {
      if (chartType === 'line') {
        return { time: d.time as any, value: d.value };
      } else {
        return {
          time: d.time as any,
          open: d.open ?? d.value,
          high: d.high ?? d.value,
          low: d.low ?? d.value,
          close: d.close ?? d.value,
        };
      }
    });
    
    formattedData.sort((a, b) => (a.time as number) - (b.time as number));
    const uniqueData = formattedData.filter((v, i, a) => a.findIndex(t => t.time === v.time) === i);
    
    try {
      seriesRef.current.setData(uniqueData as any);
    } catch (err: any) {
      console.error('setData error:', err);
    }
  }, [data, chartType]);

  return (
    <div className="bg-psxCard rounded-2xl p-6 border border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)] mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-bold text-white font-sans tracking-wide">Intraday Performance</h3>
        <div className="flex bg-psxDark rounded-lg p-1 border border-slate-700/50 mt-3 sm:mt-0 shadow-inner">
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
              chartType === 'line' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('candle')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
              chartType === 'candle' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Candles
          </button>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};
