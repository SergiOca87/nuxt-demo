<template>
    <main class="properties grey-bg">
        

        <form id="property-search" class="properties__form" @submit.prevent="search()">
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
                        <option value="all">Locations</option>
                        <option v-for="location in locations" :value="location">{{ location }}</option>
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
            <div class="post" v-for="property in filteredProperties" :key="property.id">
                <h3>{{ property.title.rendered }}</h3>
                <p>{{property.acf.location_tab_group.map }}</p>
            </div>
        </template>
        <template v-else>
            <div class="post" v-for="property in properties" :key="property.id">
                <h3>{{ property.title.rendered }}</h3>
                <p>{{property.acf.location_tab_group.map }}</p>
            </div>  
        </template>
      
	</main>
</template>

<script>
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
    created() {
        this.$store.dispatch('getProperties')
    },
    mounted() {
    // if (!process.server) {
        if (typeof google === 'undefined') {
        const script = document.createElement('script')
        script.onload = this.onScriptLoaded
        script.type = 'text/javascript'
        script.src = `https://maps.googleapis.com/maps/api/js? 
        key=${apiKey}&libraries=places`
        document.head.appendChild(script)
        } else {
        this.onScriptLoaded()
        }

        // }

    },
    computed: {
        properties() {
            return this.$store.state.properties
        },
        locations() {
            return this.$store.state.locations
        },
        states() {
            return this.$store.state.statePairs
        },
        offerings() {
            return this.$store.state.offerings
        },
        types() {
            return this.$store.state.typePairs
        },
        filteredProperties() {
            return this.$store.state.filteredProperties
        }
    },
    methods: {
        onScriptLoaded(event = null) {
            // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
            // if (event) {
            //  console.log('Was added')
            // } else {
            //  console.log('Already existed')
            // }
        }
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