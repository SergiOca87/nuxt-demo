/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    properties: [],
    locations: [],
    statePairs: [],
    offerings: [],
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
    updateStatePairs: (state, statePair) => {
        state.statePairs.push(statePair)
    },
    updateOfferings: (state, offering) => {
        state.offerings.push(offering)
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
                }));
            
            const locationsArr = [...new Set( properties.map( property => property.acf.location_tab_group.location_table.city ) )];
            const offeringsArr =  [...new Set( properties.map( property => property.acf.general_tab_group.offering_type ) )];
            const typesArr = [...new Set( [].concat(...properties.map( property => property.acf.general_tab_group.property_type )))];
            const statesArr = [...new Set( properties.map( property => property.acf.location_tab_group.location_table.state ) )];

            // This can probably be DRYed up

            // offerings returns a number, we need to fetch the actual term name
            offeringsArr.map((offering) => {
                (async () => {
                    const offeringResults = await fetch(
                        `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/offering-type/${offering}`
                    ).then((res) => res.json());
                    commit('updateOfferings', offeringResults.name);
                })();
            });

            // types returns a number, we need to fetch the actual term name and create term number with term name pairs
            typesArr.map((type) => {
                (async () => {
                    const typeResults = await fetch(
                        `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property-type/${type}`
                    ).then((res) => res.json())
                    commit('updateTypePairs', {[typeResults.name] : typeResults.id });
                })();
            });

            // staes returns a number, we need to fetch the actual term name and create term number with term name pairs
            statesArr.map((singleState) => {
                (async () => {
                    const stateResults = await fetch(
                        `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property-state/${singleState}`
                    ).then((res) => res.json())
                    commit('updateStatePairs', {[stateResults.name] : stateResults.id });
                })();
            });

            commit('updateProperties', properties)
            commit('updateLocations', locationsArr)
            // commit('updateOfferings', convertedOfferings)
         
            
        } catch (err) {
            console.log(err)
        }
    },

    // Can probably create one or 2 functions only

    filterByCity({ state, commit }, location) {
        const filteredResults = state.properties.filter(
            (property) =>
                property.acf.location_tab_group.location_table.city === location
        )
        commit('filterProperties', filteredResults);
    },
    filterByOffering({ state, commit }, offering) {
        let offeringNum;
        offering === 'Sale' ? offeringNum = 53 : offeringNum = 54
        const filteredResults = state.properties.filter(
            (property) =>
                property.acf.general_tab_group.offering_type === offeringNum
        )
        commit('filterProperties', filteredResults);
    },
    filterByType({ state, commit }, type) {
        const filteredResults = state.properties.filter(
            (property) =>                           
                property.acf.general_tab_group.property_type.find( el => el === type )
        )
        commit('filterProperties', filteredResults);
    },
    filterByState({ state, commit }, singleState) {
        const filteredResults = state.properties.filter(
            (property) =>                           
            property.acf.location_tab_group.location_table.state === singleState
        )
        commit('filterProperties', filteredResults);
    },
}

// TODO
// - Managed to add typePairs (name equals a term number)
// - Do the same with offerings
// - How to filter byType, should be very easy...