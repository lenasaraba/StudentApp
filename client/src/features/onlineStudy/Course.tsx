import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import NotFound from "../../app/errors/NotFound";
import { useEffect, useRef, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ForumIcon from "@mui/icons-material/Forum";
import {
  Avatar,
  Card,
  CardContent,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CourseCardMedia from "./components/CourseCardMedia";
import { Author } from "./components/Author";

// function generate(element: React.ReactElement<unknown>) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     })
//   );
// }
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Course() {
  const [openWeeks, setOpenWeeks] = useState<boolean[]>(Array(10).fill(false));
  // const [dense, setDense] = useState(false);
  // const [secondary, setSecondary] = useState(false);

  const toggleWeek = (index: number) => {
    setOpenWeeks((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const { id } = useParams<{ id: string }>();
  const allCourses = useAppSelector((state) => state.course.courses);

  const topOfPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topOfPageRef.current) {
      // Skroluje na prvi element u referenci
      topOfPageRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
    //console.log("Ovdjee");
  }, [id]); // Pozivaće se kad se promeni ID kursa
  if (id == undefined) return <NotFound />;

  const course = allCourses!.find((i) => i.id === parseInt(id));

  if (course == undefined) return <NotFound />;

  // console.log({...course});
  return (
    <>
      <div ref={topOfPageRef}></div>
      <Container style={{ marginTop: "2rem" }}>
        {/* Naslov i opisi */}
        <Card
          sx={{
            boxShadow: (theme) => `0px 4px 10px ${theme.palette.text.primary}`,
            //   backgroundColor: "background.paper",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {course.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ID: {course.id} | {course.year.name} | {course.studyProgram.name}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
              {course.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "1rem" }}
            >
              Kreirano:{" "}
              {new Date(course.courseCreationDate).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "1rem" }}
            >
              Profesori
            </Typography>
            <Author authors={course!.professorsCourse} />
          </CardContent>
          <CourseCardMedia
            year={course.year}
            studyProgram={course.studyProgram}
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
          />
        </Card>

        {/* Izlistavanje sedmica */}
        <Typography variant="h5" style={{ margin: "2rem 0 1rem 0" }}>
          Sedmice i materijali
        </Typography>
        <List>
          {[...Array(10)].map((_, index) => (
            <div key={index}>
              <ListItem
                component="div"
                onClick={() => toggleWeek(index)}
                style={{ cursor: "pointer" }}
              >
                <ListItemText primary={`Sedmica ${index + 1}`} />
                <IconButton>
                  {openWeeks[index] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>
              <Collapse in={openWeeks[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem>
                    <ListItemText
                      primary={`Materijal za sedmicu ${index + 1}`}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </div>
          ))}
        </List>
        <Divider sx={{ mb: 2 }} />
        {/* Izlistavanje tema kursa */}
        <Grid container sx={{ mb: 2, pb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="overline" style={{ margin: "2rem 0 1rem 0" }}>
              Aktuelne teme za ovaj kurs na studentskom forumu
            </Typography>
            <Demo sx={{ borderRadius: 2 }}>
              <List>
                {course.themes && course.themes.length > 0 ? (
                  course.themes.map((theme, index) => (
                    <ListItem
                      key={index}
                      component={Link}
                      to={`/forum/${theme.id}`}
                      secondaryAction={
                        <IconButton edge="end" aria-label="open">
                          <OpenInNewIcon />
                        </IconButton>
                      }
                      
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "primary.main" }}>
                          <ForumIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText sx={{
                        
                          textDecoration: 'none',  // Uklanja podvlačenje linka
                          color: 'text.primary',        // Koristi boju teksta iz roditeljskog elementa
                          '&:visited': {
                            color: 'text.primary',      // Zadrži istu boju za visited linkove
                          },
                          '&:hover': {
                            color: 'primary.main',      // Zadrži istu boju pri hover-u
                          },
                          '&:active': {
                            color: 'text.primary',      // Zadrži istu boju pri aktivnom linku
                          },
                        
                      }}>{theme.title}</ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Nema tema za ovaj kurs.
                  </Typography>
                )}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={6} />
        </Grid>
      </Container>
    </>
  );
}
