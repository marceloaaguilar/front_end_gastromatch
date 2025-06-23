import { useState } from "react";
import { Plus } from "lucide-react";

interface EspecialidadesSelect {
  especialidades: string[],
  onChange: (e:any) => void
}

const todasEspecialidades = [
  "Cozinha Italiana",
  "Cozinha Japonesa",
  "Cozinha Brasileira",
  "Vegana",
  "Doces",
  "Churrasco",
];

export default function EspecialidadesSelect({especialidades: especialidades, onChange: setEspecialidades}:EspecialidadesSelect) {
  const [mostrarSelect, setMostrarSelect] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  const adicionarEspecialidade = () => {
    if (opcaoSelecionada && !especialidades.includes(opcaoSelecionada)) {
      setEspecialidades([...especialidades, opcaoSelecionada]);
      setOpcaoSelecionada("");
      setMostrarSelect(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Especialidades</label>
      <div className="flex flex-wrap gap-2 items-center">
        {especialidades.map((esp, index) => (
          <span key={index} className="px-3 py-1 bg-orange-100 text-[#ea580c] rounded-full text-sm">
            {esp}
          </span>
        ))}

        {mostrarSelect ? (
          <div className="flex items-center gap-2">
            <select
              value={opcaoSelecionada}
              onChange={(e) => setOpcaoSelecionada(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700"
            >
              <option value="">Selecionar...</option>
              {todasEspecialidades.map((esp, idx) => (
                <option key={idx} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={adicionarEspecialidade}
              className="px-3 py-1 bg-[#ea580c] text-white rounded-full text-sm hover:bg-orange-600"
            >
              Adicionar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setMostrarSelect(true)}
            className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <Plus className="w-3 h-3 mr-1" /> Adicionar
          </button>
        )}
      </div>
    </div>
  );
}
