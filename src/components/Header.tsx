import React from 'react';
import { Clock } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center animate-fade-in">
      <div className="inline-flex items-center justify-center space-x-3 mb-4">
        <Clock className="w-8 h-8 text-purple-600" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Skincare Routine Timer
        </h1>
      </div>
      <p className="text-gray-600 text-lg">Track your skincare routine with precision</p>
      <div className="mt-4 flex justify-center space-x-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
          Customizable Steps
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm">
          Audio Notifications
        </span>
      </div>
    </div>
  );
}