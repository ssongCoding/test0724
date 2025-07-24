
import React from 'react';
import { SortOption } from '../types';

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ currentSort, onSortChange }) => {
  const sortOptions = [
    { key: SortOption.Friendliness, label: '혼밥 친화도 높은 순' },
    { key: SortOption.Name, label: '이름 순' },
  ];
  
  return (
    <div className="mb-6 flex justify-end items-center">
      <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 mr-2">정렬:</label>
      <select 
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
      >
        {sortOptions.map(option => (
            <option key={option.key} value={option.key}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
