import Header from "./Header";
import { Box, ChakraProvider } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <ChakraProvider resetCSS={true}>
      <Header />
      <Box margin="10px">{children}</Box>
    </ChakraProvider>
  );
};

export default Layout;
