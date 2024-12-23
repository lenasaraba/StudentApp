import {
  Box,
  debounce,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CourseCard from "./CourseCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  fetchCoursesAsync,
  fetchUserCoursesAsync,
  fetchFilters,
  setCoursesParams,
  setPageNumber,
} from "./courseSlice";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LoadingComponent from "../../app/layout/LoadingComponent";
import FiltersButtons from "./components/FiltersButtons";
import AppPagination from "../../app/components/AppPagination";
import AppAppBar from "./components/AppAppBar";
import CourseCardSkeleton from "./components/CourseCardSkeleton";

export default function CourseList() {
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get("type");
  const dispatch = useAppDispatch();

  const {
    coursesLoaded,
    filtersLoaded,
    years,
    programs,
    coursesParams,
    metaData,
    
  } = useAppSelector((state) => state.course);

  const [searchTerm, setSearchTerm] = useState(coursesParams.searchTerm);

  const debouncedSearch = useMemo(
    () =>
      debounce((event: any) => {
        dispatch(setCoursesParams({ searchTerm: event.target.value }));
        dispatch(fetchCoursesAsync());
      }, 1000),
    [dispatch] // Zavisi samo od dispatch-a
  );

  const allCourses = useAppSelector((state) => state.course.courses);
  // const myCourses = useAppSelector((state) => state.course.courses);
  useEffect(() => {
    if (courseType === "all") {
      dispatch(setCoursesParams({ type: courseType }));
      dispatch(fetchCoursesAsync());
    } else if (courseType === "my") {
      dispatch(setCoursesParams({ type: courseType }));
      dispatch(fetchCoursesAsync());
    }
  }, [courseType, dispatch]);
  const user = useAppSelector((state) => state.account.user);
  const navigate = useNavigate();

  // const coursesToDisplay = courseType === "my" ? myCourses : allCourses;
  const coursesToDisplay = allCourses;
  useEffect(() => {
    if (courseType === "my" && !user) {
      navigate("/login"); // Zameni "/login" pravim URL-om za vašu login stranicu
    }
  }, [user, courseType, navigate]);

  // const uniquePrograms = [
  //   ...new Set(coursesToDisplay!.map((course) => course.studyProgram.name)),
  // ];

  // const uniqueYears = [
  //   ...new Set(coursesToDisplay!.map((course) => course.year.name)),
  // ];

  // const handleClick = (name: string, index: number) => {
  //   console.log(`You clickes on: ${name}, index: ${index}`);
  // };

  useEffect(() => {
    if (!coursesLoaded) dispatch(fetchCoursesAsync());
  }, [coursesLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  if (!filtersLoaded)
    return <LoadingComponent message="Učitavanje kurseva..." />;

  // if (loading) {
  //   return <LoadingComponent message="Učitavanje kurseva..." />;
  // }
  return (
    <Grid container sx={{ display: "flex", direction: "column", margin: 0 }}>
      <AppAppBar />

      {courseType === "my" ? (
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Raleway, sans-serif",
            paddingTop: 4,
            color: "text.primary",
            ml: 4,
          }}
        >
          Moje učenje
        </Typography>
      ) : (
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Raleway, sans-serif",
            paddingTop: 4,
            color: "text.primary",
            ml: 4,
          }}
        >
          Svi kursevi
        </Typography>
      )}
      {/* {(courseType == "my" && myCourses && myCourses.length > 0) ||
      (courseType == "all" &&
        coursesToDisplay &&
        coursesToDisplay.length > 0) ? (
        <> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
          ml: 4,
          mr: 4,
        }}
      >
        <Box display="flex" flexDirection="column" sx={{ mt: 6 }}>
          {/* <Box
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              gap: 3,
              overflow: "auto",
            }}
          >
            {uniquePrograms.map((name, index) => (
              <Chip
                key={index}
                onClick={() => handleClick(name, index)}
                size="medium"
                label={name}
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              />
            ))}
          </Box> */}

          <FiltersButtons
            items={years}
            checked={coursesParams.years}
            onChange={(items: string[]) => {
              dispatch(setCoursesParams({ years: items }));
              //dispatch(fetchCoursesAsync());
            }}
          />
          <FiltersButtons
            items={programs}
            checked={coursesParams.studyPrograms}
            onChange={(items: string[]) => {
              dispatch(setCoursesParams({ studyPrograms: items }));
              //dispatch(fetchCoursesAsync());
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <FormControl
            sx={{ width: { xs: "100%", md: "25ch", padding: 10 } }}
            variant="outlined"
          >
            {/* <OutlinedInput
              size="small"
              id="search"
              placeholder="Pretraži.."
              sx={{ flexGrow: 1 }}
              startAdornment={
                <InputAdornment position="start" sx={{ color: "text.primary" }}>
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "search",
              }}
            /> */}
            <TextField
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SearchRoundedIcon fontSize="small" />
                  {"  Pretraži"}
                </Box>
              }
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 50, // Visina TextField-a
                  "& input": {
                    padding: "8px 12px", // Unutrašnji padding za tekst
                  },
                },
                "& .MuiInputLabel-root": {
                  lineHeight: 1.3, // Podešavanje linije labela
                },
              }}
              value={searchTerm || ""}
              onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
              }}
            />
          </FormControl>
        </Box>
      </Box>
      {(courseType == "my" &&
        coursesToDisplay &&
        coursesToDisplay.length > 0) ||
      (courseType == "all" &&
        coursesToDisplay &&
        coursesToDisplay.length > 0) ? (
        <>
          <Grid
            container
            spacing={4}
            columns={12}
            sx={{ margin: 4, paddingBottom: 4 }}
          >
            {coursesToDisplay!.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                {!coursesLoaded ? (
                  <CourseCardSkeleton />
                ) : (
                  <CourseCard course={course} />
                )}
              </Grid>
            ))}
          </Grid>

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
          {/* //   <Typography
        //     variant="h2"
        //     sx={{
        //       fontFamily: "Raleway, sans-serif",
        //       paddingTop: 0,
        //       color: "text.primary",
        //       ml: 4,
        //       mt: 0,
        //     }}
        //   >
        //     Moje učenje
        //   </Typography> */}
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
        </Box>
      )}
    </Grid>
  );
}
