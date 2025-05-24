import React from 'react';
import { DailySummary } from '../../types';
import { formatCurrency } from '../../utils/helpers';

interface ProfitChartProps {
  data: DailySummary[];
}

const ProfitChart: React.FC<ProfitChartProps> = ({ data }) => {
  const maxValue = Math.max(
    ...data.flatMap(item => [item.income, item.expense, Math.abs(item.profit)])
  );

  const getHeight = (value: number) => {
    if (maxValue === 0) return 0;
    return (value / maxValue) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">7-Day Financial Overview</h3>
      </div>
      
      <div className="flex space-x-1 h-32">
        {data.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end space-y-1">
            <div className="relative pt-1 flex-1 flex flex-col justify-end">
              {/* Profit/Loss marker */}
              <div
                className={`w-full rounded-t ${
                  day.profit >= 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ height: `${getHeight(Math.abs(day.profit))}%` }}
                title={`Profit: ${formatCurrency(day.profit)}`}
              ></div>
              
              {/* Income bar */}
              <div
                className="w-full bg-teal-500 opacity-80"
                style={{ height: `${getHeight(day.income)}%` }}
                title={`Income: ${formatCurrency(day.income)}`}
              ></div>
              
              {/* Expense bar */}
              <div
                className="w-full bg-amber-500 opacity-80"
                style={{ height: `${getHeight(day.expense)}%` }}
                title={`Expense: ${formatCurrency(day.expense)}`}
              ></div>
            </div>
            
            <div className="text-xs text-center truncate" title={formatDate(day.date)}>
              {formatDate(day.date)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full mr-1"></div>
          <span className="text-xs">Income</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
          <span className="text-xs">Expenses</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span className="text-xs">Profit</span>
        </div>
      </div>
    </div>
  );
};

export default ProfitChart;