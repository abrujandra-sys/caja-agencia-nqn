import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  Upload, FileText, Check, Search, Paperclip, Pencil, Trash2, PlusCircle,
  Download, Archive, ChevronDown,
} from "lucide-react";
import { T, fmt } from "./tokens";
import { cs, SectionTitle, Field } from "./common.jsx";

const CATEGORIAS = ["Combustible", "Repuestos", "Service", "Publicidad", "Peajes", "Viáticos", "Mantenimiento", "Herramientas", "Seguros", "Librería", "Supermercado", "Comisiones", "Otros"];
const MEDIOS_PAGO = ["Efectivo", "Transferencia", "Tarjeta débito", "Tarjeta crédito", "Cuenta corriente"];
const VEHICULOS = ["AC-311-KZ · Toyota Hilux", "AB-902-FT · Fiat Cronos", "AD-115-QP · Renault Kangoo", "AC-770-JL · Toyota Hilux", "No aplica"];
const VENDEDORES = ["R. Aguirre", "M. Bulacio", "S. Farías", "L. Godoy", "P. Ibarra", "Agencia"];

const GASTOS_INICIAL = [
  { id: 1, fecha: "04/07/2026", vendedor: "R. Aguirre", vehiculo: "AC-311-KZ", categoria: "Combustible", subcategoria: "Nafta súper", proveedor: "YPF Ruta 22", importe: 24800, medio: "Tarjeta crédito", comp: true },
  { id: 2, fecha: "04/07/2026", vendedor: "S. Farías", vehiculo: "No aplica", categoria: "Peajes", subcategoria: "Autopista", proveedor: "AUSA", importe: 3200, medio: "Efectivo", comp: true },
  { id: 3, fecha: "03/07/2026", vendedor: "Agencia", vehiculo: "No aplica", categoria: "Librería", subcategoria: "Insumos oficina", proveedor: "Librería Central", importe: 8400, medio: "Efectivo", comp: false },
  { id: 4, fecha: "03/07/2026", vendedor: "M. Bulacio", vehiculo: "No aplica", categoria: "Viáticos", subcategoria: "Almuerzo cliente", proveedor: "Resto El Patio", importe: 12500, medio: "Tarjeta débito", comp: true },
];

function hoyDDMMYYYY() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

const emptyForm = {
  fecha: hoyDDMMYYYY(), vendedor: "", vehiculo: "", categoria: CATEGORIAS[0], subcategoria: "",
  proveedor: "", importe: "", medio: MEDIOS_PAGO[0], observaciones: "",
};

function Uploader({ onExtract }) {
  const [step, setStep] = useState("idle"); // idle | processing | ready
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  function handleFile(name) {
    setFileName(name);
    setStep("processing");
    setTimeout(() => {
      setStep("ready");
      onExtract({
        fecha: "04/07/2026", importe: "24800", proveedor: "YPF S.A. — Estación Ruta 22",
        categoria: "Combustible", vehiculo: VEHICULOS[0], vendedor: VENDEDORES[0],
      }, name);
    }, 900);
  }

  return (
    <div
      style={cs.dropzone}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f.name); }}
    >
      {step === "idle" && (
        <>
          <Upload size={24} color={T.primary} />
          <div style={{ fontWeight: 600, marginTop: 10 }}>Arrastrá la factura, ticket o recibo</div>
          <div style={{ fontSize: 12.5, color: T.inkSoft, marginTop: 4 }}>o hacé clic para elegir un archivo — JPG, PNG o PDF</div>
        </>
      )}
      {step === "processing" && (
        <>
          <div style={cs.spinner} />
          <div style={{ fontWeight: 600, marginTop: 14 }}>Leyendo comprobante con OCR…</div>
          <div style={{ fontSize: 12.5, color: T.inkSoft, marginTop: 4 }}>{fileName}</div>
        </>
      )}
      {step === "ready" && (
        <div style={cs.fileChip}><FileText size={14} /> {fileName} — datos aplicados al formulario</div>
      )}
      <input ref={inputRef} type="file" accept="image/*,.pdf" style={{ display: "none" }}
        onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0].name); }} />
    </div>
  );
}

function exportarExcel(gastos, nombreArchivo) {
  const filas = gastos.map((g) => ({
    Fecha: g.fecha,
    Vendedor: g.vendedor,
    Vehículo: g.vehiculo,
    Categoría: g.categoria,
    Subcategoría: g.subcategoria,
    Proveedor: g.proveedor,
    Importe: g.importe,
    "Medio de pago": g.medio,
    Observaciones: g.observaciones || "",
    Comprobante: g.comp ? "Sí" : "No",
  }));
  const hoja = XLSX.utils.json_to_sheet(filas);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Gastos");
  XLSX.writeFile(libro, `${nombreArchivo}.xlsx`);
}

export default function CargaGastos() {
  const [gastos, setGastos] = useState(GASTOS_INICIAL);
  const [form, setForm] = useState(emptyForm);
  const [comprobante, setComprobante] = useState(null);
  const [query, setQuery] = useState("");
  const [editId, setEditId] = useState(null);
  const [periodosArchivados, setPeriodosArchivados] = useState([]);
  const [confirmarCierre, setConfirmarCierre] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState("");

  function cerrarPeriodo() {
    const etiqueta = `Período cerrado el ${new Date().toLocaleDateString("es-AR")}`;
    exportarExcel(gastos, `gastos_${new Date().toISOString().slice(0, 10)}`);
    setPeriodosArchivados([{ etiqueta, gastos, cerrado: new Date().toISOString() }, ...periodosArchivados]);
    setGastos([]);
    setConfirmarCierre(false);
  }

  function setF(key, val) { setForm({ ...form, [key]: val }); }

  function handleExtract(data, fileName) {
    setForm({ ...form, ...data });
    setComprobante(fileName);
  }

  function guardarGasto() {
    const faltantes = [];
    if (!form.fecha) faltantes.push("Fecha");
    if (!form.importe) faltantes.push("Importe");
    if (!form.proveedor) faltantes.push("Proveedor");
    if (faltantes.length > 0) {
      setErrorGuardado(`Completá estos campos antes de guardar: ${faltantes.join(", ")}.`);
      return;
    }
    setErrorGuardado("");
    if (editId) {
      setGastos(gastos.map((g) => (g.id === editId ? { ...g, ...form, importe: Number(form.importe), comp: !!comprobante || g.comp } : g)));
    } else {
      setGastos([{ id: Date.now(), ...form, importe: Number(form.importe), comp: !!comprobante }, ...gastos]);
    }
    setForm(emptyForm);
    setComprobante(null);
    setEditId(null);
  }

  function editar(g) {
    setEditId(g.id);
    setForm({
      fecha: g.fecha, vendedor: g.vendedor, vehiculo: g.vehiculo, categoria: g.categoria,
      subcategoria: g.subcategoria, proveedor: g.proveedor, importe: String(g.importe),
      medio: g.medio, observaciones: g.observaciones || "",
    });
  }

  function eliminar(id) {
    setGastos(gastos.filter((g) => g.id !== id));
  }

  const filtrados = gastos.filter((g) =>
    [g.vendedor, g.proveedor, g.categoria, g.vehiculo].join(" ").toLowerCase().includes(query.toLowerCase())
  );
  const totalPeriodo = gastos.reduce((a, g) => a + g.importe, 0);

  return (
    <div style={cs.body}>
      <div style={cs.pageHeader}>
        <div>
          <div style={cs.eyebrow}>REGISTRO</div>
          <div style={cs.pageTitle}>Cargar gasto</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={cs.btnGhost} onClick={() => exportarExcel(gastos, `gastos_${new Date().toISOString().slice(0, 10)}`)}>
            <Download size={14} style={{ marginRight: 6 }} /> Exportar a Excel
          </button>
          <button style={{ ...cs.btnGhost, color: T.danger, borderColor: T.dangerSoft }} onClick={() => setConfirmarCierre(true)}>
            <Archive size={14} style={{ marginRight: 6 }} /> Cerrar período
          </button>
        </div>
      </div>

      {confirmarCierre && (
        <div style={{ ...cs.infoStrip, background: T.dangerSoft, alignItems: "center", justifyContent: "space-between" }}>
          <span>
            Esto va a descargar un Excel con los {gastos.length} gastos actuales, archivarlos, y dejar la lista vacía para empezar el próximo período. ¿Confirmás?
          </span>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 12 }}>
            <button style={cs.btnGhost} onClick={() => setConfirmarCierre(false)}>Cancelar</button>
            <button style={{ ...cs.btnPrimary, background: T.danger }} onClick={cerrarPeriodo}>Sí, cerrar período</button>
          </div>
        </div>
      )}

      <div style={cs.grid}>
        {/* form column */}
        <div style={{ ...cs.card, gridColumn: "span 5" }}>
          <SectionTitle eyebrow={editId ? "EDITANDO" : "NUEVO GASTO"} title={editId ? "Modificar registro" : "Comprobante y datos"} />

          <Uploader onExtract={handleExtract} />

          <div style={{ ...cs.reviewNote, marginTop: 14 }}>Completá o corregí los datos antes de guardar.</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={cs.formGrid}>
              <Field label="Fecha" value={form.fecha} onChange={(v) => setF("fecha", v)} />
              <Field label="Importe" value={form.importe} onChange={(v) => setF("importe", v)} />
              <Field label="Vendedor / líder" value={form.vendedor} onChange={(v) => setF("vendedor", v)} as="select" options={VENDEDORES} />
              <Field label="Vehículo" value={form.vehiculo} onChange={(v) => setF("vehiculo", v)} as="select" options={VEHICULOS} />
              <Field label="Categoría" value={form.categoria} onChange={(v) => setF("categoria", v)} as="select" options={CATEGORIAS} />
              <Field label="Subcategoría" value={form.subcategoria} onChange={(v) => setF("subcategoria", v)} />
              <Field label="Proveedor" value={form.proveedor} onChange={(v) => setF("proveedor", v)} full />
              <Field label="Medio de pago" value={form.medio} onChange={(v) => setF("medio", v)} as="select" options={MEDIOS_PAGO} full />
              <Field label="Observaciones" value={form.observaciones} onChange={(v) => setF("observaciones", v)} as="textarea" full />
            </div>

            {errorGuardado && (
              <div style={{ ...cs.infoStrip, background: T.dangerSoft, color: T.danger, marginBottom: 0 }}>
                {errorGuardado}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              {editId && (
                <button style={cs.btnGhost} onClick={() => { setEditId(null); setForm(emptyForm); setComprobante(null); }}>Cancelar</button>
              )}
              <button style={cs.btnPrimary} onClick={guardarGasto}>
                <Check size={15} /> {editId ? "Guardar cambios" : "Registrar gasto"}
              </button>
            </div>
          </div>
        </div>

        {/* list column */}
        <div style={{ ...cs.card, gridColumn: "span 7" }}>
          <SectionTitle
            eyebrow="PERÍODO ACTUAL"
            title="Gastos cargados"
            action={<span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600 }}>{fmt(totalPeriodo)}</span>}
          />
          <div style={{ ...cs.searchWrap, maxWidth: 280, marginBottom: 14 }}>
            <Search size={15} color={T.inkSoft} />
            <input placeholder="Buscar…" style={cs.searchInput} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div style={{ maxHeight: 560, overflowY: "auto" }}>
            <table style={cs.table}>
              <thead><tr>
                <th style={cs.th}>Fecha</th>
                <th style={cs.th}>Vendedor</th>
                <th style={cs.th}>Categoría</th>
                <th style={cs.th}>Proveedor</th>
                <th style={{ ...cs.th, textAlign: "right" }}>Importe</th>
                <th style={cs.th}></th>
                <th style={{ ...cs.th, textAlign: "right" }}>Acciones</th>
              </tr></thead>
              <tbody>
                {filtrados.map((g) => (
                  <tr key={g.id}>
                    <td style={{ ...cs.td, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{g.fecha}</td>
                    <td style={cs.td}>{g.vendedor}</td>
                    <td style={cs.td}><span style={cs.pill}>{g.categoria}</span></td>
                    <td style={cs.td}>{g.proveedor}</td>
                    <td style={{ ...cs.td, textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{fmt(g.importe)}</td>
                    <td style={cs.td}>
                      {g.comp ? <Paperclip size={13} color={T.inkSoft} /> : <span style={{ color: T.danger, fontSize: 10.5, fontWeight: 600 }}>sin comp.</span>}
                    </td>
                    <td style={{ ...cs.td, textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <button style={cs.smallIconBtn} onClick={() => editar(g)}><Pencil size={13} /></button>
                        <button style={cs.smallIconBtn} onClick={() => eliminar(g.id)}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr><td style={{ ...cs.td, color: T.inkSoft }} colSpan={7}>No se encontraron gastos para esta búsqueda.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {periodosArchivados.length > 0 && (
        <div style={{ ...cs.card, marginTop: 14 }}>
          <SectionTitle eyebrow="HISTORIAL" title="Períodos cerrados anteriormente" />
          {periodosArchivados.map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.line}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{p.etiqueta}</div>
                <div style={{ fontSize: 12, color: T.inkSoft }}>{p.gastos.length} gastos registrados</div>
              </div>
              <button style={cs.btnGhost} onClick={() => exportarExcel(p.gastos, `gastos_archivo_${i + 1}`)}>
                <Download size={13} style={{ marginRight: 6 }} /> Volver a descargar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
