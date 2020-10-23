/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    properties: [],
    locations: [],
    offerings: [],
    types: [],
    typePairs: [],
    filteredProperties: [],
})

export const mutations = {
    updateProperties: (state, properties) => {
        state.properties = properties
    },
    updateLocations: (state, locations) => {
        state.locations = locations
    },
    updateOfferings: (state, offering) => {
        state.offerings.push(offering)
    },
    updateTypes: (state, type) => {
        state.types.push(type)
    },
    updateTypePairs: (state, typePair) => {
        state.typePairs.push(typePair)
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
            
            const locationsArr = [...new Set( properties.map( property => property.acf.location_tab_group.location_table.city ) )];
            const offeringsArr =  [...new Set( properties.map( property => property.acf.general_tab_group.offering_type ) )];
            const typesArr =  [...new Set( [].concat(...properties.map( property => property.acf.general_tab_group.property_type )))];


            // offerings returns a number, we need to fetch the actual term name
            offeringsArr.map((offering) => {
                let offeringName = '';
                (async () => {
                    const offeringUrl = await fetch(
                        `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/offering-type/${offering}`
                    ).then((res) => res.json());
                    commit('updateOfferings', offeringUrl.name);
                })();
            });

            // types returns a number, we need to fetch the actual term name
            typesArr.map((type) => {
                let typeName = '';
                (async () => {
                    const typeUrl = await fetch(
                        `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property-type/${type}`
                    ).then((res) => res.json())
                    commit('updateTypes', typeUrl.name);
                    commit('updateTypePairs', { [typeUrl.name] : typeUrl.id });
                })();
            });

            commit('updateProperties', properties)
            commit('updateLocations', locationsArr)
            // commit('updateOfferings', convertedOfferings)
         
            
        } catch (err) {
            console.log(err)
        }
    },

    filterByCity({ state, commit }, location) {
        const filteredResults = state.properties.filter(
            (property) =>
                property.acf.location_tab_group.location_table.city === location
        )
        commit('filterProperties', filteredResults )
    },

    filterByOffering({ state, commit }, offering) {

        // const Sale = 53;
        // const Lease = 54;
        let offeringNum;
       
        offering === 'Sale' ? offeringNum = 53 : offeringNum = 54
        console.log('offering', offering, 'offeringNum', offeringNum)
        const filteredResults = state.properties.filter(
            (property) =>
                property.acf.general_tab_group.offering_type === offeringNum
        )
        commit('filterProperties', filteredResults )
    },

    filterByType({ state, commit }, type) {
        // const typeNum = state.typePairs.find( item => item.type )
        // console.log(typeNum)
        const filteredResults = state.properties.filter(
            (property) =>                           
                property.acf.general_tab_group.property_type.find( ... )
        )
        commit('filterProperties', filteredResults )
    },
}

// TODO
// - Managed to add typePairs (name equals a term number)
// - Do the same with offerings
// - How to filter byType, should be very easy...