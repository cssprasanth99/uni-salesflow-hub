import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Eye, DollarSign, Smartphone, Building, Banknote } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { erpNextApi } from '@/models/erpNextApi';
import { useIndustryStore } from '@/state/industryStore';

export function Payments() {
  const { mode } = useIndustryStore();
  
  const { data: payments, isLoading } = useQuery({
    queryKey: ['paymentEntries'],
    queryFn: erpNextApi.getPaymentEntries.bind(erpNextApi),
  });

  const getPaymentIcon = (mode: string) => {
    switch (mode) {
      case 'Cash':
        return Banknote;
      case 'Bank':
        return Building;
      case 'UPI':
        return Smartphone;
      case 'Card':
        return CreditCard;
      default:
        return DollarSign;
    }
  };

  const getPaymentColor = (mode: string) => {
    switch (mode) {
      case 'Cash':
        return 'default';
      case 'Bank':
        return 'secondary';
      case 'UPI':
        return 'outline';
      case 'Card':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const totalReceived = Array.isArray(payments)
    ? payments.filter(p => p.payment_type === 'Receive').reduce((sum, p) => sum + (p.paid_amount || 0), 0)
    : 0;

  const totalPayments = Array.isArray(payments) ? payments.length : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Entries</h1>
          <p className="text-muted-foreground">
            Record and track customer payments for {mode} transactions
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Payments</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {totalPayments}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Total Received</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${totalReceived.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Cash Payments</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {Array.isArray(payments) ? payments.filter(p => p.mode_of_payment === 'Cash').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Bank Transfers</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {Array.isArray(payments) ? payments.filter(p => p.mode_of_payment === 'Bank').length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Entries</CardTitle>
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
            ) : Array.isArray(payments) && payments.length > 0 ? (
              payments.map((payment, index) => {
                const PaymentIcon = getPaymentIcon(payment.mode_of_payment);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <PaymentIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{payment.party}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {new Date(payment.posting_date).toLocaleDateString()}</span>
                          {payment.reference_invoice && <span>Invoice: {payment.reference_invoice}</span>}
                          {payment.reference_no && <span>Ref: {payment.reference_no}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold text-success">
                          +${payment.paid_amount?.toLocaleString()}
                        </div>
                        <Badge variant={getPaymentColor(payment.mode_of_payment)} className="text-xs">
                          {payment.mode_of_payment}
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
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No payments recorded</h3>
                <p className="text-muted-foreground mb-4">
                  Start recording customer payments for invoices
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}