import { useQuery } from '@tanstack/react-query';
import { appointmentsQueries } from '../queries/appointmentsQueries';

export const useCancellationPolicy = () => {
  const { data, isPending, isError } = useQuery(appointmentsQueries.cancellationPolicy());
  return { data, isPending, isError };
};
