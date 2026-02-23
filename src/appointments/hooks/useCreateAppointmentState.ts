import { useReducer } from 'react';

type SelectedSpecialty = {
  id: string;
  name: string;
  description: string;
};

type SelectedDoctor = {
  id: string;
  name: string;
  photoUrl: string;
};

type AppointmentDraft = {
  specialty: SelectedSpecialty | null;
  doctor: SelectedDoctor | null;
};

type BookingAction =
  | { type: 'SELECT_SPECIALTY'; id: string; name: string; description: string }
  | { type: 'SELECT_DOCTOR'; id: string; name: string; photoUrl: string };

const initialDraft: AppointmentDraft = {
  specialty: null,
  doctor: null,
};

function bookingReducer(state: AppointmentDraft, action: BookingAction): AppointmentDraft {
  if (action.type === 'SELECT_SPECIALTY') {
    return {
      ...state,
      specialty: { id: action.id, name: action.name, description: action.description },
      doctor: null,
    };
  }
  if (action.type === 'SELECT_DOCTOR') {
    return {
      ...state,
      doctor: { id: action.id, name: action.name, photoUrl: action.photoUrl },
    };
  }
  return state;
}

const stepCanProceed: Record<number, (draft: AppointmentDraft) => boolean> = {
  1: (draft) => draft.specialty !== null,
  2: (draft) => draft.doctor !== null,
};

export function useCreateAppointmentState() {
  const [draft, dispatch] = useReducer(bookingReducer, initialDraft);

  return {
    draft,
    dispatch,
    stepCanProceed,
  };
}
