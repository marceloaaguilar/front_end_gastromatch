import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { Star, ChevronDown, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Chef } from "../lib/interfaces";
import { getServerUrl } from '../utils/env';

export default function ChefsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
    const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [allChefs, setAllChefs] = useState<Chef[]>([]);

    const specialties = [
        "Italiana",
        "Francesa",
        "Japonesa",
        "Brasileira",
        "Mediterrânea",
        "Vegana"
    ];

    const priceRanges = [
        { label: "Até R$ 100", value: "0-100" },
        { label: "R$ 100 - R$ 150", value: "100-150" },
        { label: "R$ 150 - R$ 200", value: "150-200" },
        { label: "Acima de R$ 200", value: "200+" }
    ];

    const toggleSpecialty = (specialty: string) => {
        setSelectedSpecialties(prev => 
        prev.includes(specialty)
            ? prev.filter(s => s !== specialty)
            : [...prev, specialty]
        );
    };

    useEffect(() => {
        getChefList();
    }, []);

    useEffect(() => {
        selectedSpecialties.length > 0  ? getChefBySpeciality() : getChefList();
    }, [selectedSpecialties])

    async function getChefList() {
        const skip = (currentPage ? currentPage - 1 : 0);

        const response = await fetch(`${getServerUrl()}/api/chefs?limit=10?skip=${skip * 5}&limit=5`, {credentials: 'include'});
        const resultChefs = await response.json();
          
        if (resultChefs && resultChefs.data && resultChefs.data.chefs) {
            setChefs(resultChefs.data.chefs);
            setAllChefs(resultChefs.data.chefs);
        }
    }

    async function getChefBySpeciality() {
        const skip = currentPage ? currentPage - 1 : 0;
        const response = await fetch(`${getServerUrl()}/api/chefs/search?limit=10&skip=${skip * 5}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ specializations: selectedSpecialties })
        });

        const resultChefs = await response.json();
        setChefs(resultChefs.data.chefs);
        setAllChefs(resultChefs.data.chefs);
    }

    // Filter chefs based on all criteria
    const filteredChefs = allChefs.filter(chef => {
        // Search term filter
        const matchesSearch = searchTerm === "" || 
            chef.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chef.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chef.professional_description?.toLowerCase().includes(searchTerm.toLowerCase());

        // Specialties filter
        const matchesSpecialties = selectedSpecialties.length === 0 || 
            selectedSpecialties.some(specialty => 
                chef.specialization.toLowerCase().includes(specialty.toLowerCase())
            );

        // Rating filter
        const matchesRating = selectedRating === null || 
            (chef.rating && chef.rating >= selectedRating);

        // Price filter
        const matchesPrice = selectedPrice === null || 
            (() => {
                const chefPrice = chef.price_per_hour || 0;
                
                if (selectedPrice === "200+") {
                    return chefPrice >= 200;
                }
                
                const [min, max] = selectedPrice.split('-').map(Number);
                if (isNaN(min) || isNaN(max)) {
                    return false;
                }
                
                return chefPrice >= min && chefPrice <= max;
            })();

        return matchesSearch && matchesSpecialties && matchesRating && matchesPrice;
    });

    return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="bg-[#fff8f0] py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#ea580c]">
              Nossos Chefs Profissionais
            </h1>
            <p className="text-lg text-gray-700 mb-0">
              Descubra os melhores chefs disponíveis para criar experiências
              gastronômicas únicas para você e seus convidados.
            </p>
          </div>
        </div>
      </section>


      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nome ou especialidade..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <button 
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedSpecialties.length > 0 ? 'border-[#ea580c] bg-[#fff8f0] text-[#7c2d12]' : 'border-gray-300'
                  }`}
                  onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                >
                  <Filter className="h-4 w-4" />
                  <span>Especialidade</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isSpecialtyOpen && (
                  <div 
                    className="absolute z-10 mt-1 w-56 bg-white border border-[#ea580c] rounded-md shadow-lg"
                    onMouseLeave={() => setIsSpecialtyOpen(false)}
                  >
                    <div className="p-2">
                      <div className="space-y-1">
                        {specialties.map((specialty) => (
                          <label 
                            key={specialty}
                            className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded transition-colors duration-200"
                          >
                            <input
                              type="checkbox"
                              checked={selectedSpecialties.includes(specialty)}
                              onChange={() => toggleSpecialty(specialty)}
                              className="rounded text-[#ea580c] focus:ring-[#ea580c]"
                            />
                            <span>{specialty}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded mt-2 transition-colors duration-200"
                        onClick={() => setSelectedSpecialties([])}
                      >
                        Limpar filtro
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Dropdown Rate */}
              <div className="relative">
                <button 
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedRating !== null ? 'border-[#ea580c] bg-[#fff8f0] text-[#7c2d12]' : 'border-gray-300'
                  }`}
                  onClick={() => setIsRatingOpen(!isRatingOpen)}
                >
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
                              selectedRating === rating ? 'bg-[#fff8f0] text-[#7c2d12]' : ''
                            }`}
                            onClick={() => {
                              setSelectedRating(selectedRating === rating ? null : rating);
                              setIsRatingOpen(false);
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

              {/* Dropdown Price */}
              <div className="relative">
                <button 
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 ${
                    selectedPrice !== null ? 'border-[#ea580c] bg-[#fff8f0] text-[#7c2d12]' : 'border-gray-300'
                  }`}
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                >
                  <span>Preço</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isPriceOpen && (
                  <div 
                    className="absolute z-10 mt-1 w-48 bg-white border border-[#ea580c] rounded-md shadow-lg"
                    onMouseLeave={() => setIsPriceOpen(false)}
                  >
                    <div className="p-2">
                      <div className="space-y-1">
                        {priceRanges.map((range) => (
                          <button
                            key={range.value}
                            className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-50 transition-colors duration-200 ${
                              selectedPrice === range.value ? 'bg-[#fff8f0] text-[#7c2d12]' : ''
                            }`}
                            onClick={() => {
                              setSelectedPrice(selectedPrice === range.value ? null : range.value);
                              setIsPriceOpen(false);
                            }}
                          >
                            {range.label}
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

      {/* Chefs Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChefs.map((chef) => (
              <div
                key={chef.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={chef.user.profile_photo}
                    alt={chef.user.name}
                    className="w-full h-full object-cover"
                  />

                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{chef.user.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-orange-600 fill-current" />
                      {/* <span className="ml-1 text-gray-600">{chef}</span> */}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{chef.specialization}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{chef.professional_description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">

                    {/* {chef.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#fff8f0] text-[#ea580c] px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))} */}

                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#ea580c] font-bold text-lg">
                      R$ {chef.price_per_hour}/hora
                    </span>
                    <Link
                      to={`/chef/${chef.id}`}
                      className="bg-[#ea580c] text-white px-4 py-2 rounded-md hover:bg-[#c2410c] transition-colors duration-200"
                    >
                      Ver perfil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 