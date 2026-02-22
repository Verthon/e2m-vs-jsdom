import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchSpecialties } from "../services/appointmentsService";

export const appointmentsQueries = {
  all: () => ["appointments"] as const,
  specialties: () =>
    queryOptions({
      queryKey: [...appointmentsQueries.all(), "specialties"] as const,
      queryFn: fetchSpecialties,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
    }),
} as const;

export const useGetSpecialties = () =>
  useQuery(appointmentsQueries.specialties());
