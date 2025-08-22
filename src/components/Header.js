export default function Header({ onHowItWorksClick }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px 20px 20px",
        position: "relative",
        minHeight: "140px",
      }}
    >
      <div
        className="animated-logo-container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
          padding: "20px 30px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.3s ease",
          cursor: "pointer",
          maxWidth: "100%",
          textAlign: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
        }}
      >
        <div
          className="floating-icon"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "15px",
            background:
              "linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <span
            className="lightning-icon"
            style={{
              fontSize: "28px",
              zIndex: 2,
              position: "relative",
            }}
          >
            ⚡
          </span>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)",
              animation: "gradientShift 3s ease infinite",
              zIndex: 1,
            }}
          ></div>
        </div>
        <div style={{ minWidth: 0, flex: "1" }}>
          <h1
            className="gradient-text"
            style={{
              margin: 0,
              fontSize: "clamp(18px, 4vw, 28px)",
              fontWeight: "800",
              letterSpacing: "0.5px",
              wordBreak: "break-word",
            }}
          >
            Shopify Liquid Template Generator
          </h1>
          <p
            className="shimmer-text"
            style={{
              margin: "5px 0 0 0",
              fontSize: "clamp(12px, 2.5vw, 14px)",
              fontWeight: "500",
            }}
          >
            Complete Sections with Schema & Custom Templates
          </p>
        </div>
      </div>

      <button
        onClick={onHowItWorksClick}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)",
          border: "none",
          borderRadius: "25px",
          padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)",
          color: "white",
          fontSize: "clamp(12px, 2.5vw, 14px)",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
          zIndex: 10,
          marginRight: "110px",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px) scale(1.05)";
          e.target.style.boxShadow = "0 6px 20px rgba(0, 212, 255, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.boxShadow = "0 4px 15px rgba(0, 212, 255, 0.3)";
        }}
      >
        <span>❓</span>
        How It Works
      </button>

      {/* <a
        href="/docs"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",
          border: "none",
          borderRadius: "25px",
          padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)",
          color: "#000",
          fontSize: "clamp(12px, 2.5vw, 14px)",
          fontWeight: "700",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0, 255, 136, 0.3)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 255, 136, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 255, 136, 0.3)";
        }}
      >
        <span>📘</span>
        Docs
      </a> */}
    </div>
  );
}
