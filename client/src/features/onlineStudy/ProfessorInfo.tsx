import {
  Avatar,
  Box,
  Breadcrumbs,
  CardContent,
  Chip,
  Divider,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import { useRef, useEffect } from "react";
import FlipCard from "./components/FlipCard";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function ProfessorInfo() {
  const { id } = useParams<{ id: string }>(); // Osigurava da je `id` uvek string
  const professor = useAppSelector((state) => {
    if (!id) return undefined; // Ako je `id` undefined, vrati `undefined`
    return state.professor.professors.find((p) => p.id === parseInt(id));
  });
  const topOfPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  }, [id]);
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
                {/* {courseType === "my" ? "Moji kursevi" : "Svi kursevi"} */}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Grid item xs={12} sx={{ padding: 1 }}>
            <CardContent
              sx={{
                border: "1px solid",
                borderRadius: "20px",
                borderColor: "primary.main",
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: 0,
                pt: 3,
                px: 2,
              }}
            >
              <Avatar
                alt={professor?.firstName}
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "text.primary",
                  mr: 2,
                  padding: 0,
                }}
              >
                <Box sx={{ fontSize: "25pt" }}>
                  {professor?.firstName.charAt(0).toUpperCase()}
                </Box>
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {professor?.firstName} {professor?.lastName}
              </Typography>
            </CardContent>
          </Grid>
          <Divider sx={{ marginBottom: 4 }} />
          {coursesToDisplay.length > 0 ? (
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
              <Box sx={{ mb: 2, mt: 2 }}>
                {metaData && (
                  <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) =>
                      dispatch(setPageNumber({ pageNumber: page }))
                    }
                  />
                )}
              </Box>
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
          <FlipCard />
        </Grid>
      </Grid>
    </>
  );
}
