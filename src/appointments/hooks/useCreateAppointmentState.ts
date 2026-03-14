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
  date: Date | null;
  time: string | null;
};

type BookingAction =
  | { type: 'SELECT_SPECIALTY'; id: string; name: string; description: string }
  | { type: 'SELECT_DOCTOR'; id: string; name: string; photoUrl: string }
  | { type: 'SELECT_DATE_TIME'; date: Date | null; time: string | null };

const initialDraft: AppointmentDraft = {
  specialty: null,
  doctor: null,
  date: null,
  time: null,
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
  if (action.type === 'SELECT_DATE_TIME') {
    return {
      ...state,
      date: action.date,
      time: action.time,
    };
  }
  return state;
}

const stepCanProceed: Record<number, (draft: AppointmentDraft) => boolean> = {
  1: (draft) => draft.specialty !== null,
  2: (draft) => draft.doctor !== null,
  3: (draft) => draft.date !== null && draft.time !== null,
};

export function useCreateAppointmentState() {
  const [draft, dispatch] = useReducer(bookingReducer, initialDraft);

  return {
    draft,
    dispatch,
    stepCanProceed,
  };
}
