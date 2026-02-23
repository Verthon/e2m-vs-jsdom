import { queryOptions } from '@tanstack/react-query';
import { fetchSpecialties, fetchDoctorsBySpecialty } from '../services/appointmentsService';

export const appointmentsQueries = {
  all: () => ['appointments'] as const,
  specialties: () =>
    queryOptions({
      queryKey: [...appointmentsQueries.all(), 'specialties'] as const,
      queryFn: fetchSpecialties,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
    }),
  doctorsBySpecialty: (specialtyId: string) =>
    queryOptions({
      queryKey: [...appointmentsQueries.all(), 'doctors', specialtyId] as const,
      queryFn: () => fetchDoctorsBySpecialty(specialtyId),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
    }),
} as const;
