import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, Search, Plus, Eye, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { erpNextApi } from '@/models/erpNextApi';
import { useIndustryStore } from '@/state/industryStore';
import { Skeleton } from '@/components/ui/skeleton';

export function Items() {
  const { mode } = useIndustryStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: items, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: erpNextApi.getItems.bind(erpNextApi),
  });

  const filteredItems = Array.isArray(items) ? items.filter(item => 
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.item_code.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Items & Stock</h1>
          <p className="text-muted-foreground">
            Manage your inventory and check stock availability
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
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
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Items</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(items) ? items.length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Low Stock</span>
            </div>
            <div className="text-2xl font-bold mt-2">0</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Stock Items</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(items) ? items.filter(i => i.is_stock_item).length : 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Service Items</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {isLoading ? '...' : Array.isArray(items) ? items.filter(i => !i.is_stock_item).length : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items List */}
      <Card>
        <CardHeader>
          <CardTitle>Items List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
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
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-light rounded-lg">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.item_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Code: {item.item_code}</span>
                        <span>UOM: {item.stock_uom}</span>
                        {item.description && (
                          <span className="max-w-xs truncate">{item.description}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold">${item.standard_rate?.toLocaleString()}</div>
                      <Badge variant={item.is_stock_item ? 'default' : 'secondary'} className="text-xs">
                        {item.is_stock_item ? 'Stock Item' : 'Service'}
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
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms' : 'Add your first item to get started'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}