import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { useHistory } from "react-router";
import { ApiCalls } from "../Helpers/ApiCalls";
import moment from "moment";

export default function ViewActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });
  const [focusedInput, setFocusedInput] = useState();

  const history = useHistory();

  useEffect(() => {
    new ApiCalls().getCall("activity").then((res) => {
      setActivities(res.response.data);
      setLoading(false);
    });
  }, []);

  const loadingTable = (
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
        <Td>
          <SkeletonText isLoaded={!loading} noOfLines={1} />
        </Td>
      </Tr>
    </Tbody>
  );

  const filtered =
    date.start === ""
      ? activities
      : activities.filter(
          (act) =>
            moment(act.created) >= moment(date.start) &&
            moment(act.created) <= moment(date.end)
        );

  const activityList = filtered.map((activity, index) => (
    <Tr key={index}>
      <Td>{new Date(activity.created).toLocaleDateString()}</Td>
      <Td>{activity.inventory.name}</Td>
      <Td>{activity.description}</Td>
      <Td>{activity.noOfUnits}</Td>
      <Td>{activity.user}</Td>
    </Tr>
  ));
  return (
    <div>
      <Flex justifyContent="space-between" align="center" wrap="wrap">
        <Stack direction="row">
          <IconButton
            type="button"
            icon={<ArrowBackIcon />}
            aria-label="Back"
            onClick={() => history.push("/dashboard/inventory")}
          />
          <Heading>Activities</Heading>
        </Stack>
        <Box mt={4}>
          <DateRangePicker
            startDate={date.start}
            endDate={date.end}
            startDateId="start-date"
            endDateId="end-date"
            onDatesChange={({ startDate, endDate }) =>
              setDate({
                start: startDate,
                end: endDate,
              })
            }
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            isOutsideRange={(day) => moment().diff(day) < 0}
            small
            showClearDates
          />
        </Box>
      </Flex>
      <Box mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>No. of Units</Th>
              <Th>User</Th>
            </Tr>
          </Thead>
          {loading ? (
            loadingTable
          ) : (
            <>
              <Tbody>{activityList}</Tbody>
            </>
          )}
        </Table>
      </Box>
    </div>
  );
}
