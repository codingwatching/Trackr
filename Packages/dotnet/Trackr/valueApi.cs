using System.Net.Http;
using Trackr.Models;
using System.Collections;

private static readonly HttpClient client = new();

private string ApiEndpoint = "http://wryneck.cs.umanitoba.ca:3000/values"

static async bothKinds addSingleValue(string apiKey, uint fieldId, string value)
{
    var value = new addValue
    {
        ApiKey = apiKey,
        Value = value,
        FieldId = fieldId
    };

    string content = FormUrlEncodedContent(value);
    HttpResponseMessage response = await client.PostAsync(ApiEndpoint, content);
    //return status code and message
    if (response.IsSuccessStatusCode)
    {
        return (response.statusCode(), response.content);
    }
    else
    {
        return false;
    }
}

static async bool addManyValues(string apiKey, uint fieldId, List<string> values)
{
    //look into rate limiting, figure out how to handle it
    foreach (var value in values)
    {
        bool result = addSingleValue(apiKey, fieldId, value);
        if(!result)
        {
            return result;
        }
    }
    return true;
}

static async bool getValues(string apiKey, uint fieldId, uint offset, int limit, string order)
{
    if(!order.ToLowerCase().Equals("asc") && !order.ToLowerCase().Equals("desc"))
    {
        console.WriteLine("order must be 'asc' or 'desc'. Please try again.")
        return false;
    }

    var request = new getValues
    {
        ApiKey = apiKey, 
        FieldId = fieldId, 
        Offset = offset, 
        Limit = limit, 
        Order = order
    }

    string content = FormUrlEncodedContent(value);
    HttpResponseMessage response = await client.GetAsync(ApiEndpoint, content);
    if (response.IsSuccessStatusCode)
    {
        return true;
    }
    else
    {
        return false;
    }
}