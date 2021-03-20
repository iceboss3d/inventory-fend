import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ApiCalls } from "../Helpers/ApiCalls";

export default function EditInventory({
  match: {
    params: { id },
  },
}) {
  const [formDetails, setFormDetails] = useState({
    name: "",
    description: "",
    noOfUnits: "",
    warningUnits: "",
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    new ApiCalls().putCall(`inventory/update/${id}`, formDetails).then(
      (res) => {
        console.log(res);
        toast({
          status: "success",
          title: res.message,
          position: "top-right",
        });
        setLoading(false);
        history.push("/dashboard/inventory");
      },
      (err) => {
        toast({
          status: "error",
          title: err.message,
          position: "top-right",
        });
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    new ApiCalls().getCall(`inventory/single/${id}`).then(
      (res) => {
        setFormDetails(res.response.data);
      },
      (err) => {
        toast({
          status: "error",
          title: err.message,
          position: "top-right",
        });
      }
    );
  }, [toast, id]);
  return (
    <div>
      <Heading>Edit Inventory</Heading>
      <Box width={{ md: "50%" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formDetails.name}
              onChange={(e) => handleChange(e, "name")}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={formDetails.description}
              onChange={(e) => handleChange(e, "description")}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="noOfUnits">No of Units</FormLabel>
            <Input
              type="number"
              name="noOfUnits"
              placeholder="No of Units"
              value={formDetails.noOfUnits}
              onChange={(e) => handleChange(e, "noOfUnits")}
              inputMode="numeric"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="warningUnits">Warning Units</FormLabel>
            <Input
              type="number"
              name="warningUnits"
              placeholder="Warning Units"
              value={formDetails.warningUnits}
              onChange={(e) => handleChange(e, "warningUnits")}
              inputMode="numeric"
              required
            />
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            loadingText="Updating Inventory"
            mt={4}
          >
            Update Inventory
          </Button>
        </form>
      </Box>
    </div>
  );
}
