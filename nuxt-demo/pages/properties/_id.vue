<template>
    <div>
        <div style="display:flex;">
            <!-- <div v-for="property in properties" v-bind:key="property.id">
                <div v-if="property.id == property_id">{{ property.title }}</div>
            </div>-->
            <h2>{{ property[0].title.rendered }}</h2>

            <p>{{ property }}</p>
        </div>

        <p>Property Location:</p>
        <div style="height: 500px; width: 500px;" ref="map"></div>
    </div>
</template>
<script>
// import homes from '~/data/homes'
import { mapState } from 'vuex'
export default {

    head(){
        return {

        }
    },
    // async asyncData({ params }) {
    //   const property_id = params.id
    //   return { property_id }
    // },
    // data() {
    //     return {
            
    //     }
    // },
    mounted(){
        // Need this property and just use lat and lng from acf
        this.$maps.showMap(this.$refs.map, this.property[0].acf.location_tab_group.map.lat, this.property[0].acf.location_tab_group.map.lng)

    //    this.property = this.properties.find(property => property.id ===  this.$route.params.id);
    },
    // fetch the single property
    // Works but can we simply filter the store?
    async asyncData({ $axios, params }) {
        const property_id = params.id;
        let property = await $axios.$get(`https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property?filter[p]=${property_id}`)

        return {
            property
        }
    },

    // computed: mapState({
    //     properties: state => state.properties,
    // }),
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>