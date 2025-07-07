import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Bed, 
  DollarSign, 
  Clock,
  Download,
  Filter,
  Calendar
} from "lucide-react";

const mockAnalytics = {
  occupancy: { current: 85, trend: 5.2, target: 80 },
  avgStay: { current: 4.2, trend: -0.8, target: 5.0 },
  revenue: { current: 1250000, trend: 12.5, target: 1200000 },
  satisfaction: { current: 4.6, trend: 0.3, target: 4.5 }
};

const mockChartData = [
  { month: "Jan", occupancy: 78, revenue: 980000, satisfaction: 4.2 },
  { month: "Feb", occupancy: 82, revenue: 1100000, satisfaction: 4.4 },
  { month: "Mar", occupancy: 85, revenue: 1250000, satisfaction: 4.6 },
  { month: "Apr", occupancy: 88, revenue: 1350000, satisfaction: 4.7 },
  { month: "May", occupancy: 92, revenue: 1450000, satisfaction: 4.8 },
  { month: "Jun", occupancy: 85, revenue: 1250000, satisfaction: 4.6 }
];

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getTrendColor = (trend: number) => {
    return trend > 0 ? "text-success" : "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Hospital performance insights and data analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bed Occupancy</p>
                <p className="text-2xl font-bold">{mockAnalytics.occupancy.current}%</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(mockAnalytics.occupancy.trend)}
                  <span className={`text-sm ${getTrendColor(mockAnalytics.occupancy.trend)}`}>
                    {Math.abs(mockAnalytics.occupancy.trend)}%
                  </span>
                </div>
              </div>
              <Bed className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Stay (days)</p>
                <p className="text-2xl font-bold">{mockAnalytics.avgStay.current}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(mockAnalytics.avgStay.trend)}
                  <span className={`text-sm ${getTrendColor(mockAnalytics.avgStay.trend)}`}>
                    {Math.abs(mockAnalytics.avgStay.trend)}
                  </span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(mockAnalytics.revenue.current)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(mockAnalytics.revenue.trend)}
                  <span className={`text-sm ${getTrendColor(mockAnalytics.revenue.trend)}`}>
                    {Math.abs(mockAnalytics.revenue.trend)}%
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                <p className="text-2xl font-bold">{mockAnalytics.satisfaction.current}/5</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(mockAnalytics.satisfaction.trend)}
                  <span className={`text-sm ${getTrendColor(mockAnalytics.satisfaction.trend)}`}>
                    {Math.abs(mockAnalytics.satisfaction.trend)}
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChartData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted h-2 rounded-full">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${data.occupancy}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{data.occupancy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: "Emergency", score: 92, status: "excellent" },
                    { dept: "ICU", score: 88, status: "good" },
                    { dept: "Surgery", score: 95, status: "excellent" },
                    { dept: "Cardiology", score: 85, status: "good" },
                    { dept: "Pediatrics", score: 90, status: "excellent" }
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dept.dept}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={dept.status === "excellent" ? "default" : "secondary"}>
                          {dept.score}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{formatCurrency(1250000)}</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{formatCurrency(980000)}</p>
                  <p className="text-sm text-muted-foreground">Collections</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{formatCurrency(270000)}</p>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational">
          <Card>
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">324</p>
                  <p className="text-sm text-muted-foreground">Total Admissions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">298</p>
                  <p className="text-sm text-muted-foreground">Discharges</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">4.2</p>
                  <p className="text-sm text-muted-foreground">Avg Length of Stay</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">12 min</p>
                  <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Quality Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">98.5%</p>
                  <p className="text-sm text-muted-foreground">Patient Safety Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2.1%</p>
                  <p className="text-sm text-muted-foreground">Readmission Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">99.2%</p>
                  <p className="text-sm text-muted-foreground">Medication Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}