import {PushNotifications} from '@capacitor/push-notifications';
import {Capacitor} from "@capacitor/core";
import {Device} from '@capacitor/device';


const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
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
            await addListeners()
        app.config.globalProperties.$device = w
        app.$device = w
    }
}
