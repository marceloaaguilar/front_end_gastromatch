import { ArrowLeft, ArrowRight, MessageCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Chef, ReservationProps } from "../lib/interfaces";
import { UserProps } from "../lib/interfaces";
import TextErrorAlert, { TextErrorAlertProps } from "./ui/alerts/TextErrorAlert";
import SubmitBtn from "./ui/SubmitBtn";
import SuccessAlert from "./ui/alerts/SuccessAlert";
import { getServerUrl } from '../utils/env';

interface ModalReservationProps {
  open: boolean;
  onClose: () => void;
  selectedChef: Chef;
  userData: UserProps;
  setShowModalSuccess: () => void;
}

export default function ModalReservation({
  open,
  onClose,
  selectedChef,
  userData,
  setShowModalSuccess
}: ModalReservationProps) {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [textErrorAlertProps, setTextErrorAlert] = useState<TextErrorAlertProps>({text: "show", show: false});
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
    const [restricaoSelecionada, setRestricaoSelecionada] = useState('');

    const [reservation, setReservation] = useState<ReservationProps>({
        customer_name: "",
        customer_cpf: "",
        customer_email: "",
        description: "",
        phone: "",
        user: userData.id || 0,
        chef: selectedChef.id,
        date: new Date(),
        location: "",
        guests: 0,
        notes: "",
        mealType: "",
        dietary_restrictions: "",
    });

    useEffect(()=> {
        setCurrentStep(1);
    }, [])

    const handleNext = () => {

        if (currentStep === 1 && !validateStep1()) return;

        setCurrentStep((prev) => Math.min(prev + 1, 3));

    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const formatDate = (date: Date) => date.toISOString().slice(0, 10);
    const formatTime = (date: Date) => date.toTimeString().slice(0, 5);

    const getDateTime = () => {
        const date = reservation.date.getDate() < 10 ? "0" + reservation.date.getDate() : reservation.date.getDate();
        const month = reservation.date.getMonth() + 1 < 10 ? "0" + (reservation.date.getMonth() + 1) : (reservation.date.getMonth() + 1);
        return date +  "/" +  month + "/" +  reservation.date.getFullYear() +  " às " + reservation.date.getHours() + ":" + reservation.date.getMinutes()
    }

    const validateStep1 = () => {

        setTextErrorAlert({text: "", show: false});

        if (!reservation || !reservation.customer_name || !reservation.customer_email || !reservation.phone || !reservation.location) {
            setTextErrorAlert({text: "Preencha todos os dados do cliente!", show: true});
            return false;
        }

        if (!reservation.date || !reservation.mealType){
            setTextErrorAlert({text: "Preencha os detalhes do agendamento!", show: true});
            return false;
        }

        if (reservation.guests === 0) {
            setTextErrorAlert({text: "Defina um número de convidados válido", show: true});
            return false;
        }

        setReservation((prev) => ({
            ...prev, description: userData.nome + " - " + reservation.mealType + " - " + getDateTime(),
        }))

        return true;

    }

    const adicionarRestricao = () => {
        if (!restricaoSelecionada) return;
      
        const restricoesAtuais = reservation.dietary_restrictions
          .split(',')
          .map((r) => r.trim());
      
        if (!restricoesAtuais.includes(restricaoSelecionada)) {
          const novaString = [...restricoesAtuais, restricaoSelecionada].join(', ');
          setReservation((prev) => ({
            ...prev,
            dietary_restrictions: novaString,
          }));
        }
      
        setRestricaoSelecionada('');
    };

    const handleReservation = async () => {

        setIsLoadingBtn(true);

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reservation),
            credentials: 'include' as RequestCredentials
        }

        const result = await fetch(`${getServerUrl()}/api/reservations`, requestOptions)
        const response = await result.json();
        setIsLoadingBtn(false);  

        if (!result || !result.ok) {
            const mensagem = response.erro ? response.erro[0] : "Ocorreu um erro ao realizar o cadastro";
            setTextErrorAlert({text: mensagem, show: true});
            return;
        }

        setShowModalSuccess();

    }
      
    return (
        open && (
            <>
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="cursor-pointer absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl font-bold"
                            onClick={onClose}
                        >
                            ×
                        </button>

                        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
                            Solicitar Agendamento
                        </h1>

                        <div className="flex items-center justify-center mb-10">
                            <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                                currentStep === 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                1
                            </div>

                            <div className="text-sm text-center mt-2">
                                <span
                                className={
                                    currentStep === 1
                                    ? "text-primary font-medium"
                                    : "text-gray-500"
                                }
                                >
                                Informações
                                </span>
                            </div>
                            </div>

                            <div className="w-24 h-1 bg-gray-200 mx-2">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: currentStep >= 2 ? "100%" : "0%" }}
                            ></div>
                            </div>

                            <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                                currentStep === 2
                                    ? "bg-primary text-white"
                                    : currentStep > 2
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                2
                            </div>

                            <div className="text-sm text-center mt-2">
                                <span
                                className={
                                    currentStep === 2
                                    ? "text-primary font-medium"
                                    : "text-gray-500"
                                }
                                >
                                Detalhes
                                </span>
                            </div>
                            </div>

                            <div className="w-24 h-1 bg-gray-200 mx-2">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: currentStep >= 3 ? "100%" : "0%" }}
                            ></div>
                            </div>

                            <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
                                currentStep === 3
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                3
                            </div>

                            <div className="text-sm text-center mt-2">
                                <span
                                className={
                                    currentStep === 3
                                    ? "text-primary font-medium"
                                    : "text-gray-500"
                                }
                                >
                                Pagamento
                                </span>
                            </div>
                            </div>
                        </div>

                        {currentStep === 1 && (
                            <div className="space-y-10">
                                <div>

                                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                                    Informações do Cliente
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                        <div>
                                            <label htmlFor="customer_name">Nome</label>
                                            <input
                                            id="customer_name"
                                            type="text"
                                            value={reservation.customer_name}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                customer_name: e.target.value,
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="customer_cpf">CPF</label>
                                            <input
                                            id="customer_cpf"
                                            type="text"
                                            value={reservation.customer_cpf}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                customer_cpf: e.target.value,
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="customer_email">Email</label>
                                            <input
                                            id="customer_email"
                                            type="email"
                                            value={reservation.customer_email}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                customer_email: e.target.value,
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone">Telefone</label>
                                            <input
                                            id="phone"
                                            type="tel"
                                            value={reservation.phone}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                phone: e.target.value,
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>
                                        
                                        <div className="w-full col-span-2"> {/* Isso faz o input ocupar as duas colunas em telas médias */}
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Endereço</label>
                                            <input
                                                id="location"
                                                type="text"
                                                value={reservation.location}
                                                onChange={(e) =>
                                                    setReservation((prev) => ({
                                                        ...prev,
                                                        location: e.target.value,
                                                    }))
                                                }
                                                className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                                    Detalhes do Agendamento
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                        <div>
                                            <label htmlFor="date">Data</label>
                                            <input
                                            id="date"
                                            type="date"
                                            value={formatDate(reservation.date)}
                                            onChange={(e) => {
                                                const newDate = new Date(reservation.date);
                                                const [year, month, day] = e.target.value.split("-");
                                                newDate.setFullYear(+year, +month - 1, +day);
                                                setReservation((prev) => ({ ...prev, date: newDate }));
                                            }}
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="time">Horário</label>
                                            <input
                                            id="time"
                                            type="time"
                                            value={formatTime(reservation.date)}
                                            onChange={(e) => {
                                                const newDate = new Date(reservation.date);
                                                const [hours, minutes] = e.target.value.split(":");
                                                newDate.setHours(+hours);
                                                newDate.setMinutes(+minutes);
                                                setReservation((prev) => ({ ...prev, date: newDate }));
                                            }}
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mealType">Tipo de Refeição</label>
                                            <input
                                            id="mealType"
                                            type="text"
                                            value={reservation.mealType}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                mealType: e.target.value,
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mealType">Número de convidados</label>
                                            <input
                                            id="mealType"
                                            type="text"
                                            value={reservation.guests}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                guests: parseInt(e.target.value),
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>
                                        
                                        <div className="w-full">
                                            <label className="block mb-1 font-medium">Restrições alimentares</label>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <select
                                                value={restricaoSelecionada}
                                                onChange={(e) => setRestricaoSelecionada(e.target.value)}
                                                className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700"
                                                >
                                                <option value="">Selecionar...</option>
                                                {[
                                                    'Sem glúten',
                                                    'Vegetariano',
                                                    'Vegano',
                                                    'Sem lactose',
                                                    'Diabético',
                                                    'Alérgico a nozes',
                                                ].map((r, idx) => (
                                                    <option key={idx} value={r}>
                                                    {r}
                                                    </option>
                                                ))}
                                                </select>

                                                <button
                                                type="button"
                                                onClick={adicionarRestricao}
                                                className="px-3 py-1 bg-[#ea580c] text-white rounded-full text-sm hover:bg-orange-600"
                                                >
                                                Adicionar
                                                </button>

                                                {reservation.dietary_restrictions
                                                .split(',')
                                                .filter((r) => r.trim() !== '')
                                                .map((r, idx) => (
                                                    <div
                                                    key={idx}
                                                    className="flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                                    >
                                                    {r.trim()}
                                                    <button
                                                        onClick={() => {
                                                        const novas = reservation.dietary_restrictions
                                                            .split(',')
                                                            .map((i) => i.trim())
                                                            .filter((item) => item !== r.trim());
                                                        setReservation((prev) => ({
                                                            ...prev,
                                                            dietary_restrictions: novas.join(', '),
                                                        }));
                                                        }}
                                                        className="ml-2 text-gray-500 hover:text-red-500"
                                                    >
                                                        &times;
                                                    </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>


                                        <div className="md:col-span-2">
                                            <label htmlFor="notes">Observações</label>
                                            <textarea
                                            id="notes"
                                            rows={4}
                                            value={reservation.notes}
                                            onChange={(e) =>
                                                setReservation((prev) => ({
                                                ...prev,
                                                notes: e.target.value,
                                                }))
                                            }
                                            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-700"
                                            />
                                        </div>

                                    </div>

                                    <TextErrorAlert
                                    text={textErrorAlertProps.text}
                                    show={textErrorAlertProps.show}
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4"></h2>

                                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-sm text-gray-500">Chef selecionado</p>

                                                <div className="flex items-center mt-1">

                                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3">
                                                        <img src={selectedChef.user.profile_photo} alt="Foto chef selecionado" />
                                                    </div>

                                                    <div>
                                                        <p className="font-medium">{selectedChef.user.name}</p>
                                                        <div className="flex items-center">
                                                            <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                key={i}
                                                                className="w-4 h-4 text-primary fill-primary"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                >
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                            ))}
                                                            </div>
                                                            <span className="text-xs text-gray-500 ml-1">
                                                            (126 avaliações)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-500">Especialidades</p>
                                                
                                                <div className="flex flex-wrap gap-2 mt-1">

                                                    {selectedChef.specialization.split(",").map((speciality)=> {
                                                        return (
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                <span className="px-2 py-1 bg-primary text-white rounded-full text-xs">
                                                                    {speciality}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Data e Horário</p>
                                            <p className="font-medium mt-1"> {getDateTime()}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Local</p>

                                            <p className="font-medium mt-1">
                                                {reservation.location}
                                            </p>

                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">
                                            Número de Convidados
                                            </p>
                                            <p className="font-medium mt-1">{reservation.guests} pessoas</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Tipo de Refeição</p>
                                            <p className="font-medium mt-1">{reservation.mealType}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">

                                        <p className="text-sm text-gray-500">
                                            Restrições Alimentares
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-1">
                                            
                                            {reservation.dietary_restrictions && reservation.dietary_restrictions ? 
                                                reservation.dietary_restrictions.split(",").map((restriction) => {

                                                    return (
                                                        restriction &&
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                                    {restriction}
                                                                </span>

                                                    )
                                                }) : <p className="font-medium mt-1">Sem restrições alimentares</p>
                                            }
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-sm text-gray-500">Observações</p>
                                        <p className="mt-1 text-gray-700">
                                            {reservation.notes}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between mt-10">
                            <button
                            type="button"
                            onClick={handleBack}
                            className={`flex items-center px-4 py-2 border border-gray-700 rounded-md text-gray-700 ${
                                currentStep === 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }`}
                            disabled={currentStep === 1}
                            >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                            </button>
            {/* 
                            <button
                            type="button"
                            onClick=
                            className="flex items-center px-6 py-2 bg-primary text-white rounded-md"
                            >
                            
                            {currentStep !== 3 && <ArrowRight className="w-4 h-4 ml-2" />}
                            </button> */}

                            <SubmitBtn title={currentStep === 3 ? "Solicitar Agendamento" : "Continuar"} isLoading={isLoadingBtn} callback={
                                currentStep === 3
                                    ? () => handleReservation()
                                    : handleNext}/>
                        </div>

                    </div>
                </div>


            </>
        )
    );
}