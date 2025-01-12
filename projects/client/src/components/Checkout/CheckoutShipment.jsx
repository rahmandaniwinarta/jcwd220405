import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Shipment } from "./Shipment";

export const CheckoutShipment = () => {
  return (
    <>
      <Container
        maxWidth={"80%"}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        bgGradient="linear(150.64deg, #3B0D2C 0%, rgba(74, 10, 71, 1) 16.61%, #2F0C39 61.16%, rgba(38, 8, 67, 1)  92.29%)"
        color={"white"}
        border={"2px"}
        borderColor="gray.200"
        borderRadius="lg"
      >
        <Box width={{ base: "100%", md: "70%" }} p={2}>
          <Box
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            gap={"4"}
          >
            <Heading color={"salmon"}>Shipment</Heading>
          </Box>
          <Shipment />
        </Box>
      </Container>
    </>
  );
};
