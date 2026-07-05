import React, { useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";
import {
  Fuel, ChevronDown, Users, AlertTriangle, Paperclip, Wrench, ShieldCheck,
  Percent, Upload, PlusCircle,
} from "lucide-react";
import { T, fmt } from "../tokens";
import { cs, SectionTitle } from "../common.jsx";

const CATEGORIAS = [
  { name: "Combustible", value: 412500, color: T.primary },
  { name: "Repuestos", value: 268400, color: "#3D7A8A" },
  { name: "Publicidad", value: 231000, color: T.accent },
  { name: "Service", value: 152300, color: "#6FA0A8" },
  { name: "Comisiones", value: 419250, color: "#A97C50" },
  { name: "Seguros", value: 124900, color: "#7C93A0" },
  { name: "Viáticos", value: 98700, color: "#B7CBCF" },
  { name: "Peajes", value: 61200, color: "#8FB6BC" },
  { name: "Librería", value: 22300, color: "#C9AA84" },
  { name: "Supermercado", value: 34600, color: "#B7C9B0" },
  { name: "Otros", value: 60400, color: "#D8E2E4" },
];

const VENDEDORES = [
  { name: "R. Aguirre", value: 318200 },
  { name: "M. Bulacio", value: 276900 },
  { name: "S. Farías", value: 241100 },
  { name: "L. Godoy", value: 189500 },
  { name: "P. Ibarra", value: 158800 },
];
const VENDOR_COLORS = [T.primary, "#3D7A8A", T.accent, "#8FB6BC", "#D8B08C"];

const VEHICULOS = [
  { placa: "AC-311-KZ", modelo: "Toyota Hilux", total: 214300, ultimo: "Combustible" },
  { placa: "AB-902-FT", modelo: "Fiat Cronos", total: 96700, ultimo: "Service" },
  { placa: "AD-115-QP", modelo: "Renault Kangoo", total: 143200, ultimo: "Neumáticos" },
  { placa: "AC-770-JL", modelo: "Toyota Hilux", total: 187500, ultimo: "Repuestos" },
];

const SEGUROS = [
  { placa: "AC-311-KZ", modelo: "Toyota Hilux", aseguradora: "La Caja", poliza: "004-2201938", vence: "18/07/2026", prima: 38500, estado: "vigente" },
  { placa: "AB-902-FT", modelo: "Fiat Cronos", aseguradora: "Sancor Seguros", poliza: "112-887765", vence: "09/07/2026", prima: 21200, estado: "por_vencer" },
  { placa: "AD-115-QP", modelo: "Renault Kangoo", aseguradora: "La Caja", poliza: "004-2201940", vence: "02/09/2026", prima: 24300, estado: "vigente" },
  { placa: "AC-770-JL", modelo: "Toyota Hilux", aseguradora: "Zurich", poliza: "778-330211", vence: "30/06/2026", prima: 39900, estado: "vencido" },
];
const ESTADO_LABEL = {
  vigente: { text: "Vigente", bg: T.successSoft, fg: T.success },
  por_vencer: { text: "Por vencer", bg: T.accentSoft, fg: T.accent },
  vencido: { text: "Vencido", bg: T.dangerSoft, fg: T.danger },
};

const COMISIONES = [
  { lider: "R. Aguirre", ventas: 4180000, pct: 3, monto: 125400 },
  { lider: "M. Bulacio", ventas: 3620000, pct: 3, monto: 108600 },
  { lider: "S. Farías", ventas: 3990000, pct: 2.5, monto: 99750 },
  { lider: "L. Godoy", ventas: 2850000, pct: 3, monto: 85500 },
];

const MOVIMIENTOS = [
  { fecha: "04/07", vendedor: "R. Aguirre", categoria: "Combustible", monto: 24800, comp: true },
  { fecha: "04/07", vendedor: "S. Farías", categoria: "Peajes", monto: 3200, comp: true },
  { fecha: "03/07", vendedor: "Agencia", categoria: "Librería", monto: 8400, comp: false },
  { fecha: "03/07", vendedor: "M. Bulacio", categoria: "Viáticos", monto: 12500, comp: true },
  { fecha: "02/07", vendedor: "L. Godoy", categoria: "Repuestos", monto: 38900, comp: true },
  { fecha: "02/07", vendedor: "Agencia", categoria: "Supermercado", monto: 15600, comp: false },
];

const ALERTAS = [
  { texto: "Presupuesto de publicidad al 90% del período" },
  { texto: "3 comprobantes sin adjuntar hace más de 2 días" },
  { texto: "Póliza de AC-770-JL vencida — renovar" },
];

const PERIODOS = ["29 jun — 04 jul 2026", "22 jun — 28 jun 2026", "15 jun — 21 jun 2026"];

function Gauge({ percent }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(percent, 100);
  const color = percent >= 100 ? T.danger : percent >= 80 ? T.accent : T.primary;
  return (
    <div style={{ position: "relative", width: 132, height: 132, margin: "0 auto" }}>
      <svg width="132" height="132" viewBox="0 0 132 132">
        <circle cx="66" cy="66" r={r} fill="none" stroke={T.surfaceAlt} strokeWidth="12" />
        <circle cx="66" cy="66" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={c} strokeDashoffset={c - (clamped / 100) * c} strokeLinecap="round" transform="rotate(-90 66 66)" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, fontWeight: 600, color: T.ink }}>{percent}%</span>
        <span style={{ fontSize: 10, color: T.inkSoft, letterSpacing: 0.4 }}>usado</span>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta, positive }) {
  return (
    <div style={cs.kpiCard}>
      <div style={cs.kpiTop}>
        <span style={cs.kpiLabel}>{label}</span>
        <Icon size={16} color={T.inkSoft} strokeWidth={1.75} />
      </div>
      <div style={cs.kpiValue}>{value}</div>
      {delta && <div style={{ ...cs.kpiDelta, color: positive ? T.success : T.danger }}>{delta}</div>}
    </div>
  );
}

export default function Dashboard({ onGoToCarga }) {
  const [periodo, setPeriodo] = useState(PERIODOS[0]);
  const [openPeriodo, setOpenPeriodo] = useState(false);

  const totalPeriodo = useMemo(() => CATEGORIAS.reduce((a, c) => a + c.value, 0), []);
  const presupuestoTotal = 320000;
  const gastoPublicidad = CATEGORIAS.find((c) => c.name === "Publicidad").value;
  const pctPublicidad = Math.round((gastoPublicidad / presupuestoTotal) * 100);
  const totalComisiones = COMISIONES.reduce((a, c) => a + c.monto, 0);
  const totalPrimas = SEGUROS.reduce((a, s) => a + s.prima, 0);

  return (
    <div style={cs.body}>
      <div style={cs.pageHeader}>
        <div>
          <div style={cs.eyebrow}>PANEL PRINCIPAL</div>
          <div style={cs.pageTitle}>Dashboard</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={cs.btnPrimary} onClick={onGoToCarga}><PlusCircle size={15} /> Cargar gasto</button>
          <div style={styles.periodPicker} onClick={() => setOpenPeriodo(!openPeriodo)}>
            <span>{periodo}</span>
            <ChevronDown size={14} />
            {openPeriodo && (
              <div style={styles.periodMenu}>
                {PERIODOS.map((p) => (
                  <div key={p} style={styles.periodItem} onClick={(e) => { e.stopPropagation(); setPeriodo(p); setOpenPeriodo(false); }}>{p}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={cs.kpiRow}>
        <Kpi icon={Users} label="TOTAL DEL PERÍODO" value={fmt(totalPeriodo)} delta="8% vs período anterior" positive={false} />
        <Kpi icon={Fuel} label="GASTOS DE HOY" value={fmt(48100)} delta="dentro del promedio diario" positive />
        <Kpi icon={Percent} label="COMISIONES A PAGAR" value={fmt(totalComisiones)} delta={`${COMISIONES.length} líderes`} positive />
        <Kpi icon={ShieldCheck} label="PRIMAS DE SEGURO / MES" value={fmt(totalPrimas)} delta="1 póliza vencida" positive={false} />
      </div>

      <div style={cs.grid}>
        <div style={{ ...cs.card, gridColumn: "span 7" }}>
          <SectionTitle eyebrow="ANÁLISIS" title="Gasto por categoría" />
          <ResponsiveContainer width="100%" height={310}>
            <BarChart data={CATEGORIAS} layout="vertical" margin={{ left: 8, right: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.line} horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 11, fill: T.inkSoft }} axisLine={{ stroke: T.line }} tickLine={false} />
              <YAxis type="category" dataKey="name" width={95} tick={{ fontSize: 12, fill: T.ink }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => fmt(v)} contentStyle={{ fontFamily: "Inter", fontSize: 12, borderRadius: 8, border: `1px solid ${T.line}` }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                {CATEGORIAS.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...cs.card, gridColumn: "span 5" }}>
          <SectionTitle eyebrow="CONTROL DE PRESUPUESTO" title="Publicidad" />
          <Gauge percent={pctPublicidad} />
          <div style={{ marginTop: 16, borderTop: `1px solid ${T.line}`, paddingTop: 12 }}>
            <div style={styles.gaugeStatRow}><span style={styles.gaugeStatLabel}>Presupuesto</span><span style={styles.gaugeStatMono}>{fmt(presupuestoTotal)}</span></div>
            <div style={styles.gaugeStatRow}><span style={styles.gaugeStatLabel}>Gastado</span><span style={styles.gaugeStatMono}>{fmt(gastoPublicidad)}</span></div>
            <div style={styles.gaugeStatRow}><span style={styles.gaugeStatLabel}>Saldo</span><span style={{ ...styles.gaugeStatMono, color: T.success }}>{fmt(presupuestoTotal - gastoPublicidad)}</span></div>
          </div>
          {pctPublicidad >= 80 && <div style={cs.warnStrip}><AlertTriangle size={13} color={T.accent} /> Alcanzó el umbral del 80% configurado</div>}
        </div>

        <div style={{ ...cs.card, gridColumn: "span 5" }}>
          <SectionTitle eyebrow="RANKING" title="Gasto por vendedor / líder" />
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <PieChart width={128} height={128}>
              <Pie data={VENDEDORES} dataKey="value" innerRadius={38} outerRadius={58} paddingAngle={2}>
                {VENDEDORES.map((v, i) => <Cell key={i} fill={VENDOR_COLORS[i]} stroke="none" />)}
              </Pie>
            </PieChart>
            <div style={{ flex: 1 }}>
              {VENDEDORES.map((v, i) => (
                <div key={v.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: VENDOR_COLORS[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, flex: 1 }}>{v.name}</span>
                  <span style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: T.inkSoft }}>{fmt(v.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ ...cs.card, gridColumn: "span 7" }}>
          <SectionTitle eyebrow="LIQUIDACIÓN" title="Comisiones por líder" />
          <table style={cs.table}>
            <thead><tr>
              <th style={cs.th}>Líder</th>
              <th style={{ ...cs.th, textAlign: "right" }}>Ventas del período</th>
              <th style={{ ...cs.th, textAlign: "right" }}>%</th>
              <th style={{ ...cs.th, textAlign: "right" }}>Comisión</th>
            </tr></thead>
            <tbody>
              {COMISIONES.map((c) => (
                <tr key={c.lider}>
                  <td style={cs.td}>{c.lider}</td>
                  <td style={{ ...cs.td, textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>{fmt(c.ventas)}</td>
                  <td style={{ ...cs.td, textAlign: "right" }}>{c.pct}%</td>
                  <td style={{ ...cs.td, textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{fmt(c.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...cs.card, gridColumn: "span 12" }}>
          <SectionTitle eyebrow="FLOTA" title="Pólizas de seguro por vehículo" />
          <table style={cs.table}>
            <thead><tr>
              <th style={cs.th}>Vehículo</th>
              <th style={cs.th}>Aseguradora</th>
              <th style={cs.th}>N° de póliza</th>
              <th style={cs.th}>Vencimiento</th>
              <th style={{ ...cs.th, textAlign: "right" }}>Prima mensual</th>
              <th style={cs.th}>Estado</th>
            </tr></thead>
            <tbody>
              {SEGUROS.map((s) => (
                <tr key={s.placa}>
                  <td style={cs.td}>
                    <div style={{ fontWeight: 600 }}>{s.modelo}</div>
                    <div style={{ fontSize: 11, color: T.inkSoft, fontFamily: "'IBM Plex Mono', monospace" }}>{s.placa}</div>
                  </td>
                  <td style={cs.td}>{s.aseguradora}</td>
                  <td style={{ ...cs.td, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>{s.poliza}</td>
                  <td style={cs.td}>{s.vence}</td>
                  <td style={{ ...cs.td, textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{fmt(s.prima)}</td>
                  <td style={cs.td}>
                    <span style={{ ...cs.statusPill, background: ESTADO_LABEL[s.estado].bg, color: ESTADO_LABEL[s.estado].fg }}>{ESTADO_LABEL[s.estado].text}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...cs.card, gridColumn: "span 7" }}>
          <SectionTitle eyebrow="FLOTA" title="Costo por vehículo" />
          <table style={cs.table}>
            <thead><tr>
              <th style={cs.th}>Vehículo</th>
              <th style={cs.th}>Último gasto</th>
              <th style={{ ...cs.th, textAlign: "right" }}>Total período</th>
            </tr></thead>
            <tbody>
              {VEHICULOS.map((v) => (
                <tr key={v.placa}>
                  <td style={cs.td}>
                    <div style={{ fontWeight: 600 }}>{v.modelo}</div>
                    <div style={{ fontSize: 11, color: T.inkSoft, fontFamily: "'IBM Plex Mono', monospace" }}>{v.placa}</div>
                  </td>
                  <td style={cs.td}><span style={cs.pill}><Wrench size={11} />{v.ultimo}</span></td>
                  <td style={{ ...cs.td, textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{fmt(v.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ ...cs.card, gridColumn: "span 5" }}>
          <SectionTitle eyebrow="MONITOREO" title="Alertas" />
          {ALERTAS.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "9px 0", borderBottom: `1px solid ${T.line}` }}>
              <AlertTriangle size={14} color={T.accent} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12.5 }}>{a.texto}</span>
            </div>
          ))}
        </div>

        <div style={{ ...cs.card, gridColumn: "span 12" }}>
          <SectionTitle
            eyebrow="ACTIVIDAD" title="Últimos movimientos"
            action={<button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", color: T.primary, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }} onClick={onGoToCarga}><Upload size={13} /> Subir comprobante</button>}
          />
          <div style={cs.ledger}>
            {MOVIMIENTOS.map((m, i) => (
              <div key={i} style={cs.ledgerRow}>
                <span style={{ color: T.inkSoft, width: 40 }}>{m.fecha}</span>
                <span style={{ color: T.ink, fontWeight: 600, width: 110 }}>{m.vendedor}</span>
                <span style={{ color: T.inkSoft, flexShrink: 0 }}>{m.categoria}</span>
                <span style={{ flex: 1, borderBottom: `1px dotted ${T.line}`, margin: "0 8px", transform: "translateY(-4px)" }} />
                {m.comp ? <Paperclip size={12} color={T.inkSoft} style={{ marginRight: 6 }} /> : <span style={{ color: T.danger, fontSize: 11, fontWeight: 600, marginRight: 6 }}>sin comprobante</span>}
                <span style={{ fontWeight: 600, color: T.ink, minWidth: 90, textAlign: "right" }}>{fmt(m.monto)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  periodPicker: { position: "relative", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, padding: "8px 12px", border: `1px solid ${T.line}`, borderRadius: 8, cursor: "pointer", color: T.ink, background: T.surface },
  periodMenu: { position: "absolute", top: "110%", right: 0, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, boxShadow: "0 6px 20px rgba(15,30,40,0.12)", minWidth: 190, overflow: "hidden", zIndex: 20 },
  periodItem: { padding: "9px 12px", fontSize: 13, cursor: "pointer" },
  gaugeStatRow: { display: "flex", justifyContent: "space-between", padding: "4px 0" },
  gaugeStatLabel: { fontSize: 12.5, color: T.inkSoft },
  gaugeStatMono: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, fontWeight: 600 },
};
