import {store} from "@/main";

export default {
    install: async (app) => {
        const w = {
            login: async (username, password) => {
                try {
                    const response = await app.axios.post('/auth/signin', {username, password})
                    if (response.data.expire === 0){
                        await store.set('signin_token', response.data.token)
                        return {status: '2fa'}
                    }
                    await w.setToken(response.data.token, response.data.expire)
                    return {status: 'ok'}
                } catch (e) {
                    if (e.response.status === 401)
                        return {status: 'failed', code: 401}
                    return {status: 'failed'}
                }
            },
            logout: async () => {
                await store.clear()
            },
            confirm: async (otp) => {
                try {
                    const token = await store.get('signin_token')
                    const response = await app.axios.post('/auth/auth', {token: token, code: otp, rememberMe: true})
                    await w.setToken(response.data.token, response.data.expire)
                    return {status: 'ok'}
                } catch (e) {
                    if (e.response.status === 400)
                        return {status: 'failed', code: 400}
                    return {status: 'failed'}
                }
            },
            setToken: async (token, expire) => {
                await store.set('token', token)
                await store.set('expire', expire)
            },
            isAuthorized: async () => {
                const expire = await store.get('expire')
                const current = new Date().getTime()
                return current < expire
            },
            changeRoute: async to => {
                const auth = await w.isAuthorized()
                const requiresAuth = to.meta.auth === undefined ? true : to.meta.auth
                if ((to.path === '/auth/login' || to.path === '/auth/login/2fa') && auth)
                    return {path: '/', replace: true}
                if (requiresAuth && !auth)
                    return {path: '/auth/login', replace: true}
                return true
            },
        }
        app.config.globalProperties.$auth = w
        app.$auth = w
    }
}
