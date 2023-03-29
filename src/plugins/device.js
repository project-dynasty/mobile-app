import {PushNotifications} from '@capacitor/push-notifications';
import {Capacitor} from "@capacitor/core";
import {Device} from '@capacitor/device';
import {store} from "@/main";

const addListeners = async (app, w) => {
    await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        console.log(app)
        app.config.globalProperties.$device.pushTokenToServer(token.value)
        alert(token.value)
    });


    await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', async notification => {
        console.log('Push notification received: ', notification);
        console.log(await app.$auth.isAuthorized())
        if (!await app.$auth.isAuthorized()) {
            console.log("canceled because no auth")
            return
        }
        if (notification.data['2fa']) {
            const not = JSON.parse(notification.data['2fa'])
            //app.config.globalProperties.$router.push('/2fa?token=' + not.token + '&numbers=' + not.numbers)
            console.log(app)
            w.open()
            app.$auth.openMultiFactor(not.token, not.numbers.split(","))

        }
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', async notification => {
        console.log(notification.notification.data)
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
        if (!await app.$auth.isAuthorized()) {
            console.log("canceled because no auth")
            return
        }
        if (notification.actionId === 'tap' && notification.notification.data['2fa']) {
            const not = JSON.parse(notification.notification.data['2fa'])
            app.$auth.saveNotification(not.token, not.numbers.split(","))
        }
    });
}

const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
}

export default {
    install: async (app) => {
        const w = {
            getAvatar: '',
            getFirstname: '',
            getLastname: '',
            challengeOpen: false,
            setUserInStore: async () => {
                const auth = await app.$auth.isAuthorized()
                if (!auth)
                    return
                try {
                    const {data} = await app.axios.get('https://tcp-api.project-dynasty.com/account?id='+(app.$auth.parseJwt(await app.$auth.getToken()).id))
                    await store.set('user', data)
                    w.getAvatar = data.account.avatarBase64
                    w.getFirstname = data.account.firstName
                    w.getLastname = data.account.getLastName
                } catch (e) {
                    console.log(e)
                    console.log("error on saveAvatarFromServer")
                }
            },
            setGroupsInStore: async() => {
                const auth = await app.$auth.isAuthorized()
                if (!auth)
                    return
                try {
                    const {data} = await app.axios.get('https://tcp-api.project-dynasty.com/permission/groups')
                    await store.set('groups', data)
                } catch (e) {
                    console.log(e)
                    console.log("error on saveAvatarFromServer")
                }
            },
            open: () => {
                w.setUserInStore()
                w.setGroupsInStore()
            },
            getUserGroups: async () => {
                const groups = await store.get('groups')
                const user = await store.get('user')
                return groups.filter(g => user.account.groups.includes(g.id))
            },
            pushTokenToServer: async (token) => {
                const response = await app.axios.post('https://api.project-dynasty.de/push/update', {token})
                console.log(response)
            },
            registerPush: () => {
                registerNotifications()
            },
            registerDevice: async () => {
                const device = await Device.getInfo()
                console.log(device)
                const send = {os: device.operatingSystem, version: device.osVersion}
                console.log(send)
            }
        }
        if (Capacitor.getPlatform() !== "web")
            await addListeners(app, w)
        app.config.globalProperties.$device = w
        app.$device = w
    }
}
