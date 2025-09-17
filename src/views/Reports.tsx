import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, FileDown, Calendar, Filter, TrendingUp } from 'lucide-react';
import { useIndustryStore } from '@/state/industryStore';

export function Reports() {
  const { mode } = useIndustryStore();
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedReport, setSelectedReport] = useState('sales-register');

  const reports = [
    { value: 'sales-register', label: 'Sales Register', description: 'Detailed sales transactions' },
    { value: 'accounts-receivable', label: 'Accounts Receivable', description: 'Outstanding customer payments' },
    { value: 'item-wise-sales', label: 'Item-wise Sales', description: 'Sales by product/service' },
    { value: 'customer-wise-sales', label: 'Customer-wise Sales', description: 'Sales by customer' },
    { value: 'territory-wise-sales', label: 'Territory-wise Sales', description: 'Sales by territory' },
    { value: 'sales-analytics', label: 'Sales Analytics', description: 'Advanced sales insights' },
  ];

  const mockData = [
    { customer: 'ABC Corp', items: 12, amount: 15750, status: 'Paid' },
    { customer: 'XYZ Ltd', items: 8, amount: 12300, status: 'Outstanding' },
    { customer: 'Tech Solutions', items: 5, amount: 8900, status: 'Paid' },
    { customer: 'Retail Store', items: 20, amount: 3400, status: 'Overdue' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Reports</h1>
          <p className="text-muted-foreground">
            Analyze your {mode} sales performance and trends
          </p>
        </div>
        <Button>
          <FileDown className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reports.map((report) => (
                    <SelectItem key={report.value} value={report.value}>
                      {report.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>From Date</Label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>To Date</Label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Actions</Label>
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Total Sales</span>
            </div>
            <div className="text-2xl font-bold mt-2">$40,350</div>
            <p className="text-xs text-muted-foreground mt-1">This period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Transactions</span>
            </div>
            <div className="text-2xl font-bold mt-2">45</div>
            <p className="text-xs text-muted-foreground mt-1">Total count</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Avg Transaction</span>
            </div>
            <div className="text-2xl font-bold mt-2">$897</div>
            <p className="text-xs text-muted-foreground mt-1">Per sale</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Growth Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2 text-success">+12.5%</div>
            <p className="text-xs text-muted-foreground mt-1">vs last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Data */}
      <Card>
        <CardHeader>
          <CardTitle>
            {reports.find(r => r.value === selectedReport)?.label || 'Sales Register'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.map((row, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{row.customer}</h4>
                  <p className="text-sm text-muted-foreground">{row.items} items</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${row.amount.toLocaleString()}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    row.status === 'Paid' ? 'bg-success/10 text-success' :
                    row.status === 'Outstanding' ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold">${mockData.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}