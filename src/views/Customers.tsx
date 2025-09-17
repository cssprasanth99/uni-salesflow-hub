import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Building2, User, Phone, Mail } from 'lucide-react';
import { useCustomers } from '@/controllers/customerController';
import { useIndustryStore } from '@/state/industryStore';

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const { mode } = useIndustryStore();
  const { data: customers, isLoading } = useCustomers();

  const filteredCustomers = Array.isArray(customers) 
    ? customers.filter(customer =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customer_type.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">
            Manage your {mode} customers and relationships
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {mode === 'retail' && (
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Quick Add Retail Customer
          </Button>
        )}
      </div>

      {/* Customer List */}
      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <Card key={customer.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-light rounded-lg">
                      {customer.customer_type === 'Company' ? (
                        <Building2 className="h-5 w-5 text-primary" />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.customer_name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground">{customer.territory}</span>
                        {customer.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{customer.phone}</span>
                          </div>
                        )}
                        {customer.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{customer.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={customer.customer_type === 'Company' ? 'default' : 'secondary'}>
                      {customer.customer_type}
                    </Badge>
                    <Badge variant="outline">{customer.customer_group}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? `No customers match "${searchTerm}"`
                  : 'Start by adding your first customer'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}