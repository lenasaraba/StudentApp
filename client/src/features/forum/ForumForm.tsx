import { LoadingButton } from "@mui/lab";
import {
  Modal,
  Grid,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

export default function ForumForm({ open, handleClose, methods }) {
  const { control, formState, handleSubmit, setValue, clearErrors, trigger } =
    methods; // Koristite methods iz roditeljskog komponenta
  const [loading, setLoading] = useState(false);
  const [isFreeTopic, setIsFreeTopic] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    console.log(methods.getValues); // Pristup podacima iz forme
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          height: "100%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            padding: 6,
            backgroundColor: "background.default",
            borderRadius: "20px",
            border: "2px solid",
            borderColor: "primary.main",
          }}
        >
          {/* Naziv */}
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Naziv"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || ""}
                />
              )}
            />
          </Grid>
          {/* Opis */}
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Opis"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFreeTopic}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setIsFreeTopic(isChecked);
                    console.log(
                      "----------------A----------A--------------A------------"
                    );
                    console.log(methods.formState);
                    if (isChecked) {
                      setValue("courseId", "");
                      clearErrors("courseId");
                    } else {
                      setValue("courseId", "", { shouldValidate: true });
                      trigger();
                    }
                  }}
                  color="primary"
                />
              }
              label="Slobodna tema"
            />
          </Grid>
          {/* Kurs */}
          <Grid item xs={12}>
            <FormControl fullWidth disabled={isFreeTopic}>
              {" "}
              <InputLabel id="courseId-label">Kurs</InputLabel>
              <Controller
                name="courseId"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Select
                      {...field}
                      labelId="courseId-label"
                      label="Kurs"
                      value={field.value || ""}
                      error={!!fieldState.error}
                      onChange={(e) => {
                        setValue("courseId", e.target.value || "", {
                          shouldValidate: true,
                        });
                        if (fieldState.error) {
                          clearErrors("courseId");
                        }
                        trigger();
                      }}
                    >
                      <MenuItem value="">Nema kursa</MenuItem>
                      <MenuItem value={1}>Kurs 1</MenuItem>
                      <MenuItem value={2}>Kurs 2</MenuItem>
                      <MenuItem value={3}>Kurs 3</MenuItem>
                      {/* Dodaj ovde ostale kurseve prema potrebi */}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText sx={{color:'red'}}>
                        {fieldState.error?.message || "Greška u izboru kursa"}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>

          {/* Dugme za submit */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              loading={loading}
              disabled={!methods.formState.isValid}
              type="submit"
              variant="contained"
              color="primary"
            >
              Pošaljite
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
