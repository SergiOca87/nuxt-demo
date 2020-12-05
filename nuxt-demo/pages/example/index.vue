<template>
    <h1>Team Page</h1>
</template>

<script>
export default {
	asyncData(context) {
		return
		axios.get(`https://my-api/posts/${context.params.id}`)
			.then((res) => {
				return {
					title: res.data.title
				}
			})
	},
	fetch(context) {
		return axios.get('http://my-api/stars').then((res) => {
			context.store.commit('setStars', res.data)
		})
	},
    methods: {
        refresh() {
            // This would refresh the App data without refreshing the whole App/page
            this.$nuxt.refresh()
        },

        // This can be useful when you want to execute a function on the client-side without
        // increasing the time to interactive of your site.
        onPageReady() {
            window.onNuxtReady(() => {
                console.log('Nuxt.js is ready and mounted')
            })
        }

    },
	head() {
		return {
			title: this.title,
			meta: [{
				hid: 'description',
				name: 'description',
				content: 'My custom description'
			}]
		}
	},
	layout: 'my-custom-layout',
	validate(context) {
		return /^\\d+$/.test(context.params.id)
	},
	transition: {
		name: 'my-custom-transition',
		mode: 'out-in'
	}
}


// Context provides additional data:
//  function (context) { // Could be asyncData, nuxtServerInit, ...
//   // Always available
//   const {
//     app,
//     store,
//     route,
//     params,
//     query,
//     env,
//     isDev,
//     isHMR,
//     redirect,
//     error,
//    $config
//   } = context

//   // Only available on the Server-side
//   if (process.server) {
//     const { req, res, beforeNuxtRender } = context
//   }

//   // Only available on the Client-side
//   if (process.client) {
//     const { from, nuxtState } = context
//   }
// }
 </script>