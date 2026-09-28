// #region config
const clientId = "YOUR_CLIENT_ID"; // @var clientId
const portalUrl = "https://www.arcgis.com"; // default to: https://www.arcgis.com // @var portalUrl
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
    // Refresh token duration in mins. Default: 2 weeks. Max: 90 days, unless your org sets a lower limit.
    // expiration: 20160, // Access tokens remain short-lived
  })
]);
// #endregion

// #region auth-state
const signInButton = document.querySelector("#sign-in");
const userStatus = document.querySelector("#user-status");

const sharingUrl = `${portalUrl}/sharing`;
let signedIn = false;

function showSignedIn(credential) {
  signedIn = true;
  signInButton.textContent = "Sign out";
  userStatus.textContent = `Signed in as ${credential.userId}.`;
}

function showSignedOut() {
  signedIn = false;
  signInButton.textContent = "Sign in";
  userStatus.textContent = "You are not signed in yet.";
}

try {
  const credential = await esriId.checkSignInStatus(sharingUrl);
  showSignedIn(credential);
} catch {
  showSignedOut();
}
// #endregion

// #region sign-in
signInButton.addEventListener("click", async () => {
  if (signedIn) {
    esriId.destroyCredentials();
    // Set visible text when the user is NOT signed in
    showSignedOut();
    return;
  }

  const credential = await esriId.getCredential(sharingUrl, {
    oAuthPopupConfirmation: false,
  });
  
  // Set visible text when the user is signed in
  showSignedIn(credential);
});
// #endregion
