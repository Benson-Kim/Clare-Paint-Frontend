export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
	duration?: number;
}

class ToastStore {
	private listeners: Set<(toasts: Toast[]) => void> = new Set();
	private toasts: Toast[] = [];
	private idCounter = 0;

	subscribe(listener: (toasts: Toast[]) => void) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notify() {
		this.listeners.forEach((listener) => listener([...this.toasts]));
	}

	private addToast(type: ToastType, message: string, duration = 5000) {
		const id = `toast-${++this.idCounter}`;
		const toast: Toast = { id, type, message, duration };

		this.toasts = [...this.toasts, toast];
		this.notify();

		// Auto-dismiss
		if (duration > 0) {
			setTimeout(() => this.removeToast(id), duration);
		}

		return id;
	}

	removeToast(id: string) {
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
		this.notify();
	}

	clearAll() {
		this.toasts = [];
		this.notify();
	}

	success(message: string, duration?: number) {
		return this.addToast("success", message, duration);
	}

	error(message: string, duration?: number) {
		return this.addToast("error", message, duration);
	}

	warning(message: string, duration?: number) {
		return this.addToast("warning", message, duration);
	}

	info(message: string, duration?: number) {
		return this.addToast("info", message, duration);
	}

	getToasts() {
		return [...this.toasts];
	}
}

// Export singleton instance
export const toast = new ToastStore();
