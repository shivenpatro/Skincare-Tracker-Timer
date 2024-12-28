import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, GripVertical } from 'lucide-react';
import { RoutineStep } from './RoutineStep';
import { EditableStep } from '../types/routine';

interface RoutineStepsProps {
  steps: EditableStep[];
  currentStepIndex: number;
  onReorder: (steps: EditableStep[]) => void;
  onAddStep: (index: number) => void;
  onEdit: (id: string) => void;
  onSave: (step: EditableStep) => void;
  onDelete: (id: string) => void;
}

export function RoutineSteps({
  steps,
  currentStepIndex,
  onReorder,
  onAddStep,
  onEdit,
  onSave,
  onDelete,
}: RoutineStepsProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Routine Steps</h2>
        <button
          onClick={() => onAddStep(steps.length)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Step</span>
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="relative group"
                    >
                      <div {...provided.dragHandleProps} className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <RoutineStep
                        step={step}
                        isActive={index === currentStepIndex}
                        onEdit={onEdit}
                        onSave={onSave}
                        onDelete={onDelete}
                      />
                      <button
                        onClick={() => onAddStep(index + 1)}
                        className="absolute left-1/2 -bottom-3 -translate-x-1/2 bg-purple-100 hover:bg-purple-200 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus className="w-3 h-3 text-purple-600" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}