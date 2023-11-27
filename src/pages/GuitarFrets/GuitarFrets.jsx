import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import SelectLimit from "./components/SelectLimit";
import { NUMBERS, notes, tuning } from "../../constants/guitar";

const listOfNotes = [...notes, ...notes, ...notes];

const GuitarFrets = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteLimit, setNoteLimit] = useState(15);

  const selectNote = (note, baseNote) => {
    if (selectedNote && selectedNote === note.value) {
      return setSelectedNote(null);
    }

    setSelectedNote(note.value);
  };

  return (
    <Box>
      <Box mb={3}>
        <SelectLimit setNoteLimit={setNoteLimit} noteLimit={noteLimit} />
      </Box>

      <Box className="guitar-notes" textAlign={"center"}>
        {tuning.map((baseNote) => {
          const startIndex = listOfNotes.findIndex(
            (note) => note.value === baseNote.value
          );

          return (
            <Box className="guitar-base-note" key={baseNote.order}>
              {listOfNotes.map((note, noteIndex) => {
                if (baseNote.value === NUMBERS && noteIndex <= noteLimit)
                  return (
                    <Box
                      className="guitar-note"
                      mt={5}
                      color="#CBD5E0"
                      key={noteIndex}
                    >
                      {noteIndex}
                    </Box>
                  );

                if (
                  noteIndex < startIndex ||
                  noteIndex - startIndex > noteLimit
                )
                  return;

                return (
                  <Box
                    className="guitar-note"
                    color={note.color}
                    key={note.value + baseNote.order + noteIndex}
                    onClick={() => selectNote(note, baseNote)}
                    style={
                      selectedNote && selectedNote !== note.value
                        ? { opacity: 0.1 }
                        : note.value.includes("#") &&
                          selectedNote === note.value
                        ? { opacity: 1, color: "#D53F8C" }
                        : { opacity: 1 }
                    }
                  >
                    {note.value}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default GuitarFrets;
