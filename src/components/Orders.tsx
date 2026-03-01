import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TestTube, Scan, Plus, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const mockOrders = [
  {
    id: 1,
    patient: "John Smith",
    type: "Lab",
    test: "Complete Blood Count",
    doctor: "Dr. Wilson",
    status: "pending",
    ordered: "2024-01-15 09:30",
    priority: "routine"
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    type: "Imaging",
    test: "Chest X-Ray",
    doctor: "Dr. Brown",
    status: "completed",
    ordered: "2024-01-15 08:15",
    priority: "urgent"
  },
  {
    id: 3,
    patient: "Mike Davis",
    type: "Lab",
    test: "Lipid Panel",
    doctor: "Dr. Miller",
    status: "in-progress",
    ordered: "2024-01-15 10:00",
    priority: "stat"
  }
];

const mockResults = [
  {
    id: 1,
    patient: "Lisa Brown",
    type: "Lab",
    test: "Glucose Level",
    result: "Normal - 95 mg/dL",
    doctor: "Dr. Smith",
    completed: "2024-01-15 11:30",
    status: "reviewed"
  },
  {
    id: 2,
    patient: "Robert Wilson",
    type: "Imaging",
    test: "MRI Brain",
    result: "Report Available",
    doctor: "Dr. Martinez",
    completed: "2024-01-15 10:45",
    status: "pending-review"
  }
];

export function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [results, setResults] = useState(mockResults);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "in-progress": return "warning";
      case "pending": return "secondary";
      case "reviewed": return "success";
      case "pending-review": return "warning";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "stat": return "destructive";
      case "urgent": return "warning";
      case "routine": return "secondary";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Lab": return TestTube;
      case "Imaging": return Scan;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Orders & Results</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage lab orders, imaging requests, and results</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" variant="default">
            <Plus className="w-4 h-4" />
            New Lab Order
          </Button>
          <Button className="gap-2" variant="medical">
            <Plus className="w-4 h-4" />
            New Imaging
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Today's Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Pending Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold">16</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Critical Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Active Orders</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => {
                  const TypeIcon = getTypeIcon(order.type);
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <TypeIcon className="w-8 h-8 text-primary" />
                        <div>
                          <p className="font-medium">{order.test}</p>
                          <p className="text-sm text-muted-foreground">{order.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            Ordered by {order.doctor} • {order.ordered}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getPriorityColor(order.priority) as any}>
                          {order.priority}
                        </Badge>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status}
                        </Badge>
                        <Badge variant="outline">{order.type}</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="medical">Update Status</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result) => {
                  const TypeIcon = getTypeIcon(result.type);
                  return (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <TypeIcon className="w-8 h-8 text-success" />
                        <div>
                          <p className="font-medium">{result.test}</p>
                          <p className="text-sm text-muted-foreground">{result.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            Completed: {result.completed} • {result.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium">{result.result}</p>
                          <Badge variant={getStatusColor(result.status) as any}>
                            {result.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Report</Button>
                          <Button size="sm" variant="success">Mark Reviewed</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Order History</p>
                <p className="text-muted-foreground">Complete history of all orders and results</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}