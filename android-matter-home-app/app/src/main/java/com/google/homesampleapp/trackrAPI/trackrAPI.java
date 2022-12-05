package com.google.homesampleapp.trackrAPI;


import java.io.IOException;


import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class trackrAPI {


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

    private void post()
        throws IOException{
            OkHttpClient client = new OkHttpClient();
            String url = "";

            Request request = new Request.Builder()
                    .url(url)
                    .build();

            Call call = client.newCall(request);
            Response response = call.execute();
    }
}