import { Box, AvatarGroup, Avatar, Typography } from "@mui/material";
import { ProfessorsCourse } from "../../../app/models/course";

interface AuthorProps {
    authors: ProfessorsCourse[];
  }
  
  export function Author({ authors }: AuthorProps) {
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