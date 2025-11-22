import { useEffect, useMemo, useState } from "react";

// SVG simple PDF icon
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
    <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h2.5a1.5 1.5 0 0 1 0 3H9v2H8v-5zm5 0h1v5h-1v-5zm3 0h2a1 1 0 0 1 0 2h-1v1h1v1h-2v-4z" />
  </svg>
);

// Sample data - replace with your real manual list
const manuals = [
  { brand: "Samsung", type: "Lavadora", model: "X100", file: "/manuales/samsung-lavadora-x100.pdf" },
  { brand: "Samsung", type: "Lavadora", model: "X200", file: "/manuales/samsung-lavadora-x200.pdf" },
  { brand: "Samsung", type: "Televisor", model: "UHD-55", file: "/manuales/samsung-tv-55.pdf" },
  { brand: "LG", type: "Aire", model: "CoolPlus", file: "/manuales/lg-aire-coolplus.pdf" },
  { brand: "JVC", type: "Televisor", model: "Bravia-8", file: "/manuales/sony-bravia8.pdf" },
  { brand: "BGH", type: "Televisor", model: "Bravia-8", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Banyo", type: "Televisor", model: "Bravia-8", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Ferrari", type: "Televisor", model: "Bravia-8", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Panasony", type: "Televisor", model: "Bravia-8", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-81", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-82", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-83", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-84", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-85", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-86", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-87", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-88", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-89", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-80", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-811", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-812", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-823", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-834", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-845", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-856", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-867", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-878", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-889", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-890", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8112", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-81132", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-82142", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-83152", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-84112", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-85112", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-86112", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8711g2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8811wd2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8911ws2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011wa2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011wq2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-80112qq", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011fw2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011g2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011s2", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-801112", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-801152", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-801412", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-804112", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-80112x", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011255", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-8011552", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-801s712", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-801z12", file: "/manuales/sony-bravia8.pdf" },
  { brand: "Sony", type: "Televisor", model: "Bravia-80u112", file: "/manuales/sony-bravia8.pdf" },
];

export default function ManualSearchPage() {
  // Search inputs (to the right of the dropdown)
  const [brandInput, setBrandInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [modelInput, setModelInput] = useState("");

  // Dropdown state
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Results
  const [results, setResults] = useState<any[]>([]);

  // Derived lists for dropdown columns
  const brands = useMemo(() => Array.from(new Set(manuals.map((m) => m.brand))), []);
  const types = useMemo(() => {
    if (!selectedBrand) return Array.from(new Set(manuals.map((m) => m.type)));
    return Array.from(new Set(manuals.filter((m) => m.brand === selectedBrand).map((m) => m.type)));
  }, [selectedBrand]);
  const models = useMemo(() => {
    if (!selectedBrand && !selectedType) return Array.from(new Set(manuals.map((m) => m.model)));
    return Array.from(
      new Set(
        manuals
          .filter((m) => (selectedBrand ? m.brand === selectedBrand : true) && (selectedType ? m.type === selectedType : true))
          .map((m) => m.model)
      )
    );
  }, [selectedBrand, selectedType]);

  // Close dropdown when pressing Escape or clicking outside (simple)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Search handler using the inputs at the top-right
  const handleSearch = () => {
    const filtered = manuals.filter((m) => {
      const matchBrand = brandInput ? m.brand.toLowerCase().includes(brandInput.toLowerCase()) : true;
      const matchType = typeInput ? m.type.toLowerCase().includes(typeInput.toLowerCase()) : true;
      const matchModel = modelInput ? m.model.toLowerCase().includes(modelInput.toLowerCase()) : true;
      return matchBrand && matchType && matchModel;
    });
    setResults(filtered);
    // close dropdown if open
    setOpenDropdown(false);
  };

  // Click behavior inside dropdown: single click selects and opens next column; double click applies 'search by that level' (bring all manuals from where double clicked)
  const onBrandClick = (b: string) => {
    setSelectedBrand(b);
    setSelectedType(null);
    setSelectedModel(null);
  };
  const onBrandDouble = (b: string) => {
    const filtered = manuals.filter((m) => m.brand === b);
    setResults(filtered);
    setOpenDropdown(false);
  };

  const onTypeClick = (t: string) => {
    setSelectedType(t);
    setSelectedModel(null);
  };
  const onTypeDouble = (t: string) => {
    const filtered = manuals.filter((m) => (selectedBrand ? m.brand === selectedBrand : true) && m.type === t);
    setResults(filtered);
    setOpenDropdown(false);
  };

  const onModelClick = (mo: string) => {
    setSelectedModel(mo);
  };
  const onModelDouble = (mo: string) => {
    const filtered = manuals.filter(
      (m) => (selectedBrand ? m.brand === selectedBrand : true) && (selectedType ? m.type === selectedType : true) && m.model === mo
    );
    setResults(filtered);
    setOpenDropdown(false);
  };

  // Quick helper to apply current selected values as search
  const applySelectedAsSearch = () => {
    const filtered = manuals.filter((m) => {
      const matchBrand = selectedBrand ? m.brand === selectedBrand : true;
      const matchType = selectedType ? m.type === selectedType : true;
      const matchModel = selectedModel ? m.model === selectedModel : true;
      return matchBrand && matchType && matchModel;
    });
    setResults(filtered);
    setOpenDropdown(false);
  };

  return (
    <div className="w-full h-screen flex flex-col p-6 gap-4 bg-[#1a1f2e]">
      {/* TOP BAR */}
      <div className="flex items-center gap-4">
        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown((s) => !s)}
            className="px-4 py-2 bg-[#1e2738] text-white rounded-xl shadow hover:bg-gray-700 transition"
            aria-expanded={openDropdown}
            aria-controls="manuales-dropdown"
          >
            Manuales
          </button>
        </div>

        {/* Three search inputs to the right */}
        <input
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
          placeholder="Marca"
          className="border rounded-xl px-3 py-2 w-56 bg-[#3a4459] border-[#3a4459]  "
        />
        <input
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
          placeholder="Tipo"
          className="border rounded-xl px-3 py-2 w-56 bg-[#3a4459] border-[#3a4459] "
        />
        <input
          value={modelInput}
          onChange={(e) => setModelInput(e.target.value)}
          placeholder="Modelo"
          className="border rounded-xl px-3 py-2 w-56 bg-[#3a4459] border-[#3a4459] "
        />

        <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-500 transition">
          Search
        </button>
      </div>

      {/* DROPDOWN OVERLAY - ocupa 100% height y width cuando está abierto */}
      {openDropdown && (
        <div
          id="manuales-dropdown"
          className="bg-[#3a4459] flex w-full max-h-screen"
          onClick={() => setOpenDropdown(false)}
        >
          {/* panel que no cierra al click interno */}
          <div className="bg-[#1e2738]  shadow-2xl  w-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex">
              {/* Column: Brands */}
              <div className="w-56 border-r p-4">
                <div className="font-semibold mb-3">Marca</div>
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[80vh]">
                  {brands.map((b) => (
                    <div
                      key={b}
                      onClick={() => onBrandClick(b)}
                      onDoubleClick={() => onBrandDouble(b)}
                      className={`px-3 py-2 rounded cursor-pointer select-none transition ${selectedBrand === b ? "bg-[#3a4459] font-semibold" : "hover:bg-[#3a4459]"}`}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: Types (abre al costado) */}
              <div className="w-56 border-r p-4">
                <div className="font-semibold mb-3">Tipo</div>
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[80vh]">
                  {types.map((t) => (
                    <div
                      key={t}
                      onClick={() => onTypeClick(t)}
                      onDoubleClick={() => onTypeDouble(t)}
                      className={`px-3 py-2 rounded cursor-pointer select-none transition ${selectedType === t ? "bg-[#3a4459] font-semibold" : "hover:bg-[#3a4459]"}`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: Models (abre al costado) */}
              <div className="flex-1 max-h-screen p-4">
                <div className="font-semibold mb-3">Modelo</div>
                <div className="grid grid-cols-3 gap-1 overflow-y-auto max-h-[80vh]">
                  {models.map((mo) => (
                    <div
                      key={mo}
                      onClick={() => onModelClick(mo)}
                      onDoubleClick={() => onModelDouble(mo)}
                      className={`px-3 py-2 rounded cursor-pointer select-none transition ${selectedModel === mo ? "bg-[#3a4459] font-semibold" : "hover:bg-[#3a4459]"}`}
                    >
                      {mo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRID DE RESULTADOS - scroll independiente (no mueve la página) */}
      <div className="h-screen overflow-y-auto">
        {results.length === 0 ? (
          <div className="text-gray-500">No hay resultados. Hacé una búsqueda o abrí el menú de Manuales.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((m) => (
              <div key={m.file} className="flex items-center gap-3 bg-[#1e2738] rounded-xl  p-4 shadow hover:bg-[#3a4459] cursor-pointer" onClick={() => window.open(m.file, "_blank")}>
                <div className="w-14 h-14 bg-red-100 rounded flex items-center justify-center">
                  <PdfIcon />
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-white">{m.brand}</div>
                  <div className="text-sm text-white">{m.type}</div>
                  <div className="text-lg text-white">{m.model}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
