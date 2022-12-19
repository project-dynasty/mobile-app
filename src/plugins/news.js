export default {
    install: async (app) => {
        const w = {
            load: async () => {
                const response = await app.axios.get('/news')
                console.log(response)
            }
        }
        app.config.globalProperties.$news = w
        app.$news = w
    }
}
