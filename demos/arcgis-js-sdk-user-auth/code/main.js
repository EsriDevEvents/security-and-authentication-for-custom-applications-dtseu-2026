// #region config
const clientId = "YOUR_CLIENT_ID"; // @var clientId
const portalUrl = "https://www.arcgis.com"; // @var portalUrl
// #endregion

// #region imports
const [OAuthInfo, esriId] = await $arcgis.import([
  "@arcgis/core/identity/OAuthInfo.js",
  "@arcgis/core/identity/IdentityManager.js",
]);
// #endregion

// #region oauth
// Registering: IdentityManager.registerOAuthInfos([])
esriId.registerOAuthInfos([
  new OAuthInfo({
    appId: clientId,
    portalUrl,
    popup: true,
    popupCallbackUrl: "oauth-callback.html",
    authNamespace: "interactive-code-scroll-oauth-demo",
  })
]);
// #endregion

// #region sign-in
const signInButton = document.querySelector("#sign-in");
const userStatus = document.querySelector("#user-status");
let signedIn = false;

signInButton.addEventListener("click", async () => {
  if (signedIn) {
    esriId.destroyCredentials();
    // Set visible text when the user is NOT signed in
    signedIn = false;
    signInButton.textContent = "Sign in";
    userStatus.textContent = "You are not signed in yet.";
    return;
  }

  // To-Do: the app should also check if the user is signed-in on startup
  const credential = await esriId.getCredential(`${portalUrl}/sharing`, {
    oAuthPopupConfirmation: false,
  });
  
  // Set visible text when the user is signed in
  signedIn = true;
  signInButton.textContent = "Sign out";
  userStatus.textContent = `Signed in as ${credential.userId}.`;
});
// #endregion
