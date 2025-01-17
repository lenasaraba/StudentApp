import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//import { useTheme } from "@emotion/react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Grid, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface Props {
  programs: string[];
  years: string[];
  onChange: (pr: string[], yr: string[]) => void;
}

export default function FilterSelectChip({ programs, years, onChange }: Props) {
  //const [checked, setChecked] = React.useState([true, false]); // State for checkboxes
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  //const theme = useTheme();
  const [isOpenP, setIsOpenP] = useState(false); // State za prikazivanje liste godina

  const [isOpenY, setIsOpenY] = useState(false); // State za prikazivanje liste godina

  const [alignLeft, setAlignLeft] = useState(false); // Praćenje poravnanja teksta
  const [alignRight, setAlignRight] = useState(false); // Praćenje poravnanja teksta

  const typographyRef = useRef<HTMLDivElement | HTMLSpanElement>(null); // Tipiziranje ref-a
  const [typographyWidth, setTypographyWidth] = useState(0); // Držimo širinu u stanju

  const boxRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const [boxWidth, setBoxWidth] = useState(0); // Držimo širinu u stanju

  const typographyRef2 = useRef<HTMLDivElement | HTMLSpanElement>(null); // Tipiziranje ref-a
  const [typographyWidth2, setTypographyWidth2] = useState(0); // Držimo širinu u stanju

  const boxRef2 = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const [boxWidth2, setBoxWidth2] = useState(0); // Držimo širinu u stanju

  console.log(typographyWidth, typographyWidth2, boxWidth, boxWidth2);
  // console.log("----------------- " + window.innerWidth);
  // console.log("----------------- " + typographyWidth);
  // console.log("----------------- " + boxWidth);

  // Kada se komponenta montira ili kada se promeni širina, ažuriramo širinu
  useEffect(() => {
    if (typographyRef.current) {
      setTypographyWidth(typographyRef.current.offsetWidth); // Dohvatamo širinu
    }

    console.log(typographyWidth, typographyWidth2, boxWidth, boxWidth2);
  }, [alignLeft]); // Re-render kad se alignLeft promeni

  useEffect(() => {
    if (boxRef.current) setBoxWidth(boxRef.current.offsetWidth);
    console.log(typographyWidth, typographyWidth2, boxWidth, boxWidth2);
  }, []);

  useEffect(() => {
    if (typographyRef2.current) {
      setTypographyWidth2(typographyRef2.current.offsetWidth); // Dohvatamo širinu
    }
    console.log(typographyWidth, typographyWidth2, boxWidth, boxWidth2);
  }, [alignRight]); // Re-render kad se alignLeft promeni

  useEffect(() => {
    if (boxRef2.current) setBoxWidth2(boxRef2.current.offsetWidth);
    console.log(typographyWidth, typographyWidth2, boxWidth, boxWidth2);
  }, []);

  const toggleYears = () => {
    setIsOpenY((prev) => !prev); // Prebacivanje između otvoreno/zatvoreno
    setAlignLeft((prev) => !prev); // Menja poravnanje teksta
  };

  const togglePrograms = () => {
    setIsOpenP((prev) => !prev); // Prebacivanje između otvoreno/zatvoreno
    setAlignRight((prev) => !prev);
  };

  const handleProgramChange = (
    event: ChangeEvent<HTMLInputElement>,
    program: string
  ) => {
    const updatedPrograms = event.target.checked
      ? [...selectedPrograms, program]
      : selectedPrograms.filter((p) => p !== program);

    setSelectedPrograms(updatedPrograms);
    onChange(updatedPrograms, selectedYears);
  };

  const handleYearChange = (
    event: ChangeEvent<HTMLInputElement>,
    year: string
  ) => {
    const updatedYears = event.target.checked
      ? [...selectedYears, year]
      : selectedYears.filter((y) => y !== year);

    setSelectedYears(updatedYears);
    onChange(selectedPrograms, updatedYears);
  };

  return (
    <Box
      sx={{
        display: "flex",
        m: 0,
        padding: 0,
        justifyContent: "space-between",
      }}
    >
      {/* Display programs as checkboxes */}
      <Box sx={{ width: "45%" }}>
        <Box
          ref={boxRef2}
          sx={{
            mb: 1,
            width: "100%",
            color: "primary.main",
            position: "relative", // Dodato za pozicioniranje
            "&:hover": {
              cursor: "pointer",
              color: "text.primary",
            },
          }}
          onClick={togglePrograms}
        >
          <Typography
            ref={typographyRef2}
            sx={{
              width: "fit-content",
              fontSize: "clamp(12px, 14px, 16px)",
              fontFamily: "Raleway, sans-serif",
              display: "flex",
              alignItems: "center",
              position: "relative",
              left: alignRight
                ? `${boxWidth2 / 2 + typographyWidth2}px` // Početna pozicija
                : "0", // Pomera se na desni kraj
              textAlign: alignRight ? "right" : "left",
              transition: "left 0.8s ease-in-out", // Glatka tranzicija
            }}
          >
            <FilterAltIcon />
            Smjerovi
          </Typography>
        </Box>

        <Grid
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Maksimalno 2 elementa po redu
            gap: 0.5, // Razmak između elemenata (opcionalno)
          }}
        >
          {isOpenP &&
            programs.map((program) => (
              <Grid
                key={program} // Premesti `key` na spoljašnji `Grid`
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }} // Stil za poravnanje pojedinačnog elementa
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrograms.includes(program)}
                      onChange={(e) => handleProgramChange(e, program)}
                    />
                  }
                  label={program}
                  sx={{ margin: 0 }}
                  slotProps={{
                    typography: {
                      fontFamily: "Raleway, sans-serif",
                      fontSize: "clamp(12px, 14px, 16px)",
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Display years as checkboxes */}
      <Box
        sx={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box
          ref={boxRef}
          sx={{
            mb: 1,
            width: "100%",
            color: "primary.main",
            position: "relative",
            "&:hover": {
              cursor: "pointer",
              color: "text.primary",
            },
          }}
          onClick={toggleYears}
        >
          <Typography
  ref={typographyRef}
  sx={{
    width: "fit-content",
    fontSize: "clamp(12px, 14px, 16px)",
    fontFamily: "Raleway, sans-serif",
    display: "flex",
    alignItems: "center",
    position: "relative",
    textAlign:
      typographyWidth > 0 && boxWidth > 0
        ? alignLeft
          ? "left"
          : "right"
        : "auto", // Neutralna vrednost dok se širine ne izračunaju
    left:
      typographyWidth > 0 && boxWidth > 0
        ? alignLeft
          ? "0" // Pomeranje na početak
          : `${boxWidth - typographyWidth}px` // Pomeranje na kraj box-a
        : "auto", // Neutralna vrednost dok se širine ne izračunaju
    visibility: typographyWidth > 0 && boxWidth > 0 ? "visible" : "hidden", // Sakrij dok se ne izračunaju širine
    transition:
      typographyWidth > 0 && boxWidth > 0
        ? "left 0.8s ease-in-out"
        : "none",
  }}
>
            <FilterAltIcon />
            Godine
          </Typography>
        </Box>

        <Grid
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Maksimalno 2 elementa po redu
            gap: 0.5, // Razmak između elemenata (opcionalno)
          }}
        >
          {isOpenY &&
            years.map((year) => (
              <Grid
                key={year} // Premesti `key` na spoljašnji `Grid`
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }} // Stil za poravnanje pojedinačnog elementa
              >
                <FormControlLabel
                  key={year}
                  control={
                    <Checkbox
                      checked={selectedYears.includes(year)}
                      onChange={(e) => handleYearChange(e, year)}
                    />
                  }
                  label={year}
                  sx={{ margin: 0 }}
                  slotProps={{
                    typography: {
                      fontFamily: "Raleway,sans-serif",
                      fontSize: "clamp(12px, 14px, 16px)",
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
