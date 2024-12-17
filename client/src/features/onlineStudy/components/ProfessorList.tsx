import {
  Box,
  Avatar,
  Divider,
  Button,
  Typography,
  CssBaseline,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchProfessorCoursesAsync } from "../courseSlice";
import { useEffect } from "react";
import CourseCardMedia from "./CourseCardMedia";

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

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontFamily: "Raleway, sans-serif", paddingTop: 4 }}
        >
          Profesori
        </Typography>
        <Grid container spacing={6} columns={12} sx={{ mr: 4, ml: 4 }}>
          {professors!.map((teacher, index) => (
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
                  // src={author.avatar}
                  sx={{
                    width: 41,
                    height: 41,
                    backgroundColor: "text.primary",
                  }}
                >
                  {teacher.firstName.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Typography variant="h5">
                    {teacher.firstName}&nbsp;{teacher.lastName}
                  </Typography>
                  <Typography></Typography>
                </div>
              </Box>
              <Divider component="div" sx={{ my: 2 }} />
              <Box sx={{ gap: 2 }}>
                {professorCourses![teacher.id]
                  ?.slice(0, 3) // Uzimamo najviše prva tri kursa
                  .map((course, idx) => (
                    <Box key={idx} sx={{ mt: 1 }}>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          direction: "row",
                        }}
                      >
                        <CourseCardMedia
                          year={course.year}
                          studyProgram={course.studyProgram}
                          sx={{
                            display: "inline",
                            width: 33, // Širina avatara (možeš promeniti prema potrebama)
                            height: 33, // Visina avatara
                            borderRadius: "50%", // Za kružni oblik
                            objectFit: "cover", // Za prilagođavanje slike unutar kružnog oblika
                          }}
                        />
                        &nbsp;&nbsp;
                        {course.name}
                      </Typography>
                    </Box>
                  ))}
              </Box>
              <Button sx={{ px: 1, mt: 1 }}>Više...</Button>
              <Divider component="div" sx={{ my: 2 }} />
              <Typography>Kategorije kurseva:</Typography>
              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  gap: 1,
                }}
              >
                {[
                  ...new Set(
                    professorCourses![teacher.id]?.map((course) => {
                      return course.studyProgram.name;
                    })
                  ),
                ].map((program, idx) => (
                  <Typography
                    sx={{
                      border: "1px solid ",
                      borderColor: "text.primary",
                      pl: 1.5,
                      pr: 1.5,
                      py: 1,
                      borderRadius: "20px",
                      fontSize: "12pt",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    key={idx}
                  >
                    {program}
                  </Typography>
                ))}
                {/* {professorCourses![teacher.id]?.map((course, idx) => (
                  <Box key={idx} sx={{ mt: 1 }}>
                    <Typography> {course.studyProgram.name}</Typography>
                  </Box>
                ))} */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
