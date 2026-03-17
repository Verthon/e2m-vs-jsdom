import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { appointmentMutations } from '../queries/appointmentsQueries';

export function useCreateAppointment() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    ...appointmentMutations.create(),
    onSuccess: () => {
      navigate('/');
    },
  });

  return {
    createAppointment: mutate,
    isPending,
    isError,
    error,
  };
}
