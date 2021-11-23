import tokenService from "./tokenService"

const BASE_URL = '/api/posts/'

export function create(){
    return fetch(BASE_URL,{
        method: 'POST',
        // body: req.body,
        headers:{
            'Authorization': 'Bearer' + tokenService.getToken()
        }
    })
}