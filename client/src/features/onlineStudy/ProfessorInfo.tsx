import {
  Avatar,
  Box,
  Breadcrumbs,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useRef, useEffect } from "react";
import FlipCard from "./components/FlipCard";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { fetchProfessorYearsProgramsAsync } from "./professorSlice";
import CourseCardSkeleton from "./components/CourseCardSkeleton";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProfessorInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Osigurava da je `id` uvek string
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

  if (!coursesLoaded) return <LoadingComponent message="Učitavanje..." />;

  return (
    <>
      <div ref={topOfPageRef}></div>

      <Grid
        container
        sx={{
          display: "flex",
          direction: "column",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
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
          <Grid item xs={12} sx={{ padding: 2 }}>
            <CardContent
              sx={{
                border: "1px solid",
                borderRadius: "16px",
                borderColor: "divider",
                display: "flex",
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

          <Divider sx={{ marginBottom: 4 }} />
          <Typography variant="h3">Kursevi</Typography>
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
