"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

import StarRating from "./star-rating"
import { getServerUrl } from '../../utils/env'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
  chefName: string
  chefImage: string
  reservationId: number
  setShowModalSuccess: () => void

}

export default function RatingModal({ isOpen, onClose, chefName, chefImage, reservationId, setShowModalSuccess }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) return

    setIsSubmitting(true)

    try {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            credentials: 'include' as RequestCredentials,
            body: JSON.stringify({rating: rating, comment: comment})
        }

        const result = await fetch(`${getServerUrl()}/api/reservations/rating/${reservationId}`, requestOptions);
        if (result.ok) setShowModalSuccess();

      onClose()
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="relative h-32 bg-primary">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white text-gray-700 hover:bg-gray-100"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
              <img
                src={chefImage}
                alt={chefName}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 pb-6">
          <h3 className="text-xl font-bold text-center mb-2">Avalie sua experiência</h3>
          <p className="text-gray-600 text-center mb-6">Como foi sua experiência com {chefName}?</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <StarRating initialRating={rating} onChange={setRating} size="lg" />
              <p className="mt-2 text-sm text-gray-500">
                {rating === 0 && "Toque para avaliar"}
                {rating === 1 && "Insatisfeito"}
                {rating === 2 && "Poderia ser melhor"}
                {rating === 3 && "Satisfeito"}
                {rating === 4 && "Muito bom"}
                {rating === 5 && "Excelente!"}
              </p>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comentário (opcional)
              </label>
              <textarea
                id="comment"
                rows={4}
                placeholder="Conte-nos mais sobre sua experiência..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : "Enviar avaliação"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}