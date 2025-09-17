import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Eye, Package, Clock, CheckCircle } from 'lucide-react';
import { useSalesOrders } from '@/controllers/salesController';
import { useIndustryStore } from '@/state/industryStore';

export function Orders() {
  const { mode } = useIndustryStore();
  const { data: orders, isLoading } = useSalesOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'To Deliver and Bill':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return CheckCircle;
      case 'To Deliver and Bill':
        return Package;
      default:
        return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Orders</h1>
          <p className="text-muted-foreground">
            Manage your {mode} sales orders and track progress
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {mode === 'retail' ? 'New Sale' : 'New Order'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Orders</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(orders) ? orders.length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(orders) ? orders.filter(o => o.status === 'To Deliver and Bill').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(orders) ? orders.filter(o => o.status === 'Completed').length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Total Value</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${isLoading ? '...' : Array.isArray(orders) ? orders.reduce((sum, o) => sum + (o.grand_total || 0), 0).toLocaleString() : '0'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
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
            ) : Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-light rounded-lg">
                        <StatusIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{order.customer}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Order Date: {new Date(order.transaction_date).toLocaleDateString()}</span>
                          <span>Delivery: {new Date(order.delivery_date).toLocaleDateString()}</span>
                          <span>{order.items?.length || 0} items</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold">${order.grand_total?.toLocaleString()}</div>
                        <Badge variant={getStatusColor(order.status)} className="text-xs">
                          {order.status}
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
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first {mode} order
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}