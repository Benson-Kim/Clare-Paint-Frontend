import { z } from 'zod';

export const supportTicketSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
  priority: z.enum(['low', 'medium', 'high'], { errorMap: () => ({ message: "Please select a priority level." }) }),
});

export type SupportTicket = z.infer<typeof supportTicketSchema>;
