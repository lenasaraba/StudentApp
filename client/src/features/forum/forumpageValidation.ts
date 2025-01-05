import * as yup from "yup";

export const validationSchema = 
  yup.object({
    title: yup.string().required("Naslooooov"),
    description: yup.string().required("Opiiiissss"),
    courseId: yup.string().required("Kursuuuuuuuu"),
    
  })
;
