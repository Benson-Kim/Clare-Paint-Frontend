import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TradeAccount, TradeProject, TradeOrder, TradeInvoice } from '@/types/trade';

interface TradeStore {
  // Account Management
  account: TradeAccount | null;
  setAccount: (account: TradeAccount) => void;
  
  // Project Management
  projects: TradeProject[];
  activeProject: string | null;
  setActiveProject: (projectId: string | null) => void;
  addProject: (project: TradeProject) => void;
  updateProject: (projectId: string, updates: Partial<TradeProject>) => void;
  removeProject: (projectId: string) => void;
  
  // Order Management
  orders: TradeOrder[];
  draftOrder: TradeOrder | null;
  setDraftOrder: (order: TradeOrder | null) => void;
  addOrder: (order: TradeOrder) => void;
  updateOrder: (orderId: string, updates: Partial<TradeOrder>) => void;
  
  // Invoice Management
  invoices: TradeInvoice[];
  addInvoice: (invoice: TradeInvoice) => void;
  updateInvoice: (invoiceId: string, updates: Partial<TradeInvoice>) => void;
  
  // UI State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Bulk Operations
  bulkOrderItems: any[];
  addBulkItem: (item: any) => void;
  removeBulkItem: (itemId: string) => void;
  clearBulkOrder: () => void;
  
  // Analytics
  analytics: any;
  setAnalytics: (analytics: any) => void;
}

export const useTradeStore = create<TradeStore>()(
  persist(
    (set, get) => ({
      // Account Management
      account: null,
      setAccount: (account) => set({ account }),
      
      // Project Management
      projects: [],
      activeProject: null,
      setActiveProject: (projectId) => set({ activeProject: projectId }),
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
      })),
      updateProject: (projectId, updates) => set((state) => ({
        projects: state.projects.map(project =>
          project.id === projectId ? { ...project, ...updates } : project
        )
      })),
      removeProject: (projectId) => set((state) => ({
        projects: state.projects.filter(project => project.id !== projectId),
        activeProject: state.activeProject === projectId ? null : state.activeProject
      })),
      
      // Order Management
      orders: [],
      draftOrder: null,
      setDraftOrder: (order) => set({ draftOrder: order }),
      addOrder: (order) => set((state) => ({ 
        orders: [...state.orders, order] 
      })),
      updateOrder: (orderId, updates) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, ...updates } : order
        )
      })),
      
      // Invoice Management
      invoices: [],
      addInvoice: (invoice) => set((state) => ({ 
        invoices: [...state.invoices, invoice] 
      })),
      updateInvoice: (invoiceId, updates) => set((state) => ({
        invoices: state.invoices.map(invoice =>
          invoice.id === invoiceId ? { ...invoice, ...updates } : invoice
        )
      })),
      
      // UI State
      activeTab: 'overview',
      setActiveTab: (tab) => set({ activeTab: tab }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Bulk Operations
      bulkOrderItems: [],
      addBulkItem: (item) => set((state) => ({ 
        bulkOrderItems: [...state.bulkOrderItems, item] 
      })),
      removeBulkItem: (itemId) => set((state) => ({
        bulkOrderItems: state.bulkOrderItems.filter(item => item.id !== itemId)
      })),
      clearBulkOrder: () => set({ bulkOrderItems: [] }),
      
      // Analytics
      analytics: null,
      setAnalytics: (analytics) => set({ analytics }),
    }),
    {
      name: 'trade-storage',
      partialize: (state) => ({
        account: state.account,
        projects: state.projects,
        activeProject: state.activeProject,
        orders: state.orders,
        invoices: state.invoices,
        activeTab: state.activeTab,
        bulkOrderItems: state.bulkOrderItems,
      }),
    }
  )
);