import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import userService from '../../utils/userService';
import ProfileBio from '../../components/Profile/Profile';
import PageHeader from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';
// import PageFooter from '../../components/Footer/Footer';

export default function ProfilePage({ user, handleLogout, setResults, results, searchText, setSearchText}) {

    const [profileUser, setProfileUser] = useState({})
    const [error, setError] = useState('')

    const location = useLocation()

    async function getProfile() {

        try {
            const username = location.pathname.substring(1)
            const data = await userService.getProfile(username);
            setProfileUser(() => data.user)
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])
    

    return (

        <div>
                <Grid style={{ marginTop: '15em' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader user={user} handleLogout={handleLogout} setResults={setResults} results={results} searchText={searchText} setSearchText={setSearchText}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>  
                            <ProfileBio user={user} />
                    </Grid.Row>
                    <Grid.Row centered>                
                    </Grid.Row> 
                </Grid>
            <PageFooter/>
        </div>
    )
}