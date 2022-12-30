import {store} from "@/main";
import {Device} from "@capacitor/device";

export default {
    install: async (app) => {
        const w = {
            changeRoute: async to => {
                const auth = await w.isAuthorized()
                const requiresAuth = to.meta.auth === undefined ? true : to.meta.auth
                if ((to.path === '/auth/sign-in' || to.path === '/auth/2fa') && auth)
                    return {path: '/', replace: true}
                if (requiresAuth && !auth)
                    return {path: '/auth/sign-in', replace: true}
                return true
            },
            confirm: async (otp) => {
                try {
                    const token = await store.get('signin_token')
                    const response = await app.axios.post('/auth/auth', {token: token, code: otp, rememberMe: true})
                    console.log(response)
                    /*await w.setToken(response.data.token, response.data.expire)
                    await w.resetSignIn()*/
                    return {status: 'ok'}
                } catch (e) {
                    console.log(e)
                    if (e.response.status === 400)
                        return {status: 'failed', code: 400}
                    return {status: 'failed'}
                }
            },
            isAuthorized: async () => {
                const expire = await store.get('expire')
                const current = new Date().getTime()
                return current < expire
            },
            async checkConfirmStatus(token) {
                try {
                    const {data} = await app.axios.get('/auth/status?token=' + token)
                    if (data.token){
                        data.status = 'ok'
                        await w.setToken(data.token, data.expire)
                    }
                    return data
                } catch (e) {
                    return {status: 'error'}
                }
            },
            login: async (username, password) => {
                try {
                    const device = await Device.getInfo()
                    const response = await app.axios.post('/auth/signin?osType='+device.operatingSystem+'&osVersion='+device.osVersion, {username, password})
                    if (response.data.expire === 0) {
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
            resetSignIn: async () => {
                await store.remove('signin_token')
            },
            setToken: async (token, expire) => {
                await store.set('token', token)
                await store.set('expire', expire)
            },
        }

        app.config.globalProperties.$auth = w
        app.$auth = w
    }
}
