# node-pkce
 

Why PKCE flow
SPA/Mobile app were using implicit flow. That means token is passed in url query param which is visible in browser.

That leads to security issue with modern browser
1) With access to history api another application can steal the token.
2) It’s also problematic because modern browsers can do browser history syncing and they support browser extensions that could be actively scanning for tokens in the browser address bar. Leaking tokens is a big security risk.
https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce

PKCE flow
Its is an extension of authorization code fow.

code_verifier - "random string"
code_challenge_method = algo to generate has
code_challenge: hashUsing-code_challenge_method-Algo(code-verifier)

1) App sends a code-challenge and code_challenge_method to idp
e.g.
const loginUrl = `https://${AUTH0_DOMAIN}/authorize?`
    + `response_type=code&client_id=${clientId}` + 
    `&code_challenge=${codeChallenge}` + 
    `&code_challenge_method=S256&redirect_uri=${redirectUri}remove` + 
    `&scope=appointments%20contacts&`

2) idp logs in user and sends back auth code
3) app requests for token by posting code_verifier
const payload = {
        'grant_type': 'authorization_code',
        'client_id': process.env.CLIENT_ID,
        'code_verifier': codeVerifier,
        'code': req.query.code,
        'redirect_uri': process.env.REDIRECT_URI
    }

OKTA
https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce

Auth0
https://auth0.com/docs/flows/call-your-api-using-the-authorization-code-flow-with-pkce



