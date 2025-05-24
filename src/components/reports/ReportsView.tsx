import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { PieChart, ChevronDown, ChevronUp } from 'lucide-react';

const ReportsView: React.FC = () => {
  const { transactions, categories } = useAppContext();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [showExpenseDetails, setShowExpenseDetails] = useState(true);
  const [showIncomeDetails, setShowIncomeDetails] = useState(true);
  
  const getTimeframeTransactions = () => {
    const now = new Date();
    let cutoffDate = new Date();
    
    if (timeframe === 'week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeframe === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }
    
    return transactions.filter(t => new Date(t.date) >= cutoffDate);
  };
  
  const filteredTransactions = getTimeframeTransactions();
  
  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const catId = transaction.category;
      if (!acc[catId]) {
        acc[catId] = 0;
      }
      acc[catId] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  
  const incomeByCategory = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, transaction) => {
      const catId = transaction.category;
      if (!acc[catId]) {
        acc[catId] = 0;
      }
      acc[catId] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  
  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
  const totalIncome = Object.values(incomeByCategory).reduce((sum, amount) => sum + amount, 0);
  
  const expenseCategories = Object.entries(expensesByCategory)
    .map(([catId, amount]) => {
      const category = categories.find(c => c.id === catId || c.name === catId);
      return {
        id: catId,
        name: category?.name || catId,
        amount,
        percentage: totalExpenses ? (amount / totalExpenses) * 100 : 0,
        color: category?.color || '#64748B'
      };
    })
    .sort((a, b) => b.amount - a.amount);
  
  const incomeCategories = Object.entries(incomeByCategory)
    .map(([catId, amount]) => {
      const category = categories.find(c => c.id === catId || c.name === catId);
      return {
        id: catId,
        name: category?.name || catId,
        amount,
        percentage: totalIncome ? (amount / totalIncome) * 100 : 0,
        color: category?.color || '#64748B'
      };
    })
    .sort((a, b) => b.amount - a.amount);
  
  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Financial Reports</h2>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 text-xs rounded-md ${timeframe === 'week' ? 'bg-white shadow-sm' : ''}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 text-xs rounded-md ${timeframe === 'month' ? 'bg-white shadow-sm' : ''}`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeframe('year')}
            className={`px-3 py-1 text-xs rounded-md ${timeframe === 'year' ? 'bg-white shadow-sm' : ''}`}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-center">
            <PieChart className="h-6 w-6 mx-auto text-teal-600" />
            <p className="text-sm font-medium mt-1">Income</p>
            <p className="text-xl font-bold text-teal-600">{formatCurrency(totalIncome)}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-center">
            <PieChart className="h-6 w-6 mx-auto text-amber-600" />
            <p className="text-sm font-medium mt-1">Expenses</p>
            <p className="text-xl font-bold text-amber-600">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div 
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setShowExpenseDetails(!showExpenseDetails)}
        >
          <h3 className="font-medium">Expense Breakdown</h3>
          {showExpenseDetails ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {showExpenseDetails && (
          <div className="p-4 pt-0">
            {expenseCategories.length > 0 ? (
              <div className="space-y-3">
                {expenseCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.name}</span>
                      <span>{formatCurrency(category.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-gray-500 mt-1">
                      {category.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No expenses recorded in this period</p>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setShowIncomeDetails(!showIncomeDetails)}
        >
          <h3 className="font-medium">Income Breakdown</h3>
          {showIncomeDetails ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {showIncomeDetails && (
          <div className="p-4 pt-0">
            {incomeCategories.length > 0 ? (
              <div className="space-y-3">
                {incomeCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.name}</span>
                      <span>{formatCurrency(category.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-right text-gray-500 mt-1">
                      {category.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No income recorded in this period</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsView;