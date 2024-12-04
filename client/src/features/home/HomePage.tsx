import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import logo from "../../assets/etf.png";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import LoginIcon from "@mui/icons-material/Login";

export default function HomePage() {
  return (
    <>
      <Grid
        container
        sx={{
          flexGrow: 1,
          padding: 2,
          backgroundImage: `url(${logo})`,
          backgroundSize: "contain",
          backgroundPosition: "right",
          height: "100vh",
          width: "100%",
          filter: "blur(8px)",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></Grid>
      <Grid
        container
        sx={{
          flexGrow: 1,
          padding: 2,
        }}
      >
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={24}
            sx={{
              borderRadius: "8px",
              backgroundColor: "secondary.main",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                height: "100%",
                padding: 4,
              }}
            >
              <Typography
                variant="caption"
                gutterBottom
                sx={{
                  display: "block",
                  width: "100%",
                  fontFamily: "Raleway, sans-serif",
                  fontSize: 18,
                  lineHeight: "18px",
                  textAlign: "left",
                }}
              >
                Elektrotehnički fakultet
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: 18,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Istočno Sarajevo
              </Typography>
              <br />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  textAlign: "left",
                  width: "100%",
                  fontWeight: 700,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Student App
              </Typography>
              <br />
              <Box sx={{ width: "100%", maxWidth: 700 }}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontFamily: "Raleway, sans-serif" }}
                >
                  <SchoolIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: 1,
                      marginBottom: 0.5,
                    }}
                  />
                  Dobrodošli u digitalni prostor kreiran za vas, gdje učenje i
                  razmjena ideja postaju jednostavniji i dostupniji nego ikada!
                </Typography>

                <Divider sx={{ color: "text.primary" }}>
                  <Typography
                    variant="overline"
                    gutterBottom
                    sx={{ display: "block", fontFamily: "Raleway, sans-serif" }}
                  >
                    Šta vam nudimo?
                  </Typography>
                </Divider>
                <Typography sx={{ fontFamily: "Raleway, sans-serif" }}>
                  <MenuBookRoundedIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: 1,
                      marginBottom: 0.5,
                    }}
                  />
                  Online učenje – Pristupite predavanjima, materijalima i
                  zadacima bilo kada i bilo gdje.
                  <br />
                  <ForumTwoToneIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: 1,
                      marginBottom: 0.5,
                    }}
                  />
                  Studentski forum – Povežite se sa kolegama, razmjenjujte
                  ideje, postavljajte pitanja i učite zajedno.
                </Typography>
              </Box>
              <Box>
                <Button sx={{backgroundColor:'action.hover', padding:1.5, paddingLeft:3, paddingRight:3, borderRadius:4, color:'#EEF7FF'}}>
                  Prijavi se
                  &nbsp;
                  <LoginIcon
                    sx={{
                      verticalAlign: "middle",
                      marginRight: 1,
                      marginBottom: 0.5,
                    }}
                  />
                </Button>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
