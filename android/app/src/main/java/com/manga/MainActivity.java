package com.manga;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.os.Build;
import android.os.Bundle;
import android.content.pm.ActivityInfo;
import org.devio.rn.splashscreen.SplashScreen;
import android.view.View;
import android.view.WindowManager;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "manga";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // 显示启动屏，第二个参数是我们自定义主题的引用
      setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
      SplashScreen.show(this, R.style.SplashScreenTheme);
	  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
		  WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
		  layoutParams.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
		  getWindow().setAttributes(layoutParams);
		  getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
		  getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
	  }
      super.onCreate(savedInstanceState);
  }
}
