export type DoctorsBySpecialtyResponse = {
  id: string;
  name: string;
  imageUrl: string;
  rating: {
    rate: number;
    amountOfReviews: number;
  };
  nextAvailable: string;
  bio: {
    en: string;
  };
}[];
