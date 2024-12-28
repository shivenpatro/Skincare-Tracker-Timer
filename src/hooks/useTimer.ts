import { useState, useEffect, useCallback, useRef } from 'react';
import { EditableStep } from '../types/routine';
import { playNotificationSound } from '../utils/sound';

export function useTimer(steps: EditableStep[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const updateTimer = useCallback(() => {
    if (!startTimeRef.current) return;
    
    const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const newTimeLeft = Math.max(steps[currentStepIndex].duration - elapsedSeconds, 0);
    
    setTimeLeft(newTimeLeft);

    if (newTimeLeft === 0) {
      playNotificationSound();
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
        setTimeLeft(steps[currentStepIndex + 1].duration);
        startTimeRef.current = Date.now();
      } else {
        setIsRunning(false);
        startTimeRef.current = 0;
      }
    } else {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [currentStepIndex, steps]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - ((steps[currentStepIndex].duration - timeLeft) * 1000);
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = 0;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, updateTimer]);

  const handleToggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const handleSkip = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setTimeLeft(steps[currentStepIndex + 1].duration);
      startTimeRef.current = Date.now();
      playNotificationSound();
    }
  }, [currentStepIndex, steps]);

  return {
    currentStepIndex,
    timeLeft,
    isRunning,
    handleToggleTimer,
    handleSkip
  };
}