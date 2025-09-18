import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus, Eye, Package, Clock, CheckCircle } from 'lucide-react';
import { useDeliveryNotes } from '@/controllers/salesController';
import { useIndustryStore } from '@/state/industryStore';

export function Deliveries() {
  const { mode } = useIndustryStore();
  
  const { data: deliveries, isLoading } = useDeliveryNotes();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Out for Delivery':
        return 'secondary';
      case 'Pending':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return CheckCircle;
      case 'Out for Delivery':
        return Truck;
      default:
        return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deliveries</h1>
          <p className="text-muted-foreground">
            Track and manage delivery notes for {mode} orders
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Delivery Note
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Deliveries</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(deliveries) ? deliveries.length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(deliveries) ? deliveries.filter(d => d.delivery_status === 'Pending').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Out for Delivery</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(deliveries) ? deliveries.filter(d => d.delivery_status === 'Out for Delivery').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Delivered</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(deliveries) ? deliveries.filter(d => d.delivery_status === 'Delivered').length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deliveries List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Delivery Notes</CardTitle>
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
            ) : Array.isArray(deliveries) && deliveries.length > 0 ? (
              deliveries.map((delivery, index) => {
                const StatusIcon = getStatusIcon(delivery.delivery_status);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <StatusIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{delivery.customer}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {new Date(delivery.posting_date).toLocaleDateString()}</span>
                          {delivery.sales_order && <span>Order: {delivery.sales_order}</span>}
                          <span>{delivery.items?.length || 0} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge variant={getStatusColor(delivery.delivery_status)} className="text-xs mb-1">
                          {delivery.delivery_status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {delivery.status}
                        </div>
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
                <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No deliveries yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create delivery notes from sales orders
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Delivery Note
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}