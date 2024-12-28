export interface RoutineStep {
  id: string;
  name: string;
  duration: number;
  type: 'application' | 'wait';
  description?: string;
}

export interface EditableStep extends RoutineStep {
  isEditing: boolean;
}