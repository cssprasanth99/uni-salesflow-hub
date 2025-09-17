// Sales Controller - Business Logic Layer
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { erpNextApi, SalesOrder, StockBalance } from '../models/erpNextApi';
import { useToast } from '../hooks/use-toast';

// Sales Order Hooks
export const useSalesOrders = () => {
  return useQuery({
    queryKey: ['salesOrders'],
    queryFn: erpNextApi.getSalesOrders.bind(erpNextApi),
  });
};

export const useCreateSalesOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: erpNextApi.createSalesOrder.bind(erpNextApi),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesOrders'] });
      toast({
        title: "Success",
        description: "Sales order created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Stock Validation
export const useStockValidation = (itemCode: string, warehouse?: string) => {
  return useQuery({
    queryKey: ['stockBalance', itemCode, warehouse],
    queryFn: () => erpNextApi.getStockBalance(itemCode, warehouse),
    enabled: !!itemCode,
  });
};

// Sales Flow State Management
export const useSalesFlow = () => {
  const salesOrders = useSalesOrders();
  
  // Mock data for demo - replace with real queries
  const quotations = useQuery({
    queryKey: ['quotations'],
    queryFn: async () => [], // TODO: Implement quotation API
  });
  
  const deliveryNotes = useQuery({
    queryKey: ['deliveryNotes'],
    queryFn: erpNextApi.getDeliveryNotes.bind(erpNextApi),
  });
  
  const salesInvoices = useQuery({
    queryKey: ['salesInvoices'],
    queryFn: erpNextApi.getSalesInvoices.bind(erpNextApi),
  });
  
  const paymentEntries = useQuery({
    queryKey: ['paymentEntries'],
    queryFn: erpNextApi.getPaymentEntries.bind(erpNextApi),
  });
  
  return {
    quotations,
    salesOrders,
    deliveryNotes,
    salesInvoices,
    paymentEntries,
  };
};

// Sales KPIs
export const useSalesKPIs = () => {
  return useQuery({
    queryKey: ['salesKPIs'],
    queryFn: async () => {
      // TODO: Implement KPI calculations from ERPNext data
      return {
        totalRevenue: 125000,
        totalOrders: 342,
        pendingDeliveries: 23,
        outstandingInvoices: 15,
        conversionRate: 68.5,
        averageOrderValue: 3650,
      };
    },
  });
};