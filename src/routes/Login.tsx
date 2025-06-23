import { useState } from "react"
import { LoginForm } from "../components/Login/LoginForm";
import { Link } from "react-router";


export default function Login() {

    return (
        <div className="bg-[#fff5f2] flex items-center justify-center h-screen">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row h-max">
                <div className="bg-[#ea580c] text-white p-8 md:w-1/2 flex flex-col h-full">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
                        <p className="text-white/90">
                        Acesse sua conta para continuar sua jornada gastronômica.
                        </p>
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                        <div className="w-full max-w-xs">
                        <img
                            src="/images/italian-pizza-chef-character-5692723.svg"
                            alt="Chef Illustration"
                            className="w-full h-auto"
                        />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 md:w-1/2 flex flex-col ">
                    <div className="flex mb-8 border-b">
                        <button
                        className="py-2 px-6 font-medium 
                             text-[#ea580c] border-[#ea580c] border-b-2
                        } cursor-pointer"
                        >
                        Login
                        </button>
                        <Link
                            className="py-2 px-6 font-medium text-gray-500
                            cursor-pointer"
                            to={"/cadastro"}
                            >
                        Cadastro
                        </Link>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                         <LoginForm />
                    </div>
                </div>
            </div>
        </div>

    )
}
