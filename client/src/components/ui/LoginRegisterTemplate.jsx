import Link from "next/link.js";
import Card from "./Card";

//* LoginRegisterTemplate Shared layout for Login & Register pages

const LoginRegisterTemplate = ({
  logoLabel,
  children,
  bottomLabel,
  bottomLink,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111114",
        padding: "clamp(16px, 4vw, 40px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "clamp(280px, 90%, 420px)",
          margin: "clamp(20px, 5vh, 50px) 0",
        }}
        className="fade-up"
      >
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "clamp(20px, 4vw, 32px)",
          }}
        >
          <img
            src="/LogoW.png"
            style={{ width: "clamp(70px, 10vw, 100px)", height: "auto" }}
            alt="Logo"
          />

          <h1
            style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(24px, 3vw, 40px)",
              marginBottom: "clamp(16px, 3vw, 24px)",
              fontWeight: 800,
              color: "#F5F5F7",
            }}
          >
            AmigosCharla
            <p
              style={{
                color: "#F5F5F7",
                fontSize: "clamp(14px, 1.5vw, 16px)",
                margin: 0,
              }}
            >
              Chat - Connect - Together
            </p>
          </h1>

          <p
            style={{
              color: "#8E8E9A",
              fontSize: "clamp(12px, 1.2vw, 14px)",
              margin: 0,
            }}
          >
            {logoLabel}
          </p>
        </div>

        {/* Card Component */}
        <Card>{children}</Card>

        {/* Bottom Text & Link */}
        <p
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: "clamp(12px, 1.2vw, 14px)",
            marginTop: "clamp(16px, 3vw, 24px)",
            lineHeight: "1.5",
          }}
        >
          {bottomLabel} <br />
          <Link
            href={bottomLink}
            style={{
              color: "#10eef3",
              fontWeight: 800,
              display: "inline-block",
              marginTop: "4px",
            }}
          >
            {bottomLink === "/login" ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterTemplate;
