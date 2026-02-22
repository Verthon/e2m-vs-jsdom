import { createHttpClient } from "src/core/api/services/httpClientService"

const apiUrl = import.meta.env.PUBLIC_APPOINTMENTS_API
if (!apiUrl) {
  throw new Error('PUBLIC_APPOINTMENTS_API environment variable is not configured')
}

const appointmentsClient = createHttpClient({
  baseUrl: apiUrl,
})

export const fetchSpecialties = () =>
  appointmentsClient.get<SpecialtyFromApi[]>('/specialties')