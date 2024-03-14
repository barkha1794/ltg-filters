"use server";
import { zfd } from "zod-form-data";
import { z } from "zod";

const submitSchema = zfd.formData({
  first_name: zfd.text(),
  last_name: zfd.text(),
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(4)),
  interested: zfd.checkbox(),
  courses: zfd.repeatable(),
  gender: zfd.text().optional(),
  min: zfd.numeric(),
  max: zfd.numeric(),
});

export const onSubmit = async (prevState: any, formData: FormData) => {
  try {
    const res = submitSchema.parse(formData);
    return { message: "success", data: res };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.flatten();
    }
    return { fieldErrors: {} } as ReturnType<z.ZodError["flatten"]>;
  }
};
