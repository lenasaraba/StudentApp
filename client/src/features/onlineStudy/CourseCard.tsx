import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Course } from "../../app/models/course";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  console.log("Course card:" + course.name);
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {course.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={course.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          //  image={course.pictureURL}
          title={course.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            jedno/drugo
          </Typography>
        </CardContent>
        <CardActions>
          {/* <LoadingButton
            loading={status == "pendingAddItem" + product.id}
            onClick={() =>
              dispatch(addBasketItemAsync({ productId: product.id }))
            }
            size="small"
          >
            Add to cart
          </LoadingButton> */}
          <Button>Dugmic</Button>
          <Button
          //   component={Link}
          //   to={`/catalog/${product.id}`} size="small"
          >
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
