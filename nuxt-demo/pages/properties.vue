<template>
    <main class="properties grey-bg">
        
        <div class="container">
            <form id="property-search" class="properties__form mt-5" @submit.prevent="search()">
                <!-- basic search -->
                <div class="properties__form__search">

                    <div class="properties__form__search__item">
                        <label for="offering-type">State</label>
                        <select name="'property-type'" v-model="property_state" v-on:change="filterByState()">
                            <option value="all">Property Type</option>
                            <template v-for="state in states">
                                <option v-for="(value, name) in state" :value="value">{{ name }}</option>
                            </template>
                        </select>
                    </div>

                    <div class="properties__form__search__item">
                        <label for="property-state">City</label>
                        <select name="'property-state'" v-model="property_city" v-on:change="filterByCity()">
                            <option value="all">Cities</option>
                            <option v-for="city in cities" :value="city">{{ city }}</option>
                        </select>
                    </div>
            
                    <div class="properties__form__search__item">
                        <label for="offering-type">Offering Type</label>
                        <select name="'offering-type'" v-model="property_offering" v-on:change="filterByOffering()">
                            <option value="all">Offering Type</option>
                            <option v-for="offering in offerings" :value="offering">{{ offering }}</option>
                        </select>
                    </div>
                    <div class="properties__form__search__item">
                        <label for="offering-type">Property Type</label>
                        <select name="'property-type'" v-model="property_type" v-on:change="filterByType()">
                            <option value="all">Property Type</option>
                            <template v-for="type in types">
                                <option v-for="(value, name) in type" :value="value">{{ name }}</option>
                            </template>
                        </select>
                    </div>

                </div>
            </form>

            <template v-if="filteredProperties.length">
                <div class="row mt-5">
                    <div class="post col-md-4" v-for="property in filteredProperties" :key="property.id">
                        <b-card
                            :title="property.title.rendered"
                            img-src="https://picsum.photos/600/300/?image=25"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 40rem;"
                            class="mb-2"
                        >
                            <b-card-text>
                                Address: {{property.acf.location_tab_group.map.address | capitalize}}
                            </b-card-text>

                            <nuxt-link :to="`/property/${property.id}`">
                                Property Page
                            </nuxt-link>
                        </b-card>
                    </div>
                </div>
            </template>
        </div>
	</main>
</template>

<script>
import { mapState } from 'vuex'
export default {
    head() {
        return {
            title: 'Properties'
        }
    },
    data() {
        return {
            property_city: '',
            property_offering: '',
            property_type: '',
            property_state: ''
        }
    },
     filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    created() {
        this.$store.dispatch('getProperties')
    },
    mounted() {
        this.$store.dispatch('updateFilters')

    },
    computed: mapState({
        properties: state => state.properties,
        cities: state => state.cities,
        states: state => state.statePairs,
        offerings: state => state.offerings,
        types: state => state.typePairs,
        filteredProperties: state => state.filteredProperties
    }),
    methods: {
        onScriptLoaded(event = null) {
            // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
            // if (event) {
            //  console.log('Was added')
            // } else {
            //  console.log('Already existed')
            // }
        
        },
        filterByCity() {
            this.$store.dispatch('filterByCity', this.property_city)
        },
        filterByOffering() {
            this.$store.dispatch('filterByOffering', this.property_offering)
        },
        filterByType() {
            this.$store.dispatch('filterByType', this.property_type)
        },
        filterByState() {
             this.$store.dispatch('filterByState', this.property_state)
        }
    }
}

</script>