import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ForumIcon from "@mui/icons-material/Forum";
import { Link, useNavigate } from "react-router-dom";
// import { resetCoursesParams, fetchCoursesAsync } from "../courseSlice";
import { useAppDispatch } from "../../../app/store/configureStore";

//STAVITI FIKSNI HEIGHT ZBOG APPAPPBARA

export default function ForumAppBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNavigate = () => {
    // dispatch(resetCoursesParams());
    // dispatch(fetchCoursesAsync());
    navigate("/forum", { replace: true });
  };

  //DODATI I JEDAN TAB KAO TEME U KOJIMA JE UCESTVOVAO A NIJE IH KREIRAO
  return (
    <AppBar
      //ne radi sticky
      position="sticky"
      enableColorOnDark
      sx={{
        top: 30,
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
        textAlign: "center",
        padding: 0,
        minHeight: 0,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          sx={{
            borderRadius: "22px",
            // backdropFilter: "blur(36px)",
            backgroundColor: "secondary.main",
            border: "1px solid ",
            borderColor: "text.secondary",
            padding: "0",
            width: "60%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              px: 0,
              justifyContent: "space-evenly",
              margin: 0,
              minHeight: 0,
            }}
          >
            <Box
              // onClick={handleNavigate}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer", // Dodano da miš postane pointer
                "&:hover": {
                  cursor: "pointer", // Osigurano i za hover stanje
                },
              }}
              component={Link}
              to="/forum"
            >
              <ForumIcon
                sx={{
                  color: "text.secondary",
                  fontWeight: "bold",
                  margin: 0,
                  padding: 0,
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                margin: 0,
                padding: 0,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ color: "text.primary", fontWeight: "bold" }}
                component={Link}
                to="/themes?type=all"
              >
                Sve teme
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                margin: 0,
                padding: 0,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ color: "text.primary", fontWeight: "bold" }}
                component={Link}
                to="/themes?type=my"
              >
                Moje teme
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
