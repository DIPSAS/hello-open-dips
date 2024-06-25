import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = 
{
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    // Input (patient ID)
    const { EmailAddress } = req.body;
    const { OfficialNumber } = req.body;
    const { MobileNumber } = req.body;
    const { PhoneID } = req.body;
    const { client } = req.body;

    const parameters = [
      {
        name: "OfficialNumber",
        valuestring: OfficialNumber
      },
      {
        name: "consent",
        valuestring: "1"
      }
    ];
  
    if (MobileNumber !== '' || PhoneID !== '') {
      parameters.push(
        {
          name: "MobileNumber",
          valuestring: MobileNumber
        },
        {
          name: "phonetype",
          valuestring: PhoneID
        }
      );
    }
  
    if (EmailAddress !== '') {
      parameters.push(
        {
          name: "EmailAddress",
          valuestring: EmailAddress
        }
      );
    }
  
    const updateContactInfo = JSON.stringify({
      resourceType: "Parameters",
      parameter: parameters
    });


    const serverUrl = req.body.client.state.serverUrl
    const URL = serverUrl + `/patient/$UpdateContactInformation`
    const accessToken = req.body.client.state.tokenResponse.access_token

    //make request to serverUrl/patient/$UpdateContactInformation with accesstoken
    const result = await fetch(URL,
        {
            method: "POST",
            headers: {"dips-subscription-key": process.env.DIPS_SUBSCRIPTION_KEY as string, "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json"},
            body: updateContactInfo
        });
    
    

    if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
    }

    // Parsing the response body to JSON
    const data = await result.json();

    res.status(200).json(data)
    

}