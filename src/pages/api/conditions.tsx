import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = 
{
    message: string
}


/* API returns status code of server call and response body */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { patientId, client } = req.body;
    const URL = client.state.serverUrl + `/condition?patient=${patientId}`
    const accessToken = client.state.tokenResponse.access_token

    // Query server for conditions data
    const response = await fetch(URL, {
            method: "GET",
            headers: {"dips-subscription-key": process.env.DIPS_SUBSCRIPTION_KEY as string, "Authorization": `Bearer ${accessToken}`},
    });
    // Get data from server response
    const data = await response.json()

    res.status(response.status).json(data);
}