import { useAppSelector } from "../../app/store/configureStore";
import CourseCard from "./CourseCard";

//URADITI COURSECARD I COURSELIST (pogledati ProductCard i ProductList)

export default function OnlineStudy() {
  const { courses } = useAppSelector((state) => state.course);

  console.log("Courses in state:", courses);
  return (
    <>
      {courses?.map((course) => {
        return <CourseCard course={course} />;
      })}
    </>
  );
}
