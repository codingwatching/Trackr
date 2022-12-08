package com.google.homesampleapp.trackrAPI;


import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class trackrAPI {

    //variables
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    OkHttpClient client = new OkHttpClient();


    public int login(){
        //http
    }

    public void createProject(){
        //http
    }

    public void createField(){
        //http
    }

    public void createVisualization(){
        //http
    }

    public void sendData(){
        //http
    }

    private String post(String url, String payload) throws IOException{

            RequestBody body = RequestBody.create(JSON, payload);
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .build();
            try (Response response = client.newCall(request).execute()) {
                return response.body().string();
            }
    }
}