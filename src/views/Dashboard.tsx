import { KPICards } from '@/components/Dashboard/KPICards';
import { SalesFlowDiagram } from '@/components/Dashboard/SalesFlowDiagram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Store, Plus, Eye } from 'lucide-react';
import { useIndustryStore } from '@/state/industryStore';
import { useSalesFlow } from '@/controllers/salesController';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { mode } = useIndustryStore();
  const { salesOrders, salesInvoices, deliveryNotes } = useSalesFlow();

  const recentOrders = Array.isArray(salesOrders.data) ? salesOrders.data.slice(0, 5) : [];
  const recentInvoices = Array.isArray(salesInvoices.data) ? salesInvoices.data.slice(0, 5) : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            {mode === 'wholesale' ? (
              <Building2 className="h-4 w-4 text-primary" />
            ) : (
              <Store className="h-4 w-4 text-primary" />
            )}
            <span className="text-muted-foreground capitalize">{mode} Mode</span>
            <Badge variant="secondary" className="ml-2">
              {mode === 'wholesale' ? 'B2B' : 'B2C'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/orders">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/reports">
              <Eye className="h-4 w-4 mr-2" />
              View Reports
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Sales Flow Diagram */}
      <SalesFlowDiagram />

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Sales Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/orders">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {salesOrders.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.transaction_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.grand_total?.toLocaleString()}</p>
                      <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No recent orders</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/orders">Create your first order</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/invoices">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {salesInvoices.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : recentInvoices.length > 0 ? (
              <div className="space-y-3">
                {recentInvoices.map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{invoice.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${invoice.grand_total?.toLocaleString()}</p>
                      <Badge 
                        variant={
                          invoice.status === 'Paid' ? 'default' : 
                          invoice.status === 'Overdue' ? 'destructive' : 'secondary'
                        } 
                        className="text-xs"
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No recent invoices</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/invoices">Create your first invoice</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}