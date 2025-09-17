import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Eye, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { erpNextApi } from '@/models/erpNextApi';
import { useIndustryStore } from '@/state/industryStore';

export function Invoices() {
  const { mode } = useIndustryStore();
  
  const { data: invoices, isLoading } = useQuery({
    queryKey: ['salesInvoices'],
    queryFn: erpNextApi.getSalesInvoices.bind(erpNextApi),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Submitted':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      case 'Draft':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return CheckCircle;
      case 'Overdue':
        return AlertTriangle;
      case 'Submitted':
        return DollarSign;
      default:
        return Clock;
    }
  };

  const totalOutstanding = Array.isArray(invoices) 
    ? invoices.reduce((sum, inv) => sum + (inv.outstanding_amount || 0), 0)
    : 0;

  const totalInvoiced = Array.isArray(invoices)
    ? invoices.reduce((sum, inv) => sum + (inv.grand_total || 0), 0)
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Invoices</h1>
          <p className="text-muted-foreground">
            Manage invoices and track payments for {mode} sales
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Invoices</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(invoices) ? invoices.length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Total Invoiced</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${totalInvoiced.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Outstanding</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${totalOutstanding.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Overdue</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(invoices) ? invoices.filter(i => i.status === 'Overdue').length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                </div>
              ))
            ) : Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((invoice, index) => {
                const StatusIcon = getStatusIcon(invoice.status);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <StatusIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{invoice.customer}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {new Date(invoice.posting_date).toLocaleDateString()}</span>
                          <span>Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                          <span>{invoice.items?.length || 0} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold">${invoice.grand_total?.toLocaleString()}</div>
                        {invoice.outstanding_amount > 0 && (
                          <div className="text-xs text-destructive">
                            Outstanding: ${invoice.outstanding_amount.toLocaleString()}
                          </div>
                        )}
                        <Badge variant={getStatusColor(invoice.status)} className="text-xs mt-1">
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create invoices from sales orders or delivery notes
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}