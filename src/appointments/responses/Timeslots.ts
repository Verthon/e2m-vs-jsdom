export type Timeslot = {
  time: string;
  available: boolean;
};

export type TimeslotsResponse = {
  date: string;
  slots: Timeslot[];
};
