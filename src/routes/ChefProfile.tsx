import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServerUrl } from "../utils/env.node";
import { Chef } from "../lib/interfaces";
import Header from "../components/Header/Header";
import { useAuth } from "../context/AuthProvider";
import ModalReservation from "../components/ModalReservation";
import SuccessAlert from "../components/ui/alerts/SuccessAlert";

export default function ChefProfile() {
  const { id } = useParams<{ id: string }>();
  const [chef, setChef] = useState<Chef | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModalReservation, setOpenModalReservation] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const {user} = useAuth();
  if (!user) return null;

  useEffect(() => {

    const fetchChef = async () => {

      const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: 'include' as RequestCredentials
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chefs/${id}`, requestOptions)
      const result = await response.json();
      setChef(result.data.chef);
    };

    fetchChef();
  }, []);


  return (
    chef && 
      <>
        <Header/>

        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          <section className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Conheça o Chef <span className="text-primary">{chef.user.name}</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Especializado em culinária {chef.specialization}, com {chef.experience} anos de experiência.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <img
                src={chef.user.profile_photo}
                alt={chef.user.name}
                className="w-[300px] h-[300px] object-cover object-center rounded-2xl shadow-md"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Sobre o Chef</h2>
              <p className="text-gray-700 text-base whitespace-pre-line">
                {chef.professional_description}
              </p>
              <div className="text-lg text-gray-700 mt-4">
                <p><strong>Especialidade:</strong> {chef.specialization}</p>
                <p><strong>Experiência:</strong> {chef.experience} anos</p>
                <p><strong>Email:</strong> {chef.user.email}</p>
                <p className="text-[#ea580c] font-bold text-xl mt-2">
                  R$ {chef.price_per_hour}/hora
                </p>
              </div>
              <button
                onClick={() => setOpenModalReservation(true)}
                className="mt-4 w-full md:w-auto px-6 py-3 bg-[#ea580c] text-white rounded-md hover:bg-[#c2410c] transition"
              >
                Reservar agora
              </button>
            </div>
          </section>
        </div>

        <ModalReservation userData={user} open={openModalReservation} onClose={() => setOpenModalReservation(false)} selectedChef={chef} setShowModalSuccess={() => (setOpenModalReservation(false), setShowSuccessModal(true))}/>
        <SuccessAlert show={showSuccessModal} title="Sua solicitação de agendamento foi realizada com sucesso!" onClose={() => setShowSuccessModal(false)}/>
      </>
  );
}
