import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { CalendarDays, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import Pagination from "../components/ui/Pagination";

interface Reservation {
  id: number;
  customer_name: string;
  date: string;
  location: string;
  guests: number;
  mealType: string;
  description: string;
  dietary_restrictions: string;
}

export default function ChefAgendamentosPage() {
  const [detalhesVisiveis, setDetalhesVisiveis] = useState<{ [id: number]: boolean }>({});
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [chefId, setChefId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 10;

  const { user } = useAuth();

  const toggleDetalhes = (id: number) => {
    setDetalhesVisiveis((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    getChefId();
  }, [user]);

  useEffect(() => {
    if (chefId === 0) return;
    listChefsReservations();
  }, [chefId, currentPage]);

  const listChefsReservations = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include" as RequestCredentials,
      };

      const result = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/reservations/chef/${chefId}?limit=${limit}&skip=${(currentPage -1) * limit}`,
        requestOptions
      );
      const response = await result.json();

      setReservations(response.reservations.rows);
      setTotalCount(Math.ceil(response.reservations.count));
    } catch (error) {
      console.error(error);
    }
  };

  const getChefId = async () => {
    if (!user || !user?.id) return;
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include" as RequestCredentials,
      };

      const result = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/chefs/getChefId/${user?.id}`,
        requestOptions
      );
      const response = await result.json();
      setChefId(response.chef.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="bg-[#fff8f0] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#ea580c] mb-2">Seus Agendamentos</h1>
          <p className="text-lg text-gray-700">Confira os eventos onde você foi contratado para cozinhar.</p>
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-12 grid gap-6">
          {reservations.map((evento) => (
            <div key={evento.id} className="border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#7c2d12]">
                    Evento para {evento.customer_name}
                  </h2>
                  <p className="text-gray-600">
                    Especialidade: <span className="font-medium">{evento.mealType}</span>
                  </p>
                  <p className="text-gray-600">Pessoas: {evento.guests}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-700">
                    <CalendarDays className="w-5 h-5 text-[#ea580c]" />
                    {new Date(evento.date).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-5 h-5 text-[#ea580c]" />
                    {new Date(evento.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-[#ea580c]" />
                    {evento.location}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => toggleDetalhes(evento.id)}
                  className="flex items-center gap-2 text-[#ea580c] hover:underline font-medium"
                >
                  {detalhesVisiveis[evento.id] ? (
                    <>
                      Ocultar detalhes <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Ver mais detalhes <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              {detalhesVisiveis[evento.id] && (
                <div className="mt-4 bg-[#fff4ec] p-4 rounded-lg border border-[#f9dcc6] text-sm">
                  <p>
                    <span className="font-semibold">Descrição:</span> {evento.description || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Restrições alimentares:</span> {evento.dietary_restrictions || "Nenhuma"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Pagination currentPage={currentPage} totalPages={totalCount || 0} limit={limit} onPageChange={handlePageChange} />
        </div>
      </section>
    </div>
  );
}
