"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { returnFormSchema, ReturnFormValues } from "@/types/returns";
import { mockSubmitReturnRequest } from "@/lib/api";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Loader2,
	CheckCircle,
	AlertCircle,
	PlusCircle,
	XCircle,
} from "lucide-react";

export const ReturnForm = () => {
	const form = useForm<ReturnFormValues>({
		resolver: zodResolver(returnFormSchema),
		defaultValues: {
			orderId: "",
			email: "",
			items: [{ productId: "", quantity: 1, reason: "color_issue" }],
			comments: "",
			policyAccepted: false,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	const mutation = useMutation({
		mutationFn: mockSubmitReturnRequest,
		onSuccess: () => {
			form.reset();
		},
	});

	const onSubmit = (data: ReturnFormValues) => {
		mutation.mutate(data);
	};

	return (
		<Card className="mt-16">
			<CardHeader>
				<CardTitle className="text-3xl font-bold text-ds-primary-charcoal">
					Start a Return
				</CardTitle>
			</CardHeader>
			<CardContent>
				{mutation.isSuccess ? (
					<Alert variant="default" className="bg-green-50 border-green-200 mb-6">
						<CheckCircle className="h-4 w-4 text-green-600" />
						<AlertTitle className="text-green-800">Success!</AlertTitle>
						<AlertDescription className="text-green-700">
							{mutation.data?.message}
						</AlertDescription>
					</Alert>
				) : mutation.isError ? (
					<Alert variant="destructive" className="mb-6">
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
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="orderId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Order ID</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g., ORD-1629876543210-123"
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
												placeholder="Email used for the order"
												{...field}
												disabled={mutation.isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Items to Return</h4>
							<div className="space-y-4">
								{fields.map((field, index) => (
									<div
										key={field.id}
										className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg"
									>
										<FormField
											control={form.control}
											name={`items.${index}.productId`}
											render={({ field }) => (
												<FormItem className="flex-grow">
													<FormLabel>Product ID / SKU</FormLabel>
													<FormControl>
														<Input placeholder="e.g., premium-interior-paint-001" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`items.${index}.quantity`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Quantity</FormLabel>
													<FormControl>
														<Input type="number" min="1" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`items.${index}.reason`}
											render={({ field }) => (
												<FormItem className="min-w-[200px]">
													<FormLabel>Reason</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select a reason" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="color_issue">Color not as expected</SelectItem>
															<SelectItem value="damaged">Arrived damaged</SelectItem>
															<SelectItem value="wrong_item">Received wrong item</SelectItem>
															<SelectItem value="other">Other</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="mt-auto"
											onClick={() => remove(index)}
											disabled={fields.length <= 1}
										>
											<XCircle className="h-5 w-5 text-red-500" />
										</Button>
									</div>
								))}
							</div>
							<Button
								type="button"
								variant="outline"
								className="mt-4"
								onClick={() =>
									append({ productId: "", quantity: 1, reason: "color_issue" })
								}
							>
								<PlusCircle className="mr-2 h-4 w-4" /> Add Another Item
							</Button>
						</div>

						<FormField
							control={form.control}
							name="comments"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Additional Comments (Optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Provide any extra details here..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="policyAccepted"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>
											I have read and agree to the Return & Exchange Policy.
										</FormLabel>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>

						<div className="flex justify-end">
							<Button type="submit" disabled={mutation.isPending} size="lg">
								{mutation.isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Processing Return...
									</>
								) : (
									"Submit Return Request"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
