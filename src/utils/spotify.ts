import SpotifyWebApi from "spotify-web-api-node";

export const setSpotifyAccessToken = async (spotifyObj: SpotifyWebApi) => {
	const data = await spotifyObj.clientCredentialsGrant();
	spotifyObj.setAccessToken(data.body["access_token"]);
};
