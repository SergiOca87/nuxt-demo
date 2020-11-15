<template>
    <div class="container">
        
            <main class="padding w-100">

                <!-- This is not working, I think 
                <GmapMap
                    :center="{lat:10, lng:10}"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 500px; height: 300px"
                    >
                    <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                    />
                </GmapMap>
                 -->
               <h2 class="mb-5">Properties</h2>
                <!-- here we loop through the posts -->
          
                    <div class="row">
                        <div class="post col-md-4" v-for="property in properties" :key="property.id">
                            <b-card
                                :title="property.title.rendered"
                                img-src="https://picsum.photos/600/300/?image=25"
                                img-alt="Image"
                                img-top
                                tag="article"
                                style="max-width: 20rem;"
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
               
                

                <h2 class="mt-5 mb-3">Posts</h2>
                <!-- here we loop through the posts -->
                <div class="post" v-for="post in posts" :key="post.id">
                    <h3>
                        <!-- for each one of them, we’ll render their title, and link off to their individual page -->
                        {{ post.title }}
                    </h3>
                </div>
            </main>
        </div>
    
</template>


<script>
export default {
    head() {
        return {
            title: 'Nuxt Demo'
        }
    },
    computed: {
        posts() {
            return this.$store.state.posts.all
        },
        properties() {
            return this.$store.state.properties
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
        // this.$store.dispatch('getPosts'),
        this.$store.dispatch('getProperties')
    },
}
</script>

<style scoped>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
