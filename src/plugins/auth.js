import {store} from "@/main";
import {Device} from "@capacitor/device";

export default {
    install: async (app) => {
        let authUrl = 'https://auth-api.project-dynasty.com'
        let timeout;
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
                    const response = await app.axios.post(authUrl + '/auth/otp', {
                        token: token,
                        code: otp,
                        rememberMe: true,
                        mobile: false
                    })
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
            claimChallenge: async challenge => {
                try {
                    await app.axios.post(authUrl + "/auth/challenge/claim", {challenge})
                    return true
                } catch (e) {
                    return false;
                }
            },
            isAuthorized: async () => {
                try{

                    const expire = (await w.parseJwt(await store.get('refresh'))).exp
                    const current = Math.floor(new Date().getTime() / 1000)
                    return current < expire
                }catch (e){
                    return false
                }
            },
            async checkConfirmStatus(token) {
                try {
                    const {data} = await app.axios.post(authUrl + '/auth/status', {token})
                    console.log(data)
                    if (data.token) {
                        data.status = 'ok'
                        await w.setToken(data.token, w.parseJwt(data.token).exp, data.refreshToken)
                    }
                    return data
                } catch (e) {
                    return {status: 'error'}
                }
            },
            async getExpireDate() {
                return await store.get('expire')
            },
            startRefreshInterval: async () => {
                const renew = await app.$auth.getExpireDate() - Math.floor(new Date().getTime() / 1000)
                timeout = setTimeout(async () => {
                    const response = await app.$auth.refresh()
                    if(response)
                        await w.startRefreshInterval()
                }, (renew - 15) * 1000)
            },
            login: async (username, password) => {
                try {
                    const device = await Device.getInfo()
                    const response = await app.axios.post(authUrl + '/auth/signin', {
                        username,
                        password,
                        osType: device.operatingSystem,
                        osVersion: device.osVersion,
                        screenSize: window.innerHeight+"x"+window.innerWidth
                    })
                    const token = w.parseJwt(response.data.token)
                    if (token.otp) {
                        await store.set('signin_token', response.data.token)
                        return {status: '2fa'}
                    }
                    await w.setToken(response.data.token, response.data.expire, "")
                    return {status: 'ok'}
                } catch (e) {
                    console.info(e)
                    if (e.response.status === 401)
                        return {status: 'failed', code: 401}
                    return {status: 'failed'}
                }
            },
            logout: async () => {
                clearTimeout(timeout)
                await store.clear()
            },
            resetSignIn: async () => {
                await store.remove('signin_token')
            },
            setToken: async (token, expire, refresh) => {
                await store.set('token', token)
                await store.set('expire', expire)
                await store.set('refresh', refresh)
            },
            parseJwt(token) {
                if (token === undefined) return null
                var base64Url = token.split('.')[1];
                if (base64Url === undefined) return null
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            },
            refresh: async () => {
                try {
                    const token = await store.get('refresh')
                    const response = await app.axios.post(authUrl + '/auth/refresh', {}, {headers: {'token': token}})
                    await w.setToken(response.data.token, w.parseJwt(response.data.token).exp, response.data.refreshToken)
                    return true
                } catch (e) {
                    console.log(e)
                    return false
                }
            }
        }

        app.config.globalProperties.$auth = w
        app.$auth = w
    }
}
