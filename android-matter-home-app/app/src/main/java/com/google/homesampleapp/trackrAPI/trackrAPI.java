package com.google.homesampleapp.trackrAPI;


import android.util.Log;

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
    //variables"
    private static String sesssionID="";
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    public static final String Url ="http://localhost:8080";

    public static void main(String[] args) throws IOException {
      login("kamsaiyed@gmail.com","kamar123");
      createProject();
    }

    public static String login(String username, String Password) throws IOException {
        //http

        String body="{\"email\":\""+username+
                "\",\"password\":\""+Password+
                "\",\"rememberMe\":true"+"}";
        Response response= post(Url+"/api/auth/login",body);
        String responseHead=response.headers("Set-Cookie").toString();
        sesssionID=responseHead.substring(responseHead.indexOf("=")+1,responseHead.indexOf(";"));


        return sesssionID;
    }

    public static void createProject() throws IOException {
        //http
        Response response= post(Url+"/api/projects/","{}","Session="+sesssionID);
        System.out.println("session="+sesssionID);
//        ResponseBody responseBodyCopy = response.peekBody(Long.MAX_VALUE);
        String body=response.body().string();
        System.out.println(body);
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
    private static Response post(String url, String payload) throws IOException{

        Response retVal = null;

        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(JSON, payload);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            retVal = response;
        } catch (Exception e) {
            Log.i("Post Response", "Error while posting request to the client");
            retVal = null;
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
    private static Response post(String url, String payload, String head) throws IOException{

        Response retVal = null;

        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(JSON, payload);
        Request request = new Request.Builder()
                .url(url)
                .addHeader("Cookie", head)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            retVal = response;
        } catch (Exception e) {
            Log.i("Post Reponse", "Error while posting request to the client");
            retVal = null;
        }

        return retVal;
    }

}