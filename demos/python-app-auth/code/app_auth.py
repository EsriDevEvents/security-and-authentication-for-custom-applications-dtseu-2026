# #region library
from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session
# #endregion

# #region config
client_id = "<client_id>" # @var client_id
client_secret = "<client_secret>" # @var client_secret
portal_url = "https://www.arcgis.com" # @var portal_url
# #endregion

# #region token-endpoint
# Token URL endpoint for oauth2
token_url = f"{portal_url}/sharing/rest/oauth2/token"
# #endregion

# #region oauth
# Create client & session with client_id
client = BackendApplicationClient(client_id=client_id)
session = OAuth2Session(
    client=client,
    auto_refresh_url=token_url,
    auto_refresh_kwargs={"client_id": client_id},
)
# #endregion

# #region token
# Actually fetch the token
session.fetch_token(
    token_url=token_url,
    client_secret=client_secret,
    include_client_id=True
)
# #endregion

# #region request
# Make a request using the token
response = session.get(
    f"{portal_url}/sharing/rest/portals/self",
    params={"f": "json"},
)

response.raise_for_status()

portal_info = response.json()
print(f"Title: \"{portal_info["appinfo"]["appTitle"]}\"")
print("Has the following privileges:")
for privilege in portal_info["appinfo"]["privileges"]:
    print(f"\t- {privilege}")
# #endregion