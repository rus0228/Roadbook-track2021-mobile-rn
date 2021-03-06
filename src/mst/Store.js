import {types} from 'mobx-state-tree';
import User from './User';
import Notification from './Notification';
import Hud from './Hud';
import Net from "./Net";

const Store = types.model({
  user: User,
  notification: Notification,
  hud: Hud,
  net: Net,
  isInitialized: false,
}).actions((self) => ({
  setInitialized: () => {
    self.isInitialized = true;
  }
}));
export default Store;
