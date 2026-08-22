// const variants = {
//   primary: {
//     background: "#00b7c7",
//     color: "#fff",
//     border: "none",
//     boxShadow: "0 4px 14px rgba(25, 191, 232, 0.3)",
//   },
//   secondary: {
//     background: "#1F1F24",
//     color: "#F5F5F7",
//     border: "1px solid #2A2A30",
//   },
//   ghost: {
//     background: "transparent",
//     color: "#8E8E9A",
//     border: "1px solid #2A2A30",
//   },
//   danger: {
//     background: "rgba(232,25,44,0.12)",
//     color: "#FF4D5E",
//     border: "1px solid rgba(232,25,44,0.25)",
//   },
//   success: {
//     background: "rgba(34,197,94,0.12)",
//     color: "#22C55E",
//     border: "1px solid rgba(34,197,94,0.25)",
//   },
//   warning: {
//     background: "rgba(245,158,11,0.12)",
//     color: "#F59E0B",
//     border: "1px solid rgba(245,158,11,0.25)",
//   },
//   info: {
//     background: "rgba(59,130,246,0.12)",
//     color: "#3B82F6",
//     border: "1px solid rgba(59,130,246,0.25)",
//   },
// };
// const sizes = {
//   xs: { padding: "4px 10px", fontSize: "11px" },
//   sm: { padding: "7px 14px", fontSize: "12px" },
//   md: { padding: "10px 20px", fontSize: "14px" },
//   lg: { padding: "13px 28px", fontSize: "16px" },
// };

const variants = {
  primary: {
    background: "#00b7c7",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 14px rgba(25, 191, 232, 0.3)",
  },
  secondary: {
    background: "#1F1F24",
    color: "#F5F5F7",
    border: "1px solid #2A2A30",
  },
  ghost: {
    background: "transparent",
    color: "#8E8E9A",
    border: "1px solid #2A2A30",
  },
  danger: {
    background: "rgba(232,25,44,0.12)",
    color: "#FF4D5E",
    border: "1px solid rgba(232,25,44,0.25)",
  },
  success: {
    background: "rgba(34,197,94,0.12)",
    color: "#22C55E",
    border: "1px solid rgba(34,197,94,0.25)",
  },
  warning: {
    background: "rgba(245,158,11,0.12)",
    color: "#F59E0B",
    border: "1px solid rgba(245,158,11,0.25)",
  },
  info: {
    background: "rgba(59,130,246,0.12)",
    color: "#3B82F6",
    border: "1px solid rgba(59,130,246,0.25)",
  },
};

// clamp() se responsive font + padding
const sizes = {
  xs: { padding: "4px 10px", fontSize: "clamp(10px, 1.2vw, 11px)" },
  sm: { padding: "7px 14px", fontSize: "clamp(11px, 1.4vw, 12px)" },
  md: { padding: "10px 20px", fontSize: "clamp(13px, 1.6vw, 14px)" },
  lg: { padding: "13px 28px", fontSize: "clamp(14px, 1.8vw, 16px)" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  type = "button",
  loading,
  style = {},
  full,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        borderRadius: "12px",
        fontFamily: "'DM Sans',sans-serif",
        fontWeight: 600,
        fontSize: "var(--fs-sm)", // ✅ responsive font
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
        width: full ? "100%" : undefined,
        transform: "scale(1)",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

//#region Button.jsx

// export default function Button({
//   children,
//   variant = "primary",
//   size = "md",
//   onClick,
//   disabled,
//   type = "button",
//   loading,
//   style = {},
//   full,
//   title,
// }) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled || loading}
//       title={title}
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "7px",
//         borderRadius: "10px",
//         fontFamily: "'DM Sans', sans-serif",
//         fontWeight: 600,
//         cursor: disabled || loading ? "not-allowed" : "pointer",
//         opacity: disabled ? 0.5 : 1,
//         transition: "all 0.18s",
//         whiteSpace: "nowrap",
//         width: full ? "100%" : undefined,
//         ...sizes[size],
//         ...variants[variant],
//         ...style,
//       }}
//     >
//       {loading ? "..." : children}
//     </button>
//   );
// }

//#endregion
