export type BookCategory =
  | 'treinamento'
  | 'esportes'
  | 'saude'
  | 'educacao';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description?: string;
  pages?: number;
  edition?: string;
}

export type ShirtSizeCode = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG';

export interface ShirtSize {
  code: ShirtSizeCode;
  name: string;
  width: number;       // largura em cm (tórax/busto)
  length: number;      // comprimento em cm
  chestCircumference?: string;
  description: string;
  recommendedFor?: string;
}

export interface StudentData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  course: string;
  confirmedMatricula: boolean;
}

export interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  confirmedAddress: boolean;
}

export interface KitSubmissionPayload {
  protocol: string;
  timestamp: string;
  student: StudentData;
  book: Book;
  shirt: {
    size: ShirtSizeCode;
    measure: string;
  };
  address: AddressData;
}

export interface SubmissionResponse {
  success: boolean;
  protocol?: string;
  googleSheetsSuccess?: boolean;
  rdStationSuccess?: boolean;
  error?: string;
}
