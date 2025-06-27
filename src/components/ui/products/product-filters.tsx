'use client';

import { ProductFiltersProps } from './types';

export function ProductFilters({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: ProductFiltersProps) {
  return (
    <div className="flex justify-start lg:justify-end">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 dark:border-gray-700/50">
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 