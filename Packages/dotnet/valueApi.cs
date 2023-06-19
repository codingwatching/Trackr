using System.Net.Http;
using Trackr.Models;
Using system.Collections.Generic;

private static readonly HttpClient client = new();

private string ApiEndpoint = "http://wryneck.cs.umanitoba.ca:3000/values"

static async bool addSingleValue(string apiKey, uint fieldId, string value)
{
    var value = new addValue
    {
        ApiKey = apiKey,
        Value = value,
        FieldId = fieldId
    };

    string jsonString = JsonConvert.SerializeObject(value);
    StringContent content = new StringContent(jsonString, Encoding.UTF8, "application/json");
    HttpResponseMessage response = await client.PostAsync(ApiEndpoint, content);
    if (response.IsSuccessStatusCode)
    {
        return true;
    }
    else
    {
        return false;
    }
}

static async bool addManyValues(string apiKey, uint fieldId, List<string> values)
{
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

    string jsonString = JsonConvert.SerializeObject(request);
    StringContent content = new StringContent(jsonString, Encoding.UTF8, "application/json");
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