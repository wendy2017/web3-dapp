import { useMemo, type FC, useCallback } from "react";

import { Box } from "@chakra-ui/react";

import RenderCat from "@/app/(components)/Cat/RenderCat";
import { catDna } from "@/utils/catsUtils";

const DisplayCat: FC<DisplayCatProps> = ({
  dnaBN,
  id,
  generation,
  selectable,
  setSelected,
  onClose,
}) => {
  const parsedDna = useMemo(() => catDna(dnaBN), [dnaBN]);

  const selectCat = useCallback(() => {
    const cat: SelectedCat = { dna: parsedDna, id: id, generation: generation };
    setSelected(cat);
    if (onClose) onClose();
  }, [parsedDna, id, generation, setSelected, onClose]);

  return (
    <>
      {selectable ? (
        <Box cursor="pointer" onClick={selectCat}>
          <RenderCat
            dna={parsedDna}
            id={id}
            generation={generation}
            isFactory={false}
          />
        </Box>
      ) : (
        <RenderCat
          dna={parsedDna}
          id={id}
          generation={generation}
          isFactory={false}
        />
      )}
    </>
  );
};

export default DisplayCat;
