import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import SelectLimit from "./components/SelectLimit";
import {
  NUMBERS,
  defaultStringColor,
  guitarGameSteps,
  notes,
  primaryNoteColor,
  tuning,
  typeOfChord,
} from "../../constants/guitar";
import Chords from "./components/Chords";

const listOfNotes = [...notes, ...notes, ...notes];

const GuitarFrets = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteLimit, setNoteLimit] = useState(15);

  const [buttonText, setButtonText] = useState(guitarGameSteps.start);
  const [generatedNote, setGeneratedNote] = useState("");
  const isGameStarted = buttonText === guitarGameSteps.stop;

  const [chordMainNote, setChordMainNote] = useState("");
  const [chordType, setChordType] = useState(() => typeOfChord.major);
  const [chordNotes, setChordNotes] = useState([]);

  const startGame = () => {
    setSelectedNote(null);

    if (buttonText === guitarGameSteps.start) {
      generateRandomNote();
      setButtonText(guitarGameSteps.stop);
    } else if (buttonText === guitarGameSteps.stop) {
      setButtonText(guitarGameSteps.start);
      setGeneratedNote("");
    }
  };

  const generateRandomNote = (min = 0, max = 11) => {
    const floatRandom = Math.random();

    const difference = max - min;
    const random = Math.round(difference * floatRandom);

    const indexOfNote = random + min;

    setGeneratedNote(notes[indexOfNote].value);
  };

  const selectNote = (note) => {
    if (selectNote) {
      console.log("here the logic when game runs");
    }

    if (!isGameStarted) {
      if (selectedNote && selectedNote === note.value) {
        return setSelectedNote(null);
      }

      setSelectedNote(note.value);
    }
  };

  const calculateStylesForNotes = (note) => {
    let style = {};

    if (isGameStarted) {
      return (style = { color: defaultStringColor });
    }

    // If note is picked
    const isNoteSelected = selectedNote && selectedNote !== note.value;
    if (isNoteSelected) {
      return (style = { opacity: 0.1 });
    }

    // If note is picked and its sharp (A#, C#, ...)
    if (note.value.includes("#") && selectedNote === note.value) {
      return (style = { opacity: 1, color: primaryNoteColor });
    }

    // If chord is selected
    if (chordMainNote) {
      if (chordNotes.includes(note.value)) {
        return (style = { opacity: 1, color: primaryNoteColor });
      } else {
        return (style = { opacity: 0.1, color: defaultStringColor });
      }
    }

    // Default color of notes
    return (style = { opacity: 1 });
  };

  return (
    <Box>
      <Flex mb={3} justifyContent="center" alignItems="center" gap={5}>
        <SelectLimit setNoteLimit={setNoteLimit} noteLimit={noteLimit} />
        <Button onClick={startGame}>{buttonText}</Button>
        <Box>{generatedNote}</Box>
      </Flex>

      <Flex justifyContent="center">
        <Box className="guitar-notes">
          {tuning.map((baseNote) => {
            const startIndex = listOfNotes.findIndex(
              (note) => note.value === baseNote.value
            );

            return (
              <Box className="guitar-base-note" key={baseNote.order}>
                {listOfNotes.map((note, noteIndex) => {
                  // Additional line for number of frets
                  if (baseNote.value === NUMBERS && noteIndex <= noteLimit)
                    return (
                      <Box
                        className="guitar-note"
                        mt={5}
                        color={defaultStringColor}
                        key={noteIndex}
                      >
                        {noteIndex}
                      </Box>
                    );

                  // Dont render notes if it is close to limit
                  if (
                    noteIndex < startIndex ||
                    noteIndex - startIndex > noteLimit
                  )
                    return;

                  // Notes
                  return (
                    <Box
                      className="guitar-note"
                      color={isGameStarted ? defaultStringColor : note.color}
                      key={note.value + baseNote.order + noteIndex}
                      onClick={() => selectNote(note)}
                      style={calculateStylesForNotes(note)}
                    >
                      {isGameStarted ? "-" : note.value}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Flex>

      <Chords
        chordMainNote={chordMainNote}
        setChordMainNote={setChordMainNote}
        chordType={chordType}
        setChordType={setChordType}
        chordNotes={chordNotes}
        setChordNotes={setChordNotes}
      />
    </Box>
  );
};

export default GuitarFrets;
