package com.manga.bridge;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.manga.ActionUtils;
import com.manga.TestActivity;
import com.manga.TestReceiver;

import javax.annotation.Nullable;

public class BridgeModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
    private static ReactContext myContext;
    private static TestActivity testActivity;

    /* constructor */
    public BridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        this.myContext = reactContext;


    }

    @Override
    public String getName() {
        return "Bridge";
    }

    @ReactMethod
    public void startActivityFromJS(String name, String params) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack) {
        try {
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("data");
            if (TextUtils.isEmpty(result)) {
                result = "没有数据";
            }
            successBack.invoke(result);
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void goBack() {
        Intent intent = new Intent();
        intent.setAction(ActionUtils.ACTION_TEST);
        mReactContext.sendBroadcast(intent);
    }

    public static void sendEventToRn(String eventName, @Nullable WritableMap params) {
        myContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
