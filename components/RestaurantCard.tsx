
import React from 'react';
import { Restaurant } from '../types';
import StarRating from './StarRating';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelectRestaurant }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onSelectRestaurant(restaurant)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{restaurant.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{restaurant.category}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{restaurant.seating}</p>
        <div className="flex items-center">
          <StarRating rating={restaurant.avgRating} />
          <span className="ml-2 text-gray-600 font-semibold">{restaurant.avgRating.toFixed(1)}</span>
          <span className="ml-1 text-gray-400 text-sm">({restaurant.reviews.length}개 후기)</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
