// Just create with empty information at first, and later load from async storage
import * as Storage from '@/utils/AsyncStorage';
import {onSnapshot} from 'mobx-state-tree';
import Store from './Store';
import {toJS} from 'mobx';
import NetInfo from "@react-native-community/netinfo";

const store = Store.create({
  user: {},
  notification: {},
  hud: {},
  net: {}
});

const storageKey = 'auth';

// Initialize from store, just return the promise.
store.initialize = async function () {
  try {
    // Load data from local storage
    const snapshot = await Storage.getObject(storageKey);
    store.user.load(snapshot);
  }catch(ex){
    console.log('store::initialize - failed to load snapshot from stored user information', ex);
  }finally {
    store.setInitialized();
  }
};

// Write update to storage when something changed on store
export function scheduleWrite2Storage() {
  if (store._saveTimeoutHandler) {
    clearTimeout(store._saveTimeoutHandler);
  }
  // Save to local storage
  store._saveTimeoutHandler = setTimeout(() => {
    try {
      const snap = toJS(store.user);
      console.log(
        'scheduleWrite2Storage(): Saving user data to local storage',
        snap,
      );
      Storage.putObject(storageKey, snap);
    } catch (ex) {
      console.log('scheduleWrite2Storage(): ', ex);
    }
  }, 200);
}

// When store.user changes, the just schedule write to storage
onSnapshot(store.user, () => {
  console.log('User Changed, so it should be saved');
  scheduleWrite2Storage();
});

NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  store.net.setNetState(state.isConnected, state.type);
});

// Initialize the store
store.initialize().then();

// export created store
export default store;
