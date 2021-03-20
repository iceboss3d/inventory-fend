import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ApiCalls } from '../Helpers/ApiCalls';

export default function AddInventoryModal({ isOpen, onClose }) {
    const [formDetails, setFormDetails] = useState({
        name: "",
        description: "",
        noOfUnits: "",
        warningUnits: ""
    })
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const handleChange = (e, name) => {
        const { value } = e.target;
        setFormDetails(prev => {
            return {...prev, [name]: value}
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        new ApiCalls().postCall('inventory/add', formDetails).then(
            res => {
                console.log(res);
                toast({
                    status: 'success',
                    title: res.message,
                    position: 'top-right'
                });
                setLoading(false);
                onClose();
            }, err => {
                toast({
                    status: 'error',
                    title: err.message,
                    position: 'top-right'
                });
                setLoading(false);
            }
        )
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={e => handleSubmit(e)}>
                    <ModalHeader>Add Inventory</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input type="text" name="name" placeholder="Name" onChange={e => handleChange(e, 'name')} required/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Input type="text" name="description" placeholder="Description" onChange={e => handleChange(e, 'description')} required/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="noOfUnits">No of Units</FormLabel>
                            <Input type="number" name="noOfUnits" placeholder="No of Units" onChange={e => handleChange(e, 'noOfUnits')} inputMode="numeric" required/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="warningUnits">Warning Units</FormLabel>
                            <Input type="number" name="warningUnits" placeholder="Warning Units" onChange={e => handleChange(e, 'warningUnits')} inputMode="numeric" required/>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" type='submit' isLoading={loading} loadingText="Saving Inventory">Save Inventory</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
