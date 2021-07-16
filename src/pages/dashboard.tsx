import { Grid, GridItem } from '@chakra-ui/react'
import useUser from '../hooks/useUser'
import React from 'react'
import { useEffect } from 'react'
import Router from 'next/router'

const Dashboard = () => {
    const { user, mutate, loggedOut } = useUser();

    useEffect(() => {
        if(loggedOut && user){
            Router.replace("/")
        }
    }, [user, loggedOut])

    return(
        <Grid>
            <GridItem>
                {}
            </GridItem>
        </Grid>
    )
}

export default Dashboard