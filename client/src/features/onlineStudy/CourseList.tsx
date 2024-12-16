import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CourseCard from "./CourseCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCoursesAsync, fetchUserCoursesAsync } from "./courseSlice";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// interface Props {
//     courses: Course[];
// }

export function Search() {
  return (
    <FormControl
      sx={{ width: { xs: "100%", md: "25ch" } }}
      variant="outlined"
    >
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
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

  const allCourses = useAppSelector((state) => state.course.courses);
  const myCourses = useAppSelector((state) => state.course.myCourses);

  useEffect(() => {
    if (courseType === "all") {
      dispatch(fetchCoursesAsync());
    } else if (courseType === "my") {
      dispatch(fetchUserCoursesAsync());
    }
  }, [courseType, dispatch]);

  const coursesToDisplay = courseType === "my" ? myCourses : allCourses;

  const handleClick = () => {
    console.info("You clicked the filter chip.");
  };

  return (
    <Grid container sx={{ display: "flex", direction: "column" }}>
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
          ml:4, mr:4,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Company"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Product"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Design"
            sx={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Engineering"
            sx={{
              backgroundColor: "transparent",
              border: "none",
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
      <Grid container spacing={4}>
        {coursesToDisplay!.map((course) => (
          <Grid item xs={4} key={course.id}>
            {/* {!productsLoaded ? (
                        <ProductCardSkeleton />
                    ): (
                        <ProductCard product={product}/>
                    )} */}
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
