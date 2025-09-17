import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, AlertCircle, Target, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSalesKPIs } from '@/controllers/salesController';
import { Skeleton } from '@/components/ui/skeleton';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

function KPICard({ title, value, change, icon: Icon, description }: KPICardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <div className="flex items-center gap-1 mt-1">
            {change.isPositive ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span
              className={cn(
                'text-xs font-medium',
                change.isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              {change.isPositive ? '+' : ''}{change.value}%
            </span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  const { data: kpis, isLoading } = useSalesKPIs();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!kpis) return null;

  const kpiData = [
    {
      title: 'Today Sales',
      value: `$${kpis.today_sales.toLocaleString()}`,
      change: { value: 12.5, isPositive: true },
      icon: DollarSign,
      description: 'Today',
    },
    {
      title: 'Total Orders',
      value: kpis.orders_count,
      change: { value: 8.3, isPositive: true },
      icon: ShoppingCart,
      description: 'All orders',
    },
    {
      title: 'Pending Deliveries',
      value: kpis.pending_deliveries,
      change: { value: -2.1, isPositive: false },
      icon: Package,
      description: 'Awaiting delivery',
    },
    {
      title: 'Outstanding Payments',
      value: `$${kpis.outstanding_payments.toLocaleString()}`,
      change: { value: -5.2, isPositive: true },
      icon: AlertCircle,
      description: 'Unpaid amount',
    },
    {
      title: 'Total Invoices',
      value: kpis.invoices_count,
      change: { value: 3.1, isPositive: true },
      icon: Target,
      description: 'All invoices',
    },
    {
      title: 'Payments Received',
      value: kpis.payments_count,
      change: { value: 15.8, isPositive: true },
      icon: BarChart3,
      description: 'Payment entries',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}