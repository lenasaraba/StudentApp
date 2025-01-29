import {
  Avatar,
  Box,
  Breadcrumbs,
  CardContent,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useRef, useEffect } from "react";
import FlipCard from "./components/FlipCard";
import SchoolIcon from "@mui/icons-material/School";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ForumIcon from "@mui/icons-material/Forum";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  fetchProfessorsAsync,
  fetchProfessorThemesAsync,
  fetchProfessorYearsProgramsAsync,
} from "./professorSlice";
import CourseCardSkeleton from "./components/CourseCardSkeleton";
import LoadingComponent from "../../app/layout/LoadingComponent";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: "2px solid",
  borderColor: theme.palette.background.paper,
}));

export default function ProfessorInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Osigurava da je `id` uvek string

  useEffect(() => {
    dispatch(fetchProfessorsAsync());
  }, [dispatch]);

  const professor = useAppSelector((state) => {
    if (!id) return undefined; // Ako je `id` undefined, vrati `undefined`
    return state.professor.professors.find((p) => p.id === parseInt(id));
  });

  const coursesLoaded = useAppSelector(
    (state) => state.professor.coursesLoaded
  );
  const allProfessors = useAppSelector((state) => state.professor.professors);

  useEffect(() => {
    allProfessors.forEach((professor) => {
      dispatch(
        fetchProfessorYearsProgramsAsync({
          id: professor.id,
          totalCount: allProfessors.length,
        })
      );
    });
  }, [dispatch, allProfessors]);

  const topOfPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  }, [id]);

  const coursesToDisplay = useAppSelector((state) =>
    state.professor.professorCourses
      ? state.professor.professorCourses[parseInt(id!)]
      : []
  );

  const years = useAppSelector((state) =>
    state.professor.profYears ? state.professor.profYears[parseInt(id!)] : []
  );
  const programs = useAppSelector((state) =>
    state.professor.profPrograms
      ? state.professor.profPrograms[parseInt(id!)]
      : []
  );

  const professorThemes = useAppSelector(
    (state) => state.professor.professorThemes
  );

  useEffect(() => {
    allProfessors.forEach((professor) => {
      dispatch(fetchProfessorThemesAsync(professor.id));
    });
  }, [dispatch, allProfessors]);

  if (!coursesLoaded) return <LoadingComponent message="Učitavanje..." />;

  return (
    <>
      <div ref={topOfPageRef}></div>

      <Grid
        container
        sx={{
          display: "block",
          direction: "column",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            paddingX: 10,
            paddingY: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              //size="small"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="small" />}
              sx={{ pl: 0 }}
            >
              <Box
                component={Link}
                to="/onlineStudy"
                sx={{ display: "flex", alignItems: "center" }}
                // onClick={() => dispatch(resetCoursesParams())}
                onClick={() => navigate(-1)}
              >
                <SchoolIcon
                  sx={{
                    color: "text.primary",
                    // fontWeight: "bold",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      color: "primary.dark", // Promijeni boju na hover
                    },
                  }}
                />
              </Box>

              {/* </Link> */}
              <Typography
                component={Typography}
                color="neutral"
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.dark", // Promijeni boju na hover
                  },
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                Profil profesora
                {/* {courseType === "my" ? "Moji kursevi" : "Svi kursevi"} */}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Grid container sx={{ padding: 0 }}>
            <Grid item xs={6} sx={{ padding: 1, paddingY: 2 }}>
              <CardContent
                sx={{
                  border: "1px solid",
                  borderRadius: "16px",
                  borderColor: "divider",
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  padding: 3,
                  backgroundColor: "background.paper",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Blaga senka za elegantan izgled
                }}
              >
                {/* Avatar */}
                <Avatar
                  alt={`${professor?.firstName} ${professor?.lastName}`}
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: "primary.main",
                    color: "white",
                    fontSize: "24pt",
                    marginRight: 3,
                  }}
                >
                  {professor?.firstName.charAt(0).toUpperCase()}
                  {professor?.lastName.charAt(0).toUpperCase()}
                </Avatar>

                {/* Informacije o profesoru */}
                <Box sx={{ flex: 1 }}>
                  {/* Ime i titula zajedno */}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "text.primary",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {professor?.firstName} {professor?.lastName}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        fontWeight: "normal",
                        marginLeft: 1,
                      }}
                    >
                      Profesor
                    </Typography>
                  </Typography>
                  {/* Email ispod */}
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ marginTop: 0.5 }}
                  >
                    {professor?.email}
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
            <Grid item xs={6} sx={{ padding: 1, paddingY: 2 }}>
              <CardContent
                sx={{
                  border: "1px solid",
                  borderRadius: "16px",
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: 3,
                  backgroundColor: "background.paper",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Blaga senka za elegantan izgled
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "clamp(10pt, 12pt, 13pt)" }}
                  >
                    Godine
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "clamp(8pt, 10pt, 11pt)",
                    }}
                  >
                    {years?.map((year) => year.name).join(", ") || "Nema"}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    marginY: 1,
                    width: "100%",
                    borderColor: "primary.main",
                    border: "1px solid",
                    color: "primary.main",
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "clamp(10pt, 12pt, 13pt)" }}
                  >
                    Smjerovi
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: "clamp(8pt, 10pt, 11pt)",
                    }}
                  >
                    {programs?.map((program) => program.name).join(", ") ||
                      "Nema"}
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h3">Teme profesora</Typography>

          <Demo sx={{ borderRadius: 2, height: "15rem", marginY: 2 }}>
            <List
              sx={{
                overflowY: "auto",
                height: "15rem",
                backgroundColor: "secondary.main",
              }}
            >
              {professorThemes &&
              professorThemes[professor!.id] &&
              professorThemes[professor!.id].length > 0 ? (
                professorThemes[professor!.id].map((theme, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "background.paper",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "primary.main" }}>
                        <ForumIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={theme.title}
                      sx={{
                        textDecoration: "none", // Uklanja podvlačenje linka
                        color: "text.primary", // Koristi boju teksta iz roditeljskog elementa
                        "&:visited": {
                          color: "text.primary", // Zadrži istu boju za visited linkove
                        },
                        "&:hover": {
                          cursor: "normal",
                          color: "text.primary", // Zadrži istu boju za visited linkove
                        },
                        "&:active": {
                          color: "text.primary", // Zadrži istu boju pri aktivnom linku
                        },
                      }}
                    />
                    <IconButton
                      edge="end"
                      aria-label="open"
                      component={Link}
                      to={`/forum/${theme.id}`}
                      sx={{
                        color: "text.primary",
                        "&:hover":{
                          color:"primary.main"
                        }
                      }}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "1rem", paddingX: 2, paddingY: 1 }}
                >
                  Nema tema ovog profesora.
                </Typography>
              )}
            </List>
          </Demo>
          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h3">Kursevi profesora</Typography>
          {coursesToDisplay && coursesToDisplay.length > 0 ? (
            <>
              {!coursesLoaded ? (
                <Grid
                  container
                  spacing={0} // Uklanjamo automatski razmak između elemenata
                  justifyContent="flex-start" // Elementi idu redom, bez centriranja ili raspodele
                  columns={12}
                  sx={{
                    width: "100%",
                    gap: "2.5%",
                    mt: 4,
                    rowGap: 4,
                  }}
                >
                  {coursesToDisplay!.map((course) => (
                    <Grid item xs={12} sm={5.8} md={3.8} key={course.id}>
                      <CourseCardSkeleton />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={0} // Uklanjamo automatski razmak između elemenata
                  justifyContent="flex-start" // Elementi idu redom, bez centriranja ili raspodele
                  columns={12}
                  sx={{
                    width: "100%",
                    gap: "2.5%",
                    mt: 4,
                    rowGap: 4,
                  }}
                >
                  {coursesToDisplay!.map((course) => (
                    <Grid
                      item
                      xs={12} // Na najmanjim ekranima zauzima celu širinu
                      sm={5.8} // Na manjim ekranima dve kartice u redu
                      md={3.8} // Na srednjim ekranima tri kartice u redu sa prostorom između njih
                      key={course.id}
                    >
                      <FlipCard course={course} />
                    </Grid>
                  ))}
                </Grid>
              )}
              {/* <Box sx={{ mb: 2, mt: 2 }}>
                {metaData && (
                  <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) =>
                      dispatch(setPageNumber({ pageNumber: page }))
                    }
                  />
                )}
              </Box> */}
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", mt: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  paddingTop: 4,
                  color: "text.primary",
                  ml: 4,
                }}
              >
                Nije pronađen nijedan kurs.
              </Typography>
              {/* <Typography
              variant="body1"
              sx={{
                fontFamily: "Raleway, sans-serif",
                paddingTop: 4,
                color: "text.primary",
                ml: 4,
              }}
            >
              Vrati se na{" "}
              <Box
                component={Link}
                to="/onlineStudy"
                sx={{ margin: 0, padding: 0 }}
              >
                početnu stranicu.
              </Box>
              .
            </Typography> */}
            </Box>
          )}

          {/* LISTA KURSEVA PROFESORA */}
          {/* <FlipCard  cour/> */}
        </Grid>
      </Grid>
    </>
  );
}
