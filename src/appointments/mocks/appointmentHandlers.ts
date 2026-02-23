import { http, HttpResponse } from "msw";
import { specialtiesResponseMock, doctorsBySpecialtyMock } from "./fixtures";

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
  ];
};
