<template>
    <div>
        <div style="display:flex;">
            <!-- <div v-for="property in properties" v-bind:key="property.id">
                <div v-if="property.id == property_id">{{ property.title }}</div>
            </div>-->
            <h2>{{ property.title.rendered }}</h2>
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
    mounted(){

        this.$maps.showMap(this.$refs.map, this.property.acf.location_tab_group.map.lat, this.property.acf.location_tab_group.map.lng);
    },

    async asyncData({ $axios, params }) {
        const property_id = params.id;
        let property = await $axios.$get(`https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property/${property_id}`)

        return {
            property : property
        }
    },

    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>