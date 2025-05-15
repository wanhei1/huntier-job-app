import { z } from "zod"

export const applicantFormSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
})

export type ApplicantFormValues = z.infer<typeof applicantFormSchema>