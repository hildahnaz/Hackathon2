import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';

const SettingsView: React.FC = () => {
  const { categories, deleteCategory } = useAppContext();
  
  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  
  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Income Categories</h3>
          <button className="text-teal-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div>
          {incomeCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span>{category.name}</span>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-gray-400 hover:text-red-500 mr-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Expense Categories</h3>
          <button className="text-teal-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div>
          {expenseCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span>{category.name}</span>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-gray-400 hover:text-red-500 mr-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-medium">App Settings</h3>
        </div>
        
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <span>Currency</span>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">USD ($)</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b">
            <span>Dark Mode</span>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">Off</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border-b">
            <span>Data Backup</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-4">
            <span>About</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;