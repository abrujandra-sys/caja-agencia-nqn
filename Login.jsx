import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, CircleAlert } from "lucide-react";
import { T } from "../tokens";
import { cs } from "../common.jsx";

export const DEMO_USER = "admin";
export const DEMO_PASS = "admin123";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (usuario === DEMO_USER && pass === DEMO_PASS) onLogin(usuario);
      else setError("Usuario o contraseña incorrectos.");
    }, 500);
  }

  return (
    <div style={styles.loginWrap}>
      <div style={styles.loginPanel}>
        <div style={styles.brandRow}>
          <div style={styles.brandMark}>G</div>
          <span style={styles.brandName}>Gastos</span>
        </div>
        <div style={styles.loginTitle}>Iniciar sesión</div>
        <div style={styles.loginSub}>Control integral de gastos de la agencia</div>

        <form onSubmit={submit} style={{ marginTop: 22, animation: error ? "shake 0.4s" : "none" }}>
          <label style={{ ...cs.fieldWrap, marginBottom: 14 }}>
            <span style={cs.fieldLabel}>Usuario</span>
            <div style={styles.inputRow}>
              <User size={15} color={T.inkSoft} />
              <input style={styles.inputBare} value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="usuario" autoFocus />
            </div>
          </label>

          <label style={{ ...cs.fieldWrap, marginBottom: 14 }}>
            <span style={cs.fieldLabel}>Contraseña</span>
            <div style={styles.inputRow}>
              <Lock size={15} color={T.inkSoft} />
              <input style={styles.inputBare} type={showPass ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" />
              <button type="button" style={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={15} color={T.inkSoft} /> : <Eye size={15} color={T.inkSoft} />}
              </button>
            </div>
          </label>

          {error && <div style={styles.errorRow}><CircleAlert size={14} /> {error}</div>}

          <div style={styles.loginRowBetween}>
            <label style={styles.checkRow}><input type="checkbox" style={{ accentColor: T.primary }} /> Recordarme</label>
            <span style={styles.forgotLink}>Olvidé mi contraseña</span>
          </div>

          <button type="submit" style={cs.btnPrimaryFull} disabled={loading}>
            {loading ? "Verificando…" : "Ingresar"}
          </button>
        </form>

        <div style={styles.demoHint}>Demo: <b>admin</b> / <b>admin123</b></div>
      </div>
    </div>
  );
}

const styles = {
  loginWrap: { minHeight: "100vh", background: `linear-gradient(160deg, ${T.primary} 0%, #0A2E38 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: 20 },
  loginPanel: { background: T.surface, borderRadius: 16, padding: "36px 34px", width: 380, boxShadow: "0 24px 60px rgba(0,0,0,0.25)" },
  brandRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 22 },
  brandMark: { width: 30, height: 30, borderRadius: 8, background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 },
  brandName: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, color: T.ink },
  loginTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, color: T.ink },
  loginSub: { fontSize: 13, color: T.inkSoft, marginTop: 4 },
  inputRow: { display: "flex", alignItems: "center", gap: 8, border: `1px solid ${T.line}`, borderRadius: 9, padding: "10px 12px" },
  inputBare: { border: "none", outline: "none", fontSize: 13.5, flex: 1, background: "transparent", color: T.ink, fontFamily: "'Inter', sans-serif" },
  eyeBtn: { background: "none", border: "none", cursor: "pointer", display: "flex" },
  errorRow: { display: "flex", alignItems: "center", gap: 6, color: T.danger, fontSize: 12.5, background: T.dangerSoft, borderRadius: 8, padding: "8px 10px", marginBottom: 12 },
  loginRowBetween: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, fontSize: 12.5 },
  checkRow: { display: "flex", alignItems: "center", gap: 6, color: T.inkSoft },
  forgotLink: { color: T.primary, cursor: "pointer", fontWeight: 500 },
  demoHint: { textAlign: "center", fontSize: 11.5, color: T.inkSoft, marginTop: 16 },
};
