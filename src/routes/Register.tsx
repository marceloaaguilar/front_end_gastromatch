
import { Link } from "react-router-dom"
import RegisterForm from "../components/Login/RegisterForm"
// import { Camera, Plus } from "lucide-react"

export default function Register() {

  return (
    <div className="bg-[#fff8f0] h-full">
      <header className="flex items-center justify-between px-4 py-4 bg-white md:px-12">
        <Link to="/" className="text-xl font-bold text-[#ea580c]">
          GastroMatch
        </Link>
        <Link to="/login" className="text-sm text-gray-600 hover:text-[#ea580c]">
          Já tem uma conta? Entrar
        </Link>
      </header>

      <RegisterForm/>
      
    </div>
  )
}