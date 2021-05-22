package com.manga.opensettings;
import android.app.Activity;
import android.content.Intent;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
public class OpenSettingsModule extends ReactContextBaseJavaModule {
  @Override
  public String getName() {
    /**
     * return the string name of the NativeModule which represents this class in JavaScript
     * In JS access this module through React.NativeModules.OpenSettings
     */
    return "OpenSettings";
  }
  @ReactMethod
  public void openLocationSettings(Callback cb) {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity == null) {
      cb.invoke(false);
      return;
    }
    try {
      currentActivity.startActivity(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS));
      cb.invoke(true);
    } catch (Exception e) {
      cb.invoke(e.getMessage());
    }
  }
  @ReactMethod
  public void openT(String Text,Callback cb) {
    Activity currentActivity = getCurrentActivity();
    ReactApplicationContext text = getReactApplicationContext();
    cb.invoke("收到"+Text);
  }
  /* constructor */
  public OpenSettingsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
}
