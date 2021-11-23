import tokenService from "./tokenService"

const BASE_URL = '/api/posts/'

export function create(body){
    return fetch(BASE_URL,{
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
            'Authorization': 'Bearer' + tokenService.getToken()
        }
    })
}