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
// import Footer from './components/Footer';

export default function OnlineStudy() {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          direction: "column",
          position: "relative",
          // minHeight: "100vh",
          // overflow: "auto",
          // overflowAnchor:'none'
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppAppBar />
        <Container
          // maxWidth="lg"
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 16,
            gap: 4,
            margin: 0,
          }}
        >
          <MainContent />
          {/* <Latest /> */}
          <ProfessorList />
        </Container>
        {/* <Footer /> */}
      </Grid>
    </>
  );
}
