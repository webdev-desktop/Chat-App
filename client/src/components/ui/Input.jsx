//#region Input.jsx
"use client";

import { useState } from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  icon,
  error,
  name,
  readOnly,
  rows,
  rightIcon,
  onRightIconClick,
  maxLength,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const base = {
    width: "100%",
    background: readOnly ? "#18181C" : "#1F1F24",
    border: `1px solid ${isFocused ? "#00EAFF" : error ? "#E8192C" : "#2A2A30"}`,
    borderRadius: "10px",
    color: "#F5F5F7",
    // responsive font size
    fontSize: "clamp(13px, 1.6vw, 14px)",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    padding: `11px 14px 11px ${icon ? "38px" : "14px"}`,
    paddingRight: rightIcon ? "36px" : "14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: isFocused ? "0 0 0 3px rgba(0,234,255,0.12)" : "none",
  };

  const labelStyle = {
    fontSize: "clamp(10px, 1.1vw, 11px)",
    fontWeight: 700,
    color: isFocused ? "#00EAFF" : error ? "#E8192C" : "#8E8E9A",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "'Syne', sans-serif",
    transition: "color 0.2s ease",
  };

  const sharedHandlers = {
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label style={labelStyle}>{label}</label>}

      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "15px",
              color: "#4A4A55",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {icon}
          </span>
        )}

        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            rows={rows || 3}
            style={{ ...base, resize: "vertical" }}
            {...sharedHandlers}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            style={base}
            {...sharedHandlers}
          />
        )}

        {rightIcon && (
          <span
            onClick={onRightIconClick}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "gray",
              fontSize: "16px",
              userSelect: "none",
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p style={{ fontSize: "clamp(10px, 1.1vw, 11px)", color: "#E8192C" }}>
          {error}
        </p>
      )}
    </div>
  );
}

//#endregion
