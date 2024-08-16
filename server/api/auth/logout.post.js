import { OAuth2Client } from 'google-auth-library'

export default defineEventHandler( async (event) => {
  const body = readBody(event)
  
  const oauth2Client = new OAuth2Client()
  oauth2Client.setCredentials({ access_token: body.accessToken })

  const userInfo = await oauth2Client
    .request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    })
    .then((response) => response.data)
    .catch(() => null)


  return oauth2Client.revokeCredentials()
})
