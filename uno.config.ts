import { defineConfig, presetAttributify, presetUno } from "unocss";

export default defineConfig({
  theme: {
    breakpoints: {
      md: "768px",
      lg: "960px",
    },
  },
  presets: [
    presetAttributify(),
    presetUno(),
  ],
});
