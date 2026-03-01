import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Bed, DollarSign, Clock, Download, Filter } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { useHospitalData } from "@/contexts/HospitalDataContext";

export function Analytics() {
  const { patients, beds, appointments, orders, bills, staff } = useHospitalData();
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  // Dynamic analytics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'active').length;
  const occupiedBeds = beds.filter(b => b.status === 'occupied').length;
  const totalBeds = beds.length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
  const totalRevenue = bills.reduce((sum, b) => sum + b.amount, 0);
  const activeStaff = staff.filter(s => s.status === 'active').length;

  const chartData = [
    { month: "Jan", occupancy: 78, revenue: 980000, patients: 45 },
    { month: "Feb", occupancy: 82, revenue: 1100000, patients: 52 },
    { month: "Mar", occupancy: occupancyRate, revenue: totalRevenue, patients: totalPatients },
    { month: "Apr", occupancy: 88, revenue: 1350000, patients: 58 },
    { month: "May", occupancy: 92, revenue: 1450000, patients: 62 },
    { month: "Jun", occupancy: occupancyRate, revenue: totalRevenue, patients: totalPatients }
  ];

  const deptData = [
    { name: "Emergency", value: 92 },
    { name: "ICU", value: 88 },
    { name: "Surgery", value: 95 },
    { name: "Cardiology", value: 85 },
    { name: "Pediatrics", value: 90 },
  ];

  const pieColors = ["hsl(48, 96%, 53%)", "hsl(160, 60%, 45%)", "hsl(200, 70%, 55%)", "hsl(280, 60%, 55%)", "hsl(0, 72%, 51%)"];

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Analytics & Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Hospital performance insights and data analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-xs" size="sm"><Filter className="w-3.5 h-3.5" /> Filter</Button>
          <Button variant="outline" className="gap-2 text-xs" size="sm"><Download className="w-3.5 h-3.5" /> Export</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Bed Occupancy", value: `${occupancyRate}%`, trend: 5.2, icon: Bed },
          { label: "Active Patients", value: activePatients.toString(), trend: 3.1, icon: Users },
          { label: "Revenue", value: formatCurrency(totalRevenue), trend: 12.5, icon: DollarSign },
          { label: "Active Staff", value: activeStaff.toString(), trend: 1.8, icon: Clock },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold mt-1 animate-count-up">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend > 0 ? <TrendingUp className="w-3 h-3 text-success" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                    <span className={`text-xs ${kpi.trend > 0 ? 'text-success' : 'text-destructive'}`}>{Math.abs(kpi.trend)}%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Occupancy Trends</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(48, 96%, 53%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(48, 96%, 53%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 10%, 16%)" />
                    <XAxis dataKey="month" stroke="hsl(225, 8%, 50%)" fontSize={11} />
                    <YAxis stroke="hsl(225, 8%, 50%)" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(225, 12%, 10%)', border: '1px solid hsl(225, 10%, 16%)', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="occupancy" stroke="hsl(48, 96%, 53%)" fill="url(#goldGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base">Department Performance</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                      {deptData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(225, 12%, 10%)', border: '1px solid hsl(225, 10%, 16%)', borderRadius: '8px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {deptData.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                      <span className="text-muted-foreground">{d.name}: {d.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 10%, 16%)" />
                  <XAxis dataKey="month" stroke="hsl(225, 8%, 50%)" fontSize={11} />
                  <YAxis stroke="hsl(225, 8%, 50%)" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(225, 12%, 10%)', border: '1px solid hsl(225, 10%, 16%)', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="hsl(48, 96%, 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Financial Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold text-success">{formatCurrency(bills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0))}</p>
                  <p className="text-xs text-muted-foreground mt-1">Collections</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold text-warning">{formatCurrency(bills.filter(b => b.status === 'pending').reduce((s, b) => s + b.amount, 0))}</p>
                  <p className="text-xs text-muted-foreground mt-1">Outstanding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Operational Metrics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Admissions", value: patients.length },
                  { label: "Discharges", value: patients.filter(p => p.status === 'discharged').length },
                  { label: "Avg Stay", value: "4.2 days" },
                  { label: "Avg Wait", value: "12 min" },
                ].map((m, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-secondary/20">
                    <p className="text-2xl font-bold">{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Clinical Quality</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Safety Score", value: "98.5%", color: "text-success" },
                  { label: "Readmission Rate", value: "2.1%", color: "text-primary" },
                  { label: "Med Accuracy", value: "99.2%", color: "text-success" },
                ].map((m, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-secondary/20">
                    <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
