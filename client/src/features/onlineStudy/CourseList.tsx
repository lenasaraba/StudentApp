import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CourseCard from "./CourseCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
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

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
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
      />
    </FormControl>
  );
}
export default function CourseList() {
  //const {productsLoaded}=useAppSelector(state=>state.catalog)
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get("type"); // Dobijanje parametra "type"
  //const [courses, setCourses] = useState([]);
  const dispatch = useAppDispatch();
  const {
    coursesLoaded,
    filtersLoaded,
    years,
    programs,
    coursesParams,
    metaData,
  } = useAppSelector((state) => state.course);

  const allCourses = useAppSelector((state) => state.course.courses);
  const myCourses = useAppSelector((state) => state.course.myCourses);
  // console.log("COURSE LIST +++++++++++++++++++++++++++++++" + years);
  // console.log("COURSE LIST +++++++++++++++++++++++++++++++" + programs);
  useEffect(() => {
    if (courseType === "all") {
      dispatch(fetchCoursesAsync());
    } else if (courseType === "my") {
      dispatch(fetchUserCoursesAsync());
    }
  }, [courseType, dispatch]);

  const coursesToDisplay = courseType === "my" ? myCourses : allCourses;

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

  if (!filtersLoaded) return <LoadingComponent message="Loading courses..." />;

  return (
    <Grid container sx={{ display: "flex", direction: "column" }}>
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
              dispatch(fetchCoursesAsync());
            }}
          />
          <FiltersButtons
            items={programs}
            checked={coursesParams.studyPrograms}
            onChange={(items: string[]) => {
              dispatch(setCoursesParams({ studyPrograms: items }));
              dispatch(fetchCoursesAsync());

              //DODAJEM
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
          <Search />
        </Box>
      </Box>
      <Grid
        container
        spacing={4}
        columns={12}
        sx={{ margin: 4, paddingBottom: 4 }}
      >
        {coursesToDisplay!.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
            {/* {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ): (
                        <ProductCard product={product}/>
                    )} */}
            <CourseCard course={course} />
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
    </Grid>
  );
}
