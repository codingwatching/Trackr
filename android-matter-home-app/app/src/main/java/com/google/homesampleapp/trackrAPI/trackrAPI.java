package com.google.homesampleapp.trackrAPI;


import android.app.DownloadManager;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class trackrAPI {

    //variables
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

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
//------------------------------------------------------
//GET
//INPUT PARAMETERS: address for the GET request
//RETURN: response as a string
//------------------------------------------------------
    private String get(String url) throws IOException{

        String retVal = "";

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try(ResponseBody responseBody = response.body()) {

                    if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

                    Headers responseHeaders = response.headers();

                    for (int i=0;  i < responseHeaders.size(); i++){
                        Log.i(responseHeaders.name(i), responseHeaders.value(i));
                    }
                }
            }
        });

        return retVal;
    }

//------------------------------------------------------
//Post
//INPUT PARAMETERS: url (String): address for the POST request
//                  payload (String): msg to be posted
//RETURN: response (String)
//------------------------------------------------------
    private String post(String url, String payload) throws IOException{

        String retVal = "";

        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(JSON, payload);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            retVal = response.body().string();
        } catch (Exception e) {
            Log.i("Post Response", "Error while posting request to the client");
            retVal = "Error";
        }

        return retVal;
    }

//------------------------------------------------------
//Post with Header
//INPUT PARAMETERS: url (String): address for the POST request
//                  payload (String): msg to be posted
//                  head (String): Value for the header
//RETURN: response (String)
//------------------------------------------------------
    private String post (String url, String payload, String head) throws IOException{

        String retVal = "";

        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(JSON, payload);
        Request request = new Request.Builder()
                .url(url)
                .addHeader("Authorization", head)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            retVal = response.body().string();
        } catch (Exception e) {
            Log.i("Post Reponse", "Error while posting request to the client");
            retVal = "Error";
        }

        return retVal;
    }

}