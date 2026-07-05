import React, { useState } from "react";
import {
  ShieldCheck, ShieldAlert, Plus, History, Pencil, KeyRound, Search, Check, RefreshCw,
} from "lucide-react";
import { T } from "./tokens";
import { cs, SectionTitle, Field, Modal } from "./common.jsx";

const USUARIOS_INICIAL = [
  { id: 1, usuario: "admin", nombre: "A. Marchetti", perfil: "Administrador", ultimo: "04/07/2026 · 09:12", estado: "activo" },
  { id: 2, usuario: "mbulacio", nombre: "M. Bulacio", perfil: "Operativo", ultimo: "03/07/2026 · 18:40", estado: "activo" },
  { id: 3, usuario: "sfarias", nombre: "S. Farías", perfil: "Operativo", ultimo: "02/07/2026 · 14:05", estado: "activo" },
  { id: 4, usuario: "lgodoy", nombre: "L. Godoy", perfil: "Operativo", ultimo: "28/06/2026 · 11:20", estado: "inactivo" },
];

const HISTORIAL = {
  1: [
    { fecha: "04/07 09:12", accion: "Inicio de sesión", detalle: "IP 190.191.22.4" },
    { fecha: "03/07 19:02", accion: "Editó usuario", detalle: "Cambió perfil de S. Farías a Operativo" },
    { fecha: "03/07 18:50", accion: "Cerró período", detalle: "Período 22 jun — 28 jun 2026" },
  ],
  2: [
    { fecha: "03/07 18:40", accion: "Inicio de sesión", detalle: "IP 190.191.40.9" },
    { fecha: "03/07 18:44", accion: "Cargó gasto", detalle: "Combustible — $24.800" },
    { fecha: "03/07 18:52", accion: "Adjuntó comprobante", detalle: "Factura 0004-00082931" },
  ],
  3: [
    { fecha: "02/07 14:05", accion: "Inicio de sesión", detalle: "IP 190.191.12.3" },
    { fecha: "02/07 14:20", accion: "Cargó gasto", detalle: "Peajes — $3.200" },
  ],
  4: [
    { fecha: "28/06 11:20", accion: "Inicio de sesión", detalle: "IP 190.191.55.1" },
    { fecha: "28/06 11:40", accion: "Cerró sesión", detalle: "—" },
  ],
};

function UserModal({ onClose, onSave, initial }) {
  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [usuario, setUsuario] = useState(initial?.usuario || "");
  const [perfil, setPerfil] = useState(initial?.perfil || "Operativo");
  const [pass, setPass] = useState("");

  return (
    <Modal eyebrow={initial ? "EDITAR USUARIO" : "NUEVO USUARIO"} title={initial ? initial.nombre : "Crear acceso"} onClose={onClose} width={480}>
      <div style={cs.formGrid}>
        <Field label="Nombre completo" value={nombre} onChange={setNombre} full />
        <Field label="Usuario" value={usuario} onChange={setUsuario} />
        <Field label="Perfil de acceso" value={perfil} onChange={setPerfil} as="select" options={["Administrador", "Operativo"]} />
        <div style={{ gridColumn: "span 2" }}>
          <span style={cs.fieldLabel}>{initial ? "Restablecer contraseña (opcional)" : "Contraseña temporal"}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${T.line}`, borderRadius: 8, padding: "9px 10px", marginTop: 5 }}>
            <KeyRound size={15} color={T.inkSoft} />
            <input style={{ border: "none", outline: "none", fontSize: 13, flex: 1, background: "transparent" }} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Generar automáticamente" />
            <button type="button" style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }} onClick={() => setPass(Math.random().toString(36).slice(-8))}>
              <RefreshCw size={14} color={T.primary} />
            </button>
          </div>
        </div>
      </div>

      {perfil === "Operativo" && (
        <div style={{ ...cs.infoStrip, marginTop: 14 }}>
          <ShieldAlert size={13} color={T.inkSoft} />
          Este perfil solo podrá cargar y consultar gastos según los permisos asignados, sin poder editar ni eliminar registros existentes.
        </div>
      )}

      <div style={cs.modalActions}>
        <button style={cs.btnGhost} onClick={onClose}>Cancelar</button>
        <button style={cs.btnPrimary} onClick={() => onSave({ nombre, usuario, perfil })}><Check size={15} /> Guardar</button>
      </div>
    </Modal>
  );
}

function HistoryModal({ user, onClose }) {
  const items = HISTORIAL[user.id] || [];
  return (
    <Modal eyebrow="BITÁCORA" title={`Historial de ${user.nombre}`} onClose={onClose} width={480}>
      <div style={{ marginTop: 4 }}>
        {items.map((h, i) => (
          <div key={i} style={cs.historyRow}>
            <span style={cs.historyDate}>{h.fecha}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{h.accion}</div>
              <div style={{ fontSize: 12, color: T.inkSoft }}>{h.detalle}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div style={{ fontSize: 13, color: T.inkSoft }}>Sin actividad registrada.</div>}
      </div>
    </Modal>
  );
}

export default function Usuarios({ demoRole }) {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIAL);
  const [modalUser, setModalUser] = useState(null);
  const [historyUser, setHistoryUser] = useState(null);
  const [query, setQuery] = useState("");
  const isAdmin = demoRole === "Administrador";

  const filtered = usuarios.filter((u) => u.nombre.toLowerCase().includes(query.toLowerCase()) || u.usuario.toLowerCase().includes(query.toLowerCase()));

  function saveUser(data) {
    if (modalUser?.id) setUsuarios(usuarios.map((u) => (u.id === modalUser.id ? { ...u, ...data } : u)));
    else setUsuarios([...usuarios, { id: Date.now(), ...data, ultimo: "—", estado: "activo" }]);
    setModalUser(null);
  }

  function toggleEstado(id) {
    setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, estado: u.estado === "activo" ? "inactivo" : "activo" } : u)));
  }

  return (
    <div style={cs.body}>
      <div style={cs.pageHeader}>
        <div>
          <div style={cs.eyebrow}>ADMINISTRACIÓN</div>
          <div style={cs.pageTitle}>Usuarios y permisos</div>
        </div>
        {isAdmin && <button style={cs.btnPrimary} onClick={() => setModalUser({})}><Plus size={15} /> Nuevo usuario</button>}
      </div>

      {!isAdmin && (
        <div style={cs.infoStrip}>
          <ShieldAlert size={13} color={T.inkSoft} />
          Estás viendo el módulo con permisos de perfil Operativo: podés consultar usuarios pero no crear, editar ni desactivar accesos.
        </div>
      )}

      <div style={cs.card}>
        <div style={{ ...cs.searchWrap, maxWidth: 320, marginBottom: 16 }}>
          <Search size={15} color={T.inkSoft} />
          <input placeholder="Buscar por nombre o usuario…" style={cs.searchInput} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <table style={cs.table}>
          <thead><tr>
            <th style={cs.th}>Usuario</th>
            <th style={cs.th}>Perfil</th>
            <th style={cs.th}>Último ingreso</th>
            <th style={cs.th}>Estado</th>
            <th style={{ ...cs.th, textAlign: "right" }}>Acciones</th>
          </tr></thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td style={cs.td}>
                  <div style={{ fontWeight: 600 }}>{u.nombre}</div>
                  <div style={{ fontSize: 11.5, color: T.inkSoft, fontFamily: "'IBM Plex Mono', monospace" }}>@{u.usuario}</div>
                </td>
                <td style={cs.td}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, background: T.primarySoft, color: T.primary, borderRadius: 20, padding: "3px 9px", fontWeight: 600 }}>
                    {u.perfil === "Administrador" ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                    {u.perfil}
                  </span>
                </td>
                <td style={{ ...cs.td, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 }}>{u.ultimo}</td>
                <td style={cs.td}>
                  <span style={{ ...cs.statusPill, background: u.estado === "activo" ? T.successSoft : T.dangerSoft, color: u.estado === "activo" ? T.success : T.danger }}>
                    {u.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td style={{ ...cs.td, textAlign: "right" }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button style={cs.smallIconBtn} onClick={() => setHistoryUser(u)} title="Historial"><History size={14} /></button>
                    {isAdmin && (
                      <>
                        <button style={cs.smallIconBtn} onClick={() => setModalUser(u)} title="Editar"><Pencil size={14} /></button>
                        <button style={cs.smallIconBtn} onClick={() => toggleEstado(u.id)} title="Activar / desactivar"><KeyRound size={14} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalUser !== null && <UserModal initial={modalUser.id ? modalUser : null} onClose={() => setModalUser(null)} onSave={saveUser} />}
      {historyUser && <HistoryModal user={historyUser} onClose={() => setHistoryUser(null)} />}
    </div>
  );
}
