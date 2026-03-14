import { http, HttpResponse } from "msw";
import { specialtiesResponseMock, doctorsBySpecialtyMock, timeslotsMock, timeslotsByDate, TIMESLOTS_ERROR_DATE, termsOfServiceMock, cancellationPolicyMock } from "./fixtures";

export const createAppointmentHandlers = (baseUrl: string) => {
  return [
    http.get(`${baseUrl}/specialties`, () => {
      return HttpResponse.json(specialtiesResponseMock);
    }),
    http.get(`${baseUrl}/doctors/:id`, ({ params }) => {
      const doctors = doctorsBySpecialtyMock[params.id as string];
      if (!doctors) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(doctors);
    }),
    http.get(`${baseUrl}/doctors/:doctorId/timeslots`, ({ request, params }) => {
      const url = new URL(request.url);
      const date = url.searchParams.get('date');

      if (date === TIMESLOTS_ERROR_DATE) {
        return new HttpResponse(null, { status: 500 });
      }

      if (date && date in timeslotsByDate) {
        return HttpResponse.json(timeslotsByDate[date]);
      }

      const timeslots = timeslotsMock[params.doctorId as string];
      if (!timeslots) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(timeslots);
    }),
    http.get(`${baseUrl}/terms-of-service`, () => {
      return HttpResponse.json(termsOfServiceMock);
    }),
    http.get(`${baseUrl}/cancellation-policy`, () => {
      return HttpResponse.json(cancellationPolicyMock);
    }),
  ];
};
