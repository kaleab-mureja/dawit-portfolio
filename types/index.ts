// These interfaces represent the shape of data *after* JSON serialization,
// which is what your Next.js components will receive.

export interface EducationEntry {
  _id: string;
  degree: string;
  university: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  thesis?: string;
  advisors?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsEntry {
  _id: string;
  content: string;
  eventDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicationEntry {
  _id: string;
  image?: string;
  title: string;
  authors: string[];
  conferenceOrJournal: string;
  year: number;
  pdfLink?: string;
  codeLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AwardEntry {
  _id: string;
  title: string;
  awardingBody: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceEntry {
  _id: string;
  image?: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IServiceDetail {
  item: string;
}
export interface IService {
  category: string;
  details: IServiceDetail[];
  createdAt: Date;
  updatedAt: Date;
}

// Client-consumed Service entry shape after serialization
export interface ServiceEntry {
  _id: string;
  category: string;
  details: { item: string }[];
  createdAt: string;
  updatedAt: string;
}