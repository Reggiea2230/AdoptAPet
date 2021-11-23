const fetch = require('node-fetch')
async function find(req, res){
    try{
        const {user, body} = req
        console.log(body)
        const purinaToken = await getPurinaToken()
        const oAuth = purinaToken.access_token
        if(!oAuth){
            throw new Error('no purina token')
        }
        const results = await petsSearch(body, oAuth)
        res.status(200).json({data:[results, purinaToken, user]})
    }catch(err){
        res.status(400).json(err)
    }
    

}
async function petsSearch(body, bearerToken){
    const params = new URLSearchParams()
    for(const key in body){
        params.append(key, body[key])
    }
    const url = `${process.env.API_URL}${params.toString()}`
    console.log(url)
    const options = {
        headers:{
            "Authorization":`Bearer ${bearerToken}`
        }
       
    }
    console.log(options)
    const petFinderResponse = await fetch(url, options)
    let response = await petFinderResponse.json()
    console.log(response)
    return response 
}
async function getPurinaToken(){
    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")
    params.append("client_id", process.env.API_KEY)
    params.append("client_secret", process.env.SEARCH_SECRET)
    const petFinderResponse = await fetch(
        "https://api.petfinder.com/v2/oauth2/token", 
        {
            method:"POST", 
            body: params
        }
    )
    let response = await petFinderResponse.json()
    console.log(response)
    return response 
}
const controllers={find}
module.exports=controllers