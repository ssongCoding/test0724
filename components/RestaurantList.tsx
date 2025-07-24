
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '../types';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onSelectRestaurant }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onSelectRestaurant={onSelectRestaurant}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
