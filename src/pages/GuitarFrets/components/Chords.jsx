import React, { useEffect } from "react";

import {
  defaultStringColor,
  notes,
  primaryNoteColor,
  typeOfChord,
  gapsForChords,
} from "../../../constants/guitar";
import {
  Box,
  Flex,
  Center,
  Container,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";

const Chords = ({
  chordMainNote,
  setChordMainNote,
  chordType,
  setChordType,
  chordNotes,
  setChordNotes,
}) => {
  useEffect(() => {
    if (chordMainNote) {
      const calculateChord = () => {
        const listOfNotes = [...notes, ...notes];

        if (chordType === typeOfChord.major) {
          const indexOfBaseNote = listOfNotes.findIndex(
            (note) => note.value === chordMainNote
          );
          const indexOfSecondNote = indexOfBaseNote + gapsForChords.major[0];
          const indexOfThirdNote = indexOfSecondNote + gapsForChords.major[1];

          setChordNotes([
            listOfNotes[indexOfBaseNote].value,
            listOfNotes[indexOfSecondNote].value,
            listOfNotes[indexOfThirdNote].value,
          ]);
        }

        if (chordType === typeOfChord.minor) {
          const indexOfBaseNote = listOfNotes.findIndex(
            (note) => note.value === chordMainNote
          );
          const indexOfSecondNote = indexOfBaseNote + gapsForChords.minor[0];
          const indexOfThirdNote = indexOfSecondNote + gapsForChords.minor[1];

          setChordNotes([
            listOfNotes[indexOfBaseNote].value,
            listOfNotes[indexOfSecondNote].value,
            listOfNotes[indexOfThirdNote].value,
          ]);
        }
      };

      calculateChord();
    }
  }, [chordMainNote, chordType]);

  return (
    <Container mt={10}>
      <Center gap={3}>
        <Select
          maxWidth="100px"
          placeholder="Chord"
          onChange={(e) => setChordMainNote(e.target.value)}
          value={chordMainNote}
        >
          {notes.map((note) => {
            return (
              <option key={note.value} value={note.value}>
                {note.value}
              </option>
            );
          })}
        </Select>

        <RadioGroup onChange={(type) => setChordType(type)} value={chordType}>
          <Stack direction="row">
            {Object.values(typeOfChord).map((type) => {
              return (
                <Radio value={type} key={type}>
                  {type}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      </Center>
      <Flex mt={3} justifyContent={"center"} alignItems={"center"} gap={5}>
        {notes.map((note) => {
          return (
            <Box
              color={
                chordMainNote && chordNotes.includes(note.value)
                  ? primaryNoteColor
                  : defaultStringColor
              }
              style={{
                textDecoration:
                  note.value === chordMainNote ? "underline" : "none",
                fontWeight: note.value === chordMainNote ? "bold" : "normal",
              }}
              key={note.value}
            >
              {note.value}
            </Box>
          );
        })}
      </Flex>
    </Container>
  );
};

export default Chords;
