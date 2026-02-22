import { useState } from 'react';
import { RadioGroup } from '@base-ui/react/radio-group';
import { useAppointmentsTranslation } from '../../i18n/useAppointmentsTranslation';
import { DoctorCard } from './DoctorCard';

interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  rating: string;
  nextAvailable: string;
  bio: string;
}

const DOCTORS: Doctor[] = [
  {
    id: 'jane-smith',
    name: 'Dr. Jane Smith',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8q44jdosWjivrD01o7afpb6R-tYM_lencDvPwO-ejfiBySaDooqYvrCX8jM8WKzTbn_aQvmsdjdamSqUUqFWEzQbtslvBrOGl1KP3bvkJEJHSiAXMJ8J8NpUEX6qoqqYAjfq1mfzC6g36gd03D_1jN86D1hbYkLzFUweXEvBZqT-6GjTSswksj1JQHPzjr3s4Abtyap6Qi3jE_d0XrwUvKJkNhDS9AcTfeUiKqX-O9q2x-bKBdA-GTMnF_VkRq9Pz39VDQYnt2Os',
    imageAlt: 'Portrait of Dr. Jane Smith in clinical setting',
    rating: '4.9 (210 reviews)',
    nextAvailable: 'Next available: Tomorrow, 10:00 AM',
    bio: 'Specialist in Internal Medicine with over 12 years of experience. Focused on preventative care and patient education.',
  },
  {
    id: 'michael-chen',
    name: 'Dr. Michael Chen',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBlvwcq1X2shTsNb0TmlI8hLWiXUbKOvBgwz_X-eyy3KFFumAt9vaGlQlhAMVkL8RmW6xBKiUihh9Lfr7YvJRCet4Ec6vVSa-Nf2qX8lwYxXbGL4UaKhWNLX2c7v43XijtyVTXN4A4oFnfguZrn-x6zlwq2Bj5WNxTQ8o6w3OUx65KKzA2NIjFl4WUkTkVjOMzgvupz9Tzp6KAfsOE7ylkB1T8pm0gSTVyMrfvYgLT91fCAv3x-ip6C6yecMIsX_vNd5g41iA-1bE',
    imageAlt: 'Portrait of Dr. Michael Chen wearing a white coat',
    rating: '4.8 (120 reviews)',
    nextAvailable: 'Next available: Today, 3:30 PM',
    bio: 'Board-certified Cardiologist specializing in heart health and diagnostic screenings. Known for thorough patient assessments.',
  },
  {
    id: 'sarah-miller',
    name: 'Dr. Sarah Miller',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArUK62LjatE-vpMj7_fmLwQQyiPNbVZv-xSFvlGkyRfxtVFYlFMRdGcRKsyJObIi9c_kJn-60VQXCQTBVEp_UfdMgOOHjNGhUDTx2HU18OYMhCFfdnw5lTaS5NHO9Eveu3FOA1MfjbU7GiiT0GH5CEF5YANptEPHWAugGOEC-IxlyQyb8Ymdux1iLIhuT38fvrjuwCe0u49SMcJRBGuFTknuSk71jPI9saxlv-KCNrhIABFwdLoRUKNtbvlsEwS5PW6tAaXIDuqAI',
    imageAlt: 'Portrait of Dr. Sarah Miller in clinical office',
    rating: '5.0 (84 reviews)',
    nextAvailable: 'Next available: Wednesday, 9:15 AM',
    bio: 'Family practitioner with a focus on pediatric care and wellness checks. Highly rated for bedside manner.',
  },
];

interface ChooseDoctorProps {
  readonly onDoctorSelect?: (doctorId: string) => void;
}

export function ChooseDoctor({ onDoctorSelect }: ChooseDoctorProps) {
  const { t } = useAppointmentsTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (doctorId: string) => {
    setSelectedId(doctorId);
    onDoctorSelect?.(doctorId);
  };

  return (
    <section aria-label={t('appointments.chooseDoctor.section')} className="flex flex-col">
      <h2 className="text-slate-900 dark:text-white text-xl font-bold">
        {t('appointments.chooseDoctor.section')}
      </h2>
      <RadioGroup
        value={selectedId ?? ''}
        onValueChange={handleSelect}
        aria-label={t('appointments.chooseDoctor.section')}
        className="flex flex-col gap-6"
      >
        {DOCTORS.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            value={doctor.id}
            name={doctor.name}
            imageUrl={doctor.imageUrl}
            imageAlt={doctor.imageAlt}
            rating={doctor.rating}
            nextAvailable={doctor.nextAvailable}
            bio={doctor.bio}
            isSelected={selectedId === doctor.id}
            onSelect={() => handleSelect(doctor.id)}
          />
        ))}
      </RadioGroup>
    </section>
  );
}
