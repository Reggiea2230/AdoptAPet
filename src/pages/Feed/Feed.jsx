import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import PostFeed from '../../components/PostFeed/PostFeed';
import * as petApi from '../../utils/petApi';
import { Grid } from "semantic-ui-react";

    const apikey = "LnaEpnYWwZRjywZ2VH9tmITZeHlnaPUeuqsW5u58H6I2roZzSt";
    const secret = "LOp90xxy8PpauCBpyXwfIX5UnzHaxhx1jswj5Kwg";

export default function Feed(props){
    const [token, setToken] = useState('')
    const [data, setData] = useState([])


    useEffect(()=>{
        const search = async () => {
          
            
        }
        search()
    },[])

    
   
    return (
        <>
        <Header />
        <PostFeed />
        </>
    )
}