import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'

const User = () => {
    const {data, error} = useSWR('/api/anilist/user')
    console.log(data)
    return(
        <Grid>
            <GridItem>
                {}
            </GridItem>
        </Grid>
    )
}

export default User