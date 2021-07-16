import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import React, { useEffect } from "react"
import Router from "next/router";
import useUser from "../hooks/useUser"

const Index = () => {
  const { user, loggedOut } = useUser();
  
  useEffect(() => {
    if(!loggedOut && user){
      Router.replace("/dashboard")
    }
  }, [user, loggedOut]) 

  return (
    <Flex justify="center" align="center" minHeight="100vh">
      <Box textAlign="center" lineHeight="8">
        <Heading>Miru</Heading>
        <Text>Sync anime <em>as you watch</em>.</Text>
        <a href="/api/login/anilist"><Button>Login with AniList</Button></a>
      </Box>
    </Flex>
  )
}

export default Index
