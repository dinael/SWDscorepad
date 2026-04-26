import baseConfig, { PHASE_2_MODERN_CSS_RULES } from "./stylelint.config.mjs";

export default {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    ...PHASE_2_MODERN_CSS_RULES,
  },
};
