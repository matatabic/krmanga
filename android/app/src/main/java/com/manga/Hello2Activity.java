package com.manga;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.manga.bridge.BridgeModule;

public class Hello2Activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hello2);
    }

    public void goBack(View view) {
        this.finish();
    }
}
