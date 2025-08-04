'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cart-store';

interface CartAnalyticsEvent {
  event: 'cart_view' | 'item_add' | 'item_remove' | 'quantity_change' | 'checkout_start';
  productId?: string;
  colorId?: string;
  finishId?: string;
  quantity?: number;
  value?: number;
  timestamp: number;
}

export const useCartAnalytics = () => {
  const { items, getTotalPrice } = useCartStore();
  const sessionStartTime = useRef(Date.now());
  const lastItemCount = useRef(0);

  const trackEvent = (event: CartAnalyticsEvent) => {
    // In a real app, this would send to analytics service
    console.log('Cart Analytics:', event);
    
    // Example: Send to Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.event, {
        event_category: 'ecommerce',
        event_label: event.productId,
        value: event.value,
        custom_parameter_1: event.colorId,
        custom_parameter_2: event.finishId,
      });
    }
  };

  useEffect(() => {
    const currentItemCount = items.length;
    
    if (currentItemCount > lastItemCount.current) {
      // Item was added
      const newItem = items[items.length - 1];
      trackEvent({
        event: 'item_add',
        productId: newItem.productId,
        colorId: newItem.colorId,
        finishId: newItem.finishId,
        quantity: newItem.quantity,
        value: newItem.price * newItem.quantity,
        timestamp: Date.now(),
      });
    } else if (currentItemCount < lastItemCount.current) {
      // Item was removed
      trackEvent({
        event: 'item_remove',
        value: getTotalPrice(),
        timestamp: Date.now(),
      });
    }
    
    lastItemCount.current = currentItemCount;
  }, [items, getTotalPrice]);

  const trackCartView = () => {
    trackEvent({
      event: 'cart_view',
      value: getTotalPrice(),
      timestamp: Date.now(),
    });
  };

  const trackCheckoutStart = () => {
    trackEvent({
      event: 'checkout_start',
      value: getTotalPrice(),
      timestamp: Date.now(),
    });
  };

  const getSessionDuration = () => {
    return Date.now() - sessionStartTime.current;
  };

  return {
    trackCartView,
    trackCheckoutStart,
    getSessionDuration,
  };
};