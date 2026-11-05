export interface RegistrationFormData {
  chineseName: string;
  englishName: string;
  phonePrefix: string;
  phone: string;
  email: string;
  currentCareer: string;
  yearsExperience: string;
  bringingGuest: boolean;
  guestName?: string;
  careerQuestion?: string;
  agreedTerms: boolean;
}

export interface RegistrationTicket {
  id: string;
  registrationNo: string;
  ticketCode: string;
  luckyDrawNumber: string;
  seatNumber: string;
  createdAt: string;
  formData: RegistrationFormData;
}

export interface Speaker {
  id: string;
  name: string;
  englishName: string;
  title: string;
  role: string;
  transitionOrigin: string;
  experienceYears: number;
  honors: string[];
  keyQuote: string;
  bio: string;
  keyTopics: string[];
}
