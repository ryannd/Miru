import { Button, ButtonGroup, Container, Heading, Stack } from "@chakra-ui/react"
import React from "react"

const Index = () => {
  return (
    <Stack spacing={8}>
      <Container centerContent>
        <Heading fontSize="xl">Miru</Heading>
      </Container>
      <Container centerContent>
        <a href="/api/login/anilist"><Button>Login</Button></a>
      </Container>
    </Stack>
  )
}

export default Index
