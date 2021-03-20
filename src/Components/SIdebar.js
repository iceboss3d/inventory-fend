import { Avatar, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getToken } from '../Helpers/Token'

export default function SIdebar({ isOpen, onClose, btnRef }) {
    const [user, setUser] = useState({
        username: '',
        role: ""
    })

    useEffect(() => {
        const userToken = getToken();
        const decode = jwtDecode(userToken)
        setUser(decode);
    }, [])
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="left"
            finalFocusRef={btnRef}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Menu
                    </DrawerHeader>
                    <DrawerBody>
                        <Menu>
                            <MenuItem><Link as={NavLink} to="/dashboard/inventory">Inventory</Link></MenuItem>
                        </Menu>
                    </DrawerBody>
                    <DrawerFooter alignContent="start">
                        <Menu>
                            <MenuButton>
                                <Avatar bg="blue" name={user.username} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}
