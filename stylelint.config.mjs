const CSS_MODULES_PROPERTIES = ["composes"];

const CSS_MODULES_PSEUDO_CLASSES = ["global", "local"];

const IDIOMATIC_STRUCTURE_RULES = {
  // Keep selectors readable and avoid specificity traps.
  "selector-max-id": 0,
  "selector-max-compound-selectors": 4,
  // Idiomatic CSS recommends shallow nesting. The repo uses SCSS control
  // directives and CSS Modules, so this is kept pragmatic instead of strict.
  "max-nesting-depth": 4,
  "declaration-block-no-shorthand-property-overrides": true,
  "shorthand-property-no-redundant-values": true,
};

const LOGICAL_PROPERTIES_RULES = {
  // Prefer logical properties over physical directions for i18n and RTL support.
  // This rule flags physical properties when logical alternatives exist.
  "property-disallowed-list": [
    {
      "/.*/": {
        message:
          "Prefer logical properties like margin-block, margin-inline over margin-top, margin-bottom, etc.",
      },
    },
  ],
};

const MODERN_CSS_RULES = {
  // Prefer current CSS syntax where adoption does not require bulk rewrites.
  // media-feature-range-notation: 'context' allows both legacy (min-width, max-width)
  // and modern (width <, width >=, 400px <= width <= 800px) Level 4 syntax.
  // The modern syntax is more readable and is recommended:
  // OLD: @media (min-width: 30em) and (max-width: 50em) { ... }
  // NEW: @media (30em <= width <= 50em) { ... }
  "media-feature-range-notation": "context",
  "selector-not-notation": "complex",
  "keyframe-declaration-no-important": true,
};

export const PHASE_2_MODERN_CSS_RULES = {
  // These are intentionally opt-in because the current codebase still contains
  // legacy patterns that would trigger a large migration.
  "alpha-value-notation": "percentage",
  "color-function-notation": "modern",
  "declaration-no-important": true,
  "media-query-no-invalid": true,
  "no-duplicate-selectors": true,
  "declaration-block-no-duplicate-properties": [
    true,
    {
      ignore: ["consecutive-duplicates-with-different-values"],
    },
  ],
  "selector-pseudo-element-colon-notation": "double",
  "custom-property-pattern": "^[a-z][a-z0-9-]*$",
};

const PROPERTY_ORDER = [
  {
    group: "custom-properties",
    properties: ["--*"],
  },
  {
    group: "logical-positioning",
    properties: [
      "position",
      "z-index",
      "inset",
      "inset-block",
      "inset-block-start",
      "inset-block-end",
      "inset-inline",
      "inset-inline-start",
      "inset-inline-end",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "physical-positioning",
    properties: ["top", "right", "bottom", "left"],
    emptyLineBefore: "always",
  },
  {
    group: "logical-box-model",
    properties: [
      "display",
      "visibility",
      "box-sizing",
      "block-size",
      "min-block-size",
      "max-block-size",
      "inline-size",
      "min-inline-size",
      "max-inline-size",
      "margin",
      "margin-block",
      "margin-block-start",
      "margin-block-end",
      "margin-inline",
      "margin-inline-start",
      "margin-inline-end",
      "padding",
      "padding-block",
      "padding-block-start",
      "padding-block-end",
      "padding-inline",
      "padding-inline-start",
      "padding-inline-end",
      "border",
      "border-block",
      "border-block-start",
      "border-block-end",
      "border-inline",
      "border-inline-start",
      "border-inline-end",
      "border-width",
      "border-style",
      "border-color",
      "border-start-start-radius",
      "border-start-end-radius",
      "border-end-start-radius",
      "border-end-end-radius",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "physical-box-model",
    properties: [
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "overflow-inline",
      "overflow-block",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "border-top",
      "border-right",
      "border-bottom",
      "border-left",
      "border-top-width",
      "border-right-width",
      "border-bottom-width",
      "border-left-width",
      "border-top-style",
      "border-right-style",
      "border-bottom-style",
      "border-left-style",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "border-radius",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "flex",
    properties: [
      "flex",
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "flex-direction",
      "flex-wrap",
      "flex-flow",
      "justify-content",
      "justify-items",
      "justify-self",
      "align-items",
      "align-content",
      "align-self",
      "order",
      "gap",
      "row-gap",
      "column-gap",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "grid",
    properties: [
      "grid",
      "grid-area",
      "grid-template",
      "grid-template-columns",
      "grid-template-rows",
      "grid-template-areas",
      "grid-column",
      "grid-row",
      "grid-column-start",
      "grid-column-end",
      "grid-row-start",
      "grid-row-end",
      "grid-auto",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-auto-columns",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "background",
    properties: [
      "background",
      "background-color",
      "background-image",
      "background-repeat",
      "background-position",
      "background-position-x",
      "background-position-y",
      "background-size",
      "background-attachment",
      "background-clip",
      "background-origin",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "typography",
    properties: [
      "color",
      "font",
      "font-family",
      "font-size",
      "font-weight",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-size-adjust",
      "line-height",
      "letter-spacing",
      "text-align",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-style",
      "text-decoration-line",
      "text-indent",
      "text-transform",
      "text-shadow",
      "text-overflow",
      "text-wrap",
      "white-space",
      "word-wrap",
      "word-break",
      "vertical-align",
      "list-style",
      "list-style-type",
      "list-style-position",
      "list-style-image",
      "quotes",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "visual",
    properties: [
      "outline",
      "outline-width",
      "outline-style",
      "outline-color",
      "outline-offset",
      "box-shadow",
      "transform",
      "transform-origin",
      "transform-style",
      "backface-visibility",
      "perspective",
      "perspective-origin",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "animation",
    properties: [
      "animation",
      "animation-name",
      "animation-duration",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",
      "animation-fill-mode",
      "animation-play-state",
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "transition-delay",
    ],
    emptyLineBefore: "always",
  },
  {
    group: "other",
    properties: [
      "cursor",
      "pointer-events",
      "visibility",
      "opacity",
      "mix-blend-mode",
      "isolation",
      "will-change",
      "resize",
      "appearance",
      "-webkit-appearance",
      "-moz-appearance",
      "content",
      "counter-reset",
      "counter-increment",
      "direction",
    ],
    emptyLineBefore: "always",
  },
];

const baseConfig = {
  customSyntax: "postcss-scss",
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    // Idiomatic CSS formatting rules such as whitespace, blank lines, and quote
    // layout are better handled today by Prettier/EditorConfig than by
    // Stylelint 17, which focuses on code-quality and structural rules.
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: CSS_MODULES_PSEUDO_CLASSES,
      },
    ],
    "scss/dollar-variable-pattern": null,
    "value-keyword-case": null,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: CSS_MODULES_PROPERTIES,
      },
    ],
    ...IDIOMATIC_STRUCTURE_RULES,
    ...MODERN_CSS_RULES,
    "order/properties-order": PROPERTY_ORDER,
    "selector-pseudo-element-colon-notation": "double",
    "custom-property-pattern": "^[a-z][a-z0-9-]*$",
    // Opt-in stricter modern rules live in stylelint.phase2.config.mjs.
  },
  ignoreFiles: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.storybook/**",
    "**/coverage/**",
  ],
};

export default baseConfig;
