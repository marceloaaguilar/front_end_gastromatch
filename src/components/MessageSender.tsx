"use client"

import { useState } from "react"
import { getMessageHistory, MessageResponse, sendMessage } from "../components/MessageApi";  

interface Props {
  recipientId: string
  onMessageSent?: () => void
}

export default function MessageSender({ recipientId, onMessageSent }: Props) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!text.trim()) return
    setLoading(true)
    const success = await sendMessage({ to: recipientId, text: text.trim() })
    setLoading(false)
    if (success) {
      setText("")
      onMessageSent?.()
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        className="border rounded px-3 py-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  )
}
