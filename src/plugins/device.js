import {PushNotifications} from '@capacitor/push-notifications';
import {Capacitor} from "@capacitor/core";
import {Device} from '@capacitor/device';


const addListeners = async (app) => {
    await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
        console.log(app)
        app.config.globalProperties.$device.pushTokenToServer(token.value)
        alert(token.value)
    });


    await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
        if (notification.data['2fa']) {
            const not = JSON.parse(notification.data['2fa'])
            app.config.globalProperties.$router.push('/2fa?token=' + not.token + '&numbers=' + not.numbers)
        }
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log(notification.notification.data)
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
        if (notification.actionId === 'tap' && notification.notification.data['2fa']) {
            const not = JSON.parse(notification.notification.data['2fa'])
            app.config.globalProperties.$router.push('/2fa?token=' + not.token + '&numbers=' + not.numbers)
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
            pushTokenToServer: async (token) => {
                const response = await app.axios.put('/device/device?token=' + token)
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
            await addListeners(app)
        app.config.globalProperties.$device = w
        app.$device = w
    }
}
