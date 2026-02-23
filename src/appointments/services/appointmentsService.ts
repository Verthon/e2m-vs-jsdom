import { createHttpClient } from "src/core/api/services/httpClientService"
import type { DoctorsBySpecialtyResponse } from "../responses/DoctorsBySpecialty"

const apiUrl = import.meta.env.PUBLIC_APPOINTMENTS_API
if (!apiUrl) {
  throw new Error('PUBLIC_APPOINTMENTS_API environment variable is not configured')
}

const appointmentsClient = createHttpClient({
  baseUrl: apiUrl,
})

export const fetchSpecialties = () =>
  appointmentsClient.get<SpecialtyFromApi[]>('/specialties')

export const fetchDoctorsBySpecialty = (specialtyId: string) =>
  appointmentsClient.get<DoctorsBySpecialtyResponse>(`/doctors/${specialtyId}`)