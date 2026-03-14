import { useQuery } from '@tanstack/react-query';
import { appointmentsQueries } from '../queries/appointmentsQueries';

export const useGetTimeslots = (doctorId: string, date: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    ...appointmentsQueries.timeslots(doctorId, date),
    enabled: !!doctorId && !!date,
  });
  return { timeslots: data, isPending, isError, refetch };
};
