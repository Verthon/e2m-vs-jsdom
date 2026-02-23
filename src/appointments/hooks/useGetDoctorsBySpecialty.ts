import { useQuery } from '@tanstack/react-query';
import { appointmentsQueries } from '../queries/appointmentsQueries';

export const useGetDoctorsBySpecialty = (specialtyId: string) => {
  const { data, isPending, isError, refetch } = useQuery(appointmentsQueries.doctorsBySpecialty(specialtyId));
  return { doctors: data, isPending, isError, refetch };
};
