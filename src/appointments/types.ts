export type PolicySection = {
  title: string;
  description: string;
};

export type PolicyDocument = {
  introduction: string;
  sections: PolicySection[];
};

export type TermsOfServiceResponse = PolicyDocument;

export type CancellationPolicyResponse = PolicyDocument;

export type SelectedSpecialty = {
  id: string;
  name: string;
  description: string;
};

export type SelectedDoctor = {
  id: string;
  name: string;
  photoUrl: string;
};

export type AppointmentDraft = {
  specialty: SelectedSpecialty | null;
  doctor: SelectedDoctor | null;
  date: Date | null;
  time: string | null;
};

export type CreateAppointmentRequest = {
  specialtyId: string;
  doctorId: string;
  date: string;
  time: string;
};

export type CreateAppointmentResponse = {
  id: string;
  specialtyName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
};

