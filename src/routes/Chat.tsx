import { useEffect, useRef, useState } from "react";
import { MessageSquare, User } from "lucide-react";
import Header from "../components/Header/Header";
import { useAuth } from "../context/AuthProvider";
import { Chef, MessageChat, UserChat } from "../lib/interfaces";
import  useWebSocket, { ReadyState }  from 'react-use-websocket';
import { getServerUrl } from '../utils/env';

export default function Chat() {
    const [selectedUser, setSelectedUser] = useState<UserChat>();
    const [usersList, setUsersList] = useState<UserChat[]>([])
    const [selectedMessages, setSelectedMessages] = useState<MessageChat[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const user = useAuth().user;
    const {sendMessage, lastMessage } = useWebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}?userId=${user?.id}`);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=> {

        async function defineUserList() {

            if (!user) return;
            user.type === "CUSTOMER" ? setUsersList(await getChefList()) : getUsersWhoSentMessage()
            
        } 

        defineUserList();

    },[])

    useEffect(()=> {
        setSelectedMessages([]);
        getHistoricMessages();
        
    }, [selectedUser]);

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data);
            const userId = user?.id;
            const {from, message} = data;

            if (!userId || !from || !message) return;

            setSelectedMessages([...selectedMessages, {to: userId, text: message, from: from}]);

        }
    }, [lastMessage]);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [selectedMessages]);

    async function handleMessageSent() {
        if (!selectedUser?.id || !user?.id) return;

        const userId = user?.id;

        setSelectedMessages([...selectedMessages, {to: selectedUser?.id, text: messageText, from: userId}]);
        setMessageText("");

        sendMessageSocket();

        
    }
    
    async function sendMessageSocket() {

        const from = user?.id;
        const to = selectedUser?.id

        sendMessage(
            JSON.stringify({
                from: from,
                to: to,
                message: messageText
            }
        ))

    }

    async function getUsersWhoSentMessage() {
        const response = await fetch(`${getServerUrl()}/api/messages/users_messages?userId=${user?.id}`, {credentials: 'include'});
        const result = await response.json();

        if (result) {
            setUsersList(result?.messages.map((message:any) => {return {id: message.from_user, name: message.sender.name}}))
        }
    }

    async function getHistoricMessages() {

        if (!user?.id || !selectedUser?.id) return;
        const response = await fetch(`${getServerUrl()}/api/messages/history?userA=${user?.id}&userB=${selectedUser?.id}`, {credentials: 'include'});
        const result = await response.json();

        setSelectedMessages(result.map((message:any) => { return {from: message.from_user, to: message.to_user, text: message.message}}));
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">

            <Header />

            <div className="max-w-4xl mx-auto py-10 px-4 flex gap-6 min-h-[600px]">
                <aside className="w-1/3 bg-gray-300 rounded-lg p-4 overflow-y-auto max-h-[600px] text-white">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                        <User className="w-5 h-5" /> Usuários
                    </h2>

                    <ul className="space-y-2">
                        {usersList.map((user:UserChat) => (
                            <li key={user.id}>
                            <button
                                onClick={() => setSelectedUser(user)}
                                className={`w-full text-left px-4 py-2 rounded-md transition ${
                                selectedUser?.id === user.id
                                    ? "bg-gray-900/4 text-gray-800 font-semibold"
                                    : "hover:bg-gray-400 text-gray-700"
                                }`}
                            >
                                {user.name}
                            </button>
                            </li>
                        ))}
                    </ul>

                </aside>

                <main className="w-[600px] flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-inner max-h-[600px]">
                <div className="flex-1 flex flex-col overflow-y-auto space-y-3 pr-2 px-4 min-h-[400px] w-full">
                    {!selectedUser ? (
                    <div className="flex-grow flex items-center justify-center text-gray-400">
                        <p>Selecione um usuário para iniciar o chat.</p>
                    </div>
                    ) : selectedMessages && selectedMessages.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-gray-400 text-center">
                        <MessageSquare className="w-10 h-10 mb-2 text-primary" />
                        <p>
                        Nenhuma mensagem ainda. Comece a conversa com{" "}
                        <strong>{selectedUser.name}</strong>.
                        </p>
                    </div>
                    ) : (
                    <div className="flex flex-col space-y-3 mt-8">
                        {selectedMessages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`px-4 py-2 rounded-lg max-w-full ${
                            msg.from === user?.id
                                ? "bg-primary text-white self-end"
                                : "bg-gray-300 text-gray-800 self-start"
                            }`}
                        >
                            <span className="block text-sm">{msg.text}</span>
                        </div>
                        ))}
                        <div style={{ float: "left", clear: "both" }} ref={messagesContainerRef}></div>
                    </div>
                    )}
                </div>

                {selectedUser && (
                    <div className="mt-4 flex px-4 py-3 border-t border-gray-300 bg-white rounded-b-lg">
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                        onClick={handleMessageSent}
                        className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                    >
                        Enviar
                    </button>
                    </div>
                )}
                </main>

            </div>

        </div>
    );
}

async function getChefList() {
    const response = await fetch(`${getServerUrl()}/api/chefs?limit=4`, {credentials: 'include'});
    const resultChefs = await response.json();
    
    if (resultChefs && resultChefs.data && resultChefs.data.chefs) {
        return resultChefs.data.chefs.map((chef:Chef) => { return {id: chef.user.id, name: chef.user.name}});
    }
            
}


