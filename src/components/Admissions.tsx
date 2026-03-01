import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, UserMinus, Clock, FileText, AlertCircle, CheckCircle } from "lucide-react";

const mockAdmissions = [
  { id: 1, patient: "Emily Brown", room: "A-101", admitDate: "2024-01-15", admitTime: "08:30", condition: "Pneumonia", status: "active", doctor: "Dr. Wilson", insurance: "verified" },
  { id: 2, patient: "Robert Davis", room: "B-205", admitDate: "2024-01-14", admitTime: "15:45", condition: "Appendicitis", status: "discharge-pending", doctor: "Dr. Martinez", insurance: "pending" }
];

const mockDischarges = [
  { id: 1, patient: "Lisa Johnson", room: "C-301", dischargeDate: "2024-01-15", dischargeTime: "11:00", condition: "Recovery Complete", status: "completed", doctor: "Dr. Smith", followUp: "2024-01-22" }
];

export function Admissions() {
  const [admissions, setAdmissions] = useState(mockAdmissions);
  const [discharges, setDischarges] = useState(mockDischarges);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "discharge-pending": return "warning";
      case "completed": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Admissions & Discharge</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage patient admissions and discharge processes</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 text-xs" variant="default" size="sm"><UserPlus className="w-3.5 h-3.5" /> New Admission</Button>
          <Button className="gap-2 text-xs" variant="medical" size="sm"><UserMinus className="w-3.5 h-3.5" /> Discharge</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: UserPlus, value: "8", label: "Today's Admissions", color: "text-primary" },
          { icon: UserMinus, value: "5", label: "Today's Discharges", color: "text-success" },
          { icon: Clock, value: "12", label: "Pending Discharge", color: "text-warning" },
          { icon: AlertCircle, value: "3", label: "Insurance Issues", color: "text-destructive" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold animate-count-up">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="admissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="admissions">Active Admissions</TabsTrigger>
          <TabsTrigger value="discharges">Recent Discharges</TabsTrigger>
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="admissions" className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Current Admissions</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {admissions.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-primary/20 bg-secondary/10 hover:bg-secondary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-center"><p className="font-semibold text-sm font-mono">{a.room}</p><p className="text-[10px] text-muted-foreground">Room</p></div>
                      <div>
                        <p className="font-medium text-sm">{a.patient}</p>
                        <p className="text-xs text-muted-foreground">{a.doctor}</p>
                        <p className="text-[10px] text-muted-foreground">Admitted: {a.admitDate} at {a.admitTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(a.status) as any}>{a.status}</Badge>
                      <Badge variant="outline">{a.condition}</Badge>
                      {a.insurance === "verified" ? <CheckCircle className="w-4 h-4 text-success" /> : <AlertCircle className="w-4 h-4 text-warning" />}
                      <Button size="sm" variant="outline" className="text-xs h-7">Details</Button>
                      <Button size="sm" variant="medical" className="text-xs h-7">Discharge</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discharges" className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Recent Discharges</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {discharges.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-secondary/10 hover:bg-secondary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-center"><p className="font-semibold text-sm font-mono">{d.room}</p><p className="text-[10px] text-muted-foreground">Room</p></div>
                      <div>
                        <p className="font-medium text-sm">{d.patient}</p>
                        <p className="text-xs text-muted-foreground">{d.doctor}</p>
                        <p className="text-[10px] text-muted-foreground">Discharged: {d.dischargeDate} at {d.dischargeTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Discharged</Badge>
                      <Button size="sm" variant="outline" className="text-xs h-7"><FileText className="w-3 h-3 mr-1" /> Summary</Button>
                      <Button size="sm" variant="outline" className="text-xs h-7">Follow-up</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Pending Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border-l-2 border-warning bg-warning/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium text-sm">Insurance Verification Required</p><p className="text-xs text-muted-foreground">Robert Davis - Room B-205</p></div>
                    <Button size="sm" variant="warning" className="text-xs h-7">Verify Now</Button>
                  </div>
                </div>
                <div className="p-3 border-l-2 border-primary bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium text-sm">Discharge Summary Pending</p><p className="text-xs text-muted-foreground">Maria Garcia - Room A-205</p></div>
                    <Button size="sm" variant="default" className="text-xs h-7">Complete Summary</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
