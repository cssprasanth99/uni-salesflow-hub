import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, ShoppingCart, Truck, Receipt, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const flowSteps = [
  {
    id: 'quotation',
    name: 'Quotation',
    icon: FileText,
    href: '/quotations',
    description: 'Optional quote',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
  {
    id: 'order',
    name: 'Sales Order',
    icon: ShoppingCart,
    href: '/orders',
    description: 'Confirmed order',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    id: 'delivery',
    name: 'Delivery Note',
    icon: Truck,
    href: '/deliveries',
    description: 'Goods delivered',
    color: 'text-warning',
    bgColor: 'bg-warning-light',
  },
  {
    id: 'invoice',
    name: 'Sales Invoice',
    icon: Receipt,
    href: '/invoices',
    description: 'Bill generated',
    color: 'text-accent',
    bgColor: 'bg-success-light',
  },
  {
    id: 'payment',
    name: 'Payment Entry',
    icon: CreditCard,
    href: '/payments',
    description: 'Payment received',
    color: 'text-success',
    bgColor: 'bg-success-light',
  },
];

export function SalesFlowDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Sales Process Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2 lg:gap-4">
              {/* Step Card */}
              <Link to={step.href} className="block">
                <div
                  className={cn(
                    'group relative p-4 rounded-xl border-2 border-border bg-card hover:shadow-lg transition-all duration-200 cursor-pointer',
                    'hover:scale-105 hover:border-primary/50'
                  )}
                >
                  <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <div
                      className={cn(
                        'p-3 rounded-full',
                        step.bgColor
                      )}
                    >
                      <step.icon className={cn('h-6 w-6', step.color)} />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">{step.name}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
              
              {/* Arrow */}
              {index < flowSteps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground hidden lg:block" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary-light rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Click on any step to navigate to that section and manage your sales process
          </p>
        </div>
      </CardContent>
    </Card>
  );
}