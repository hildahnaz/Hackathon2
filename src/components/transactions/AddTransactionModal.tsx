import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X, Camera, Mic, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { categories, addTransaction } = useAppContext();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [voiceRecognitionText, setVoiceRecognitionText] = useState<string>('');

  const filteredCategories = categories.filter(cat => cat.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      alert('Please fill in all required fields');
      return;
    }
    
    addTransaction({
      amount: parseFloat(amount),
      description,
      category,
      type,
      imageUrl,
    });
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategory('');
    setImageUrl(undefined);
    setVoiceRecognitionText('');
    setIsVoiceActive(false);
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      if (type === 'expense') {
        setVoiceRecognitionText('Coffee shop supplies');
        setDescription('Coffee shop supplies');
        setAmount('24.99');
        setCategory(filteredCategories[0]?.id || '');
      } else {
        setVoiceRecognitionText('Sales from Wednesday');
        setDescription('Sales from Wednesday');
        setAmount('150');
        setCategory(filteredCategories[0]?.id || '');
      }
      setIsVoiceActive(false);
    }, 2000);
  };

  const handleImageCapture = () => {
    // Simulate image capture and processing
    if (type === 'expense') {
      setImageUrl('https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      setDescription('Office supplies');
      setAmount('45.75');
      setCategory(filteredCategories[0]?.id || '');
    } else {
      setImageUrl('https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      setDescription('Daily sales receipt');
      setAmount('235.50');
      setCategory(filteredCategories[0]?.id || '');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center sm:items-center">
      <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Transaction</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-lg flex justify-center items-center space-x-1 ${
                type === 'expense' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <ArrowDownCircle className="h-4 w-4 text-red-500" />
              <span>Expense</span>
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-lg flex justify-center items-center space-x-1 ${
                type === 'income' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
              <span>Income</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={handleVoiceInput}
              className="flex flex-col items-center justify-center py-4 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
            >
              <Mic className={`h-8 w-8 ${isVoiceActive ? 'text-teal-500 animate-pulse' : 'text-gray-400'}`} />
              <span className="mt-2 text-sm">Voice Input</span>
              
              {isVoiceActive && (
                <div className="flex space-x-1 mt-2">
                  <span className="w-1 h-3 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_infinite]"></span>
                  <span className="w-1 h-5 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.1s_infinite]"></span>
                  <span className="w-1 h-3 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.2s_infinite]"></span>
                  <span className="w-1 h-6 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.3s_infinite]"></span>
                  <span className="w-1 h-4 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.4s_infinite]"></span>
                </div>
              )}
              
              {voiceRecognitionText && (
                <p className="text-xs text-gray-500 mt-2">{voiceRecognitionText}</p>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleImageCapture}
              className="flex flex-col items-center justify-center py-4 px-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
            >
              <Camera className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm">Image Capture</span>
            </button>
          </div>
          
          {imageUrl && (
            <div className="mb-4 relative">
              <img 
                src={imageUrl} 
                alt="Receipt capture" 
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => setImageUrl(undefined)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What was this for?"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;