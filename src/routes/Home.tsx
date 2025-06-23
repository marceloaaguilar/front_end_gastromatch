import React, { useEffect, useState } from "react";
import { Chef } from "../lib/interfaces";
import Sidebar  from "../components/ui/Sidebar"
import { UserProps } from "../lib/interfaces";
import { useAuth } from "../context/AuthProvider";
import ModalReservation from "../components/ModalReservation";
import Header from "../components/Header/Header";
import SuccessAlert from "../components/ui/alerts/SuccessAlert";
import { Link } from "react-router-dom";
import { getServerUrl } from '../utils/env';

const Home = () => {
    
    const [userData, setUserData] = useState<UserProps | undefined>();
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [busca, setBusca] = useState("");
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<string>("");
    const {user} = useAuth();
    const [openModalReservation, setOpenModalReservation] = useState<boolean>(false);
    const [selectedChef, setSelectedChef] = useState<Chef>();
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    if (!user) return null;

    useEffect(() => {
        async function fetChefs() {
            const response = await fetch(`${getServerUrl()}/api/chefs?limit=4`, {credentials: 'include'});
            const resultChefs = await response.json();
            
            if (resultChefs && resultChefs.data && resultChefs.data.chefs) {
                setChefs(resultChefs.data.chefs);
            }
        }

        fetChefs();
    }, []);

    // Filter chefs based on search term and selected specialty
    const filteredChefs = chefs.filter(chef => {
        const matchesSearch = busca === "" || 
            chef.user.name.toLowerCase().includes(busca.toLowerCase()) ||
            chef.specialization.toLowerCase().includes(busca.toLowerCase()) ||
            chef.professional_description?.toLowerCase().includes(busca.toLowerCase());

        const matchesSpecialty = especialidadeSelecionada === "" || 
            chef.specialization.toLowerCase().includes(especialidadeSelecionada.toLowerCase());

        return matchesSearch && matchesSpecialty;
    });

    return (
        <>  
            {/* {user && <Sidebar {...user} />} */}

            <Header/>
            
            <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
                
                <section className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Encontre os melhores <span className="text-primary">Chefs</span> e <span className="text-primary">pratos</span> exclusivos
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                    Descubra experiências gastronômicas únicas com chefs selecionados perto de você.
                    </p>
                </section>

                <section className="max-w-2xl mx-auto">
                    <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar Chefs, pratos..."
                        className="w-full pl-5 pr-12 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-md text-gray-800 placeholder-gray-400"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        🔍
                    </span>
                    </div>
                </section>

  
                <section className="flex flex-wrap justify-center gap-8 p-2">
                    
                    <div 
                        className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${especialidadeSelecionada === "Japonesa" ? "ring-2 ring-primary rounded-md" : ""}`}
                        onClick={() => setEspecialidadeSelecionada(especialidadeSelecionada === "Japonesa" ? "" : "Japonesa")}
                    >
                        <img src="/images/sushi.png" alt="Culinária Japonesa" className="w-[150px] h-[150px] object-cover rounded-md" />
                        <p className="mt-2 text-center text-sm font-medium">Japonesa</p>
                    </div>

                    <div 
                        className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${especialidadeSelecionada === "Italiana" ? "ring-2 ring-primary rounded-md" : ""}`}
                        onClick={() => setEspecialidadeSelecionada(especialidadeSelecionada === "Italiana" ? "" : "Italiana")}
                    >
                        <img src="/images/macarrao.png" alt="Culinária Italiana" className="w-[150px] h-[150px] object-cover rounded-md" />
                        <p className="mt-2 text-center text-sm font-medium">Italiana</p>
                    </div>

                    <div 
                        className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${especialidadeSelecionada === "Argentina" ? "ring-2 ring-primary rounded-md" : ""}`}
                        onClick={() => setEspecialidadeSelecionada(especialidadeSelecionada === "Argentina" ? "" : "Argentina")}
                    >
                        <img src="/images/costela.png" alt="Culinária Argentina" className="w-[150px] h-[150px] object-cover rounded-md" />
                        <p className="mt-2 text-center text-sm font-medium">Argentina</p>
                    </div>

                    <div 
                        className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${especialidadeSelecionada === "Brasileira" ? "ring-2 ring-primary rounded-md" : ""}`}
                        onClick={() => setEspecialidadeSelecionada(especialidadeSelecionada === "Brasileira" ? "" : "Brasileira")}
                    >
                        <img src="/images/feijoada.png" alt="Culinária Brasileira" className="w-[150px] h-[150px] object-cover rounded-md" />
                        <p className="mt-2 text-center text-sm font-medium">Brasileira</p>
                    </div>

                </section>     

                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Chefs Disponíveis</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredChefs.map((chef) => (
                            <div
                                key={chef.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                            >
                                <img
                                src={chef.user.profile_photo}
                                alt={chef.user.name}
                                className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800">{chef.user.name}</h3>
                                <p className="text-sm text-gray-500">{chef.specialization}</p>
                                {chef.professional_description && (
                                    <p className="text-xs text-gray-400 mt-2">{chef.professional_description}</p>
                                )}
                                <button onClick={()=> (setSelectedChef(chef), setOpenModalReservation(true))} className="mt-4 w-full px-4 py-1 bg-[#ea580c] text-white rounded-md hover:bg-[#d45209] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ea580c]">
                                    Reservar
                                </button>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="w-full text-center mt-6">
                        <Link to="/chefs" className="text-gray-700 hover:text-primary font-medium text-center hover:underline"> Ver todos</Link>
                    </div>
                
                </section>
            </div>
                            
            {selectedChef ?
            <>
                <ModalReservation userData={user} open={openModalReservation} onClose={() => setOpenModalReservation(false)} selectedChef={selectedChef} setShowModalSuccess={() => (setOpenModalReservation(false), setShowSuccessModal(true))}/>
                <SuccessAlert show={showSuccessModal} title="Sua solicitação de agendamento foi realizada com sucesso!" onClose={() => setShowSuccessModal(false)}/>
            </>
                
                : null
            }

        </>
    );
};

export default Home;