import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Brand palette (Material "orange"), preserving the exact shades the app
// already used: brand.500 (#fb8c00, header + buttons), brand.600/800 (#ef6c00).
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fff3e0" },
          100: { value: "#ffe0b2" },
          200: { value: "#ffcc80" },
          300: { value: "#ffb74d" },
          400: { value: "#ffa726" },
          500: { value: "#fb8c00" },
          600: { value: "#ef6c00" },
          700: { value: "#f57c00" },
          800: { value: "#ef6c00" },
          900: { value: "#e65100" },
          950: { value: "#bf360c" },
        },
        // v3 ships a neutral "zinc" gray; v2 used a blue-tinted slate. Restore
        // the v2 slate scale so grays (cards, body, subtext, header banner)
        // match the previous design in both light and dark mode.
        gray: {
          50: { value: "#F7FAFC" },
          100: { value: "#EDF2F7" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E0" },
          400: { value: "#A0AEC0" },
          500: { value: "#718096" },
          600: { value: "#4A5568" },
          700: { value: "#2D3748" },
          800: { value: "#1A202C" },
          900: { value: "#171923" },
          950: { value: "#0d1117" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.50}" },
          emphasized: { value: "{colors.brand.600}" },
          focusRing: { value: "{colors.brand.500}" },
        },
        // v3 defaults the body background to black and panels to gray.950 in
        // dark mode. v2 used gray.800 (body) and gray.700 (cards). Restore those.
        bg: {
          DEFAULT: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.800}" },
          },
          panel: {
            value: { _light: "{colors.white}", _dark: "{colors.gray.700}" },
          },
        },
        // Text that sits on the orange brand bar (header): white in light mode,
        // dark in dark mode. A CSS semantic token so it switches with the theme
        // class without a hydration flash.
        headerText: {
          value: { _light: "{colors.white}", _dark: "{colors.gray.800}" },
        },
      },
    },
    recipes: {
      // v3 shifted the Heading `size` scale down ~one step vs v2 (size md was
      // fontSize xl / 1.25rem in v2, but maps to textStyle md / 1rem in v3).
      // Remap the sizes the app uses back to the v2 values.
      heading: {
        variants: {
          size: {
            sm: { textStyle: "md" },
            md: { textStyle: "xl" },
          },
        },
      },
    },
    slotRecipes: {
      // v3's default Card (size md) uses --card-padding: spacing.6 (24px),
      // whereas v2 used spacing.5 (20px). Restore the v2 value so card content
      // width / text wrapping matches the previous design.
      card: {
        slots: ["root", "title", "description", "header", "body", "footer"],
        variants: {
          size: {
            md: {
              root: {
                "--card-padding": "spacing.5",
              },
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
