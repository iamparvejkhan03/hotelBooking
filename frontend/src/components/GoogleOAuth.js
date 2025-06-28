const GoogleOAuth = () => {
    try {
        const redirect_uri = 'http://localhost:5173/google-oauth';
        const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        const client_id = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

        let oauth2Endpoint = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=true&response_type=token&redirect_uri=${redirect_uri}&client_id=${client_id}`;

        return oauth2Endpoint;
    } catch (error) {
        console.error(error);
    }
}

export default GoogleOAuth;