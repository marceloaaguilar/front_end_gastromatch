import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import ModalAlert from "../ui/alerts/ModalAlert";
import TextErrorAlert from "../ui/alerts/TextErrorAlert";
import { TextErrorAlertProps } from "../ui/alerts/TextErrorAlert";
import SubmitBtn from "../ui/SubmitBtn";
import TextSuccessAlert from "../ui/alerts/TextSuccessAlert";
import { useAuth } from "../../context/AuthProvider";

export function LoginForm() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [textErrorAlertProps, setTextErrorAlert] = useState<TextErrorAlertProps>({text: "show", show: false});
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e:any) => {

        e.preventDefault();
        setShowSuccessAlert(false);
        setTextErrorAlert({text: "" , show: false});
        setIsLoadingBtn(true);

        if (!email || !password) {
            setTextErrorAlert({text: "Digite todos os campos obrigatórios", show: true});
            setIsLoadingBtn(false);
            return;
        };
        
        try {
            await login({email: email, password: password});
        } catch (err:any) {
            setTextErrorAlert({text: err.message , show: true});
            setIsLoadingBtn(false);
        }

    }

    return (
        <>
            <form className="space-y-6 h-full">
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                    </label>
                    <input
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                    </label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ea580c] focus:border-[#ea580c]"
                    />
                </div>

                <TextErrorAlert show={textErrorAlertProps.show} text={textErrorAlertProps.text}/>
                <TextSuccessAlert show={showSuccessAlert} text="Login realizado com sucesso! Você será redirecionado..."/>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-[#ea580c] focus:ring-[#ea580c] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Lembrar-me
                    </label>
                    </div>
                    <div className="text-sm">
                    <a href="#" className="font-medium text-[#ea580c] hover:text-[#d45209]">
                        Esqueceu a senha?
                    </a>
                    </div>
                </div>

                 <SubmitBtn title="Entrar" callback={(e:any) => handleLogin(e)} isLoading={isLoadingBtn}/>

            </form>

        </>
    )
}