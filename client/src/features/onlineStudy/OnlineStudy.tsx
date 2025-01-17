// import { Grid } from "@mui/material";
// import { useAppSelector } from "../../app/store/configureStore";
// import CourseCard from "./CourseCard";

//URADITI COURSECARD I COURSELIST (pogledati ProductCard i ProductList)

// export default function OnlineStudy() {
//   const { courses } = useAppSelector((state) => state.course);

//   return (
//     <Grid container spacing={4} sx={{backgroundColor:'text.secondary'}}>
//       {courses?.map((course) => (
//         <Grid item xs={4} key={course.id}>
//            <CourseCard course={course} />
//         </Grid>
//       ))}
//       </Grid>
//   );
// }

import Container from "@mui/material/Container";
import AppAppBar from "./components/AppAppBar";
import MainContent from "./components/MainContent";
import { Grid } from "@mui/material";
import ProfessorList from "./components/ProfessorList";
import { useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
// import Footer from './components/Footer';

export default function OnlineStudy() {
  // useEffect(() => {
  //   if (location.pathname === "/onlineStudy") {
  //     console.log("Resetujem parametre i pribavljam kurseve za OnlineStudy");
  //     dispatch(resetCoursesParams());
  //     dispatch(fetchCoursesAsync());
  //   }
  // }, [dispatch, location.pathname]);


  //

  const { status: courseStatus } = useAppSelector((state) => state.course);
  console.log(courseStatus);
  if (courseStatus.includes("pending"))
    return <LoadingComponent message="Učitavanje kurseva..." />;

  return (
    <>
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
          <AppAppBar />
          <MainContent />
          <ProfessorList />
        </Grid>
      </Grid>
    </>
  );
}
