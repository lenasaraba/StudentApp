import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import NotFound from "../../app/errors/NotFound";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createMessage, fetchMessagesAsync } from "./messageSlice";
import { useState } from "react";
import { fetchThemesAsync } from "./themeSlice";
import { Author } from "../onlineStudy/components/Author";

export default function Theme() {
  const { id } = useParams<{ id: string }>();
  const themes = useAppSelector((state) => state.theme.themes);
  const { user } = useAppSelector((state) => state.account);
  const messages = useAppSelector((state) => state.message.messages);
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useAppDispatch();

  if (id == undefined) return <NotFound />;

  const theme = themes!.find((i) => i.id === parseInt(id));

  if (theme == undefined) return <NotFound />;

  return (
    <Grid
      container
      sx={{
        display: "flex",
        direction: "column",
        padding: 4,
        margin: 0,
        // overflowX: "hidden",
      }}
    >
      <Grid
        container
        sx={{
          direction: "row",
          // pt: 2,
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
                  // src={author.avatar}
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
                <Typography variant="h5" fontWeight="bold">
                  {theme.title}
                </Typography>
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
                    <Author  authors={theme.course.professorsCourse}/>
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

        <Grid
          item
          xs={12}
          sx={{
            boxSizing: "border-box",
            border: "1px solid",
            borderColor: "primary.main",
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
              justifyContent: "center",
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
                  backgroundColor: "primary.dark", // Boja hvataljke na hover
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
                                {message.user.firstName} {message.user.lastName}
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
                  Započnite razgovor.
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
                placeholder="Unesite poruku..."
                variant="outlined"
                size="small"
                sx={{ marginRight: 2 }}
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={messageContent==""}
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
  );
}

//{message.user.firstName}
