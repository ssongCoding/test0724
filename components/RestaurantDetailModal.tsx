
import React, { useState } from 'react';
import { Restaurant, Review } from '../types';
import StarRating from './StarRating';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  onAddReview: (restaurantId: number, review: Review) => void;
}

const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({ restaurant, onClose, onAddReview }) => {
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') {
        alert("후기를 입력해주세요.");
        return;
    }
    const newReview: Review = {
      id: Date.now(),
      user: '익명의 혼밥러',
      rating: newRating,
      comment: newComment,
    };
    onAddReview(restaurant.id, newReview);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 sticky top-0 bg-white border-b border-gray-200 z-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
          <h2 className="text-3xl font-bold text-gray-900">{restaurant.name}</h2>
          <div className="flex items-center mt-2">
            <StarRating rating={restaurant.avgRating} />
            <span className="ml-3 text-xl font-bold text-yellow-500">{restaurant.avgRating.toFixed(1)}</span>
            <span className="ml-2 text-gray-500">({restaurant.reviews.length}개의 후기)</span>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
            <div className="flex items-start">
              <i className="fas fa-map-marker-alt text-blue-500 mt-1 mr-3 w-4 text-center"></i>
              <span className="text-gray-700">{restaurant.address}</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-clock text-blue-500 mt-1 mr-3 w-4 text-center"></i>
              <span className="text-gray-700">{restaurant.hours}</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-utensils text-blue-500 mt-1 mr-3 w-4 text-center"></i>
              <span className="text-gray-700">{restaurant.category}</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-chair text-blue-500 mt-1 mr-3 w-4 text-center"></i>
              <span className="text-gray-700">{restaurant.seating}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">혼밥 후기</h3>
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {restaurant.reviews.length > 0 ? restaurant.reviews.map(review => (
                <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{review.user}</span>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
              )).reverse() : <p className="text-gray-500">아직 작성된 후기가 없습니다.</p>}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">후기 작성하기</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">혼밥 친화도 평가</label>
                <StarRating rating={newRating} setRating={setNewRating} isInteractive={true} />
              </div>
              <div>
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="식당에서의 혼밥 경험을 공유해주세요. (예: 바 자리가 있어서 편해요, 혼자 먹기엔 좀 부담스러워요 등)"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                후기 남기기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailModal;
