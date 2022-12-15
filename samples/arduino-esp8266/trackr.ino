#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Arduino_JSON.h>

#define STASSID "<REPLACE_WITH_WIFI_SSID>"
#define STAPSK  "<REPLACE_WITH_WIFI_PASSWORD>"

#define API "<REPLACE_WITH_URL_TO_TRACKR>/api/values/"

const char* headers[] = { "Retry-After" };
const size_t numberOfHeaders = 1;

void setup() {
  Serial.begin(115200);
  WiFi.begin(STASSID, STAPSK);

  Serial.print("[WIFI] Connecting to Wifi.");
  for (int counter = 0; WiFi.status() != WL_CONNECTED; counter++) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("[WIFI] Connected to WiFi! IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  delay(5000);
}

void addValue(String apiKey, int fieldId, float value) {
  bool rateLimited;

  do
  {
    rateLimited = false;

    WiFiClient client;
    HTTPClient http;

    http.begin(client, API);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    http.collectHeaders(headers, numberOfHeaders);

    Serial.println("[HTTP] Sending POST request.");

    int httpCode = http.POST("apiKey=" + apiKey + "&fieldId=" + fieldId + "&value=" + value);
    if (httpCode > 0) {
      Serial.printf("[HTTP] Received POST response, status code: %d\n", httpCode);

      const String& payload = http.getString();
      Serial.println("[HTTP] Payload: " + payload);

      if (httpCode == 429) {
        String retryAfterHeader = http.header("Retry-After");
        float sleepDuration = retryAfterHeader.toFloat();

        Serial.printf("[HTTP] Rate limited, sleeping for %f\n", sleepDuration);
        delay(sleepDuration * 1000);

        rateLimited = true;
        Serial.println("[HTTP] Retrying request.");
      }
    } else {
      Serial.printf("[HTTP] Failed to send request, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } while (rateLimited);

  Serial.println();
}

JSONVar getValues(String apiKey, int fieldId, int offset, int limit, String order) {
  WiFiClient client;
  HTTPClient http;

  String path = String(API)
                + "?apiKey=" + apiKey
                + "&fieldId=" + fieldId
                + "&offset=" + offset
                + "&limit=" + limit
                + "&order=" + order;

  http.begin(client, path);

  Serial.println("[HTTP] Sending GET request.");

  int httpCode = http.GET();
  if (httpCode > 0) {
    Serial.printf("[HTTP] Received GET response, status code: %d\n", httpCode);

    const String& payload = http.getString();
    Serial.println("[HTTP] Payload: " + payload);

    if (httpCode == 200) {
      JSONVar json = JSON.parse(payload);
      JSONVar values = json["values"];

      http.end();
      
      return values;
    }
  } else {
    Serial.printf("[HTTP] Failed to send GET request, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();

  return JSONVar();
}