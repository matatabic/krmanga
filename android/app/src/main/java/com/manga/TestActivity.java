package com.manga;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.facebook.react.ReactActivity;

public class TestActivity extends ReactActivity {
    BroadcastReceiver receiver;

    public class BroadcastMain extends BroadcastReceiver{

        @Override
        public void onReceive(Context context, Intent intent) {
            TestActivity.this.finish();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        receiver = new BroadcastMain();
        IntentFilter filter = new IntentFilter();
        filter.addAction(ActionUtils.ACTION_TEST);
        registerReceiver(receiver,filter);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "test";
    }

    @Override
    protected void onDestroy(){
        super.onDestroy();
        unregisterReceiver(receiver);
    }

}
