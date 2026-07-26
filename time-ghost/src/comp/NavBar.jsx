import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function NavBar() {
  const location = useLocation();
  const isTracker = location.pathname === "/";
  const isPrepSheet = location.pathname === "/prepsheet";

  return (
    <div style={styles.bar}>
      <Link to="/" style={{ ...styles.link, ...(isTracker ? styles.linkActive : {}) }}>
        Tracker
      </Link>
      <Link to="/prepsheet" style={{ ...styles.link, ...(isPrepSheet ? styles.linkActive : {}) }}>
        PrepSheet
      </Link>
    </div>
  );
}

const styles = {
  bar: { display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "14px" },
  link: {
    background: "transparent",
    border: "1px solid #2A3140",
    color: "#8A93A6",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontFamily: "'JetBrains Mono', monospace",
    cursor: "pointer",
    letterSpacing: "0.3px",
    textDecoration: "none",
    display: "inline-block",
  },
  linkActive: { background: "#F2A93B", color: "#12151C", borderColor: "#F2A93B", fontWeight: 700 },
};
