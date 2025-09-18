// Sales Controller - Business Logic Layer
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApiService } from '@/models/mockApiService';
import type { SalesOrder, StockBalance, KPIData, Quotation } from '@/models/types';
import { useToast } from '@/hooks/use-toast';

// ============= QUOTATIONS =============
export const useQuotations = () => {
  return useQuery({
    queryKey: ['quotations'],
    queryFn: mockApiService.getQuotations.bind(mockApiService),
  });
};

export const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mockApiService.createQuotation.bind(mockApiService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['salesKPIs'] });
      toast({
        title: "Success",
        description: "Quotation created successfully",
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

// ============= SALES ORDERS =============
export const useSalesOrders = () => {
  return useQuery({
    queryKey: ['salesOrders'],
    queryFn: mockApiService.getSalesOrders.bind(mockApiService),
  });
};

export const useCreateSalesOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mockApiService.createSalesOrder.bind(mockApiService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesOrders'] });
      queryClient.invalidateQueries({ queryKey: ['salesKPIs'] });
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

// ============= DELIVERY NOTES =============
export const useDeliveryNotes = () => {
  return useQuery({
    queryKey: ['deliveryNotes'],
    queryFn: mockApiService.getDeliveryNotes.bind(mockApiService),
  });
};

export const useCreateDeliveryNote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mockApiService.createDeliveryNote.bind(mockApiService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveryNotes'] });
      queryClient.invalidateQueries({ queryKey: ['salesKPIs'] });
      toast({
        title: "Success",
        description: "Delivery note created successfully",
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

// ============= SALES INVOICES =============
export const useSalesInvoices = () => {
  return useQuery({
    queryKey: ['salesInvoices'],
    queryFn: mockApiService.getSalesInvoices.bind(mockApiService),
  });
};

export const useCreateSalesInvoice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mockApiService.createSalesInvoice.bind(mockApiService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesInvoices'] });
      queryClient.invalidateQueries({ queryKey: ['salesKPIs'] });
      toast({
        title: "Success",
        description: "Sales invoice created successfully",
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

// ============= PAYMENT ENTRIES =============
export const usePaymentEntries = () => {
  return useQuery({
    queryKey: ['paymentEntries'],
    queryFn: mockApiService.getPaymentEntries.bind(mockApiService),
  });
};

export const useCreatePaymentEntry = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mockApiService.createPaymentEntry.bind(mockApiService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentEntries'] });
      queryClient.invalidateQueries({ queryKey: ['salesKPIs'] });
      toast({
        title: "Success",
        description: "Payment entry created successfully",
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

// ============= STOCK VALIDATION =============
export const useStockValidation = (itemCode: string, warehouse?: string) => {
  return useQuery({
    queryKey: ['stockBalance', itemCode, warehouse],
    queryFn: () => mockApiService.getStockBalance(itemCode, warehouse),
    enabled: !!itemCode,
  });
};

// ============= SALES FLOW =============
export const useSalesFlow = () => {
  const quotations = useQuotations();
  const salesOrders = useSalesOrders();
  const deliveryNotes = useDeliveryNotes();
  const salesInvoices = useSalesInvoices();
  const paymentEntries = usePaymentEntries();
  
  return {
    quotations,
    salesOrders,
    deliveryNotes,
    salesInvoices,
    paymentEntries,
  };
};

// ============= SALES KPIs =============
export const useSalesKPIs = () => {
  return useQuery<KPIData>({
    queryKey: ['salesKPIs'],
    queryFn: mockApiService.getKPIData.bind(mockApiService),
  });
};