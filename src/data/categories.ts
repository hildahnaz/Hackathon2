import { Category } from '../types';

export const defaultCategories: Category[] = [
  { id: '1', name: 'Sales', type: 'income', color: '#0D9488' },
  { id: '2', name: 'Services', type: 'income', color: '#0891B2' },
  { id: '3', name: 'Refunds', type: 'income', color: '#2563EB' },
  { id: '4', name: 'Other Income', type: 'income', color: '#7C3AED' },
  { id: '5', name: 'Inventory', type: 'expense', color: '#E11D48' },
  { id: '6', name: 'Rent', type: 'expense', color: '#F59E0B' },
  { id: '7', name: 'Utilities', type: 'expense', color: '#84CC16' },
  { id: '8', name: 'Salaries', type: 'expense', color: '#C026D3' },
  { id: '9', name: 'Marketing', type: 'expense', color: '#EA580C' },
  { id: '10', name: 'Miscellaneous', type: 'expense', color: '#64748B' },
];