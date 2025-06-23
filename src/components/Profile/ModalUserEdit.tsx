import { ModalUserEditProps } from "@/src/lib/interfaces"
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import SubmitBtn from "../ui/SubmitBtn";
import TextErrorAlert, { TextErrorAlertProps } from "../ui/alerts/TextErrorAlert";
import SuccessAlert from "../ui/alerts/SuccessAlert";
import { getServerUrl } from '../../utils/env';


export default function ModalUserEdit({open, onClose, userData}: ModalUserEditProps) {

    if (!userData) return null;

    const [idUsuario, setIdUsuario] = useState(userData.id);
    const [nomeUsuario, setNomeUsuario] = useState(userData.nome);
    const [emailUsuario, setEmailUsuario] = useState(userData.email);
    const [telefoneUsuario, setTelefoneUsuario] = useState(userData.telefone);
    const [enderecoUsuario, setEnderecoUsuario] = useState(userData.endereco || "");
    const [senhaUsuario, setSenhaUsuario] = useState("");
    const [confirmaSenhaUsuario, setConfirmaSenhaUsuario] = useState("");
    const [fotoUsuario, setFotoUsuario] = useState<File>();
    const [nomeArquivo, setNomeArquivo] = useState("");
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
    const [textErrorAlertProps, setTextErrorAlert] = useState<TextErrorAlertProps>({text: "show", show: false});
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    
    if (!open) return null;

    const handleUpdateUser = async () => {

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

        if (fotoUsuario) {
            formData.append("profile_photo", fotoUsuario);
        }

        try {
            const result = await fetch(`${getServerUrl()}/api/users/${idUsuario}`, { method: "PATCH", body: formData });
            setIsLoadingBtn(false);

            if (result.status === 200) {
                setShowSuccessModal(true);
            }
            

        } catch (error) {
            setIsLoadingBtn(false);
        }

    }

    const registerValidations = () => {
        if (!nomeUsuario || !telefoneUsuario || !emailUsuario || !enderecoUsuario || !senhaUsuario || !confirmaSenhaUsuario) {
            setTextErrorAlert({text: "Preencha todos os campos obrigatórios!", show: true});
            return false;
        }

        return true;
    }

    return (
        <>
            <div className="fixed overflow-y-auto overflow-x-hidden inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
                    >
                        &times;
                    </button>
                
                    <h2 className="text-xl font-semibold mb-4">Atualizar Perfil</h2>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome completo
                        </label>
                        <input
                            type="text"
                            value={nomeUsuario}
                            required
                            onChange={(e) => setNomeUsuario(e.target.value)}
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
                            onChange={(e) => setEmailUsuario(e.target.value)}
                            id="email"
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
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
                            onChange={(e) => setEnderecoUsuario(e.target.value)}
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
                            onChange={(e) => setSenhaUsuario(e.target.value)}
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
                            onChange={(e) => setConfirmaSenhaUsuario(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                        />
                        </div>
                    </div>
                
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto de Perfil (opcional)
                        </label>
                
                        <div className="flex items-center flex-wrap gap-2">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                
                        <label
                            htmlFor="foto"
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            Escolher foto
                        </label>
                
                        <input
                            type="file"
                            id="foto"
                            accept="image/jpeg,image/jpg,image/png"
                            className="hidden"
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
                
                    <div className="mt-6 flex justify-between items-center">

                        <div className="flex justify-center">
                            <TextErrorAlert text={textErrorAlertProps.text} show={textErrorAlertProps.show}/>
                        </div>

                        <div className="flex justify-center pt-4">
                            <SubmitBtn title="Atualizar" callback={() => handleUpdateUser()} isLoading={isLoadingBtn}/>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <SuccessAlert  show={showSuccessModal} title="Seu cadastro foi realizado com sucesso!" onClose={() => setShowSuccessModal(false)}/>
        </>
      
    )

}