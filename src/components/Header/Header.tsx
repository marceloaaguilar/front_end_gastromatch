import React from 'react';
import { Link } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import { MessageCircle } from "lucide-react";

export default function Header() {

    const {user, logout} = useAuth()

  return (
    <header className="flex items-center justify-between z-50 px-6 py-4 bg-white shadow-md md:px-12">
        
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-primary">
            GastroMatch
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Início</Link>
            
            {user?.type === "PROFESSIONAL" ?  
                <Link to="/chefagendamentos" className="text-gray-700 hover:text-primary font-medium">Meus Agendamentos</Link> :
                <Link to="/agendamentos" className="text-gray-700 hover:text-primary font-medium">Agendamentos</Link>
            } 

            <Link to="/chefs" className="text-gray-700 hover:text-primary font-medium">Chefs</Link>
            {/* <Link to="#" className="text-gray-700 hover:text-primary font-medium">Contato</Link> */}
            <Link to="/sobre" className="text-gray-700 hover:text-primary font-medium">Sobre</Link>
            
            
        </nav>

        {!user ? (
            <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">Entrar</Link>
                <Link to="/cadastro" className="bg-[#ea580c] text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">Cadastrar</Link>
            </div>
        ) : (
            <div className="flex items-center space-x-4">
                <Link to="/perfil" className="flex items-center space-x-2 hover:text-primary">
                    <img
                        src={user?.photo || "/default-user.png"}
                        alt="Foto do usuário"
                        className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">{user?.nome}</span>
                </Link>

                <Link
                    to="/chat"
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                    title="Ir para o chat"
                >
                    <MessageCircle className="w-5 h-5" />
                </Link>

                <button
                    onClick={logout}
                    className="cursor-pointer bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition text-sm font-medium"
                >
                    Sair
                </button>
            </div>
        )}

    </header>
  
  )
  
}