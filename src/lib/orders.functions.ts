import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(80),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(6, "Enter a valid phone number").max(30),
  company: z.string().max(80).optional().or(z.literal("")),
  country: z.string().min(2, "Please enter your country").max(60),
  service: z.string().min(2, "Select a service"),
  budget: z.string().min(1, "Select a budget range"),
  deadline: z.string().min(1, "Choose a deadline"),
  description: z.string().min(20, "Please describe your project (min 20 characters)").max(4000),
  fileName: z.string().max(200).optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const reference = `ORV-${Date.now().toString(36).toUpperCase()}`;
    // Order is validated and prepared for email delivery to info.orvix.official@gmail.com.
    // Connect a transactional email provider here to dispatch the payload.
    console.log("[orvix:order]", reference, JSON.stringify(data));
    return { ok: true as const, reference };
  });
