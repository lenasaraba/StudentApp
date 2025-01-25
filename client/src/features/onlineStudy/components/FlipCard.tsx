import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Course } from "../../../app/models/course";
 
const FlipCardContainer = styled("div")({
  perspective: "1000px", // Dodajemo perspektivu za 3D efekat
  width: "300px",
  height: "400px",
  margin: "20px auto",
  position: "relative",
});
 
const FlipCardInner = styled("div")({
  width: "100%",
  height: "100%",
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 1s", // Animacija tokom okretanja
  "&:hover": {
    transform: "rotateY(180deg)", // Efekat okretanja na hover
  },
});
 
const FlipCardSide = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  backfaceVisibility: "hidden", // Sakrivamo zadnju stranu
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
  fontWeight: "bold",
});
 
const FlipCardFront = styled(FlipCardSide)({
//   backgroundImage: "url('https://source.unsplash.com/random/300x400')", // Zameni URL
backgroundColor:"green",
  backgroundSize: "cover",
  backgroundPosition: "center",
});
 
const FlipCardBack = styled(FlipCardSide)({
  backgroundColor: "#1e88e5", // Plava boja pozadine za zadnju stranu
  transform: "rotateY(180deg)", // Okrećemo zadnju stranu
  padding: "20px",
});
 
interface Props {
  course: Course;
}

export default function FlipCard ({course}:Props) {
  return (
<FlipCardContainer>
<FlipCardInner>
<FlipCardFront>
<Typography variant="h4">{course.name}</Typography>
</FlipCardFront>
<FlipCardBack>
<Typography variant="body1">
            Ovo je tekst sa zadnje strane kartice. Ovde možeš dodati dodatne informacije ili opis.
            {course.description}
</Typography>
</FlipCardBack>
</FlipCardInner>
</FlipCardContainer>
  );
};
 
