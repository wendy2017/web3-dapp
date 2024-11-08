import type { FC } from "react";

import {
  Box,
  Button,
  Center,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import RenderCat from "../Cat/RenderCat";
import CatSelectModal from "../CatSelectModal";

const CatSelection: FC<CatSelectionProps> = ({
  cat,
  setCat,
  name,
  otherParent,
  loading,
  isMarket,
}) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bgColor={colorMode === "light" ? "#ededed" : "#4f5050"}
        w={350}
        m={"auto"}
        paddingBlock={10}
        borderRadius={10}
      >
        <Center>
          <VStack>
            {cat && (
              <>
                <RenderCat
                  dna={cat.dna}
                  id={cat.id}
                  generation={cat.generation}
                  isFactory={false}
                />
                <br></br>
              </>
            )}
            <Button
              onClick={onOpen}
              isLoading={loading}
              className="box-shadow bg-blue-300"
            >
              {!cat ? `Select ${name}` : "Change"}
            </Button>
          </VStack>
        </Center>
      </Box>

      <CatSelectModal
        isOpen={isOpen}
        onClose={onClose}
        setCat={setCat}
        otherParent={otherParent}
        isMarket={isMarket}
      />
    </>
  );
};

export default CatSelection;
