import { Box, useColorModeValue as mode, } from '@chakra-ui/react'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../Components/Login'
import Register from '../Components/Register'

export default function Auth() {
    return (
        <div>
            <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
                <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
                    <Box
                        bg={mode('white', 'gray.700')}
                        py="8"
                        px={{ base: '4', md: '10' }}
                        shadow="base"
                        rounded={{ sm: 'lg' }}
                    >
                        <Switch>
                            <Route path="/auth/login" exact component={Login} />
                            <Route path="/auth/create" exact component={Register} />
                            <Redirect to="/auth/login" />
                        </Switch>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
