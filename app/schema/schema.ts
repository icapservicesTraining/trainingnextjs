import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(
    (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
    { message: 'Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol' }),
  confirmPassword: z.string(),
  // ...
}

);
 export type SignUpSchemaType = z.infer<typeof SignUpSchema>;


/*export SignUpSchema = z.object({
    // ...
    email: z.string().trim().email(),
    password: z.string().refine(
        (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        { message: 'Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol' }),
      confirmPassword: z.string(),
      // ...
    }

  );
    //gets type of of object through zod
  type SignUpSchemaType = z.infer<typeof SignUpSchema>;*/