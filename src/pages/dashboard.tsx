import { Grid, GridItem } from '@chakra-ui/react'
import useUser from '../hooks/useUser'
import React from 'react'
import useSWR from 'swr'

const Dashboard = () => {
    const { user, mutate, loggedOut } = useUser();
    return(
        <Grid>
            <GridItem>
                {}
            </GridItem>
        </Grid>
    )
}

export default Dashboard