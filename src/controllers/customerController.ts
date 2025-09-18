// Customer Controller - Business Logic Layer
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApiService } from '@/models/mockApiService';
import type { Customer } from '@/models/types';
import { useToast } from '@/hooks/use-toast';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: mockApiService.getCustomers.bind(mockApiService),
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (customer: Omit<Customer, 'name'>) => mockApiService.createCustomer(customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Success",
        description: "Customer created successfully",
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

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ name, updates }: { name: string; updates: Partial<Customer> }) => 
      mockApiService.updateCustomer(name, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Success",
        description: "Customer updated successfully",
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

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (name: string) => mockApiService.deleteCustomer(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Success",
        description: "Customer deleted successfully",
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

// Quick retail customer creation
export const useQuickRetailCustomer = () => {
  const createCustomer = useCreateCustomer();
  
  const createQuickCustomer = (name: string, phone?: string) => {
    const customer: Omit<Customer, 'name'> = {
      customer_name: name,
      customer_type: 'Individual',
      territory: 'All Territories',
      customer_group: 'Individual',
      contact_phone: phone,
    };
    
    createCustomer.mutate(customer);
  };
  
  return {
    createQuickCustomer,
    isLoading: createCustomer.isPending,
  };
};