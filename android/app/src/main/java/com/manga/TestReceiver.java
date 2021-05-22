package com.manga;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class TestReceiver extends BroadcastReceiver {
    private static final String TAG = TestReceiver.class.getSimpleName();

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.e(TAG,"收到");
    }
}