import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react'
import { ApiCalls } from '../Helpers/ApiCalls';
import { useHistory } from 'react-router-dom';


export default function AddActivityModel({ isOpen, onClose }) {
    const [formDetails, setFormDetails] = useState({
        inventory: "",
        description: "",
        noOfUnits: ""
    })
    const [loading, setLoading] = useState(false);
    const [inventories, setInventories] = useState([])

    const toast = useToast();
    const history = useHistory();

    const inventoryList = inventories.map((inventory, index) => (
        <option key={index} value={inventory.id}>{inventory.name}</option>
    ))

    const handleChange = (e, name) => {
        const { value } = e.target;
        setFormDetails(prev => {
            return { ...prev, [name]: value }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        new ApiCalls().postCall('inventory/activity', formDetails).then(
            res => {
                console.log(res);
                toast({
                    status: 'success',
                    title: res.message,
                    position: 'top-right'
                });
                setLoading(false);
                onClose();
                history.push('/dashboard/inventory/activity');
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

    useEffect(() => {
        new ApiCalls().getCall('inventory').then(res => {
            console.log(res);
            setInventories(res.response.data);
        }, err => {
            toast({
                status: "error",
                title: err.message,
                position: 'top-right'
            })
        })
    }, [toast])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={e => handleSubmit(e)}>
                    <ModalHeader>Add Activity</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="inventory">Inventory</FormLabel>
                            <Select name="inventory" placeholder="Inventory Item" onChange={e => handleChange(e, 'inventory')} required>
                                {inventoryList}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Input type="text" name="description" placeholder="Description" onChange={e => handleChange(e, 'description')} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="noOfUnits">No of Units</FormLabel>
                            <Input type="number" name="noOfUnits" placeholder="No of Units" onChange={e => handleChange(e, 'noOfUnits')} inputMode="numeric" required />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" type='submit' isLoading={loading} loadingText="Saving Activity">Save Activity</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
