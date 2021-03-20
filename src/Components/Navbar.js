import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import React, { useRef } from 'react'
import SIdebar from './SIdebar';


export default function Navbar(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = useRef();
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5"
            bg="blue"
            color="white"
            {...props}>
            <Flex align="center" mr={5}>
                <IconButton color="white" bg="blue" ref={btnRef} onClick={onOpen} icon={<HamburgerIcon/>}/>
                <SIdebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
                <Heading as="h1" size="lg" ml={4} letterSpacing={"-.1rem"}>
                    Radiance Inventory
                    </Heading>
            </Flex>
        </Flex>
    )
}
