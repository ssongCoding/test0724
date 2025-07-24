
import React from 'react';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  isInteractive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, isInteractive = false }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const fullStar = isInteractive ? (hoverRating || rating) >= star : rating >= star;
        const halfStar = !isInteractive && rating > star - 1 && rating < star;
        
        return (
          <span
            key={star}
            className={`text-2xl ${isInteractive ? 'cursor-pointer' : ''} ${fullStar ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => isInteractive && setRating && setRating(star)}
            onMouseEnter={() => isInteractive && setHoverRating(star)}
            onMouseLeave={() => isInteractive && setHoverRating(0)}
          >
            { halfStar ? <i className="fas fa-star-half-alt"></i> : <i className="fas fa-star"></i> }
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
