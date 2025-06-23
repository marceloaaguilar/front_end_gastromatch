import { Camera, Plus } from "lucide-react"
import { useState } from "react"
import { UserProps } from "@/src/lib/interfaces";
import TextErrorAlert, { TextErrorAlertProps } from "../ui/alerts/TextErrorAlert";
import SuccessAlert from "../ui/alerts/SuccessAlert";
import SubmitBtn from "../ui/SubmitBtn";
import EspecialidadesSelect from "../ui/EspecialidadesSelect";
import { getServerUrl } from '../../utils/env';

export default function RegisterForm() {
    const [userType, setUserType] = useState("");
    const [especialidades, setEspecialidades] = useState<string[]>([]);
    const [nomeUsuario, setNomeUsuario] = useState<string>("");
    const [telefoneUsuario, setTelefoneUsuario] = useState<string>("");
    const [emailUsuario, setEmailUsuario] = useState<string>("");
    const [enderecoUsuario, setEnderecoUsuario] = useState<string>("");
    const [senhaUsuario, setSenhaUsuario] = useState<string>("");
    const [fotoUsuario, setFotoUsuario] = useState<File>();
    const [confirmaSenhaUsuario, setConfirmaSenhaUsuario] = useState<string>("");
    const [descricaoProfissional, setDescricaoProfissional] = useState<string>("");
    const [precoPorHora, setPrecoPorHora] = useState<string>();
    const [disponibilidade, setDisponibilidade] = useState<string>("Todos os dias");
    const [experiencia, setExperiencia] = useState<string>();
    const [nomeArquivo, setNomeArquivo] = useState("");
    const [textErrorAlertProps, setTextErrorAlert] = useState<TextErrorAlertProps>({text: "show", show: false});
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

    const handleRegister = async (e:any) => {
        e.preventDefault();
        setTextErrorAlert({text: "", show: false});
        
        if (!registerValidations()) return;
        
        if (senhaUsuario !== confirmaSenhaUsuario) {
            setTextErrorAlert({text: "As senhas não concidem", show: true});
            return;
        }
        
        setIsLoadingBtn(true);

        const formData = new FormData();
        formData.append("name", nomeUsuario);
        formData.append("email", emailUsuario);
        formData.append("password", senhaUsuario);
        formData.append("address", enderecoUsuario);
        formData.append("phone", telefoneUsuario);
        formData.append("role", userType === "chef" ? "PROFESSIONAL" : "CUSTOMER");

        if (fotoUsuario) {
            formData.append("profile_photo", fotoUsuario);
        }

        const result = await fetch(`${getServerUrl()}/api/users/signup`, { method: "POST", body: formData });

        const response = await result.json();

        setIsLoadingBtn(false);

        if (result && result.status !== 201) {
            const mensagemErro = response.erro ? response.erro[0] : "Ocorreu um erro ao realizar o cadastro";
            setTextErrorAlert({text: mensagemErro, show: true});
            return;
        }

        if (userType === "chef") {

            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    specialization: especialidades.join(","),
                    experience: experiencia,
                    professional_description: descricaoProfissional,
                    price_per_hour: precoPorHora ? precoPorHora.replace(",", ".") : 0,
                    availability: disponibilidade,
                    user_id: response.data.id
                })
            }
    
            const resultChef = await fetch(`${getServerUrl()}/api/chefs`, requestOptions);
            const responseChef = await resultChef.json();

            if (resultChef && resultChef.status !== 201) {
                const mensagem = responseChef.erro ? responseChef.erro[0] : "Ocorreu um erro ao realizar o cadastro";
                setTextErrorAlert({text: mensagem, show: true});
                return;
            }

        }

        setShowSuccessModal(true);
        resetForm();

    }

    const registerValidations = () => {

        if (!nomeUsuario || !telefoneUsuario || !emailUsuario || !enderecoUsuario || !senhaUsuario || !confirmaSenhaUsuario) {
            setTextErrorAlert({text: "Preencha todos os campos obrigatórios!", show: true});
            return false;
        }

        if (userType === "chef" &&  (!especialidades.length || !descricaoProfissional || !precoPorHora || !disponibilidade)) {
            setTextErrorAlert({text: "Preencha todos os campos obrigatórios!", show: true});
            return false;
        }

        return true;

    }

    const handlePrecoChange = (e:any) => {
        let value = e.target.value;
    
        value = value.replace(/\D/g, "");
    
        if (value) {
          value = (parseInt(value) / 100).toFixed(2).replace(".", ",");
        }
    
        setPrecoPorHora(value);
    };

    const resetForm = () => {
        setEspecialidades([]);
        setNomeUsuario("");
        setTelefoneUsuario("");
        setEmailUsuario("");
        setEnderecoUsuario("");
        setSenhaUsuario("");
        setFotoUsuario(undefined);
        setConfirmaSenhaUsuario("");
        setDescricaoProfissional("");
        setPrecoPorHora("");
        setDisponibilidade("Todos os dias");
        setExperiencia("");
        setNomeArquivo("");
    };

    return (
        <>
            <div className="max-w-4xl mx-auto py-10 px-4 h-screen">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-center mb-8">Criar sua conta</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <button
                        className={`p-6 border rounded-lg flex flex-col items-center justify-center text-center h-32 transition-colors cursor-pointer ${
                            userType === "usuario" ? "border-[#ea580c] bg-orange-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setUserType("usuario")}
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3 className="font-medium">Usuário</h3>
                            <p className="text-sm text-gray-500">Procuro um chef para meu evento</p>
                        </button>

                        <button
                        className={`p-6 border cursor-pointer rounded-lg flex flex-col items-center justify-center text-center h-32 transition-colors ${
                            userType === "chef" ? "border-[#ea580c] bg-orange-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setUserType("chef")}
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                >
                                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                                <line x1="6" x2="18" y1="17" y2="17"></line>
                                </svg>
                            </div>
                            <h3 className="font-medium">Chef de Cozinha</h3>
                            <p className="text-sm text-gray-500">Quero oferecer meus serviços</p>
                        </button>
                    </div>

                    {userType ?
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome completo
                                    </label>
                                    <input
                                    type="text"
                                    value={nomeUsuario}
                                    required
                                    onChange={(e) => {setNomeUsuario(e.target.value)}}
                                    id="nome"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                    </label>
                                    <input
                                    type="email"
                                    value={emailUsuario}
                                    required
                                    onChange={(e) => setEmailUsuario(e.target.value)}
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefone
                                    </label>
                                    <input
                                    type="tel"
                                    id="telefone"
                                    value={telefoneUsuario}
                                    maxLength={15}
                                    required
                                    onChange={(e) => setTelefoneUsuario(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                                    Endereço
                                    </label>
                                    <input
                                    type="text"
                                    id="endereco"
                                    value={enderecoUsuario}
                                    required
                                    onChange={(e) => {setEnderecoUsuario(e.target.value)}}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                    </label>
                                    <input
                                    type="password"
                                    id="senha"
                                    value={senhaUsuario}
                                    required
                                    onChange={(e) => {setSenhaUsuario(e.target.value)}}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmar-senha" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Senha
                                    </label>
                                    <input
                                    type="password"
                                    id="confirmar-senha"
                                    value={confirmaSenhaUsuario}
                                    required
                                    onChange={(e) => {setConfirmaSenhaUsuario(e.target.value)}}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                                    />
                                </div>
                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto de Perfil (opcional)
                                </label>

                                <div className="flex items-center flex-wrap gap-2">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                        <Camera className="w-6 h-6 text-gray-400" />
                                    </div>

                                    <label htmlFor="foto" className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        Escolher foto
                                    </label>

                                    <input type="file" id="foto" accept="image/jpeg,image/jpg,image/png" className="hidden" 
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length) {
                                                const file = e.target.files[0];
                                                setFotoUsuario(file);
                                                setNomeArquivo(file.name);
                                            }
                                        }}
                                    />

                                    {nomeArquivo && (
                                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                                        {nomeArquivo}
                                    </span>
                                    )}
                                </div>
                            </div>

                            {userType === "chef" && (
                                <div className="space-y-6 pt-4 border-t">
                                    <h2 className="text-lg font-medium">Informações do Chef</h2>
                                
                                    <EspecialidadesSelect especialidades={especialidades} onChange={setEspecialidades} />
                                
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição profissional</label>
                                            <textarea id="descricao" rows={4} value={descricaoProfissional} onChange={(e) => setDescricaoProfissional(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"></textarea>
                                        </div>
                                
                                        <div>
                                            <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700 mb-1">Experiência (em anos)</label>
                                            <input type="text" id="experiencia" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]" />
                                        </div>
                                    </div>
                                
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">Preço por hora</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">R$</span>
                                                </div>
                                                <input type="text" id="preco" value={precoPorHora} onChange={(e) => handlePrecoChange(e)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]" />
                                            </div>
                                        </div>
                                
                                        <div>
                                            <label htmlFor="disponibilidade" className="block text-sm font-medium text-gray-700 mb-1">Disponibilidade</label>
                                            <select id="disponibilidade" value={disponibilidade} onChange={(e) => setDisponibilidade(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c] appearance-none bg-white">
                                                <option>Todos os dias</option>
                                                <option>Dias de semana</option>
                                                <option>Finais de semana</option>
                                                <option>Personalizado</option>
                                            </select>
                                        </div>
                                    </div>
                                
                                    <div>
                                        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">Portfólio de pratos</label>
                                        <div className="border border-dashed border-gray-300 rounded-md w-32 h-32 flex items-center justify-center">
                                            <Plus className="w-6 h-6 text-gray-400" />
                                        </div>
                                    </div>

                                 </div>
                              
                             
                            )}

                            <TextErrorAlert text={textErrorAlertProps.text} show={textErrorAlertProps.show}/>

                            <div className="flex justify-center pt-4">
                               <SubmitBtn title="Criar Conta" callback={(e:any) => handleRegister(e)} isLoading={isLoadingBtn}/>
                            </div>
                        </form> : ""
                    }    

                </div>
            </div>

            <SuccessAlert show={showSuccessModal} title="Seu cadastro foi realizado com sucesso!" onClose={() => setShowSuccessModal(false)}/>
        </>
    )
}