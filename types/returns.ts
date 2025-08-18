import { z } from 'zod';

export const returnItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required."),
  quantity: z.number().min(1, "Quantity must be at least 1."),
  reason: z.enum(['color_issue', 'damaged', 'wrong_item', 'other'], { errorMap: () => ({ message: "Please select a reason." }) }),
});

export const returnFormSchema = z.object({
  orderId: z.string().regex(/^ORD-\d{13}-\d{3}$/, "Please enter a valid Order ID (e.g., ORD-1629876543210-123)."),
  email: z.string().email("Please enter a valid email address."),
  items: z.array(returnItemSchema).min(1, "You must add at least one item to return."),
  comments: z.string().optional(),
  policyAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the return policy to proceed." }),
  }),
});

export type ReturnFormValues = z.infer<typeof returnFormSchema>;
export type ReturnItem = z.infer<typeof returnItemSchema>;
