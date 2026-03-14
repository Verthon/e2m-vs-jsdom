import { createHttpClient } from "src/core/api/services/httpClientService"
import type { DoctorsBySpecialtyResponse } from "../responses/DoctorsBySpecialty"
import type { TimeslotsResponse } from "../responses/Timeslots"
import type { SpecialtiesResponse } from "../responses/Specialties"
import type { TermsOfServiceResponse, CancellationPolicyResponse } from "../types"

const apiUrl = import.meta.env.PUBLIC_APPOINTMENTS_API
if (!apiUrl) {
  throw new Error('PUBLIC_APPOINTMENTS_API environment variable is not configured')
}

const appointmentsClient = createHttpClient({
  baseUrl: apiUrl,
})

export const fetchSpecialties = () =>
  appointmentsClient.get<SpecialtiesResponse>('/specialties')

export const fetchDoctorsBySpecialty = (specialtyId: string) =>
  appointmentsClient.get<DoctorsBySpecialtyResponse>(`/doctors/${specialtyId}`)

export const fetchTimeslots = (doctorId: string, date: string) =>
  appointmentsClient.get<TimeslotsResponse>(`/doctors/${doctorId}/timeslots`, { params: { date } })

export const fetchTermsOfService = () =>
  appointmentsClient.get<TermsOfServiceResponse>('/terms-of-service')

export const fetchCancellationPolicy = () =>
  appointmentsClient.get<CancellationPolicyResponse>('/cancellation-policy')