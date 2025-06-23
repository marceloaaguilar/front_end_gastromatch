import { SetStateAction } from "react"

export interface AlertProps {
  show: boolean,
  title: string,
  onClose: () => void,
  mainMenssage?: string
}

export interface UserProps {
  id?: number,
  nome: string,
  email: string,
  telefone: string, 
  endereco?: string,
  senha?: string,
  confirmarSenha?: string, 
  type: 'CUSTOMER' | 'PROFESSIONAL' ,
  photo?: string
}

export interface UserLogin {
  nome: string,
  email: string,
  telefone: string, 
  type: 'CUSTOMER' | 'PROFESSIONAL' 
}

export interface BtnProps {
  title: string,
  callback: (e:any) => void,
  isLoading?: boolean
}

export interface ModalUserEditProps{
  open: boolean
  onClose: () => void;
  userData?: UserProps
}

export interface Chef {
  id: number,
  specialization: string,
  experience: number,
  professional_description: string,
  price_per_hour: number,
  rating?: number,
  user: {
    id?: number
    name: string,
    email: string,
    profile_photo: string
  }
}

export interface ReservationProps{
  id?: number,
  customer_name: string,
  customer_cpf: string,
  customer_email: string,
  description: string,
  phone: string,
  user: number,
  chefData: Chef,
  date: Date,
  location: string,
  guests: number,
  notes?: string,
  mealType: string,
  dietary_restrictions: string
  rating?: number
}

export interface PaginationType {
  currentPage: number 
  totalPages: number
  onPageChange: (currentPage:number) => void
  limit?: number
}

export interface UserChat {
  id: number,
  name: string
}

export interface MessageChat {
  from: number,
  to: number,
  text: string
}