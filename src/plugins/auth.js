import {store} from "@/main";
import {Device} from "@capacitor/device";

export default {
    install: async (app) => {
        let authUrl = 'https://api.project-dynasty.de/auth'
        let timeout;
        let saved = {}
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
                    const response = await app.axios.post(authUrl + '/otp', {
                        token: token,
                        code: otp,
                        rememberMe: true,
                        mobile: false
                    })
                    console.log(response)
                    await app.$device.open()
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
                    await app.axios.post(authUrl + "/challenge/claim", {challenge})
                    return true
                } catch (e) {
                    return false;
                }
            },
            unclaim: async challenge => {
                try {
                    await app.axios.post(authUrl+"/challenge/unclaim", {challenge})
                    return true
                }catch (e) {
                    return false
                }
            },
            solve: async challenge => {
                try {
                    await app.axios.post(authUrl+"/challenge/solve", {challenge})
                    return true
                }catch (e) {
                    return false
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
                    const {data} = await app.axios.post(authUrl + '/status', {token})
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
            async getRefreshExpireDate() {
                return await store.get('refresh_expire')
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
                    const response = await app.axios.post(authUrl + '/signin', {
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
                    await app.$device.open()
                    return {status: 'ok'}
                } catch (e) {
                    if (e.code && e.code === "ERR_NETWORK")
                        return {status: 'failed', message: 'Bitte überprüfe deine Internetverbindung'}
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
            getToken: async()=>{
                const token = await store.get('token')
                return token
            },
            setToken: async (token, expire, refresh) => {
                await store.set('token', token)
                await store.set('expire', expire)
                await store.set('refresh', refresh)
                await store.set("expire_refresh" ,w.parseJwt(refresh).exp)
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
                    const response = await app.axios.post(authUrl + '/refresh', {}, {headers: {'token': token}})
                    console.log(response)
                    await w.setToken(response.data.token, w.parseJwt(response.data.token).exp, response.data.refreshToken)
                    return true
                } catch (e) {
                    console.error(e)
                    return false
                }
            },
            openMultiFactor(token, numbers){
                app._instance.multiFactorToken = token
                app._instance.multiFactorConfirm = true
                app._instance.multiFactorNumbers = numbers
            },
            open() {
                app._instance.open = true
            },
            close() {
                app._instance.open = false
            },
            getSaved() {
                return saved
            },
            saveNotification(token, numbers) {
                saved = {token, numbers, confirm: true}
            },
            hasPermission: async (permission) => {
                try {
                    const permissions = w.parseJwt(await w.getToken())?.permissions
                    if (permissions === undefined) return false
                    let has = false;
                    for (let i = 0; i < permissions.length; i++) {
                        let access = false;
                        const response = permission.match(permissions[i].perm.replaceAll("*", "(.*)"))
                        if (response !== null && response.length > 0)
                            access = true;
                        if (has && access && permissions[i].negate) {
                            has = false
                            break;
                        }
                        if (access)
                            has = access
                    }
                    return has
                } catch (e) {
                    return false
                }
            }
        }

        app.config.globalProperties.$auth = w
        app.$auth = w
    }
}
