import requests

API_KEY = "YOUR_API_KEY" # @var apiKey

req = requests.get(
    "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode",
    params={
        "location": "8.650815,50.111892",
        "f": "json"
    },
    headers={
        "Referrer": "https://<your-site>/", 
        "Authorization": f"Bearer {API_KEY}"
    },
)

data = req.json()

print(data['address']['LongLabel'])