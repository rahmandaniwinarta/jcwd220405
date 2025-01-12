import axios from "axios";
import React, { useEffect, useState } from "react";

import { Image, Text, Flex, Box, Heading, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TextShow } from "./TextShow";
import { SortProduct } from "./SortProduct";
import { PaginationProduct } from "./PaginationProduct";

const baseApi = process.env.REACT_APP_API_BASE_URL;

export const Product = ({ search, page, setPage, pmax, pmin }) => {
  const [product, setProduct] = useState([]);
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [order, setOrder] = useState("name");
  const [order_direction, setOrder_direction] = useState("ASC");
  const [totalRows, setTotalRows] = useState(0);

  const urlProduct = `${baseApi}/product?search_query=${
    search ? search : ""
  }&pmax=${pmax}&pmin=${pmin}&page=${
    page - 1
  }&limit=${limit}&order=${order}&by=${order_direction}`;
  const getProduct = async () => {
    try {
      if (!search) {
        return 0;
      }
      const response = await (await axios.get(urlProduct)).data;
      setProduct(response.result);
      setTotalPage(response.totalPage);
      setTotalRows(response.totalRows);
      setOffset(response.offset);
    } catch (error) {
      console.error(error);
    }
  };

  const crossTitle = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  useEffect(() => {
    getProduct();
  }, [search, pmax, pmin, page, order, order_direction]);
  return (
    <Container maxW="85%">
      <Container
        maxW="container.lg"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        hidden={product?.length && search ? false : true}
        mb={"6px"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 0 }}
      >
        <TextShow
          offset={offset}
          page={page}
          totalPage={totalPage}
          totalRows={totalRows}
          limit={limit}
          search={search}
        />
        <SortProduct
          order={order}
          setOrder={setOrder}
          order_direction={order_direction}
          setOrder_direction={setOrder_direction}
        />
      </Container>
      <Container
        border={"2px"}
        borderColor={"whiteAlpha.400"}
        borderRadius={"md"}
        maxW="container.lg"
        h={product?.length && search ? "full" : "50vh"}
        color={"inherit"}
      >
        <Box
          textAlign={"center"}
          hidden={product?.length && search ? true : false}
        >
          Product not found
        </Box>
        <Box hidden={product?.length && search ? false : true}>
          <Flex flexWrap={"wrap"} justifyContent={"space-evenly"} pt={"4"}>
            {product?.map((item, index) => {
              return (
                <Box
                  as={Link}
                  to={`${item?.name}`}
                  key={index}
                  w="200px"
                  h="292px"
                  m={"0 8px 18px"}
                  borderRadius={"md"}
                  boxShadow={"0 0 4px 1px rgba(255,255,255,.69)"}
                  position={"relative"}
                  opacity={item.product_stocks === "0" ? ".88" : ""}
                  cursor={
                    item.product_stocks === "0" ? "not-allowed" : "pointer"
                  }
                >
                  <Box
                    bgColor={"rgba(141,141,141,.69)"}
                    width={"full"}
                    height={"full"}
                    borderRadius={"md"}
                    position={"absolute"}
                    textAlign={"center"}
                    color={"rgb(213, 75, 121)"}
                    visibility={item.product_stocks === "0" ? "" : "hidden"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box
                      border={"4px"}
                      w={"60%"}
                      borderRadius={"sm"}
                      transform={"rotate(-5deg)"}
                      userSelect={"none"}
                    >
                      <Heading>OUT</Heading>
                      <Text fontWeight={"semibold"}>OF STOCK</Text>
                    </Box>
                  </Box>
                  <Box
                    h="165px"
                    w="full"
                    borderTopRadius="md"
                    overflow="hidden"
                  >
                    <Image
                      src={`${process.env.REACT_APP_SERVER}${
                        item?.Product_Images
                          ? item?.Product_Images[0].image
                          : `/public/product/default-product.png`
                      }`}
                      alt={item?.name}
                      width="full"
                      height="full"
                      bgGradient={
                        (index + 1) % 2 === 0
                          ? "linear(to-r, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                          : "linear(to-l, rgba(44, 22, 88, 0.69) 15%, #262A6E 100%)"
                      }
                    />
                  </Box>
                  <Box px="4px" h="50%">
                    <Box h="55%" p={2} overflow={"hidden"}>
                      <Text
                        fontWeight={"semibold"}
                        _hover={{ color: "rgb(213, 75, 121)" }}
                        title={item?.name}
                      >
                        {crossTitle(item?.name, 40)}
                      </Text>
                    </Box>
                    <Box p={2}>
                      <Text
                        fontWeight="bold"
                        _hover={{ fontStyle: "italic" }}
                        color={"rgb(213, 75, 121)"}
                      >
                        {`Rp${item?.price.toLocaleString()}`}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Flex>
          <Box p={2}>
            <PaginationProduct
              page={page}
              setPage={setPage}
              totalPage={totalPage}
            />
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
