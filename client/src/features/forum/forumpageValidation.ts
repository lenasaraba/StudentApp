import * as yup from "yup";

// export const validationSchema =
//   yup.object({
//     title: yup.string().required("Naslooooov"),
//     description: yup.string().required("Opiiiissss"),
//     courseId: yup.string().required("Kursuuuuuuuu"),

//   })
// ;
export const validationSchema = (isFreeTopic: boolean) =>
  yup.object({
    title: yup.string().required("Naslov je obavezan"),
    description: yup.string().required("Opis je obavezan"),
    courseId: isFreeTopic
      ? yup.string() // Ako je slobodna tema, validacija nije obavezna za courseId
      : yup
          .string()
          .required("Kurs je obavezan")
          .notOneOf(["0"], "Kurs je obavezan"), // Ako nije slobodna tema, kurs je obavezan
    freeTopic: yup.boolean(),
  });
