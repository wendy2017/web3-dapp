import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  description: ReactNode;
};

const Header = ({ title, description }: HeaderProps) => {
  return (
    <Box textAlign="center" mb={5}>
      <Heading as="h1" size="lg" marginBottom={6} className="text-shadow">
        {title}
      </Heading>
      <Heading as="h4" size="sm" fontWeight="normal">
        {description}
      </Heading>
    </Box>
  );
};

export default Header;
