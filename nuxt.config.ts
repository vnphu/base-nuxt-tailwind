// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  css: ["~/assets/styles/base.css"],
  primevue: {
    unstyled: true,
    importPT: { from: path.resolve(__dirname, "./presets/lara/") }, //import and apply preset
  },
});
