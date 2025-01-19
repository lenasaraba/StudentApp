import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Course } from "../../app/models/course";
import CourseCardMedia from "./components/CourseCardMedia";
import { Link } from "react-router-dom";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  // console.log("Course card:" + course.name);
  return (
    <Card
      sx={{
        // width: "100%" /* Postavlja karticu da zauzme 100% širine roditelja */,
        boxSizing: "border-box",
        borderRadius: "20pt",
        backgroundColor: "secondary.main",
        border: "2px solid",
        borderColor: "background.paper",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {course.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={course.name}
        titleTypographyProps={{
          sx: {
            fontWeight: "bold",
            color: "primary.main",
            fontFamily: "Raleway,sans-serif",
            fontSize: "clamp(12px, 14px, 16px)",
            overflow: "hidden", // Sakriva sadržaj koji prelazi kontejner
            display: "-webkit-box", // Neophodno za multi-line truncation
            WebkitBoxOrient: "vertical", // Omogućava višelinijski prikaz
            WebkitLineClamp: 1, // Maksimalan broj linija (menjajte po potrebi)
            lineHeight: "1.2", // Podešava razmak između linija

            height: "1.2em", // Fiksna visina: broj linija * lineHeight
            textOverflow: "ellipsis", // Dodaje tri tačke
          },
        }}
      />
      <CourseCardMedia
        year={course.year}
        studyProgram={course.studyProgram}
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        //  image={course.pictureURL}
        //title={course.name}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontFamily: "Raleway,sans-serif",
            fontSize: "clamp(12px, 14px, 16px)",
            overflow: "hidden", // Sakriva sadržaj koji prelazi kontejner
            display: "-webkit-box", // Neophodno za multi-line truncation
            WebkitBoxOrient: "vertical", // Omogućava višelinijski prikaz
            WebkitLineClamp: 1, // Maksimalan broj linija (menjajte po potrebi)
            lineHeight: "1.3", // Podešava razmak između linija
            height: "1.3em", // Fiksna visina: broj linija * lineHeight
            textOverflow: "ellipsis", // Dodaje tri tačke
          }}
        >
          {course.studyProgram.name} - {course.year.name}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <LoadingButton
            loading={status == "pendingAddItem" + product.id}
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: product.id }))
            }
            size="small"
          >
            Add to cart
          </LoadingButton> */}
        <Button sx={{ fontFamily: "Raleway, sans-serif" }}>Upiši se</Button>
        <Button
          component={Link}
          to={`/courses/${course.id}`}
          size="small"
          sx={{ fontFamily: "Raleway, sans-serif" }}
        >
          Otvori
        </Button>
      </CardActions>
    </Card>
    // </Box>
  );
}
