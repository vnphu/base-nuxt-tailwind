// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { fileURLToPath } from 'url'
const configByEnv = process.env

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
      title: 'Truyen Tranh',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1,user-scalable=0' },
        {
          hid: 'description',
          name: 'description',
          content: 'Truyen Tranh',
        },
        { property: 'og:image', content: '/favicon.svg' },
        { property: 'og:title', content: 'Truyen Tranh' },
        {
          property: 'og:description',
          content: 'Truyen Tranh',
        },
      ],
    },
  },
  css: ['~/assets/styles/scss/styles.scss', '~/assets/styles/base.css'],

  alias: {
    components: fileURLToPath(new URL('./components', import.meta.url)),
    types: fileURLToPath(new URL('./types', import.meta.url)),
    stores: fileURLToPath(new URL('./stores', import.meta.url)),
    constants: fileURLToPath(new URL('./constants', import.meta.url)),
  },
  components: [
    {
      path: '~/components/common',
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ['primevue'],
  },
  modules: ['nuxt-primevue', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n', '@nuxt-alt/auth'],
  primevue: {
    components: {
      include: [
        'Button',
        'Row',
        'Column',
        'ColumnGroup',
        'DataTable',
        'Button',
        'Checkbox',
        'Dialog',
        'Calendar',
        'InputNumber',
        'Password',
        'RadioButton',
        'Dropdown',
        'MultiSelect',
        'InputText',
        'Textarea',
        'InputSwitch',
        'OverlayPanel',
        'Toast',
        'ConfirmDialog',
        'ProgressSpinner',
        'TabView',
        'TabPanel',
      ],
    },
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, './presets/lara/') }, //import and apply preset
  },
  runtimeConfig: {
    public: {
      apiBase: configByEnv.API_URL,
      googleClientId: configByEnv.GOOGLE_CLIENT_ID,
    },
  },
})
