import { useQuery } from '@tanstack/react-query';
import { appointmentsQueries } from '../queries/appointmentsQueries';

export const useTermsOfService = () => {
  const { data, isPending, isError } = useQuery(appointmentsQueries.termsOfService());
  return { data, isPending, isError };
};
