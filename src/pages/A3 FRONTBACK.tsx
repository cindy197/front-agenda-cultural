import {
  FaTheaterMasks,
  FaFutbol,
  FaUtensils,
  FaFilm,
  FaBook,
  FaGlobe,
  FaGraduationCap,
  FaList,
} from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo4e.png";

function Landing() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEventos() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "http://localhost:8080/eventos/publicos/aprovados"
        );
        if (!response.ok) throw new Error("Erro ao buscar eventos");
        const data = await response.json();
        setEventos(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar eventos");
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);

  const eventosFiltrados = eventos.filter((e: any) => {
    const mapCategoria: Record<string, string> = {
      TEATRO: "Teatro",
      CURSO: "Curso",
      TURISMO: "Turismo",
      HISTORIA_E_CULTURA: "Historia e Cultura",
      CINEMA: "Cinema",
      ESPORTES: "Esporte",
      GASTRONOMIA: "Gastronomia",
    };
    const categoriaOk =
      categoriaSelecionada === "Todos" ||
      mapCategoria[e.categoria as string] === categoriaSelecionada;
    const searchOk =
      !searchTerm ||
      (e.titulo && e.titulo.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoriaOk && searchOk;
  });

  return (
    <div className="w-screen h-screen bg-[#f4f6fa] flex flex-col p-6">
      <div className="flex justify-between items-center w-full mb-6 bg-[#00041a] rounded-xl px-6 py-4 shadow-sm">
        <span className="text-2xl text-white font-bold">Feira Culture</span>
        <div className="flex items-center justify-center flex-1">
          <div className="flex items-center justify-center h-50 w-50 mt-[-25px] mb-[-30px] overflow-hidden">
            <img
              src={Logo}
              alt="Logo Feira Culture"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <button
          className="text-lg text-white font-semibold bg-[#ffb347] hover:bg-[#ffd580] transition px-6 py-2 rounded-full shadow"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <hr className="border-t-2 border-[#e0e3ed] w-full mt-0 mb-8" />
      </div>

      <div className="flex flex-1 items-start justify-center">
        <div className="w-[2200px] mx-auto">
          <h1 className="text-2xl mt-[32px] mb-[40px] font-bold text-center text-[#00041a] bg-[#e0e3ed] py-4 rounded-xl shadow-sm">
            Descubra os melhores eventos em Feira de Santana
          </h1>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Buscar evento por nome..."
              className="px-4 py-2 border border-[#bfc6d9] rounded-full w-96 mb-4 bg-white text-[#00041a] placeholder-[#bfc6d9] focus:border-[#ffb347] focus:ring-[#ffb347]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4 mt-8 bg-[#00041a] rounded-xl py-4 shadow-sm">
            {[
              { label: "Todos", icon: <FaList /> },
              { label: "Teatro", icon: <FaTheaterMasks /> },
              { label: "Esporte", icon: <FaFutbol /> },
              { label: "Turismo", icon: <FaGlobe /> },
              { label: "Curso", icon: <FaGraduationCap /> },
              { label: "Gastronomia", icon: <FaUtensils /> },
              { label: "Cinema", icon: <FaFilm /> },
              { label: "Historia e Cultura", icon: <FaBook /> },
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => setCategoriaSelecionada(cat.label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border transition font-semibold text-sm
                  ${
                    categoriaSelecionada === cat.label
                      ? "bg-[#ffb347] text-[#00041a] border-[#ffb347] shadow"
                      : "bg-[#00041a] text-white border-[#bfc6d9] hover:bg-[#1a1d33]"
                  }
                `}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <hr className="border-t-2 border-[#e0e3ed] w-full mt-6 mb-8" />
          </div>

          {loading && <p className="text-[#bfc6d9]">Carregando eventos...</p>}
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex flex-wrap justify-start gap-5 mt-4">
            {eventosFiltrados.map((evento) => (
              <div key={evento.id} className="w-[310px] min-h-[350px]">
                <button className="rounded-xl border border-[#e0e3ed] p-0 overflow-hidden w-full flex flex-col justify-between h-full hover:bg-[#1a1d33] transition shadow-sm">
                  {evento.imagemUrl && (
                    <img
                      src={evento.imagemUrl}
                      alt={evento.titulo}
                      className="w-full h-40 p-4 object-cover rounded-t-xl"
                    />
                  )}
                  <h2 className="w-full text-xl font-bold mt-6 mb-2 text-center">
                    {evento.titulo}
                  </h2>
                  {evento.descricao && (
                    <p className="text-base text-[#3d415c] mb-2 text-center px-2 line-clamp-3">
                      {evento.descricao}
                    </p>
                  )}
                  <div className="mt-auto w-full px-4 pb-4">
                    {evento.calendarios && evento.calendarios.length > 0 ? (
                      <p className=" mb-2 text-center font-semibold">
                        {evento.calendarios[0].data}
                      </p>
                    ) : null}
                    <span className=" text-[#ffb347] font-bold block text-center">
                      {(() => {
                        const mapCategoria: Record<string, string> = {
                          TEATRO: "Teatro",
                          CURSO: "Curso",
                          TURISMO: "Turismo",
                          HISTORIA_E_CULTURA: "Historia e Cultura",
                          CINEMA: "Cinema",
                          ESPORTES: "Esporte",
                          GASTRONOMIA: "Gastronomia",
                        };
                        return (
                          mapCategoria[evento.categoria as string] ||
                          evento.categoria
                        );
                      })()}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <hr className="border-t-2 border-[#e0e3ed] w-full mt-15 mb-8" />
          </div>
          <div className="flex flex-col items-center gap-2 mt-8 mb-4">
            <p className="text-lg text-[#00041a] font-semibold text-center">
              É a Prefeitura facilitando o acesso às agendas culturais de Feira
              de Santana
            </p>
            <p className="text-sm text-[#3d415c] text-center">
              Prefeitura Municipal de Feira de Santana
              <br />
              Av. Senhor dos Passos, 980. Centro - Feira de Santana - Bahia
              <br />
              Telefone: (75) 3617-0604 | Recepção: 3617-0600 | WhatsApp:
              99867-4432
            </p>
          </div>
          <p className="flex justify-center items-center gap-1 text-sm text-[#bfc6d9] mt-7">
            <FaRegCopyright /> 2025 FEIRA CULTURE
          </p>
        </div>
      </div>
    </div>
  );
}

export { Landing };
