import React from 'react';
import { Edit2, Save, Trash2 } from 'lucide-react';
import { EditableStep } from '../types/routine';

interface RoutineStepProps {
  step: EditableStep;
  isActive: boolean;
  onEdit: (id: string) => void;
  onSave: (step: EditableStep) => void;
  onDelete: (id: string) => void;
}

export function RoutineStep({ step, isActive, onEdit, onSave, onDelete }: RoutineStepProps) {
  const [editedStep, setEditedStep] = React.useState(step);

  return (
    <div className={`p-4 rounded-lg ${isActive ? 'bg-purple-100 border-2 border-purple-500' : 'bg-white border border-gray-200'}`}>
      {step.isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedStep.name}
            onChange={(e) => setEditedStep({ ...editedStep, name: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Step name"
          />
          <input
            type="number"
            value={editedStep.duration}
            onChange={(e) => setEditedStep({ ...editedStep, duration: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            placeholder="Duration (seconds)"
          />
          <select
            value={editedStep.type}
            onChange={(e) => setEditedStep({ ...editedStep, type: e.target.value as 'application' | 'wait' })}
            className="w-full p-2 border rounded"
          >
            <option value="application">Application</option>
            <option value="wait">Wait</option>
          </select>
          <button
            onClick={() => onSave(editedStep)}
            className="bg-purple-600 text-white px-4 py-2 rounded flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{step.name}</h3>
            <p className="text-sm text-gray-600">
              {step.duration} seconds - {step.type}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(step.id)}
              className="text-gray-600 hover:text-purple-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(step.id)}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}