using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Trackr
{
    class TrackrApi
    {

        private static readonly HttpClient client = new HttpClient();
        private static string ApiEndpoint = "http://wryneck.cs.umanitoba.ca:3000/values";

        static async Task<HttpResponseMessage> AddSingleValue(string apiKey, uint fieldId, string value)
        {
            var valueObject = new Dictionary<string, string>
            {
                { "ApiKey", apiKey },
                { "Value", value },
                { "FieldId", fieldId.ToString() }
            };

            FormUrlEncodedContent content = new FormUrlEncodedContent(valueObject);
            HttpResponseMessage response = await client.PostAsync(ApiEndpoint, content);
            return response;
        }

        static async Task<HttpResponseMessage> AddManyValues(string apiKey, uint fieldId, List<string> values)
        {
            //look into rate limiting, figure out how to handle it
            foreach (var value in values)
            {
                HttpResponseMessage result = await AddSingleValue(apiKey, fieldId, value);
                if (!result.IsSuccessStatusCode)
                {
                    return result;
                }
                Thread.Sleep(1000);
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        static async Task<HttpResponseMessage> GetValues(string apiKey, uint fieldId, uint offset, int limit, string order)
        {
            if (!order.ToLower().Equals("asc") && !order.ToLower().Equals("desc"))
            {
                HttpResponseMessage newResponse = new HttpResponseMessage(HttpStatusCode.BadRequest);
                newResponse.Content = new StringContent("Invalid request parameters provided.");
                return newResponse;
            }

            var requestObject = new Dictionary<string, string>
            {
                { "ApiKey", apiKey },
                { "FieldId", fieldId.ToString() },
                { "Offset", offset.ToString() },
                { "Limit",limit.ToString() },
                { "Order", order}
            };

            FormUrlEncodedContent requestContent = new FormUrlEncodedContent(requestObject);

            var httpRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(ApiEndpoint),
                Content = requestContent,
            };

            HttpResponseMessage response = await client.SendAsync(httpRequest);

            return response;
        }
    }
}