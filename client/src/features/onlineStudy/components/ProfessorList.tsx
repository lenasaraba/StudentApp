import { Box, Avatar, Divider, Typography, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchProfessorCoursesAsync } from "../courseSlice";
import { useEffect } from "react";
import SlideDots from "./SlideDots";
import SlideCard from "./SlideCard";
import { OpenInNewRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProfessorList() {
  const dispatch = useAppDispatch();
  const professors = useAppSelector((state) => state.professor.professors);

  useEffect(() => {
    professors!.forEach((professor) => {
      dispatch(fetchProfessorCoursesAsync(professor.id));
    });
  }, [dispatch, professors]);

  const professorCourses = useAppSelector(
    (state) => state.course.professorCourses
  );

  // console.log({...professorCourses})
  // const themeM=useTheme();
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate("/professorsList", { state: { themeM } }); // Prosleđivanje state-a
  // };

  return (
    <>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mb: 4,
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontFamily: "Raleway, sans-serif", paddingTop: 4 }}
          >
            Profesori
          </Typography>
          <Chip
            size="small"
            icon={<OpenInNewRounded />}
            component={Link}
            to="/professors"
            sx={{
              backgroundColor: "primary.dark",
              color: "#fff", // Tekst u beloj boji
              borderRadius: "16px", // Primer prilagođenog oblika
              ".MuiChip-icon": {
                color: "#fff",
              },
              cursor:"pointer",
              marginTop: 4,
              fontFamily: "Raleway, sans-serif",
              marginBottom: 2, // GutterBottom ekvivalent
              textDecoration: "none", // Uklanja podvlačenje
              "&:hover": {
                backgroundColor: "primary.main", // Boja pri hover-u
              },
              padding:2,
            }}
            label="Svi profesori"
          />
        </Grid>
        <Grid container spacing={6} columns={12} sx={{}}>
          {professors!.slice(0, 4).map((teacher, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 6 }}
              sx={{
                border: "1px solid",
                padding: 2,
                borderRadius: "20px",
                borderColor: "text.primary",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: (theme) =>
                    `0px 4px 20px ${theme.palette.text.primary}`,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  direction: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  key={index}
                  alt={teacher.firstName}
                  sx={{
                    width: 41,
                    height: 41,
                    backgroundColor: "text.primary",
                  }}
                >
                  {teacher.firstName.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Typography variant="h5" fontFamily="Raleway, sans-serif">
                    {teacher.firstName}&nbsp;{teacher.lastName}
                  </Typography>
                </div>
              </Box>
              <Divider component="div" sx={{ my: 2 }} />

              {professorCourses && professorCourses[teacher.id] != undefined ? (
                <SlideCard courses={professorCourses[teacher.id]} />
              ) : (
                <Typography>Nema kurseva</Typography> // ili neki drugi indikator
              )}

              <Divider component="div" sx={{ my: 2 }} />

              {professorCourses && professorCourses[teacher.id] ? (
                <SlideDots
                  programs={[
                    ...new Set(
                      professorCourses[teacher.id]?.map((course) => {
                        return course.studyProgram.name;
                      })
                    ),
                  ]}
                />
              ) : (
                <Typography fontFamily="Raleway, sans-serif">
                  Nema smjerova
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
