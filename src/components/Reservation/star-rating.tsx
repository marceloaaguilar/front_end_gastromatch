"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  initialRating?: number
  onChange?: (rating: number) => void
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
}

export default function StarRating({ initialRating = 0, onChange, size = "md", readOnly = false }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleClick = (index: number) => {
    if (readOnly) return

    const newRating = index + 1
    setRating(newRating)
    onChange?.(newRating)
  }

  const handleMouseEnter = (index: number) => {
    if (readOnly) return
    setHoverRating(index + 1)
  }

  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverRating(0)
  }

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const isActive = (hoverRating || rating) > index

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`${readOnly ? "cursor-default" : "cursor-pointer"} p-1 focus:outline-none`}
            disabled={readOnly}
            aria-label={`${index + 1} estrelas`}
          >
            <Star
              className={`${sizes[size]} ${
                isActive ? "fill-primary text-primary" : "fill-gray-200 text-gray-300"
              } transition-colors`}
            />
          </button>
        )
      })}
    </div>
  )
}
