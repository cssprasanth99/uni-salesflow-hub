import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Plus, Eye, Calendar, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { mockApiService } from '@/models/mockApiService';
import { useIndustryStore } from '@/state/industryStore';
import { Skeleton } from '@/components/ui/skeleton';

export function Quotations() {
  const { mode } = useIndustryStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: quotations, isLoading } = useQuery({
    queryKey: ['quotations'],
    queryFn: mockApiService.getQuotations.bind(mockApiService),
  });

  const filteredQuotations = Array.isArray(quotations) ? quotations.filter(quotation => 
    quotation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quotation.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'default';
      case 'Converted':
        return 'default';
      case 'Draft':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quotations</h1>
          <p className="text-muted-foreground">
            Manage {mode} quotations and convert to orders
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Quotation
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Quotations</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(quotations) ? quotations.length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Draft</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(quotations) ? quotations.filter(q => q.status === 'Draft').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Submitted</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(quotations) ? quotations.filter(q => q.status === 'Submitted').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Total Value</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${isLoading ? '...' : Array.isArray(quotations) ? quotations.reduce((sum, q) => sum + (q.grand_total || 0), 0).toLocaleString() : '0'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotations List */}
      <Card>
        <CardHeader>
          <CardTitle>Quotations List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ))
            ) : filteredQuotations.length > 0 ? (
              filteredQuotations.map((quotation, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{quotation.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Customer: {quotation.customer}</span>
                        <span>Date: {new Date(quotation.quotation_date).toLocaleDateString()}</span>
                        <span>Valid Till: {new Date(quotation.valid_till).toLocaleDateString()}</span>
                        <span>{quotation.items?.length || 0} items</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold">${quotation.grand_total?.toLocaleString()}</div>
                      <Badge variant={getStatusColor(quotation.status)} className="text-xs">
                        {quotation.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No quotations found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first quotation to get started'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quotation
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}