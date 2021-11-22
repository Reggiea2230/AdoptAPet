import tokenService from "./tokenService"

const BASE_URL = '/api/posts/'

export function create(){
    return fetch(BASE_URL,{
        method: 'POST',
        body: post,
        headers:{
            'Authorization': 'Bearer' + tokenService.getToken()
        }
    })
}