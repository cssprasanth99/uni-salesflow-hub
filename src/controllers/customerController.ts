// Customer Controller - Business Logic Layer
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { erpNextApi, Customer } from '../models/erpNextApi';
import { useToast } from '../hooks/use-toast';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: erpNextApi.getCustomers.bind(erpNextApi),
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (customer: Omit<Customer, 'name'>) => erpNextApi.createCustomer(customer),
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

// Quick retail customer creation
export const useQuickRetailCustomer = () => {
  const createCustomer = useCreateCustomer();
  
  const createQuickCustomer = (name: string, phone?: string) => {
    const customer: Omit<Customer, 'name'> = {
      customer_name: name,
      customer_type: 'Individual' as const,
      territory: 'All Territories',
      customer_group: 'Individual',
      mobile_no: phone,
    };
    
    createCustomer.mutate(customer);
  };
  
  return {
    createQuickCustomer,
    isLoading: createCustomer.isPending,
  };
};