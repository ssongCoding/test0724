
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-600">SoloMeal@KNU</h1>
        <p className="text-md text-gray-500 mt-1">경북대학교 학생들을 위한 혼밥 식당 추천</p>
      </div>
    </header>
  );
};

export default Header;
