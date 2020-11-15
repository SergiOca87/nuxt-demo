<template>
<div>
    <div style="display:flex;">
        <img v-for="image in home.images" :key="image" :src="image" width="200" height="150"/>
    </div>
    {{ property.title }}<br/>
</div>
</template>
<script>
// import homes from '~/data/homes'
export default {
    head(){
        return {
            title: this.property.title
        }
    },
    // data()
    //     return {
    //         home: {}
    //     }
    // },
    created(){
        const property = this.$store.state.properties.all.find(property => property.id ===  this.$route.params.id);
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