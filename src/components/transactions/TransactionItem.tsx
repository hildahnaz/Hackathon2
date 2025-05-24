import React from 'react';
import { Transaction } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { categories, deleteTransaction } = useAppContext();
  
  const category = categories.find(cat => cat.id === transaction.category || cat.name === transaction.category);
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <div className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {transaction.type === 'income' ? (
            <ArrowUpCircle className="w-8 h-8 text-green-500 mr-3" />
          ) : (
            <ArrowDownCircle className="w-8 h-8 text-red-500 mr-3" />
          )}
          
          <div>
            <h4 className="font-medium">{transaction.description}</h4>
            <div className="flex items-center mt-1">
              <span 
                className="text-xs px-2 py-0.5 rounded-full" 
                style={{ 
                  backgroundColor: category?.color ? `${category.color}20` : '#f3f4f6',
                  color: category?.color || '#374151'
                }}
              >
                {category?.name || transaction.category}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </span>
          <button 
            onClick={handleDelete}
            className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {transaction.imageUrl && (
        <div className="mt-3">
          <img 
            src={transaction.imageUrl} 
            alt="Receipt" 
            className="w-full max-h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default TransactionItem;