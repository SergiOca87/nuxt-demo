<template>
    <div>
 
        <div style="display:flex;">
            <div v-for="property in properties" v-bind:key="property.id">
                <div v-if="property.id == property_id">
                   {{ property.title }}
                </div>
            </div>         
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
    async asyncData({ params }) {
      const property_id = params.id
      return { property_id }
    },
    data() {
        return {

        }
    },
    mounted(){
        // this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    //    this.property = this.properties.find(property => property.id ===  this.$route.params.id);
    },
    created(){
        this.$store.dispatch('getProperties')
    },
    computed: mapState({
        properties: state => state.properties,
    }),
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>