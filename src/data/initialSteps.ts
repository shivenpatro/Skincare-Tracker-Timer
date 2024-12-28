import { v4 as uuidv4 } from 'uuid';
import { EditableStep } from '../types/routine';

export const initialSteps: EditableStep[] = [
  { id: uuidv4(), name: 'Cleanser', duration: 60, type: 'application', isEditing: false },
  { id: uuidv4(), name: 'Wait', duration: 30, type: 'wait', isEditing: false },
  { id: uuidv4(), name: 'Serum', duration: 60, type: 'application', isEditing: false },
  { id: uuidv4(), name: 'Wait', duration: 120, type: 'wait', isEditing: false },
  { id: uuidv4(), name: 'Moisturizer', duration: 60, type: 'application', isEditing: false },
  { id: uuidv4(), name: 'Wait', duration: 120, type: 'wait', isEditing: false },
  { id: uuidv4(), name: 'Sunscreen', duration: 30, type: 'application', isEditing: false },
];