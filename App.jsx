import React, { useState } from "react";
import { LogOut, LayoutDashboard, PlusCircle, Users as UsersIcon, Search, Bell } from "lucide-react";
import { T } from "./tokens";
import Login from "./screens/Login.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import CargaGastos from "./screens/CargaGastos.jsx";
import Usuarios from "./screens/Usuarios.jsx";

const ALERTAS_COUNT = 3;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("dashboard");
  const [demoRole, setDemoRole] = useState("Administrador");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const NAV = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "carga", label: "Cargar gasto", icon: PlusCircle },
    { key: "usuarios", label: "Usuarios", icon: UsersIcon },
  ];

  return (
    <div style={styles.app}>
      <div style={styles.topbar}>
        <div style={styles.brand}>
          <div style={styles.brandMark}>G</div>
          <span style={styles.brandName}>Gastos</span>
        </div>

        <div style={styles.nav}>
          {NAV.map((n) => (
            <button
              key={n.key}
              style={{ ...styles.navItem, ...(screen === n.key ? styles.navItemActive : {}) }}
              onClick={() => setScreen(n.key)}
            >
              <n.icon size={15} /> {n.label}
            </button>
          ))}
        </div>

        <div style={styles.searchWrap}>
          <Search size={15} color={T.inkSoft} />
          <input placeholder="Buscar por proveedor, vendedor, N° comprobante…" style={styles.searchInput} />
        </div>

        <div style={styles.topRight}>
          <div style={styles.demoToggle}>
            <span style={{ fontSize: 11, color: T.inkSoft }}>Ver como:</span>
            <button style={{ ...styles.demoToggleBtn, ...(demoRole === "Administrador" ? styles.demoToggleBtnOn : {}) }} onClick={() => setDemoRole("Administrador")}>Admin</button>
            <button style={{ ...styles.demoToggleBtn, ...(demoRole === "Operativo" ? styles.demoToggleBtnOn : {}) }} onClick={() => setDemoRole("Operativo")}>Operativo</button>
          </div>
          <div style={styles.bellWrap}>
            <Bell size={17} color={T.ink} />
            <span style={styles.bellBadge}>{ALERTAS_COUNT}</span>
          </div>
          <button style={styles.iconBtn} onClick={() => setLoggedIn(false)} title="Cerrar sesión"><LogOut size={16} /></button>
          <div style={styles.avatar}>AM</div>
        </div>
      </div>

      {screen === "dashboard" && <Dashboard onGoToCarga={() => setScreen("carga")} />}
      {screen === "carga" && <CargaGastos />}
      {screen === "usuarios" && <Usuarios demoRole={demoRole} />}
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: T.bg, fontFamily: "'Inter', sans-serif", color: T.ink },
  topbar: { display: "flex", alignItems: "center", gap: 18, padding: "12px 22px", background: T.surface, borderBottom: `1px solid ${T.line}`, position: "sticky", top: 0, zIndex: 10, flexWrap: "wrap" },
  brand: { display: "flex", alignItems: "center", gap: 8 },
  brandMark: { width: 28, height: 28, borderRadius: 7, background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14 },
  brandName: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: -0.2 },
  nav: { display: "flex", gap: 4 },
  navItem: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: "8px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: T.inkSoft, cursor: "pointer" },
  navItemActive: { background: T.primarySoft, color: T.primary },
  searchWrap: { flex: 1, display: "flex", alignItems: "center", gap: 8, background: T.surfaceAlt, borderRadius: 8, padding: "8px 12px", maxWidth: 340, minWidth: 160 },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 13, width: "100%", color: T.ink },
  topRight: { display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" },
  demoToggle: { display: "flex", alignItems: "center", gap: 6, background: T.surfaceAlt, borderRadius: 8, padding: 4 },
  demoToggleBtn: { border: "none", background: "transparent", fontSize: 11.5, padding: "6px 9px", borderRadius: 6, cursor: "pointer", color: T.inkSoft, fontWeight: 600 },
  demoToggleBtnOn: { background: T.surface, color: T.primary, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  bellWrap: { position: "relative", display: "flex", cursor: "pointer" },
  bellBadge: { position: "absolute", top: -5, right: -6, background: T.danger, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 8, padding: "1px 5px" },
  iconBtn: { background: T.surfaceAlt, border: "none", borderRadius: 8, padding: 8, cursor: "pointer", display: "flex" },
  avatar: { width: 30, height: 30, borderRadius: "50%", background: T.primarySoft, color: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 },
};
