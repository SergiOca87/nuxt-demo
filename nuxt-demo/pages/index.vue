<template>
    <div class="container">
        <div class="posts">
            <main>
               <h2>Properties</h2>
                <!-- here we loop through the posts -->
                <div class="post" v-for="property in properties" :key="property.id">
                    <h3>{{ property.title.rendered }}</h3>
                </div>

                <h2>Posts</h2>
                <!-- here we loop through the posts -->
                <div class="post" v-for="post in posts" :key="post.id">
                    <h3>
                        <!-- for each one of them, we’ll render their title, and link off to their individual page -->
                        {{ post.title }}
                    </h3>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$store.state.posts.all
        },
        properties() {
            return this.$store.state.properties
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
