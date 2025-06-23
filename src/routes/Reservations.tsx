import { Calendar, Clock, MapPin, MessageCircle, Star } from "lucide-react";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { ReservationProps } from "../lib/interfaces";
import { useAuth } from "../context/AuthProvider";
import RatingModal from "../components/Reservation/RatingModal";
import SuccessAlert from "../components/ui/alerts/SuccessAlert";
import Pagination from "../components/ui/Pagination";
import { getServerUrl } from '../utils/env';
import { useNavigate } from "react-router-dom";

export default function Reservations(){

    const [pastBookings, setPastBookings] = useState<ReservationProps[]>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<ReservationProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<ReservationProps>();
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>();

    const {user} = useAuth();
    const navigate = useNavigate();
    
    useEffect(()=> {
        getPastReservationsFromUser();
        getUpcomingReservationsFromUser();

    },[]);

    const getPastReservationsFromUser = async (page?:number) => {

        setPastBookings([]);

        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include' as RequestCredentials
        }

        const skip = (page ? page - 1 : 0) 

        const result = await fetch(`${getServerUrl()}/api/reservations/user/past/${user?.id}?skip=${skip * 5}&limit=5`, requestOptions)
        const response = await result.json();

        if (result.ok) {
            let reservationsData = response?.reservations.rows;
            setTotalCount(response.reservations.count);
            setPastBookings(reservationsData);

        }
    }

    const getUpcomingReservationsFromUser = async () => {

        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include' as RequestCredentials
        }

        const result = await fetch(`${getServerUrl()}/api/reservations/user/upcoming/${user?.id}`, requestOptions)
        const response = await result.json();

        if (result.ok) {
            let reservationsData = response?.reservations.rows;
            setUpcomingBookings(reservationsData);

        }
    }

    const getDate = (reservationDate:Date) => {
        reservationDate = new Date(reservationDate);
        const date = reservationDate.getDate() < 10 ? "0" + reservationDate.getDate() : reservationDate.getDate();
        const month = reservationDate.getMonth() + 1 < 10 ? "0" + (reservationDate.getMonth() + 1) : (reservationDate.getMonth() + 1);
        return date +  "/" +  month + "/" +  reservationDate.getFullYear();
    }

    const getTime = (reservationDate:Date) => {
        reservationDate = new Date(reservationDate);
        const hours = reservationDate.getHours() < 10 ? "0" + reservationDate.getHours() : reservationDate.getHours();
        const minutes = reservationDate.getMinutes() < 10 ? "0" + reservationDate.getMinutes() : reservationDate.getMinutes();
        return  hours + ":" + minutes;
    }

    const handleOpenModalReservation = async (booking:ReservationProps) => {
        setSelectedReservation(booking);
        setIsModalOpen(true);
    }

    const handlePageChange = async (page:number) => {
        setCurrentPage(page);
        getPastReservationsFromUser(page);
        
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">

                <Header />

                <div className="max-w-4xl mx-auto py-10 px-4">
                    
                    {upcomingBookings || (pastBookings) ? (
                    <>
                        <h1 className="text-2xl font-bold mb-8">Meus Próximos Agendamentos</h1>
                        <div className="space-y-6 mb-12">

                            {upcomingBookings.length > 0 ? (
                                <>

                                        {upcomingBookings.map((booking) => (
                                            <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                                <div className="p-6">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                                                        <div className="flex items-center flex-1">
                                                            <div className="w-16 h-16 relative mr-4">
                                                                <img
                                                                    src={booking.chefData.user.profile_photo}
                                                                    alt={booking.chefData.user.name}
                                                                    className="rounded-full object-cover"
                                                                />
                                                            </div>

                                                            <div>
                                                                <h3 className="font-bold text-lg">{booking.chefData.user.name}</h3>
                                                                <p className="text-gray-600 text-sm">{booking.chefData.specialization}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col md:items-end gap-1">

                                                            <div className="flex items-center text-gray-600">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                <span className="text-sm">{getDate(booking.date)}</span>
                                                            </div>

                                                            <div className="flex items-center text-gray-600">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                <span className="text-sm">{getTime(booking.date)}</span>
                                                            </div>

                                                            <div className="flex items-center text-gray-600">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                <span className="text-sm">{booking.location}</span>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                        <div>
                                                            <p className="text-sm text-gray-600">
                                                            Menu: <span className="font-medium">{booking.mealType}</span>
                                                            </p>
                                                        </div>
                                                        
                                                        <button
                                                            onClick={() => navigate('/chat')}
                                                            className="mt-2 inline-flex items-center gap-2 font-bold border border-primary px-3 py-2 rounded-full text-primary hover:underline transition"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            Conversar com o Chef
                                                        </button>

                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                </>
                            ): <p> Você não possui futuros agendamentos</p> } 
                        </div>

                        {pastBookings.length > 0 ? (
                        <>
                            <h1 className="text-2xl font-bold mb-8">Meus Agendamentos Passados</h1>
                            <div className="space-y-6">
                                {pastBookings.map((booking) => (
                                    <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-6">

                                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                <div className="flex items-center flex-1">

                                                    <div className="w-16 h-16 relative mr-4">
                                                        <img
                                                            src={booking.chefData.user.profile_photo}
                                                            alt={booking.chefData.user.name}
                                                            className="rounded-full object-cover"
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-bold text-lg">{booking.chefData.user.name}</h3>
                                                        <p className="text-gray-600 text-sm">{booking.chefData.specialization}</p>
                                                    </div>

                                                </div>

                                                <div className="flex flex-col md:items-end gap-1">

                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">{getDate(booking.date)}</span>
                                                    </div>

                                                    <div className="flex items-center text-gray-600">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">{getTime(booking.date)}</span>
                                                    </div>

                                                    <div className="flex items-center text-gray-600">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">{booking.location}</span>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                    Menu: <span className="font-medium">{booking.mealType}</span>
                                                    </p>
                                                </div>

                                                {booking.rating ? (
                                                    <span className="text-sm text-gray-500 italic">Avaliado</span>
                                                ) : (
                                                    <button
                                                    onClick={() => handleOpenModalReservation(booking)}
                                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700"
                                                    >
                                                    Avaliar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination currentPage={currentPage} totalPages={totalCount || 0} onPageChange={handlePageChange}/>
                        </>
                        ) : (
                            <p className="italic">Você não possui agendamentos passados</p>
                        )}
                    </>
                    ) : (<p>Carregando...</p>)
                    }

                </div>

            </div>
        
            <RatingModal
                isOpen={isModalOpen}
                onClose={() => (getPastReservationsFromUser(), setIsModalOpen(false))}
                chefName={selectedReservation?.chefData.user.name || ""}
                chefImage={selectedReservation?.chefData?.user.profile_photo || ""}
                reservationId={selectedReservation?.id || 0}
                setShowModalSuccess={() => setShowSuccessModal(true)}
            />

            <SuccessAlert show={showSuccessModal} mainMenssage="Avaliação cadastrada!" title="Sua avaliação foi registrada com sucesso!" onClose={() => setShowSuccessModal(false)}/>
        </>
    )

}