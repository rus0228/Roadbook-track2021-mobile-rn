package com.xpeedite.driver.android;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DetectSoftKeyPackage implements ReactPackage {
    public DetectSoftKeyPackage() {
    }

    @Override
    public List<NativeModule>
    createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<NativeModule>();
        modules.add(new DetectSoftKeyModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager>
    createViewManagers(ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
