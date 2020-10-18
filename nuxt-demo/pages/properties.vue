<template>
    <main class="properties grey-bg">
        

        <form id="property-search" class="properties__form" @submit.prevent="search()">
            <!-- basic search -->
            <div class="properties__form__search">
                <div class="properties__form__search__item">
                    <select name="'property-state'" v-model="property_city" v-on:change="filterProperties()">
                        <option v-for="location in locations" :value="location">{{ location }}</option>
                    </select>
                </div>
                <div class="properties__form__search__item">
                    <select name="'offering-type'"></select>
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
        filteredProperties() {
            return this.$store.state.filteredProperties
        }
    },
    methods: {
        refresh() {
             this.$fetch()
        },
        filterProperties() {
            this.$store.dispatch('filterProperties', this.property_city)
        }
    }
}
</script>