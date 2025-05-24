import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { DollarSign, TrendingUp, BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  const { calculateBalance } = useAppContext();
  const { income, expense, profit } = calculateBalance();

  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6" />
            <h1 className="text-xl font-bold">TrackFlow</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4 pb-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium opacity-80">Income</span>
              <TrendingUp className="h-3 w-3 opacity-80" />
            </div>
            <p className="text-sm font-bold mt-1">{formatCurrency(income)}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium opacity-80">Expenses</span>
              <BarChart2 className="h-3 w-3 opacity-80" />
            </div>
            <p className="text-sm font-bold mt-1">{formatCurrency(expense)}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium opacity-80">Profit</span>
              <DollarSign className="h-3 w-3 opacity-80" />
            </div>
            <p className={`text-sm font-bold mt-1 ${profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {formatCurrency(profit)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;