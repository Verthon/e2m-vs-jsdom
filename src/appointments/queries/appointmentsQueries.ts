import { queryOptions } from '@tanstack/react-query';
import { fetchSpecialties, fetchDoctorsBySpecialty, fetchTimeslots, fetchTermsOfService, fetchCancellationPolicy } from '../services/appointmentsService';

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
  timeslots: (doctorId: string, date: string) =>
    queryOptions({
      queryKey: [...appointmentsQueries.all(), 'timeslots', doctorId, date] as const,
      queryFn: () => fetchTimeslots(doctorId, date),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
    }),
  termsOfService: () =>
    queryOptions({
      queryKey: [...appointmentsQueries.all(), 'terms-of-service'] as const,
      queryFn: fetchTermsOfService,
      staleTime: Infinity,
      retry: false,
    }),
  cancellationPolicy: () =>
    queryOptions({
      queryKey: [...appointmentsQueries.all(), 'cancellation-policy'] as const,
      queryFn: fetchCancellationPolicy,
      staleTime: Infinity,
      retry: false,
    }),
} as const;
