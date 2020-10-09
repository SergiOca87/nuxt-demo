/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    properties: []
})


export const mutations = {
    updateProperties: (state, properties) => {
        state.properties = properties
    }
}
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
   async getProperties({ state, commit }) {
    if (state.properties.length) return
    try {
      let properties = await fetch( `https://dev-nuxt-demo.pantheonsite.io/wp-json/wp/v2/property`
      ).then(res => res.json())
      properties = properties
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, acf }) => ({
          id,
          slug,
          title,
          acf
        }))
      commit("updateProperties", properties)
    } catch (err) {
      console.log(err)
    }
 }
}