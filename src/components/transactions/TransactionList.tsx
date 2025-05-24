import React from 'react';
import { useAppContext } from '../../context/AppContext';
import TransactionItem from './TransactionItem';
import { groupTransactionsByDate } from '../../utils/helpers';

interface TransactionListProps {
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ limit }) => {
  const { transactions } = useAppContext();
  
  // Apply limit if specified
  const displayTransactions = limit 
    ? transactions.slice(0, limit) 
    : transactions;
  
  // Group transactions by date
  const groupedTransactions = groupTransactionsByDate(displayTransactions);
  const dates = Object.keys(groupedTransactions).sort().reverse();

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">No transactions yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {dates.map((date) => (
        <div key={date} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h3 className="text-sm font-medium text-gray-700">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </h3>
          </div>
          <div>
            {groupedTransactions[date].map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;