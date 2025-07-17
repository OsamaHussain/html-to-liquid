/**
 * HTML to Liquid Conversion Configuration
 *
 * Simple ON/OFF control for conversion behavior:
 *
 * CONVERSION_MODE:
 * - "OPENAI_FIRST": OpenAI API first, then custom conversion (current behavior)
 * - "CUSTOM_ONLY": Skip OpenAI, direct custom conversion only
 */

// ===============================================
// MAIN CONFIGURATION - Change this to control behavior
// ===============================================

export const CONVERSION_MODE = "OPENAI_FIRST";
// export const CONVERSION_MODE = "CUSTOM_ONLY";

// ===============================================
// Additional Settings (Optional)
// ===============================================

export const CONFIG = {
  // Size limit for OpenAI conversion (lines)
  SIZE_LIMIT: 1500,

  // Wait time when content exceeds size limit (milliseconds)
  WAIT_TIME: 120000, // 2 minutes

  // Enable/disable console logs
  ENABLE_LOGS: true,
};

// ===============================================
// Helper Functions
// ===============================================

export function shouldUseOpenAI() {
  return CONVERSION_MODE === "OPENAI_FIRST";
}

export function isCustomOnlyMode() {
  return CONVERSION_MODE === "CUSTOM_ONLY";
}

export function getConfig() {
  return {
    mode: CONVERSION_MODE,
    useOpenAI: shouldUseOpenAI(),
    customOnly: isCustomOnlyMode(),
    ...CONFIG,
  };
}
