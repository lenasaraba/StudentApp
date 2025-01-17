import { yupResolver } from "@hookform/resolvers/yup";
import {
  Modal,
  Sheet,
  Grid,
  Input,
  Checkbox,
  FormControl,
  FormHelperText,
  Select,
  Option,
  Typography,
  Button,
  useTheme,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { validationSchema } from "./forumpageValidation";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { createThemeAsync } from "./themeSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Theme } from "@mui/material";

interface ForumFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  theme: Theme;
}

export default function ForumForm({ open, setOpen, theme }: ForumFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const courses = useAppSelector((state) => state.course.courses);

  const [isFreeTopic, setIsFreeTopic] = useState(false);
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema(isFreeTopic)),
  });

  const { control, setValue, clearErrors, trigger, register } = methods;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const localDate = new Date();
    const offset = localDate.getTimezoneOffset();
    const adjustedDate = new Date(localDate.getTime() - offset * 60000);
    const newTheme = {
      title: data.title,
      description: data.description,
      date: adjustedDate.toISOString(),
      courseId: data.courseId,
    };

    const resultAction = await dispatch(createThemeAsync(newTheme));

    if (createThemeAsync.fulfilled.match(resultAction)) {
      navigate(`/forum/${resultAction.payload.id}`);
    } else {
      console.error("Failed to create theme:", resultAction.payload);
    }
  };

  useEffect(() => {
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
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Sheet
        sx={{
          width: "100%",
          height:"100%",
        //   maxWidth: 600,
        //   margin: "auto",
        // //   padding: 6,
        //   borderRadius: "20px",
        //   border: "2px solid",

        //   borderColor: theme.palette.primary.main,
        //   backgroundColor: theme.palette.background.default,
          //   boxShadow: "lg",
        display: "flex", flexDirection: "column",justifyContent:"center",
        backgroundColor:"transparent"
        }}
      >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{width: "100%",
                maxWidth: "600px",
                margin: "auto",
                padding: 6,
                backgroundColor: theme.palette.background.default,
                borderRadius: "20px",
                border: "2px solid",
                borderColor: theme.palette.primary.main,
                display:"flex",
                flexDirection:"column"  }}
          >
            <Typography
              level="h4"
              textAlign="center"
              mb={2}
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "normal",
                fontFamily: "Raleway, sans-serif",
              }}
            >
              Kreiranje teme
            </Typography>
            <Grid xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error}>
                    <Input
                    //   label="Naziv"
                      variant="outlined"
                      {...field}
                      placeholder="Naziv"
                      {...register("title", {
                        required: "Title is required.",
                      })}
                    />
                    
                    {fieldState.error && (
                      <FormHelperText>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FormControl error={!!fieldState.error}>
                    <Input
                      {...field}
                      placeholder="Opis"
                      //    multiline
                      //   minRows={4}
                      {...register("description", {
                        required: "Description is required.",
                      })}
                    />
                    {fieldState.error && (
                      <FormHelperText>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="freeTopic"
                control={control}
                render={() => (
                  <Checkbox
                    // {...field}
                    label="Slobodna tema"
                    checked={isFreeTopic}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setIsFreeTopic(isChecked);
                      if (isChecked) {
                        setValue("courseId", "0");
                        clearErrors("courseId");
                      } else {
                        setValue("courseId", "0", { shouldValidate: true });
                        trigger();
                      }
                      setValue("freeTopic", isChecked);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <FormControl>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Select
                        {...field}
                        placeholder="Kurs"
                        disabled={isFreeTopic}
                        value={field.value || "0"}
                        onChange={(e, value) => {
                          setValue("courseId", value || "0", {
                            shouldValidate: true,
                          });
                          if (fieldState.error) {
                            clearErrors("courseId");
                          }
                          trigger();
                        }}
                      >
                        <Option value="0">Nema kursa</Option>
                        {courses?.map((course) => (
                          <Option key={course.id} value={course.id}>
                            {course.name}
                          </Option>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} display="flex" justifyContent="space-between">
              <Button variant="plain" color="neutral" onClick={handleClose}>
                Odustani
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={!methods.formState.isValid}
              >
                Pošalji
              </Button>
            </Grid>
          </Grid>
        </form>
      </Sheet>
    </Modal>
  );
}
