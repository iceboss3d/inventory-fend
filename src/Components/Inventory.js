import {
  AddIcon,
  EditIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonText,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ApiCalls } from "../Helpers/ApiCalls";
import AddActivityModel from "./AddActivityModel";
import AddInventoryModal from "./AddInventoryModal";

export default function Inventory() {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openActivity, setOpenActivity] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  const inventoryRow = inventories.map((inventory, index) => (
    <Tr
      bg={inventory.noOfUnits <= inventory.warningUnits ? "orangered" : "white"}
      key={index}
    >
      <Td>{inventory.id}</Td>
      <Td>{inventory.name}</Td>
      <Td>{inventory.description}</Td>
      <Td>{inventory.noOfUnits}</Td>
      <Td>
        <Menu>
          <MenuButton>
            <SettingsIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => history.push(`/dashboard/edit-inventory/${inventory.id}`)}>Update Inventory</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  ));

  useEffect(() => {
    new ApiCalls().getCall("inventory").then((res) => {
      console.log(res);
      setInventories(res.response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Flex justifyContent="space-between" align="center" wrap="wrap">
        <Heading>Inventory</Heading>
        <ButtonGroup mt={4} flexWrap="wrap">
          <IconButton
            icon={<EditIcon />}
            onClick={() => setOpenActivity(!openActivity)}
          >
            Log Activity
          </IconButton>
          <IconButton icon={<HamburgerIcon />} onClick={() => history.push('/dashboard/view-activity')}>Activities</IconButton>
          <AddActivityModel
            isOpen={openActivity}
            onClose={() => setOpenActivity(!openActivity)}
          />
          <IconButton
            bg="blue"
            color="white"
            icon={<AddIcon />}
            onClick={onOpen}
          />
          <AddInventoryModal isOpen={isOpen} onClose={onClose} />
        </ButtonGroup>
      </Flex>
      <Box mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Units Left</Th>
            </Tr>
          </Thead>
          {loading ? (
            <Tbody>
              <Tr>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText isLoaded={!loading} noOfLines={1} />
                </Td>
              </Tr>
            </Tbody>
          ) : inventories.length < 1 ? (
            <Tbody>
              <Tr>
                <Td colSpan={4}>
                  <Center>
                    <Stack>
                      <Text>No Inventories Yet</Text>
                      <Button type="button" bg="blue" color="white">
                        Add Inventory
                      </Button>
                    </Stack>
                  </Center>
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>{inventoryRow}</Tbody>
          )}
        </Table>
      </Box>
    </div>
  );
}
