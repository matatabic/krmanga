package com.manga;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.manga.bridge.BridgeModule;

public class HelloActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hello);
    }

    public void goNativeActivity(View view) {
        startActivity(new Intent(this, Hello2Activity.class));
    }

    public void goBack(View view) {
        this.finish();
    }

    public void goRnScreen(View view) {
        WritableMap event = Arguments.createMap();
        //传递的参数
        event.putString("type", "1");
        BridgeModule.sendEventToRn("goNavigation", event);
        this.finish();
    }

    public void goScreen(View view) {
        startActivity(new Intent(HelloActivity.this, TestActivity.class));
    }
}