import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../app/store/configureStore";
import { ProfessorsCourse } from "../../../app/models/course";
import { format } from "date-fns";
import CourseCardMedia from "./CourseCardMedia";

const DateCard = ({ date }: { date: string }) => {
  const dateFormatted = new Date(date); // Pretvori string u Date objekat
  const formattedDate = format(dateFormatted, "dd.MM.yyyy"); // Formatiraj datum

  return <div>{formattedDate}</div>;
};

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

interface AuthorProps {
  authors: ProfessorsCourse[];
}

function Author({ authors }: AuthorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
      }}
    >
      <AvatarGroup max={3}>
        {authors.map((author, index) => (
          <Avatar
            key={index}
            alt={author.user.firstName}
            // src={author.avatar}
            sx={{ width: 24, height: 24, backgroundColor: "text.primary" }}
          >
            {author.user.firstName.charAt(0).toUpperCase()}
          </Avatar>
        ))}
      </AvatarGroup>
      <Typography variant="caption">
        {authors
          .map((author) => author.user.firstName + " " + author.user.lastName)
          .join(", ")}
      </Typography>
    </Box>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const courses = useAppSelector((state) => state.course.courses);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, margin: 0 }}>
      <div>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontFamily: "Raleway, sans-serif", paddingTop: 4 }}
        >
          Online učenje
        </Typography>
        <Typography sx={{ fontFamily: "Raleway, sans-serif" }}>
          Pronađite kurs koji vam odgovara
        </Typography>
      </div>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? "Mui-focused" : ""}
          >
            <CourseCardMedia
              year={courses![0].year}
              studyProgram={courses![0].studyProgram}
              sx={{
                aspectRatio: "16 / 9",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {courses![0].studyProgram.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {courses![0].name}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {courses![0].description}
              </StyledTypography>
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Author authors={courses![0].professorsCourse} />
              <Typography variant="caption">
                <DateCard date={courses![0].courseCreationDate.split("T")[0]} />
              </Typography>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? "Mui-focused" : ""}
          >
            <CourseCardMedia
              year={courses![1].year}
              studyProgram={courses![1].studyProgram}
              sx={{
                aspectRatio: "16 / 9",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {courses![1].studyProgram.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {courses![1].name}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {courses![1].description}
              </StyledTypography>
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Author authors={courses![1].professorsCourse} />
              <Typography variant="caption">
                <DateCard date={courses![1].courseCreationDate.split("T")[0]} />
              </Typography>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CourseCardMedia
              year={courses![2].year}
              studyProgram={courses![2].studyProgram}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {courses![2].studyProgram.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {courses![2].name}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {courses![2].description}
              </StyledTypography>
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Author authors={courses![2].professorsCourse} />
              <Typography variant="caption">
                <DateCard date={courses![2].courseCreationDate.split("T")[0]} />
              </Typography>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CourseCardMedia
              year={courses![3].year}
              studyProgram={courses![3].studyProgram}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {courses![3].studyProgram.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {courses![3].name}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {courses![3].description}
              </StyledTypography>
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Author authors={courses![3].professorsCourse} />
              <Typography variant="caption">
                <DateCard date={courses![3].courseCreationDate.split("T")[0]} />
              </Typography>
            </Box>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? "Mui-focused" : ""}
            sx={{ height: "100%" }}
          >
            <CourseCardMedia
              year={courses![4].year}
              studyProgram={courses![4].studyProgram}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {courses![4].studyProgram.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {courses![4].name}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {courses![4].description}
              </StyledTypography>
            </SyledCardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Author authors={courses![4].professorsCourse} />
              <Typography variant="caption">
                <DateCard date={courses![4].courseCreationDate.split("T")[0]} />
              </Typography>
            </Box>
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
