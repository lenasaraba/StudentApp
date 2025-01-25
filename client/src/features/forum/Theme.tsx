import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import NotFound from "../../app/errors/NotFound";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Chip,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createMessage, fetchMessagesAsync } from "./messageSlice";
import { useEffect, useRef, useState } from "react";
import { fetchThemesAsync, updateThemeStatus } from "./themeSlice";
import { Author } from "../onlineStudy/components/Author";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BlockIcon from "@mui/icons-material/Block";
import React from "react";

export default function Theme() {
  const { id } = useParams<{ id: string }>(); // Osigurava da je `id` uvek string
  // const themes = useAppSelector((state) => state.theme.themes);
  const { user } = useAppSelector((state) => state.account);
  const messages = useAppSelector((state) => state.message.messages);
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useAppDispatch();

  // const theme = themes!.find((i) => i.id === parseInt(id!));
  const theme = useAppSelector((state) => {
    if (!id) return undefined; // Ako je `id` undefined, vrati `undefined`
    return state.theme.themes.find((t) => t.id === parseInt(id));
  });
  // const [activeStatus, setActiveStatus] = useState(
  //   theme?.active == "true" ? true : false
  // );

  //IZVUCI PODATAK O TOME DA LI JE TRRENUTNO PRIJAVLJENI KORISNIK KREATOR TEME
  //DA LI MOZE DA VIDI DUGME TRI TACKE ILI NE

  const topOfPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  }, [id]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const idMenu = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Postavlja element na koji je kliknuto
    console.log(anchorEl);
  };

  const updateStatus = async (event: React.MouseEvent<HTMLElement>) => {
    // console.log(theme?.active +" "+!theme?.active);

    const updateData = {
      id: theme!.id!,
      active: !theme!.active,
    };
    // setActiveStatus(!theme?.active);

    console.log(updateData);
    await dispatch(updateThemeStatus(updateData));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null); // Zatvara Popover
  };

  if (theme == undefined) return <NotFound />;

  if (id == undefined) return <NotFound />;
  return (
    <>
      <div ref={topOfPageRef}></div>

      <Grid
        container
        sx={{
          display: "flex",
          direction: "column",
          padding: 4,
          margin: 0,
        }}
      >
        <Grid
          container
          sx={{
            direction: "row",
            display: "flex",
            margin: 0,
            justifyContent: "space-around",
            boxSizing: "border-box",
          }}
        >
          <Grid item xs={6} sx={{ padding: 1 }}>
            <CardContent
              sx={{
                border: "1px solid",
                borderRadius: "20px",
                borderColor: "primary.main",
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: 0,
                pt: 3,
                px: 2,
              }}
            >
              <Grid container sx={{ padding: 0 }}>
                <Grid item sx={{ padding: 0 }}>
                  <Avatar
                    alt={theme.title}
                    sx={{
                      width: 56,
                      height: 56,
                      backgroundColor: "text.primary",
                      mr: 2,
                      padding: 0,
                    }}
                  >
                    <Box sx={{ fontSize: "25pt" }}>
                      {theme.title.charAt(0).toUpperCase()}
                    </Box>
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Grid
                    gap={2}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold">
                      {theme.title}
                    </Typography>
                    <Chip
                      // variant="soft"
                      size="small"
                      icon={
                        {
                          true: <CheckRoundedIcon />,
                          false: <BlockIcon />,
                        }[theme.active]
                      }
                      sx={{
                        backgroundColor: theme.active
                          ? "text.primaryChannel"
                          : "text.secondaryChannel", // Prilagođene boje
                        color: "#fff", // Tekst u beloj boji
                        borderRadius: "16px", // Primer prilagođenog oblika
                        ".MuiChip-icon": {
                          color: "#fff",
                        },
                      }}
                      label={theme.active ? "Aktivno" : "Zatvoreno"}
                    />
                    <div>
                      <Box
                        aria-describedby={idMenu}
                        // variant="contained"
                        onClick={handleClick}
                        sx={{
                          display: "flex",
                          width: "fit-content",
                          padding: 0,
                        }}
                      >
                        <MoreVertIcon />
                      </Box>
                      <Popover
                        id={idMenu}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        slotProps={{
                          paper: {
                            sx: {
                              borderRadius: 0,
                            },
                          },
                        }}
                      >
                        <Typography
                          onClick={updateStatus}
                          variant="body2"
                          sx={{
                            paddingX: 1,
                            paddingY: 0.5,
                            "&:hover": {
                              cursor: "pointer",
                            },
                            fontFamily: "Raleway, sans-serif",
                            color: "primary.light",
                            backgroundColor: "text.primary",
                          }}
                        >
                          {theme.active ? "Zaključaj" : "Otključaj"}
                        </Typography>
                      </Popover>
                    </div>
                  </Grid>
                  <Typography variant="body2" color="text.secondary">
                    {theme.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`Objavljeno: ${new Date(theme.date).toLocaleDateString("sr-RS")}`}{" "}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    Autor:{" "}
                    <b>
                      {theme.user.firstName} {theme.user.lastName}
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>

          {theme.course && <Divider sx={{ marginY: 2 }} />}
          <Grid item xs={6} sx={{ padding: 1 }}>
            {theme.course ? (
              <CardContent
                sx={{
                  border: "1px solid",
                  borderRadius: "20px",
                  borderColor: "primary.main",
                  height: "100%",
                  padding: 0,
                  pt: 3,
                  px: 2,
                }}
              >
                <Typography
                  variant="button"
                  sx={{ fontSize: "8pt", fontWeight: "bold" }}
                >
                  Kurs
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {theme.course.name}{" "}
                  <Box
                    component="span"
                    sx={{
                      mx: 1,
                      my: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "18pt",
                      color: "action.disabled",
                    }}
                  >
                    {" "}
                    |{" "}
                  </Box>
                  {theme.course.year.name}{" "}
                  <Box
                    component="span"
                    sx={{
                      mx: 1,
                      my: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "18pt",
                      color: "action.disabled",
                    }}
                  >
                    |{" "}
                  </Box>{" "}
                  {theme.course.studyProgram.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 1 }}
                >
                  {theme.course.description}
                </Typography>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Profesori:
                  </Typography>
                  <Box
                    key="index"
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    {/* <Avatar
                      key={index}
                      alt={professor.user.firstName}
                      // src={author.avatar}
                      sx={{
                        width: 23,
                        height: 23,
                        backgroundColor: "text.primary",
                        mr: 1,
                      }}
                    >
                      {professor.user.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography>
                      {professor.user.firstName}&nbsp;
                      {professor.user.lastName}
                    </Typography> */}
                    <Author authors={theme.course.professorsCourse} />
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() =>
                    (window.location.href = `/courses/${theme.course.id}`)
                  }
                >
                  Idi na kurs
                </Button>
              </CardContent>
            ) : (
              <CardContent
                sx={{
                  border: "1px solid",
                  borderRadius: "20px",
                  borderColor: "primary.main",
                  height: "100%",
                  padding: 0,
                  pt: 3,
                  px: 2,
                }}
              >
                <Typography
                  variant="button"
                  sx={{ fontSize: "10pt", fontWeight: "bold" }}
                >
                  Kategorija
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ mt: 2, fontSize: "16pt" }}>
                  Slobodna tema
                </Typography>{" "}
              </CardContent>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            direction: "column",
            display: "flex",
            margin: 0,
            justifyContent: "space-around",
            boxSizing: "border-box",
            padding: 1,
            mt: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: "block",
              fontFamily: "Raleway, sans-serif",
              width: "100%",
            }}
          >
            Poruke
          </Typography>
          <Typography
            variant="body2"
            sx={{
              paddingY: 1,
              color: "action.disabled",
              display: "block",
              fontFamily: "Raleway, sans-serif",
              width: "100%",
            }}
          >
            {theme.active ? "" : "Zatvorena tema"}
          </Typography>

          <Grid
            item
            xs={12}
            sx={{
              boxSizing: "border-box",
              border: "1px solid",
              borderColor: theme.active ? "primary.main" : "action.disabled",
              borderRadius: "20px",
              position: "relative",
              margin: 0,

              padding: 0,
              mb: 2,
            }}
          >
            <Box
              sx={{
                // margin: "0 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "auto",
                height: "80vh",
                width: "100%",
                margin: 0,
                padding: 1,

                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "primary.main", // Boja skrola
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "primary.dark", // Boja hvataljke na hover
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent", // Prozirna pozadina skrola
                },
              }}
            >
              <Box
                sx={{
                  // listStyleType: "none",
                  //padding: 5, // Širi prozor za poruke
                  padding: 0,
                  px: 2,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "primary.main", // Boja skrola
                    borderRadius: "8px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "primary.light", // Boja hvataljke na hover
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent", // Prozirna pozadina skrola
                  },
                }}
              >
                {messages?.filter((message) => message.themeId === theme.id) &&
                messages?.filter((message) => message.themeId === theme.id)
                  .length > 0 ? (
                  messages
                    .filter((message) => message.themeId === theme.id) // Filtriraj poruke po temi
                    .map((message, index) => (
                      <Box
                        key={index} // Dodaj ključ da izbegneš React grešku
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            message.user.email === user?.email
                              ? "flex-end"
                              : "flex-start", // Poravnanje poruka
                          marginBottom: 2,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor:
                              message.user.email === user?.email
                                ? "common.background"
                                : "common.onBackground",
                            padding: 2,
                            borderRadius: 2,
                            maxWidth: "70%", // Ograniči širinu poruke
                          }}
                        >
                          <Stack direction="row" alignItems="center">
                            {/* {message.user.email !== user?.email && ( // Avatar samo za druge korisnike */}
                            <Avatar
                              sx={{
                                marginRight: 2,
                                backgroundColor: "common.backgroundChannel",
                              }}
                            />
                            {/* )} */}
                            <Box sx={{ width: "100vw" }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight={
                                  message.user.email === user?.email
                                    ? "bold"
                                    : "normal"
                                }
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  color: "common.white",
                                }}
                              >
                                <span>
                                  {message.user.firstName}{" "}
                                  {message.user.lastName}
                                  {theme.user.email === message.user.email && (
                                    <span
                                      style={{
                                        color: "primary.main",
                                        marginLeft: "8px",
                                      }}
                                    >
                                      &#9733;{" "}
                                      <Typography
                                        variant="button"
                                        fontSize={10}
                                        component="span"
                                      >
                                        autor
                                      </Typography>
                                    </span>
                                  )}
                                </span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "common.black",
                                  }}
                                >
                                  {new Date(
                                    message.creationDate
                                  ).toLocaleTimeString("sr-RS", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  })}{" "}
                                  {new Date(
                                    message.creationDate
                                  ).toLocaleDateString("sr-RS", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })}
                                </span>
                              </Typography>
                              <Typography
                                variant="body2"
                                color="common.black"
                                sx={{ textAlign: "left" }}
                              >
                                {message.content}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                    ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      textAlign: "center",
                      fontSize: "12pt",
                      fontFamily: "Raleway, sans-serif",
                    }}
                  >
                    {theme.active ? "Započnite razgovor." : "Zatvorena tema"}
                  </Typography>
                )}
              </Box>
            </Box>
            {user && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "auto", // Gura input na dno
                  padding: 2,
                  // position: "sticky", // Dodajte ovo za "zalijepljeni" efekat
                  bottom: 0, // Zalijepite dno
                  width: "100%",
                  backgroundColor: "background.paper",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                <TextField
                  fullWidth
                  disabled={!theme.active}
                  placeholder={
                    theme.active
                      ? "Unesite poruku..."
                      : "Nije moguće slati poruke na zatvorenoj temi"
                  }
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 2 }}
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!theme.active || messageContent == ""}
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    const localDate = new Date();
                    const offset = localDate.getTimezoneOffset();

                    const adjustedDate = new Date(
                      localDate.getTime() - offset * 60000
                    );

                    const newMessage = {
                      content: messageContent,
                      themeId: theme.id,
                      creationDate: adjustedDate.toISOString(),
                      user: user!,
                    };
                    dispatch(createMessage(newMessage)).then(() => {
                      dispatch(fetchMessagesAsync());
                      dispatch(fetchThemesAsync());
                    });
                    setMessageContent(""); // Resetuj polje za unos
                  }}
                >
                  Pošalji
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

//{message.user.firstName}
