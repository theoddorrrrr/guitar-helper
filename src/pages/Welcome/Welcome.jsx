import React from "react";
import { Box, Heading, Text, Grid, GridItem, Image } from "@chakra-ui/react";

import image from "../../assets/welcome/2.jpg";

const Welcome = () => {
  return (
    <Box textAlign="center" p={4}>
      <Heading as="h1" size="xl" mb={2}>
        Welcome to Guitar Learning Hub
      </Heading>
      <Text fontSize="md" mb={4}>
        Start your journey to becoming a guitarist with our easy-to-follow
        lessons.
      </Text>

      <Grid
        templateColumns={{ base: "1fr" }}
        gap={4}
        alignItems="center"
        justifyItems="center"
      >
        <GridItem>
          <Image
            src={image}
            alt="Music Note"
            boxSize={{ base: "100%", md: "500px" }}
          />
        </GridItem>
      </Grid>

      <Text mt={4} fontSize="sm">
        Explore the world of music, learn to play your favorite tunes, and
        express yourself through art.
      </Text>
    </Box>
  );
};

export default Welcome;
