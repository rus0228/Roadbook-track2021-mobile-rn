import {types} from 'mobx-state-tree';
import {defBoolean, defString} from "./Types";

const Net = types
    .model('Net', {
        isConnected: defBoolean,
        connectionType: defString
    })
    .actions((self) => ({
        setNetState: (isConnected, connectionType) => {
            self.isConnected = isConnected;
            self.connectionType = connectionType;
        }
    }));

export default Net;