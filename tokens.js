export const T = {
  bg: "#EEF2F4",
  surface: "#FFFFFF",
  surfaceAlt: "#E7EDF0",
  ink: "#122029",
  inkSoft: "#5B6B76",
  primary: "#0E4A57",
  primarySoft: "#DCEAEA",
  accent: "#B85C2C",
  accentSoft: "#F3E1D2",
  success: "#2E7D5B",
  successSoft: "#DCEEE4",
  danger: "#AE3B2E",
  dangerSoft: "#F5E0DC",
  line: "#DDE4E8",
};

export const fmt = (n) => "$ " + Number(n || 0).toLocaleString("es-AR", { maximumFractionDigits: 0 });
