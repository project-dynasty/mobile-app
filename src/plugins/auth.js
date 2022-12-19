export default {
    install: async (app) => {
        const w = {
            login: async (username, password) => {
                app.axios.defaults.auth = {username, password}
                return true
            }
        }
        app.config.globalProperties.$auth = w
    }
}
