/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    properties: [],
    cities: [],
    statePairs: [],
    offerings: [],
    typePairs: [],
    activeFilters: [],
    filteredProperties: [],
    propertiesAddress: [],
})

export const mutations = {
    updateProperties: (state, properties) => {
        state.properties = properties
    },
    updateCities: (state, cities) => {
        state.cities = cities
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
    },
    updateAddresses: (state, addresses) => {
        state.propertiesAddress = addresses
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

            // Update filters with the current properties    
            const citiesArr = [...new Set( properties.map( property => property.acf.location_tab_group.location_table.city ) )];
            const offeringsArr =  [...new Set( properties.map( property => property.acf.general_tab_group.offering_type ) )];
            const typesArr = [...new Set( [].concat(...properties.map( property => property.acf.general_tab_group.property_type )))];
            const statesArr = [...new Set( properties.map( property => property.acf.location_tab_group.location_table.state ) )];
            const addressArr = [...new Set( properties.map( property => property.acf.location_tab_group.address ) )];
            // Cities are a string so we can update the cities Array in the state right away
            commit('updateCities', citiesArr);
 
            // Addresses are a string, we can update the state right away
            commit('updateAddresses', addressArr);

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

            // states returns a number, we need to fetch the actual term name and create term number with term name pairs
            statesArr.map((singleState) => {
                (async () => {
                    const stateResults = await fetch(
                        `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property-state/${singleState}`
                    ).then((res) => res.json())
                    commit('updateStatePairs', {[stateResults.name] : stateResults.id });
                })();
            });

            commit('updateProperties', properties);

            // The first filteredProperties are all of the properties, since we want to show that on page load
            commit('filterProperties', properties);
            // commit('updateLocations', locationsArr);
            // commit('updateOfferings', convertedOfferings)
         
         
            
        } catch (err) {
            console.log(err)
        }
    },

    // Can probably create one or 2 functions only

    updateFilters({state, commit}, filteredProperties) {
        // Once we have the properties, fill up the filters with the available information
        
        // We can use this to make filters dinamyc but how?
        // Look at this.filterByCity, we can dispatch and updatefilters but it need an order or it will filter out the current filter as well
        const citiesArr = [...new Set( state.filteredProperties.map( property => property.acf.location_tab_group.location_table.city ) )];
        const offeringsArr =  [...new Set( state.filteredProperties.map( property => property.acf.general_tab_group.offering_type ) )];
        const typesArr = [...new Set( [].concat(...state.filteredProperties.map( property => property.acf.general_tab_group.property_type )))];
        const statesArr = [...new Set( state.filteredProperties.map( property => property.acf.location_tab_group.location_table.state ) )];

        
    },
    filterByCity({ state, commit, dispatch }, city) {
        const filteredResults = state.filteredProperties.filter(
            (property) =>
                property.acf.location_tab_group.location_table.city === city
        )
        commit('filterProperties', filteredResults);
        // dispatch('updateFilters');
    },
    filterByOffering({ state, commit }, offering) {
        let offeringNum;
        offering === 'Sale' ? offeringNum = 53 : offeringNum = 54
        const filteredResults = state.filteredProperties.filter(
            (property) =>
                property.acf.general_tab_group.offering_type === offeringNum
        )
        commit('filterProperties', filteredResults);
    },
    filterByType({ state, commit }, type) {
        const filteredResults = state.filteredProperties.filter(
            (property) =>                           
                property.acf.general_tab_group.property_type.find( el => el === type )
        )
        commit('filterProperties', filteredResults);
    },
    filterByState({ state, commit }, singleState) {
        const filteredResults = state.filteredProperties.filter(
            (property) =>                           
            property.acf.location_tab_group.location_table.state === singleState
        )
        commit('filterProperties', filteredResults);
    },
}

// TODO
// Can we get lat and lng from the plugin?
// - Managed to add typePairs (name equals a term number)
// - Do the same with offerings
// - How to filter byType, should be very easy...
// - The main point is making filters reactive, actually not sure about this, complicated.
// - ActiveFiltersArray, any active filter should be there and everytime a filter is added all of the filters should be taken into account