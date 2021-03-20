import { Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ApiCalls } from '../Helpers/ApiCalls';
import { setToken } from '../Helpers/Token';

export default function Login() {
    const [formDetails, setFormDetails] = useState({
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const history = useHistory();

    const handleChange = (event, name) => {
        setFormDetails(prev => {
            const {value} = event.target;
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = () => {
        setLoading(true);
        new ApiCalls().authCall('login', formDetails).then(
            res => {
                toast({
                    title: res.message,
                    status: 'success',
                    position: 'top-right'
                })
                setLoading(false);
                setToken(res.response.data.token);
                history.push('/dashboard');
            },
            err => {
                toast({
                    title: err.message,
                    status: 'error',
                    position: 'top-right'
                })
                setLoading(false);
            }
        )
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                // your login logic here
                handleSubmit();
            }}
        >
            <Heading mt="6" mb="6" textAlign="center" size="xl" fontWeight="extrabold">Sign In</Heading>
            <Stack spacing="6">
                <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input name="username" type="text" value={formDetails.username} onChange={e => handleChange(e, 'username')} required />
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" value={formDetails.password} onChange={e => handleChange(e, 'password')} required/>
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={loading} loadingText="Signing In">
                    Sign in
                </Button>
            </Stack>
        </form>
    )
}
