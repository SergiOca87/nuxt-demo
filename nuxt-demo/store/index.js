/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    properties: [],
    locations: [],
    filteredProperties: [],
})

export const mutations = {
    updateProperties: (state, properties) => {
        state.properties = properties
    },
    updateLocations: (state, locations) => {
        state.locations = locations
    },
    filterProperties: (state, results) => {
        state.filteredProperties = results
    }
}


export const actions = {
    async getProperties({ state, commit }) {
        if (state.properties.length) return
        try {
            let properties = await fetch(
                `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property`
            ).then((res) => res.json())

            properties = properties
                .filter((el) => el.status === 'publish')
                .map(({ id, slug, title, acf }) => ({
                    id,
                    slug,
                    title,
                    acf,
                }))
            
            const locationsArr = [...new Set( properties.map( property => property.acf.location_tab_group.location_table.city ) )]
            commit('updateProperties', properties)
            commit('updateLocations', locationsArr)
            
        } catch (err) {
            console.log(err)
        }
    },

    filterProperties({ state, commit }, location) {
        const filteredResults = state.properties.filter(
            (property) =>
                property.acf.location_tab_group.location_table.city === location
        )
        commit('filterProperties', filteredResults )
    },
}
