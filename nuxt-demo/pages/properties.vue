<template>
    <main class="properties grey-bg">
        

        <form id="property-search" class="properties__form" @submit.prevent="search()">
            <!-- basic search -->
            <div class="properties__form__search">
                <div class="properties__form__search__item">
                    <select name="'property-state'">
                        <option v-for="location in locations" value="">{{ location }}</option>
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

         <div class="post" v-for="property in properties" :key="property.id">
            <h3>{{ property.title.rendered }}</h3>
            <p>{{property.acf.location_tab_group.map }}</p>
        </div>
	</main>
</template>

<script>
export default {
    head() {
        return {
            title: 'Properties'
        }
    },
	
    created() {
        // this.$store.dispatch('getPosts'),
        this.$store.dispatch('getProperties')
    },
    computed: {
        properties() {
            return this.$store.state.properties
        },
        locations() {
            if( this.$store.state.properties.length ) {
                const locationsArr = this.$store.state.properties.map( property => property.acf.location_tab_group.location_table.city )
                return [...new Set(locationsArr)];
            }
        }
    },
}
</script>