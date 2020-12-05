export default function(context, inject) {

    inject('dataApi', {
        getProperties
    })
    async function getProperties() {
        const response = await fetch( `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property`)
        .then((res) => res.json())
    }
}

// Is this worth exploring?
