import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Store, Settings as SettingsIcon, Cog, Database, Key } from 'lucide-react';
import { useIndustryStore, IndustryMode } from '@/state/industryStore';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { mode, setMode } = useIndustryStore();
  const { toast } = useToast();

  const handleModeChange = (newMode: IndustryMode) => {
    setMode(newMode);
    toast({
      title: "Industry Mode Updated",
      description: `Switched to ${newMode} mode successfully`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Industry Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-primary" />
            Industry Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Choose your industry mode to customize the dashboard experience and features.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Wholesale Mode */}
            <div
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                mode === 'wholesale'
                  ? 'border-primary bg-primary-light'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleModeChange('wholesale')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Wholesale (B2B)</h3>
                </div>
                {mode === 'wholesale' && (
                  <Badge variant="default">Active</Badge>
                )}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Bulk order processing</li>
                <li>• Warehouse-wise stock management</li>
                <li>• Credit terms and payment cycles</li>
                <li>• Volume-based pricing</li>
                <li>• Advanced reporting</li>
              </ul>
            </div>

            {/* Retail Mode */}
            <div
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                mode === 'retail'
                  ? 'border-primary bg-primary-light'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleModeChange('retail')}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Retail (B2C)</h3>
                </div>
                {mode === 'retail' && (
                  <Badge variant="default">Active</Badge>
                )}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Point-of-sale interface</li>
                <li>• Quick customer creation</li>
                <li>• Instant payments</li>
                <li>• Simple inventory tracking</li>
                <li>• Customer loyalty programs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ERPNext Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            ERPNext Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Configure your ERPNext backend connection and API settings.
          </p>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">API Connection</h4>
                <p className="text-sm text-muted-foreground">
                  Status: Connected to ERPNext backend
                </p>
              </div>
              <Badge variant="default" className="bg-success text-success-foreground">
                Connected
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Base URL</h4>
                <p className="text-sm text-muted-foreground">
                  /api/resource (Frappe API endpoint)
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Using session-based authentication
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Key className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle>Application Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Framework:</span>
              <span>React + ERPNext</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Architecture:</span>
              <span>MVC Pattern</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">State Management:</span>
              <span>React Query + Zustand</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}