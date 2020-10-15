<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>

        <h3>Related Articles</h3>
        <div>
            <div v-for="post in relatedPosts">
                <h2>{{ post.title }}</h2>
                <!-- <a :href="`/posts/${post.id}`">Read More</a> -->
                <!-- Nuxt-link prevents a full page reload,w e can add a link or the full object (easier to mantain ) -->

                <!-- <nuxt-link :to="`/posts/${post.id}`">Read More</nuxt-link> -->
                <nuxt-link :to="{name: 'posts-id', params: {id: post.id}}">Read More</nuxt-link>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: this.post.title,
            meta: [
                {name: 'twitter:title', content: this.post.title},
                {name: 'twitter:description', content: this.post.content}
            ]
        }
    },
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        post() {
            return this.$store.state.posts.all.find(post => post.id === this.id)
        },
        relatedPosts() {
            return this.$store.state.posts.all.filter( post => post.id !== this.id)
        }
    }
    
}
</script>