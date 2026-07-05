import React from "react";
import { X } from "lucide-react";
import { T } from "./tokens";

export const cs = {
  body: { padding: "24px 22px 60px", maxWidth: 1240, margin: "0 auto" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, flexWrap: "wrap", gap: 12 },
  eyebrow: { fontSize: 10.5, letterSpacing: 1, color: T.accent, fontWeight: 700, marginBottom: 3, textTransform: "uppercase" },
  sectionTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: T.ink },
  pageTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: T.ink },

  card: { background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 14 },

  kpiRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 16 },
  kpiCard: { background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: "16px 18px" },
  kpiTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  kpiLabel: { fontSize: 10.5, letterSpacing: 0.6, color: T.inkSoft, fontWeight: 600 },
  kpiValue: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 600, color: T.ink },
  kpiDelta: { fontSize: 11.5, marginTop: 6, fontWeight: 500 },

  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", fontSize: 10.5, letterSpacing: 0.5, color: T.inkSoft, fontWeight: 600, padding: "0 8px 10px 0", textTransform: "uppercase", borderBottom: `1px solid ${T.line}` },
  td: { padding: "12px 8px 12px 0", borderBottom: `1px solid ${T.line}`, fontSize: 13, verticalAlign: "middle" },
  pill: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, background: T.surfaceAlt, color: T.inkSoft, borderRadius: 20, padding: "3px 9px", fontWeight: 500 },
  statusPill: { display: "inline-flex", fontSize: 11.5, borderRadius: 20, padding: "3px 10px", fontWeight: 600 },
  smallIconBtn: { background: T.surfaceAlt, border: "none", borderRadius: 7, padding: 7, cursor: "pointer", display: "flex", color: T.inkSoft },

  searchWrap: { display: "flex", alignItems: "center", gap: 8, background: T.surfaceAlt, borderRadius: 8, padding: "8px 12px" },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 13, width: "100%", color: T.ink, fontFamily: "'Inter', sans-serif" },

  infoStrip: { display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, background: T.accentSoft, color: T.ink, borderRadius: 10, padding: "10px 14px", marginBottom: 14, lineHeight: 1.5 },
  warnStrip: { marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, background: T.accentSoft, color: T.accent, borderRadius: 8, padding: "7px 10px", fontWeight: 600 },

  fieldWrap: { display: "flex", flexDirection: "column", gap: 5, marginBottom: 0 },
  fieldLabel: { fontSize: 11, color: T.inkSoft, fontWeight: 600 },
  fieldInput: { border: `1px solid ${T.line}`, borderRadius: 8, padding: "9px 10px", fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif", width: "100%", color: T.ink, background: T.surface },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },

  btnGhost: { background: "none", border: `1px solid ${T.line}`, borderRadius: 8, padding: "9px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: T.ink },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 6, background: T.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnPrimaryFull: { width: "100%", background: T.primary, color: "#fff", border: "none", borderRadius: 9, padding: "12px 0", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  iconBtn: { background: T.surfaceAlt, border: "none", borderRadius: 8, padding: 8, cursor: "pointer", display: "flex" },

  dropzone: { border: `1.5px dashed ${T.line}`, borderRadius: 12, padding: "34px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", textAlign: "center" },
  spinner: { width: 26, height: 26, border: `3px solid ${T.primarySoft}`, borderTopColor: T.primary, borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  fileChip: { display: "inline-flex", alignItems: "center", gap: 6, background: T.surfaceAlt, borderRadius: 8, padding: "6px 10px", fontSize: 12.5 },
  reviewNote: { fontSize: 12, color: T.inkSoft, margin: "10px 0 14px" },

  ledger: { display: "flex", flexDirection: "column" },
  ledgerRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px dashed ${T.line}`, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 },

  modalOverlay: { position: "fixed", inset: 0, background: "rgba(18,32,41,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 },
  modalCard: { background: T.surface, borderRadius: 14, padding: 24, width: 520, maxWidth: "94vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(15,30,40,0.25)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 },

  historyRow: { display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px dashed ${T.line}` },
  historyDate: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: T.inkSoft, width: 76, flexShrink: 0, paddingTop: 1 },
};

export function SectionTitle({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
      <div>
        <div style={cs.eyebrow}>{eyebrow}</div>
        <div style={cs.sectionTitle}>{title}</div>
      </div>
      {action}
    </div>
  );
}

export function Field({ label, value, onChange, full, as = "input", options }) {
  return (
    <label style={{ ...cs.fieldWrap, gridColumn: full ? "span 2" : "span 1" }}>
      <span style={cs.fieldLabel}>{label}</span>
      {as === "select" ? (
        <select style={cs.fieldInput} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : as === "textarea" ? (
        <textarea style={{ ...cs.fieldInput, minHeight: 70, resize: "vertical" }} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input style={cs.fieldInput} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function Modal({ eyebrow, title, onClose, children, width }) {
  return (
    <div style={cs.modalOverlay} onClick={onClose}>
      <div style={{ ...cs.modalCard, width: width || 520 }} onClick={(e) => e.stopPropagation()}>
        <div style={cs.modalHeader}>
          <div>
            <div style={cs.eyebrow}>{eyebrow}</div>
            <div style={cs.sectionTitle}>{title}</div>
          </div>
          <button style={cs.iconBtn} onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
