<template>
    <main class="properties grey-bg">
        

        <form id="property-search" class="properties__form" @submit.prevent="search()">
            <!-- basic search -->
            <div class="properties__form__search">
                <div class="properties__form__search__item">
                    <select name="'property-state'" v-model="property_city" v-on:change="filterByCity()">
                        <option value="all">Locations</option>
                        <option v-for="location in locations" :value="location">{{ location }}</option>
                    </select>
                </div>
                <div class="properties__form__search__item">
                    <select name="'offering-type'" v-model="property_offering" v-on:change="filterByOffering()">
                        <option value="all">Offering Type</option>
                        <option v-for="offering in offerings" :value="offering">{{ offering }}</option>
                    </select>
                </div>
                <div class="properties__form__search__item">
                    <select name="'property-type'"></select>
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
            property_offering: ''
        }
    },
    created() {
        this.$store.dispatch('getProperties')
    },
    computed: {
        properties() {
            return this.$store.state.properties
        },
        locations() {
            return this.$store.state.locations
        },
        offerings() {
            return this.$store.state.offerings
        },
        filteredProperties() {
            return this.$store.state.filteredProperties
        }
    },
    methods: {
        refresh() {
             this.$fetch()
        },
        filterByCity() {
            this.$store.dispatch('filterByCity', this.property_city)
        },
         filterByOffering() {
            this.$store.dispatch('filterByOffering', this.property_offering)
        }
    }
}
</script>