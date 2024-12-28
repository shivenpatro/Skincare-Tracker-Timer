import React from 'react';
import { Clock, Pause, Play, SkipForward } from 'lucide-react';

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  onToggle: () => void;
  onSkip: () => void;
}

export function Timer({ seconds, isRunning, onToggle, onSkip }: TimerProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-6xl font-bold text-purple-600 flex items-center">
        <Clock className="w-12 h-12 mr-4" />
        <span>{String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onToggle}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={onSkip}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors"
        >
          <SkipForward className="w-5 h-5" />
          <span>Skip</span>
        </button>
      </div>
    </div>
  );
}