import React from 'react';
import { useAppContext } from '../../context/AppContext';
import TransactionList from '../transactions/TransactionList';
import ProfitChart from './ProfitChart';
import { calculateDailySummaries } from '../../utils/helpers';

const DashboardView: React.FC = () => {
  const { transactions } = useAppContext();
  const dailySummaries = calculateDailySummaries(transactions);
  
  return (
    <div className="pb-20">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Performance</h2>
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <ProfitChart data={dailySummaries} />
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <TransactionList limit={5} />
      </div>
    </div>
  );
};

export default DashboardView;