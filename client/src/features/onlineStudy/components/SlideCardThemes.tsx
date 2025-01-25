import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Course } from "../../../app/models/course";
import { Box, CardMedia, Divider, Grid } from "@mui/material";
import CourseCardMedia from "./CourseCardMedia";
import { Link } from "react-router-dom";
import { Theme } from "../../../app/models/course";

interface SlideCardProps {
  course: Course;
  themes: Theme[]; // Lista studijskih programa
}

export default function SlideCardThemes({ course, themes }: SlideCardProps) {
  const designTheme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (themes[activeStep] != null)
    return (
      <div style={{ margin: "0", padding: 0 }}>
        <Grid
          sx={{
            gridTemplateColumns: "1fr 2fr",
            display: "grid",
            gap: 2,
            width: "100%",
            mb: 3,
          }}
        >
          <CourseCardMedia
            year={course.year}
            studyProgram={course.studyProgram}
            sx={{
              height: "100px", 
              borderRadius: "25pt",
              objectFit: "cover",
            }}
          />
          <Grid
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: 0.5, 
            }}
          >
            <Typography
              component={Link}
              to={`/forum/${themes[activeStep].id}`}
              sx={{
                width: "fit-content",
                overflow: "hidden",
                textOverflow: "ellipsis", 
                fontSize: "clamp(0.8rem, 1.8vw, 1.2rem)", 
                fontFamily: "Raleway, sans-serif",
                textDecoration: "none",
                color: "text.primary",
                //multiline
                display: "-webkit-box", 
                WebkitBoxOrient: "vertical", 
                WebkitLineClamp: 1, 
                lineHeight: "1", 
                height: "1em", 
              }}
            >
              {themes[activeStep].title}
            </Typography>

            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "clamp(0.6rem,1.5vw, 1rem)",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              {themes[activeStep].description}
            </Typography>

            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "clamp(0.5rem, 1vw, 1rem)",
                fontFamily: "Raleway, sans-serif",
                color: "primary.main",
              }}
            >
              {/* {courses[activeStep].studyProgram.name} &nbsp; | &nbsp;{" "}
            //   {courses[activeStep].year.name} */} ...............PROMIJENITI OVO
            </Typography>
          </Grid>
        </Grid>

        {/* <Typography 
        variant="h6" 
        align="center" 
        gutterBottom
      >
        {courses[activeStep].name}
      </Typography> */}

        <MobileStepper
          variant="text"
          steps={themes.length}
          position="static"
          activeStep={activeStep}
          sx={{
            flexGrow: 1,
            padding: 0,
            "& .MuiMobileStepper-dot": {
              backgroundColor: "background.paper",
            },
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "common.black", 
            },
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === themes.length - 1}
              sx={{ color: "common.black" }}
            >
              Sljedeća
              {designTheme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: "common.black" }}
            >
              {designTheme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Prethodna
            </Button>
          }
        />
      </div>
    );
  else
    return (
      <Typography fontFamily="Raleway, sans-serif" textAlign="center">
        Ne postoje teme na forumu za ovaj kurs.
      </Typography>
    );
}
