import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { RoutineSteps } from './components/RoutineSteps';
import { EditableStep } from './types/routine';
import { v4 as uuidv4 } from 'uuid';
import { initialSteps } from './data/initialSteps';
import { useTimer } from './hooks/useTimer';
import { Header } from './components/Header';
import { ProductGuide } from './components/ProductGuide';

export default function App() {
  const [steps, setSteps] = useState<EditableStep[]>(initialSteps);
  const { currentStepIndex, timeLeft, isRunning, handleToggleTimer, handleSkip } = useTimer(steps);

  const handleAddStep = (index: number) => {
    const newStep: EditableStep = {
      id: uuidv4(),
      name: 'New Step',
      duration: 60,
      type: 'application',
      isEditing: true,
    };
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 0, newStep);
    setSteps(updatedSteps);
  };

  const handleEditStep = (id: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, isEditing: true } : step
    ));
  };

  const handleSaveStep = (editedStep: EditableStep) => {
    setSteps(steps.map(step =>
      step.id === editedStep.id ? { ...editedStep, isEditing: false } : step
    ));
  };

  const handleDeleteStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleReorderSteps = (reorderedSteps: EditableStep[]) => {
    setSteps(reorderedSteps);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <Header />
        <ProductGuide />
        <Timer
          seconds={timeLeft}
          isRunning={isRunning}
          onToggle={handleToggleTimer}
          onSkip={handleSkip}
        />
        <RoutineSteps
          steps={steps}
          currentStepIndex={currentStepIndex}
          onReorder={handleReorderSteps}
          onAddStep={handleAddStep}
          onEdit={handleEditStep}
          onSave={handleSaveStep}
          onDelete={handleDeleteStep}
        />
      </div>
    </div>
  );
}