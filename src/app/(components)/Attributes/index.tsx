import { type FC, useCallback, useState, memo, useMemo } from "react";

import { HStack, Button, Box } from "@chakra-ui/react";

import { catAttributes, colorAttributes } from "@/data/catAttributes";

import Selector from "./Selector";

const Attributes: FC<AttributesProps> = ({ dna, updateDna }) => {
  const [isColorTab, setIsColorTab] = useState(true);

  const toogleTab = useCallback(() => {
    setIsColorTab((prev) => !prev);
  }, []);

  const handleColorChange = useCallback(
    (colorName: keyof DNA, value: number) => {
      updateDna({ [colorName]: value });
    },
    [updateDna]
  );

  const colorSelectors = useMemo(
    () =>
      colorAttributes.map((attr) => (
        <Selector
          key={attr.colorName}
          colorName={attr.colorName}
          action={handleColorChange}
          name={attr.name}
          range={attr.range}
          idCode={dna[attr.colorName as keyof DNA] ?? 0}
        />
      )),
    [dna, handleColorChange]
  );

  const cattributeSelectors = useMemo(
    () =>
      catAttributes.map((attr) => (
        <Selector
          key={attr.colorName}
          colorName={attr.colorName}
          action={handleColorChange}
          name={attr.name}
          range={attr.range}
          idCode={dna[attr.colorName as keyof DNA] || ""}
          badge={
            attr.badge
              ? attr.badge(dna[attr.colorName as keyof DNA] ?? 0)
              : undefined
          }
        />
      )),
    [dna, handleColorChange]
  );

  return (
    <>
      <HStack justify={"space-around"} mb={5}>
        <Button
          colorScheme="blue"
          variant={isColorTab ? "solid" : "ghost"}
          onClick={() => toogleTab()}
        >
          Dog Colors
        </Button>
        <Button
          colorScheme="blue"
          variant={!isColorTab ? "solid" : "ghost"}
          onClick={() => toogleTab()}
        >
          Dog tributes
        </Button>
      </HStack>
      <Box textAlign="center">
        {isColorTab ? colorSelectors : cattributeSelectors}
      </Box>
    </>
  );
};

export default memo(Attributes);
