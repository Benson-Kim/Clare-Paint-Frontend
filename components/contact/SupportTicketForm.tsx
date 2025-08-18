"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { supportTicketSchema, SupportTicket } from "@/types/contact";
import { mockSubmitTicket } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export const SupportTicketForm = () => {
	const form = useForm<SupportTicket>({
		resolver: zodResolver(supportTicketSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
			priority: "medium",
		},
	});

	const mutation = useMutation({
		mutationFn: mockSubmitTicket,
		onSuccess: () => {
			form.reset();
		},
	});

	const onSubmit = (data: SupportTicket) => {
		mutation.mutate(data);
	};

	return (
		<div className="bg-ds-neutral-white p-8 border border-ds-neutral-lightGray rounded-lg shadow-sm">
			<h3 className="text-2xl font-bold text-ds-primary-charcoal mb-2">
				Create a Support Ticket
			</h3>
			<p className="text-ds-neutral-mediumGray mb-6">
				For technical issues, please provide as much detail as possible.
			</p>

			{mutation.isSuccess ? (
				<Alert variant="default" className="bg-green-50 border-green-200">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertTitle className="text-green-800">Success!</AlertTitle>
					<AlertDescription className="text-green-700">
						{mutation.data?.message || "Your ticket has been submitted."}
					</AlertDescription>
				</Alert>
			) : mutation.isError ? (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{mutation.error instanceof Error
							? mutation.error.message
							: "An unknown error occurred."}
					</AlertDescription>
				</Alert>
			) : null}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Your Name"
											{...field}
											disabled={mutation.isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="your.email@example.com"
											{...field}
											disabled={mutation.isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="subject"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subject</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., Issue with order #12345"
											{...field}
											disabled={mutation.isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority Level</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={mutation.isPending}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a priority" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="low">Low</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="high">High</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Please describe your issue in detail..."
										className="min-h-[150px]"
										{...field}
										disabled={mutation.isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-end">
						<Button type="submit" disabled={mutation.isPending} className="w-full md:w-auto">
							{mutation.isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Submit Ticket"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
