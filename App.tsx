
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import RestaurantDetailModal from './components/RestaurantDetailModal';
import SortFilter from './components/SortFilter';
import { initialRestaurants } from './data/restaurants';
import { Restaurant, Review, SortOption } from './types';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Friendliness);

  const sortedRestaurants = useMemo(() => {
    const sorted = [...restaurants].sort((a, b) => {
      switch (sortOption) {
        case SortOption.Friendliness:
          return b.avgRating - a.avgRating;
        case SortOption.Name:
          return a.name.localeCompare(b.name);
        default:
          return b.avgRating - a.avgRating;
      }
    });
    return sorted;
  }, [restaurants, sortOption]);

  const handleSelectRestaurant = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  const handleAddReview = useCallback((restaurantId: number, newReview: Review) => {
    setRestaurants(prevRestaurants => {
      return prevRestaurants.map(restaurant => {
        if (restaurant.id === restaurantId) {
          const updatedReviews = [...restaurant.reviews, newReview];
          const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
          const newAvgRating = totalRating / updatedReviews.length;
          return { ...restaurant, reviews: updatedReviews, avgRating: newAvgRating };
        }
        return restaurant;
      });
    });
    // Also update the selected restaurant to reflect the new review immediately
    setSelectedRestaurant(prevSelected => {
        if (prevSelected && prevSelected.id === restaurantId) {
            const updatedReviews = [...prevSelected.reviews, newReview];
            const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
            const newAvgRating = totalRating / updatedReviews.length;
            return { ...prevSelected, reviews: updatedReviews, avgRating: newAvgRating };
        }
        return prevSelected;
    });
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (selectedRestaurant) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedRestaurant]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <SortFilter currentSort={sortOption} onSortChange={setSortOption} />
        <RestaurantList
          restaurants={sortedRestaurants}
          onSelectRestaurant={handleSelectRestaurant}
        />
      </main>
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={handleCloseModal}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};

export default App;
