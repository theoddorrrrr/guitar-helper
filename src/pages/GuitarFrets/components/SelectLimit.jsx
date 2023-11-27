import React from "react";

import { Select } from "@chakra-ui/react";
import { guitarLimits } from "../../../constants/guitar";

const SelectLimit = ({ setNoteLimit, noteLimit }) => {
  const limitList = Array(guitarLimits.end + 1).fill(null);
  const minLimit = 5;

  const changeLimit = (e) => {
    const value = e.target.value;

    if (value) setNoteLimit(value);
  };
  return (
    <Select
      maxWidth="100px"
      margin="0 auto"
      placeholder="Limit"
      onChange={changeLimit}
      value={noteLimit}
    >
      {limitList
        .map((_, index) => {
          return (
            <option key={index} value={index}>
              {index}
            </option>
          );
        })
        .filter((limit) => limit.key >= minLimit)}
    </Select>
  );
};

export default SelectLimit;
