
import Header from "../components/Header/Header"
import { useState } from "react"
import { Star, ChevronDown, Filter, Search, Calendar, User } from "lucide-react"
import { Link } from "react-router"

const avaliacoesData = [
  {
    id: 1,
    chefName: "Chef Ricardo Silva",
    chefImage: "/images/chef-ricardo.jpg",
    userName: "Ana Paula",
    userImage: "/images/ana-paula.jpg",
    rating: 4.9,
    comment:
      "Experiência incrível! O chef preparou um jantar maravilhoso para nossa celebração em família. Os pratos estavam deliciosos e o serviço foi impecável.",
    date: "15/04/2023",
    tags: ["Italiana", "Jantar", "Aniversário"],
    featured: true,
  },
  {
    id: 2,
    chefName: "Chef Maria Santos",
    chefImage: "/images/chef-maria.jpg",
    userName: "Carlos Eduardo",
    userImage: "/images/carlos-eduardo.jpg",
    rating: 4.7,
    comment:
      "Impressionante! A Chef Maria não só cozinhou, mas também nos ensinou muito sobre gastronomia. Uma experiência educativa e saborosa ao mesmo tempo.",
    date: "28/02/2023",
    tags: ["Contemporânea", "Aula", "Jantar"],
  },
  {
    id: 3,
    chefName: "Chef André Costa",
    chefImage: "/images/chef-andre.jpg",
    userName: "Marina Silva",
    userImage: "/images/marina-silva.jpg",
    rating: 3.8,
    comment:
      "O chef André tem grande conhecimento de culinária francesa, mas achei o menu um pouco limitado. Os pratos estavam bons, mas esperava mais variedade.",
    date: "10/01/2023",
    tags: ["Francesa", "Almoço", "Corporativo"],
  },
  {
    id: 4,
    chefName: "Chef Juliana Mendes",
    chefImage: "/images/chef-juliana.jpg",
    userName: "Roberto Almeida",
    userImage: "/images/roberto-almeida.jpg",
    rating: 4.8,
    comment:
      "A Chef Juliana superou todas as expectativas! Sua culinária brasileira contemporânea é simplesmente fantástica. Todos os convidados ficaram impressionados.",
    date: "05/03/2023",
    tags: ["Brasileira", "Jantar", "Casamento"],
    featured: true,
  },
  {
    id: 5,
    chefName: "Chef Paulo Oliveira",
    chefImage: "/images/chef-paulo.jpg",
    userName: "Fernanda Costa",
    userImage: "/images/fernanda-costa.jpg",
    rating: 4.6,
    comment:
      "Experiência de sushi omakase incrível! O Chef Paulo tem um conhecimento profundo da culinária japonesa e cada prato foi uma obra de arte.",
    date: "20/05/2023",
    tags: ["Japonesa", "Jantar", "Aniversário"],
  },
  {
    id: 6,
    chefName: "Chef Camila Rocha",
    chefImage: "/images/chef-camila.jpg",
    userName: "Lucas Mendonça",
    userImage: "/images/lucas-mendonca.jpg",
    rating: 4.9,
    comment:
      "Como vegano, sempre tive dificuldade em encontrar opções gastronômicas de alto nível. A Chef Camila mudou isso completamente! Comida vegana deliciosa e sofisticada.",
    date: "12/04/2023",
    tags: ["Vegana", "Almoço", "Corporativo"],
  },
]

export default function AvaliacoesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChef, setSelectedChef] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [isChefOpen, setIsChefOpen] = useState(false)
  const [isRatingOpen, setIsRatingOpen] = useState(false)
  const [isOccasionOpen, setIsOccasionOpen] = useState(false)

  const chefs = [
    "Chef Ricardo Silva",
    "Chef Maria Santos",
    "Chef André Costa",
    "Chef Juliana Mendes",
    "Chef Paulo Oliveira",
    "Chef Camila Rocha",
  ]

  const occasions = ["Jantar", "Almoço", "Aniversário", "Casamento", "Corporativo", "Aula"]

  const filteredAvaliacoes = avaliacoesData.filter((avaliacao) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      avaliacao.chefName.toLowerCase().includes(term) ||
      avaliacao.userName.toLowerCase().includes(term) ||
      avaliacao.comment.toLowerCase().includes(term) ||
      avaliacao.tags.some((tag) => tag.toLowerCase().includes(term))

    const matchesChef = !selectedChef || avaliacao.chefName.toLowerCase().includes(selectedChef.toLowerCase())

    const matchesRating =
      !selectedRating ||
      (() => {
        switch (selectedRating) {
          case 5:
            return avaliacao.rating >= 4.5
          case 4:
            return avaliacao.rating >= 4.0 && avaliacao.rating < 4.5
          case 3:
            return avaliacao.rating < 4.0
          default:
            return true
        }
      })()

    const matchesOccasion =
      !selectedOccasion || avaliacao.tags.some((tag) => tag.toLowerCase() === selectedOccasion.toLowerCase())

    return matchesSearch && matchesChef && matchesRating && matchesOccasion
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#fff8f0] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#ea580c]">Avaliações dos Nossos Chefs</h1>
            <p className="text-lg text-gray-700 mb-0">
              Descubra o que nossos clientes estão dizendo sobre as experiências gastronômicas com nossos chefs
              profissionais.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por chef, cliente ou comentário..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Dropdown Chef */}
              <div className="relative">
                <button
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedChef ? "border-[#ea580c] bg-[#fff8f0] text-[#7c2d12]" : "border-gray-300"
                  }`}
                  onClick={() => setIsChefOpen(!isChefOpen)}
                >
                  <User className="h-4 w-4" />
                  <span>Chef</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isChefOpen && (
                  <div
                    className="absolute z-10 mt-1 w-56 bg-white border border-[#ea580c] rounded-md shadow-lg"
                    onMouseLeave={() => setIsChefOpen(false)}
                  >
                    <div className="p-2">
                      <div className="space-y-1">
                        {chefs.map((chef) => (
                          <button
                            key={chef}
                            className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-50 transition-colors duration-200 ${
                              selectedChef === chef ? "bg-[#fff8f0] text-[#7c2d12]" : ""
                            }`}
                            onClick={() => {
                              setSelectedChef(selectedChef === chef ? null : chef)
                              setIsChefOpen(false)
                            }}
                          >
                            {chef}
                          </button>
                        ))}
                      </div>
                      {selectedChef && (
                        <button
                          className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded mt-2 transition-colors duration-200"
                          onClick={() => {
                            setSelectedChef(null)
                            setIsChefOpen(false)
                          }}
                        >
                          Limpar filtro
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Rating */}
              <div className="relative">
                <button
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedRating !== null ? "border-[#ea580c] bg-[#fff8f0] text-[#7c2d12]" : "border-gray-300"
                  }`}
                  onClick={() => setIsRatingOpen(!isRatingOpen)}
                >
                  <Star className="h-4 w-4" />
                  <span>Avaliação</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isRatingOpen && (
                  <div
                    className="absolute z-10 mt-1 w-48 bg-white border border-[#ea580c] rounded-md shadow-lg"
                    onMouseLeave={() => setIsRatingOpen(false)}
                  >
                    <div className="p-2">
                      <div className="space-y-1">
                        {[5, 4, 3].map((rating) => (
                          <button
                            key={rating}
                            className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-50 transition-colors duration-200 ${
                              selectedRating === rating ? "bg-[#fff8f0] text-[#7c2d12]" : ""
                            }`}
                            onClick={() => {
                              setSelectedRating(selectedRating === rating ? null : rating)
                              setIsRatingOpen(false)
                            }}
                          >
                            {rating} estrelas ou mais
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Occasion */}
              <div className="relative">
                <button
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedOccasion !== null ? "border-[#ea580c] bg-[#fff8f0] text-[#7c2d12]" : "border-gray-300"
                  }`}
                  onClick={() => setIsOccasionOpen(!isOccasionOpen)}
                >
                  <Filter className="h-4 w-4" />
                  <span>Ocasião</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isOccasionOpen && (
                  <div
                    className="absolute z-10 mt-1 w-48 bg-white border border-[#ea580c] rounded-md shadow-lg"
                    onMouseLeave={() => setIsOccasionOpen(false)}
                  >
                    <div className="p-2">
                      <div className="space-y-1">
                        {occasions.map((occasion) => (
                          <button
                            key={occasion}
                            className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-50 transition-colors duration-200 ${
                              selectedOccasion === occasion ? "bg-[#fff8f0] text-[#7c2d12]" : ""
                            }`}
                            onClick={() => {
                              setSelectedOccasion(selectedOccasion === occasion ? null : occasion)
                              setIsOccasionOpen(false)
                            }}
                          >
                            {occasion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAvaliacoes.map((avaliacao) => (
              <div
                key={avaliacao.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={avaliacao.userImage || "/placeholder.svg"}
                        alt={avaliacao.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">{avaliacao.userName}</h3>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-[#ea580c] fill-current" />
                          <span className="ml-1 text-gray-600">{avaliacao.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{avaliacao.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{avaliacao.comment}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {avaliacao.tags.map((tag) => (
                      <span key={tag} className="bg-[#fff8f0] text-[#ea580c] px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center pt-4 border-t border-gray-200">
                    <div className="flex-shrink-0 mr-3">
                      <img
                        src={avaliacao.chefImage || "/placeholder.svg"}
                        alt={avaliacao.chefName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Avaliação para</p>
                      <Link to={`/chef/${avaliacao.id}`} className="font-medium text-[#ea580c] hover:text-[#c2410c]">
                        {avaliacao.chefName}
                      </Link>
                    </div>
                    {avaliacao.featured && (
                      <div className="bg-[#ea580c] text-white px-2 py-1 rounded text-sm">Destaque</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAvaliacoes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma avaliação encontrada com os filtros selecionados.</p>
              <button
                className="mt-4 px-4 py-2 bg-[#ea580c] text-white rounded-md hover:bg-[#c2410c] transition-colors duration-200"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedChef(null)
                  setSelectedRating(null)
                  setSelectedOccasion(null)
                }}
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
