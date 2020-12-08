export default function ({ $axios }, inject) {
    inject('dataApi', {
        getProperties,
        getTeam,
    })
    //How to have access to the $axios module here?
    async function getProperties() {
        const properties = await $axios.$get(
            `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property`
        )
        return properties
    }

    async function getTeam() {
        const team = await $axios.$get(
            `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/team`
        )
        return team
    }
}

// Is this worth exploring?
