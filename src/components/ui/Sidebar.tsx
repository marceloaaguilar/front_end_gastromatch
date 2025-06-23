import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Phone
} from "lucide-react";
import { UserProps } from "@/src/lib/interfaces";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function SideBar(props:UserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleItemClick = () => setIsOpen(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { nome, email, photo } = props;


  return (
    <>
        <button
            className="fixed top-4 left-4 z-50 text-white bg-orange-600 p-2 rounded-full shadow-lg cursor-pointer"
            onClick={toggleSidebar}
        >
            <Menu size={24} />
        </button>

        {isOpen && (
            <div
            className="fixed inset-0 z-40 bg-black opacity-30"
            onClick={toggleSidebar}
            />
        )}

        <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-orange-600 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="absolute top-4 right-4">
            <button className="cursor-pointer" onClick={toggleSidebar}>
                <X size={24} />
            </button>
            </div>

            <div className="mt-16 px-6 space-y-6">
            <div
                className="flex items-center gap-2 cursor-pointer hover:text-orange-100"
                onClick={handleItemClick}
            >
                <Home size={20} /> <span>Início</span>
            </div>
            <div
                className="flex items-center gap-2 cursor-pointer hover:text-orange-100"
                onClick={handleItemClick}
            >
                <Briefcase size={20} /> <span>Minhas Reservas</span>
            </div>
            <div
                className="flex items-center gap-2 cursor-pointer hover:text-orange-100"
                onClick={handleItemClick}
            >
                <Phone size={20} /> <span>Contato</span>
            </div>

            <div className="mt-10 pt-6 border-t border-orange-300 flex items-center gap-3">
                <img
                src={photo}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                onClick={() => navigate("/perfil")}
                />
                <div>
                <p
                    className="text-sm font-semibold cursor-pointer"
                    onClick={() => navigate("/perfil")}
                >
                    {nome}
                </p>
                <p
                    className="text-xs text-orange-200 cursor-pointer"
                    onClick={() => navigate("/perfil")}
                >
                    {email}
                </p>
                </div>
            </div>

            <div
                className="flex items-center gap-2 mt-6 text-sm cursor-pointer hover:text-orange-100"
                onClick={() => logout()}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
                </svg>
                <span>Sair</span>
            </div>
            </div>
        </div>
    </>

  );
};
