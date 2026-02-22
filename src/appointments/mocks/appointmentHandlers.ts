import { http, HttpResponse } from "msw";
import { specialtiesResponseMock } from "./fixtures";

export const createAppointmentHandlers = (baseUrl: string) => {
  return [
    http.get(`${baseUrl}/specialties`, () => {
      return HttpResponse.json(specialtiesResponseMock);
    }),
  ];
};
