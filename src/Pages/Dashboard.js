import { Container } from "@chakra-ui/react";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EditInventory from "../Components/EditInventory";
import Inventory from "../Components/Inventory";
import Navbar from "../Components/Navbar";
import ViewActivity from "../Components/ViewActivity";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <Container maxW="container.xl">
        <Switch>
          <Route path="/dashboard/inventory" exact component={Inventory} />
          <Route
            path="/dashboard/edit-inventory/:id"
            exact
            component={EditInventory}
          />
          <Route
            path="/dashboard/view-activity"
            exact
            component={ViewActivity}
          />
          <Redirect to="/dashboard/inventory" />
        </Switch>
      </Container>
    </div>
  );
}
