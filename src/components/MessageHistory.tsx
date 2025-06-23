"use client"

import { useEffect, useState } from "react"
import { getMessageHistory, MessageResponse } from "../components/MessageApi";

export default function MessageHistory() {
  const [messages, setMessages] = useState<MessageResponse[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    loadMessages()
  }, [page])

  const loadMessages = async () => {
    const history = await getMessageHistory(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    setMessages((prev) => (page === 0 ? history : [...prev, ...history]))
    setHasMore(history.length === ITEMS_PER_PAGE)
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Histórico</h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
          <li key={msg.id} className="border p-2 rounded">
            <div className="text-sm text-gray-700">{msg.text}</div>
            <div className="text-xs text-gray-400">De: {msg.from} | Para: {msg.to}</div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setPage((p) => p + 1)}
          className="mt-4 text-blue-600 underline"
        >
          Carregar mais
        </button>
      )}
    </div>
  )
}
