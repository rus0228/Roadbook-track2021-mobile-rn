import {types} from 'mobx-state-tree';
import User from './User';
import Notification from './Notification';
import Hud from './Hud';
import Net from "./Net";
import Info from "./Info";

const Store = types.model({
  user: User,
  notification: Notification,
  hud: Hud,
  net: Net,
  info: Info,
  isInitialized: false,
}).actions((self) => ({
  setInitialized: () => {
    self.isInitialized = true;
  }
}));
export default Store;
