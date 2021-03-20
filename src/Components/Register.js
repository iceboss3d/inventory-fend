import { Button, FormControl, FormLabel, Heading, Input, Select, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ApiCalls } from '../Helpers/ApiCalls'

export default function Register() {
    const [formDetails, setFormDetails] = useState({
        username: "",
        password: "",
        role: "",
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
        new ApiCalls().authCall('create', formDetails).then(
            res => {
                console.log(res);
                toast({
                    title: res.message,
                    status: 'success',
                    position: 'top-right'
                })
                setLoading(false);
                history.push('/auth/login');
            },
            err => {
                console.log(err);
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
                handleSubmit()
            }}
        >
            <Heading mt="6" mb="6" textAlign="center" size="xl" fontWeight="extrabold">Create User</Heading>
            <Stack spacing="6">
                <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input name="username" type="text" value={formDetails.username} onChange={e => handleChange(e, 'username')} required />
                </FormControl>
                <FormControl id="role">
                    <FormLabel>Role</FormLabel>
                    <Select name="role" placeholder="Select" value={formDetails.role} onChange={e => handleChange(e, 'role')} required>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </Select>
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" value={formDetails.password} onChange={e => handleChange(e, 'password')} required/>
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={loading} loadingText="Submitting">
                    Submit
                </Button>
            </Stack>
        </form>
    )
}
