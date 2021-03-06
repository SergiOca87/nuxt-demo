export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Target (https://go.nuxtjs.dev/config-target)
    target: 'static',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'nuxt-demo',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/style.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    //   plugins: ['@/plugins/google-maps'],
    plugins: ['~/plugins/maps.client', '~/plugins/dataApi'],

    transition: {
        name: 'page',
        mode: 'out-in',
    },

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
    ],

    // Axios config
    axios: {
        // proxy: true
    },

    // env: {
    //   VUE_APP_GOOGLE_MAPS_API_KEY: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
    // },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
}
