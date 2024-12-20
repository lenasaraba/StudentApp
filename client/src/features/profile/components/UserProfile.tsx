import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { updateUser } from "../../account/accountSlice";

const UserProfile = () => {
  const user = useAppSelector((state) => state.account.user);

  // State za mod uređivanja i korisničke podatke
  const [isEditing, setIsEditing] = useState(false);

  const [initialData, setInitialData] = useState({
    firstName: user!.firstName,
    lastName: user!.lastName,
  });
  const [formData, setFormData] = useState({
    firstName: user!.firstName,
    lastName: user!.lastName,
  });
  const isChanged = JSON.stringify(formData) !== JSON.stringify(initialData);
  // Handler za promene u input poljima
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Updated data:", formData);

    // Ažuriraj početne podatke sa novim podacima
    setInitialData(formData);
    setIsEditing(false); // Isključi mod uređivanja nakon submita

    // Sprečavamo podrazumevano ponašanje forme
    e.preventDefault();

    // Koristimo formData za slanje ažuriranih podataka
    await dispatch(updateUser(formData));
  };
  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    isChanged;
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "text.primary",
              mb: 2,
            }}
          >
            {initialData.firstName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {initialData.firstName} {initialData.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{user!.username}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {isEditing ? (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Ime"
                  name="firstName"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                  required // Dodajemo da polje bude obavezno
                  error={!formData.firstName} // Obeležava grešku ako polje nije popunjeno
                  helperText={!formData.firstName ? "Ime je obavezno" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Prezime"
                  name="lastName"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                  required // Dodajemo da polje bude obavezno
                  error={!formData.lastName} // Obeležava grešku ako polje nije popunjeno
                  helperText={!formData.lastName ? "Prezime je obavezno" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Korisničko ime"
                  name="username"
                  fullWidth
                  value={user!.username}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={user!.email}
                  disabled
                />
              </Grid>
              <Box sx={{ textAlign: "center", margin: 2, width: "100%" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "text.primary",
                    color: "background.default",
                    mr: 1,
                  }}
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                >
                  Sačuvaj izmjene
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "text.primary" }}
                  onClick={() => {
                    setFormData(initialData); // Vraćanje na početne podatke
                    setIsEditing(false);
                  }}
                >
                  Odustani
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Ime:
                </Typography>
                <Typography variant="body1">{formData.firstName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Prezime:
                </Typography>
                <Typography variant="body1">{user!.lastName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Korisničko ime:
                </Typography>
                <Typography variant="body1">{user!.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Email:
                </Typography>
                <Typography variant="body1">{user!.email}</Typography>
              </Grid>
              <Box sx={{ textAlign: "center", margin: 2, width: "100%" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "text.primary",
                    color: "background.default",
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Uredi profil
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
