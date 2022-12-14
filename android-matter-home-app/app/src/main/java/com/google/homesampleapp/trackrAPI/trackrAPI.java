package com.google.homesampleapp.trackrAPI;


import android.util.Log;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
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
    private static int projID =-1;
    private static int fieldId=-1;
    private static int VisulizationId=-1;
    private static String projApiKey="";
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    public static final String Url ="http://localhost:8080";

//    public static void main(String[] args) throws IOException {
//      login("kamsaiyed@gmail.com","kamar123");
//      createProject();
//      createField();
//      createVisualization();
//      sendData(2);
////      sendData(4);
////      sendData(5);
//
//
//    }
    public static void setup() throws IOException {
        createProject();
        createField();
        createVisualization();

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

    public static int createProject() throws IOException {
        //http
        Response response= post(Url+"/api/projects/","{}","Session="+sesssionID);
        String body=response.body().string();
        if(body!=null){
            body=body.substring(6,body.length()-1);
        }
//        System.out.println(Integer.parseInt(body));
        projID=Integer.parseInt(body);
        return projID;
    }

    public static int createField() throws IOException {
        //http
        String body="{\"projectId\":"+projID+
                ",\"name\":\"Temperature\"}";

        Response response= post(Url+"/api/fields/",body,"Session="+sesssionID);
        String resp=response.body().string();
        if(resp!=null){
            resp=resp.substring(6,resp.length()-1);
        }
//        System.out.println(Integer.parseInt(resp));
        fieldId=Integer.parseInt(resp);
        return fieldId;

    }

    public static int createVisualization() throws IOException {
        //http
        String body="{\"fieldId\":"+fieldId+",\"metadata\":\"{\\\"name\\\":\\\"Graph\\\",\\\"color\\\":\\\"rgba(68, 155, 245)\\\",\\\"graphType\\\":\\\"line\\\",\\\"graphFunction\\\":\\\"none\\\",\\\"graphTimestep\\\":\\\"\\\"}\"}";
        Response response= post(Url+"/api/visualizations/", body,"Session="+sesssionID);
        String resp=response.body().string();
        if(resp!=null){
            resp=resp.substring(6,resp.length()-1);
        }
        VisulizationId=Integer.parseInt(resp);
        return VisulizationId;
    }

    public static void sendData(float value) throws IOException {
        // get the project api key using projectID already stored
        if(projApiKey==""){
            Response ret = get(Url+"/api/projects/"+projID,"Session="+sesssionID);

            String getBody=ret.body().string();
            projApiKey= getBody.substring(getBody.indexOf("apiKey")+9,getBody.indexOf("createdAt")-3);

        }

        // call the
        Response response= postAddValue(Url+"/api/values/","Session="+sesssionID);
        String resp=response.body().string();
//        System.out.println(resp);

    }
    //------------------------------------------------------
//GET
//INPUT PARAMETERS: address for the GET request
//RETURN: response as a string
//------------------------------------------------------
    private static Response get(String url,String head) throws IOException{

        Response retVal = null;

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .addHeader("Cookie", head)
                .build();


        try  {
            Response response = client.newCall(request).execute();
            retVal = response;
        } catch (Exception e) {
            Log.i("Post Response", "Error while posting request to the client");
            retVal = null;
        }

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
        try  {
            Response response = client.newCall(request).execute();
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

        try {
            Response response = client.newCall(request).execute();
            retVal = response;
        } catch (Exception e) {
            Log.i("Post Reponse", "Error while posting request to the client");
            retVal = null;
        }

        return retVal;
    }
    private static Response postAddValue(String url, String head) throws IOException{

        Response retVal = null;

        OkHttpClient client = new OkHttpClient();
        RequestBody formBody = new FormBody.Builder()
                .addEncoded("value", String.valueOf(2.00))
                .addEncoded("apiKey", projApiKey)
                .addEncoded("fieldId", String.valueOf(fieldId))
                .build();
        Request request = new Request.Builder()
                .url(url)
                .addHeader("Cookie", head)
                .addHeader("Content-Type", "application/x-www-form-urlencoded")
                .post(formBody)
                .build();
        try {
            Response response = client.newCall(request).execute();
            retVal = response;
        } catch (Exception e) {
            Log.i("Post Reponse", "Error while posting request to the client");
            retVal = null;
        }

        return retVal;
    }

}