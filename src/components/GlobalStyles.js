export default function GlobalStyles() {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(3deg); }
      }
      
      @keyframes pulse {
        0%, 100% { 
          box-shadow: 0 8px 16px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.1);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 12px 24px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3);
          transform: scale(1.05);
        }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes lightningGlow {
        0%, 100% { 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 10px rgba(255, 255, 0, 0.3));
        }
        50% { 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(0, 212, 255, 0.4));
        }
      }
      
      @keyframes textShimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      .animated-logo-container {
        animation: slideInUp 0.8s ease-out;
      }
      
      .floating-icon {
        animation: float 4s ease-in-out infinite, pulse 3s ease-in-out infinite;
      }
      
      .lightning-icon {
        animation: lightningGlow 2s ease-in-out infinite;
      }
      
      .gradient-text {
        background: linear-gradient(
          135deg, 
          #00d4ff 0%, 
          #ff00ff 25%, 
          #ffff00 50%, 
          #00d4ff 75%, 
          #ff00ff 100%
        );
        background-size: 300% 300%;
        animation: gradientShift 4s ease infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
        .shimmer-text {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 1) 50%,
          rgba(255, 255, 255, 0.8) 100%
        );
        background-size: 200% 100%;
        animation: textShimmer 3s ease-in-out infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes bounce {
        0%, 80%, 100% { 
          transform: translateY(0); 
        }
        40% { 
          transform: translateY(-10px); 
        }
      }
      
      @keyframes loadingDots {
        0%, 80%, 100% { 
          transform: scale(0);
          opacity: 0.5;
        }
        40% { 
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes backgroundPulse {
        0%, 100% { 
          opacity: 0.3; 
          transform: scale(1);
        }
        50% { 
          opacity: 0.6; 
          transform: scale(1.1);
        }
      }
      
      .spinning-loader {
        animation: spin 1s linear infinite;
      }
      
      .bouncing-emoji {
        animation: bounce 2s ease-in-out infinite;
      }
      
      .loading-dot {
        animation: loadingDots 1.4s ease-in-out infinite both;
      }
      
      .loading-dot:nth-child(1) { animation-delay: 0s; }
      .loading-dot:nth-child(2) { animation-delay: 0.16s; }
      .loading-dot:nth-child(3) { animation-delay: 0.32s; }
      
      .pulsing-bg {
        animation: backgroundPulse 3s ease-in-out infinite;
      }
    `}</style>
  );
}
