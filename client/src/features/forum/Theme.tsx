import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import NotFound from "../../app/errors/NotFound";
import { Avatar, Box, Stack, Typography } from "@mui/material";

export default function Theme() {
  const { id } = useParams<{ id: string }>();
  const themes = useAppSelector((state) => state.theme.themes);
  const {user}=useAppSelector((state)=>state.account);

  // console.log("------------------ID-----------------: "+id);
  // console.log("------------------THEMES-----------------: "+themes);

  if (id == undefined) return <NotFound />;

  const theme = themes!.find((i) => i.id === parseInt(id));
  // console.log(theme?.user);

  if(theme==undefined) return <NotFound />
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{theme.title}</h1>
      <p>
        <strong>Autor:</strong> {theme.user.firstName} (ID: {theme.user.id})
      </p>
      <p>
        <strong>Datum:</strong> {new Date(theme.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Opis:</strong> {theme.description}
      </p>

      <h2>Poruke</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {theme.messages && theme.messages.length > 0 ? (
          theme.messages.map((message) => (
            <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 2,
            backgroundColor: message.user.email == user?.email ? 'common.background' : 'common.onBackground',
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ marginRight: 2, backgroundColor:'common.backgroundChannel'}} />
          <Box>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1" fontWeight={(message.user.email==user?.email) ? 'bold' : 'normal'} sx={{color:'common.white'}}>
                 {message.user.firstName} {" "} {message.user.lastName} {(message.user.email==theme.user.email) && <span style={{ color: 'primary.main' }}>&#9733; <Typography variant="button" fontSize={10}>autor</Typography></span>}
              </Typography>
            </Stack>
            <Typography variant="body2" color="common.black">
              {message.content}
            </Typography>
          </Box>
        </Box>
          ))
        ) : (
          <p>Nema poruka za ovu temu.</p>
        )}
      </ul>
    </div>
  );
}


//{message.user.firstName}