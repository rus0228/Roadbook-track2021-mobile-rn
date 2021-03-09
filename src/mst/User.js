import {applySnapshot, flow, types} from 'mobx-state-tree';
import {defNumber, defString} from './Types';
import * as Api from '@/services/Api';

const tag = 'MST.User::';

const User = types
    .model('User', {
        id: 0,
        username: defString,
        fullName: defString,
        email: defString,
        company: defString,
        type: defString,
        phoneNumber: defString,
        deviceId: defString
    })
    .views((self) => ({
        get isValid() {
            return self.id > 0;
        },
    }))
    .actions((self) => {
        const _updateFromLoginResponse = (data) => {
            // Copy data to store
            applySnapshot(self, data);
        };

        const logIn = flow(function* logIn(username, password) {
            try {
                const {success, data, info} = yield Api.logIn(username, password);
                if (data && success) {
                    console.log(data);
                    _updateFromLoginResponse(data);
                }
                return {info};
            } catch (ex) {
                console.log(tag, 'Login Failed -- ', ex);
            }
        });
        const logOut = () => {
            // Just simply apply snapshot of empty object
            applySnapshot(self, {});
        };
        const load = (snap) => {
            applySnapshot(self, snap);
        };

        const addInfo = (phoneNumber, deviceId) => {
            applySnapshot(self, {phoneNumber, deviceId})
        };

        return {logIn, logOut, load, addInfo};
    });

export default User;
