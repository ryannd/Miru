import { Avatar, Box, Flex, Grid, GridItem, Image } from '@chakra-ui/react'
import useUser from '../hooks/useUser'
import React from 'react'
import { useEffect } from 'react'
import Router from 'next/router'

const Dashboard = () => {
    const { user, mutate, loading, loggedOut } = useUser();

    useEffect(() => {
        if(loggedOut && user){
            Router.replace("/")
        }
        console.log(user)
    }, [user, loggedOut])


    return(
        <>
        {loading ? <div>Loading...</div> :
        (
            <Grid
            h="100vh"
            templateRows="repeat(1,1fr)"
            templateColumns="repeat(12,1fr)"
            >
                <GridItem colSpan={3} bg="white">
                    <Box textAlign="center">
                        <Image 
                            src={user.data.Viewer.avatar.large}
                            borderRadius="full"
                            boxSize="300px"
                        />
                    </Box>
                </GridItem>  
                <GridItem colSpan={9} bg="black">

                </GridItem>
                
            </Grid>
        )}
        </>
    )
}

export default Dashboard