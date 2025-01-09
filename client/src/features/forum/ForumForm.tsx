import { yupResolver } from "@hookform/resolvers/yup";
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
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { validationSchema } from "./forumpageValidation";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import Theme from "./Theme";
import { createThemeAsync } from "./themeSlice";
import { useNavigate } from "react-router-dom";

interface ForumFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ForumForm({ open, setOpen }: ForumFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const courses = useAppSelector((state) => state.course.courses);

  const [isFreeTopic, setIsFreeTopic] = useState(false);
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema(isFreeTopic)),
  });

  const { control, setValue, clearErrors, trigger, register } = methods; // Koristite methods iz roditeljskog komponenta
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const localDate = new Date();
    const offset = localDate.getTimezoneOffset();

    const adjustedDate = new Date(localDate.getTime() - offset * 60000);
    const newTheme = {
      title: data.title,
      description: data.description,
      date: adjustedDate.toISOString(),
      courseId: data.courseId,
    };
    console.log(newTheme);
    const resultAction = await dispatch(createThemeAsync(newTheme));

    if (createThemeAsync.fulfilled.match(resultAction)) {
      // Preusmeravanje nakon uspešnog kreiranja teme
      //console.log(resultAction.payload);
      navigate(`/forum/${resultAction.payload.id}`);
    } else {
      console.error("Failed to create theme:", resultAction.payload);
    }
  };

  useEffect(() => {
    // Kada se promeni isFreeTopic, restartujemo validaciju
    trigger();
  }, [isFreeTopic, trigger]);

  useEffect(() => {
    if (open) {
      methods.reset();
    }
  }, [open, methods]);

  const handleClose = () => {
    setOpen(false);
    setIsFreeTopic(false);
    // methods.reset();
  };
  // console.log(isFreeTopic);
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
                  {...register("title", {
                    required: "Title is required.",
                  })}
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
              defaultValue=""
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
                  {...register("description", {
                    required: "description is required.",
                  })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              // defaultValue={isFreeTopic}
              name="freeTopic"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      name="freeTopic"
                      checked={isFreeTopic}
                      value={isFreeTopic}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setIsFreeTopic(isChecked);
                        // console.log(
                        //   "----------------A----------A--------------A------------"
                        // );
                        // console.log(methods.formState);
                        if (isChecked) {
                          setValue("courseId", "0");
                          clearErrors("courseId");
                        } else {
                          setValue("courseId", "0", { shouldValidate: true });
                          trigger();
                        }
                        setValue("freeTopic", isChecked);
                      }}
                      color="primary"
                    />
                  }
                  label="Slobodna tema"
                />
              )}
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
                      value={field.value || "0"}
                      error={!!fieldState.error}
                      onChange={(e) => {
                        setValue("courseId", e.target.value || "0", {
                          shouldValidate: true,
                        });
                        if (fieldState.error) {
                          clearErrors("courseId");
                        }
                        trigger();
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                            overflowY: "auto",
                          },
                        },
                      }}
                    >
                      <MenuItem value={0}>Nema kursa</MenuItem>
                      {courses?.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText sx={{ color: "error.main" }}>
                        {fieldState.error?.message || "Greška u izboru kursa"}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>

          {/* Dugme za submit */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button onClick={handleClose}>Odustani</Button>
            <LoadingButton
              loading={loading}
              disabled={!methods.formState.isValid}
              type="submit"
              variant="contained"
              color="primary"
            >
              Pošalji
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
