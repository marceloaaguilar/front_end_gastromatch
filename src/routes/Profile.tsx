import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    ChevronRight,
    Edit2,
    LogOut,
    Bell,
    CreditCard,
    Lock,
    HelpCircle,
    Utensils,
    User,
  } from "lucide-react";
import { Link, Navigate } from "react-router";
import { UserProps } from "../lib/interfaces";
import ModalUserEdit from "../components/Profile/ModalUserEdit";
import { getServerUrl } from '../utils/env';

export default function Profile() {

  const [activeTab, setActiveTab] = useState<"info" | "seguranca" | "pagamento" | "preferencias">("info");
  const [userData, setUser] = useState<UserProps | undefined>(undefined);
  const [openModalUserEdit, setOpenModalUserEdit] = useState<boolean>(false);

  useEffect(()=> {
    async function getUserData(){
        const response = await fetch(`${getServerUrl()}/api/users/verify-token`, {credentials: "include"});
        const result = await response.json();

        if (response.ok && result.user) {
            const data = result.user;
            setUser({
                id: data.id,
                nome: data.name,
                email: data.email,
                telefone: data.phone,
                endereco: data.address,
                type: data.role,
                photo: data.profile_photo
            });

        }
    }

    getUserData();

  }, [!openModalUserEdit]);
  
  return (
    <>
        <div className="min-h-screen bg-gray-50">

            <Header />

            <main className="max-w-6xl mx-auto py-10 px-4">
                {userData ?
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-primary-600 p-6 text-white">

                                    <div className="flex items-center">

                                    <div className="w-16 h-16 rounded-full bg-white overflow-hidden mr-4">
                                        <img src="" alt=""/>
                                    </div>

                                    <div>
                                        <h1 className="font-bold text-xl">{userData.nome}</h1>
                                    </div>

                                    </div>
                                </div>

                                <nav className="p-4">
                                    <ul className="space-y-1">

                                    <li>
                                        <button
                                        onClick={() => setActiveTab("info")}
                                        className={`w-full flex items-center p-3 rounded-md cursor-pointer ${
                                            activeTab === "info" ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        >
                                        <User className="w-5 h-5 mr-3" />
                                        Informações Pessoais
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                        onClick={() => setActiveTab("preferencias")}
                                        className={`w-full flex items-center p-3 rounded-md ${
                                            activeTab === "preferencias"
                                            ? "bg-primary-50 text-primary-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        >
                                        <Utensils className="w-5 h-5 mr-3" />
                                        Preferências Culinárias
                                        </button>
                                    </li>
                                    
                                    <li>
                                        <button
                                        onClick={() => setActiveTab("seguranca")}
                                        className={`w-full flex items-center p-3 rounded-md ${
                                            activeTab === "seguranca" ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                        >
                                        <Lock className="w-5 h-5 mr-3" />
                                        Segurança
                                        </button>
                                    </li>

                                    <li className="pt-2 mt-2 border-t border-gray-200">
                                        <Link
                                        to="/avaliacao"
                                        className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
                                        >
                                        <Calendar className="w-5 h-5 mr-3" />
                                        Histórico de Agendamentos
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="#" className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100">
                                        <Bell className="w-5 h-5 mr-3" />
                                        Notificações
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="#" className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100">
                                        <HelpCircle className="w-5 h-5 mr-3" />
                                        Ajuda e Suporte
                                        </Link>
                                    </li>

                                    <li className="pt-2 mt-2 border-t border-gray-200">
                                        <button className="w-full flex items-center p-3 rounded-md text-red-600 hover:bg-red-50">
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Sair
                                        </button>
                                    </li>

                                    </ul>
                                </nav>

                            </div>
                        </div>

                        <div className="flex-1">
                            {activeTab === "info" && (

                            <div className="bg-white rounded-lg shadow-md p-6">

                                <div className="flex justify-between items-center mb-6">

                                <h2 className="text-xl font-bold">Informações Pessoais</h2>

                                <button className="flex items-center text-primary-600 hover:text-primary-700 cursor-pointer" onClick={()=> setOpenModalUserEdit(true)}>
                                    <Edit2 className="w-4 h-4 mr-1" />
                                    Editar
                                </button>
                                </div>

                                <div className="space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                                        <img className="w-full h-full object-cover" src={userData.photo} alt="Foto de perfil do usuário" />
                                    </div>
                                    <div>
                                    
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                                            <User className="w-5 h-5 text-gray-400 mr-2" />
                                            <span>{userData.nome}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                                            <Mail className="w-5 h-5 text-gray-400 mr-2" />
                                            <span>{userData.email}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                                            <Phone className="w-5 h-5 text-gray-400 mr-2" />
                                            <span>{userData.telefone}</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                                            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                            <span>{userData.endereco}</span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )}

                            {/* Preferências Culinárias */}
                            {activeTab === "preferencias" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Preferências Culinárias</h2>
                                <button className="flex items-center text-primary-600 hover:text-primary-700">
                                    <Edit2 className="w-4 h-4 mr-1" />
                                    Editar
                                </button>
                                </div>

                                <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-3">Cozinhas Favoritas</h3>
                                    <div className="flex flex-wrap gap-2">
                                    {/* {user.preferences.map((pref, index) => (
                                        <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                                        {pref}
                                        </span>
                                    ))} */}
                                    <button className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:bg-gray-50">
                                        + Adicionar
                                    </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-3">Restrições Alimentares</h3>
                                    <div className="flex flex-wrap gap-2">
                                    {/* {user.dietaryRestrictions.map((restriction, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {restriction}
                                        </span>
                                    ))} */}
                                    <button className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:bg-gray-50">
                                        + Adicionar
                                    </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-3">Ocasiões Preferidas</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="w-4 h-4 text-primary-600 mr-3" />
                                        Jantares Românticos
                                    </label>
                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="w-4 h-4 text-primary-600 mr-3" checked />
                                        Reuniões Familiares
                                    </label>
                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="w-4 h-4 text-primary-600 mr-3" checked />
                                        Eventos Corporativos
                                    </label>
                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="w-4 h-4 text-primary-600 mr-3" />
                                        Festas de Aniversário
                                    </label>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )}

                            {/* Métodos de Pagamento */}
                            {activeTab === "pagamento" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Métodos de Pagamento</h2>
                                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                    Adicionar Novo
                                </button>
                                </div>

                                <div className="space-y-4">
                                <div className="border rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                    <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-bold text-sm">VISA</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• 4567</p>
                                        <p className="text-sm text-gray-500">Expira em 12/2025</p>
                                    </div>
                                    </div>
                                    <div className="flex items-center">
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-3">Padrão</span>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                    <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center mr-4">
                                        <span className="text-red-800 font-bold text-sm">MC</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• 8901</p>
                                        <p className="text-sm text-gray-500">Expira em 08/2024</p>
                                    </div>
                                    </div>
                                    <div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-medium mb-3">Outros Métodos de Pagamento</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3">
                                        <span className="text-green-800 font-bold text-sm">PIX</span>
                                        </div>
                                        <span>Adicionar PIX</span>
                                    </button>
                                    <button className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                                        <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center mr-3">
                                        <span className="text-yellow-800 font-bold text-sm">$</span>
                                        </div>
                                        <span>Adicionar Boleto</span>
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )}

                            {/* Segurança */}
                            {activeTab === "seguranca" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Segurança</h2>
                                </div>

                                <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium mb-3">Alterar Senha</h3>
                                    <form className="space-y-4">
                                    <div>
                                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Senha Atual
                                        </label>
                                        <input
                                        type="password"
                                        id="current-password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nova Senha
                                        </label>
                                        <input
                                        type="password"
                                        id="new-password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirmar Nova Senha
                                        </label>
                                        <input
                                        type="password"
                                        id="confirm-password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                                    >
                                        Atualizar Senha
                                    </button>
                                    </form>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="font-medium mb-3">Verificação em Duas Etapas</h3>
                                    <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-700">Proteja sua conta com verificação em duas etapas</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                        Receba um código de verificação no seu celular ao fazer login
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="font-medium mb-3">Sessões Ativas</h3>
                                    <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-green-800 font-bold">SP</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">São Paulo, Brasil</p>
                                            <p className="text-xs text-gray-500">Chrome • Windows • Agora mesmo</p>
                                        </div>
                                        </div>
                                        <span className="text-green-600 text-sm">Atual</span>
                                    </div>

                                    <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-gray-800 font-bold">RJ</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Rio de Janeiro, Brasil</p>
                                            <p className="text-xs text-gray-500">Safari • iPhone • 2 dias atrás</p>
                                        </div>
                                        </div>
                                        <button className="text-red-600 text-sm hover:text-red-700">Encerrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            )}

                            {/* Agendamentos Recentes */}
                            {activeTab === "info" && (
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Agendamentos Recentes</h2>
                                <Link to="/avaliacao" className="text-primary-600 hover:text-primary-700 text-sm">
                                    Ver todos
                                </Link>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* {recentBookings.map((booking, index) => (
                                    <div
                                    key={booking.id}
                                    className={`p-4 flex items-center justify-between ${
                                        index < recentBookings.length - 1 ? "border-b border-gray-100" : ""
                                    }`}
                                    >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-primary-700 font-bold">{booking.chefName.charAt(0)}</span>
                                        </div>
                                        <div>
                                        <p className="font-medium">{booking.chefName}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            <span>{booking.date}</span>
                                            <Clock className="w-3 h-3 ml-2 mr-1" />
                                            <span>{booking.time}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-3">
                                        {booking.status}
                                        </span>
                                        <Link href={`/avaliacao?id=${booking.id}`} className="text-gray-400 hover:text-gray-600">
                                        <ChevronRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                    </div>
                                ))} */}
                                </div>
                            </div>
                            )}
                        </div>
                    </div> : <></>
                }
            </main>

        </div>

        <ModalUserEdit open={openModalUserEdit} onClose={() => setOpenModalUserEdit(false)} userData={userData}/>
    </>
  )
}