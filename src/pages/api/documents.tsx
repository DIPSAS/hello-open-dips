import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = 
{
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Input (patient ID)
    const { patientId } = req.body;
    const { client } = req.body;

    const serverUrl = req.body.client.state.serverUrl
    const URL = serverUrl + `/DocumentReference?patient=${patientId}`
    const accessToken = req.body.client.state.tokenResponse.access_token


    //make request to serverUrl/DocumentReference?patient=${patientId} with accesstoken
    const result = await fetch(URL,
        {
            method: "GET",
            headers: {"dips-subscription-key": process.env.DIPS_SUBSCRIPTION_KEY as string, "Authorization": `Bearer ${accessToken}`},
        });
        

    if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
    }

    // Parsing the response body to JSON
    const data = await result.json();

    res.status(200).json(data)
    

}