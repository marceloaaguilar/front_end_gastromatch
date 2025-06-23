export interface SendMessagePayload {
    to: string;
    text: string;
  }
  
  export interface MessageResponse {
    id: string;
    from: string;
    to: string;
    text: string;
    status: string;
    timestamp: string;
  }
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173/api";
  
  export async function sendMessage(payload: SendMessagePayload): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      return false;
    }
  }
  
  export async function getMessageHistory(limit = 10, offset = 0): Promise<MessageResponse[]> {
    try {
      const res = await fetch(`${BASE_URL}/messages/history?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error("Erro na API");
      return await res.json();
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      return [];
    }
  }
  