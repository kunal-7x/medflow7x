import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Thermometer, Activity, Clock, CheckSquare, Users, AlertCircle } from "lucide-react";

const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    room: "A-101",
    condition: "Post-Surgery",
    vitals: { temp: "98.6°F", bp: "120/80", hr: "72", spo2: "98%" },
    tasks: ["Medication due", "Vitals check", "Wound dressing"],
    priority: "high"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    room: "A-102",
    condition: "Pneumonia",
    vitals: { temp: "101.2°F", bp: "110/70", hr: "88", spo2: "94%" },
    tasks: ["Respiratory therapy", "IV medication"],
    priority: "urgent"
  },
  {
    id: 3,
    name: "Mike Davis",
    room: "A-103",
    condition: "Recovery",
    vitals: { temp: "97.8°F", bp: "115/75", hr: "68", spo2: "99%" },
    tasks: ["Discharge prep"],
    priority: "low"
  }
];

const mockShift = {
  nurse: "Nurse Johnson",
  shift: "Day Shift (7AM - 7PM)",
  patients: 8,
  criticalTasks: 5,
  completedTasks: 12
};

export function NursingStation() {
  const [patients, setPatients] = useState(mockPatients);
  const [activeTab, setActiveTab] = useState("overview");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "warning";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nursing Station</h1>
          <p className="text-muted-foreground">Patient care management and shift coordination</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" variant="medical">
            <Heart className="w-4 h-4" />
            Emergency Alert
          </Button>
          <Button className="gap-2" variant="outline">
            <Users className="w-4 h-4" />
            Shift Handover
          </Button>
        </div>
      </div>

      {/* Shift Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockShift.patients}</p>
                <p className="text-sm text-muted-foreground">Assigned Patients</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{mockShift.criticalTasks}</p>
                <p className="text-sm text-muted-foreground">Critical Tasks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{mockShift.completedTasks}</p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-accent" />
              <div>
                <p className="text-lg font-bold">{mockShift.shift}</p>
                <p className="text-sm text-muted-foreground">{mockShift.nurse}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Patient Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Monitoring</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="handover">Shift Handover</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-medical transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <Badge variant={getPriorityColor(patient.priority) as any}>
                      {patient.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Room {patient.room} • {patient.condition}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Vitals */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-destructive" />
                        <span>{patient.vitals.temp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4 text-primary" />
                        <span>{patient.vitals.bp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-success" />
                        <span>{patient.vitals.hr} BPM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4 text-accent" />
                        <span>{patient.vitals.spo2}</span>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div>
                      <p className="text-sm font-medium mb-2">Pending Tasks:</p>
                      <div className="space-y-1">
                        {patient.tasks.map((task, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckSquare className="w-3 h-3 text-muted-foreground" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Chart
                      </Button>
                      <Button size="sm" variant="medical" className="flex-1">
                        Update Care
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vitals Monitoring Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Room {patient.room}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Temperature:</span>
                        <span className="font-medium">{patient.vitals.temp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Blood Pressure:</span>
                        <span className="font-medium">{patient.vitals.bp}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Heart Rate:</span>
                        <span className="font-medium">{patient.vitals.hr}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>SpO2:</span>
                        <span className="font-medium">{patient.vitals.spo2}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3" variant="outline">
                      Update Vitals
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-destructive bg-destructive/5 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-destructive">Urgent: Medication Due</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson - Room A-102</p>
                    </div>
                    <Button size="sm" variant="destructive">Complete</Button>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-warning bg-warning/5 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-warning">High: Wound Dressing</p>
                      <p className="text-sm text-muted-foreground">John Smith - Room A-101</p>
                    </div>
                    <Button size="sm" variant="warning">Complete</Button>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-primary">Routine: Discharge Preparation</p>
                      <p className="text-sm text-muted-foreground">Mike Davis - Room A-103</p>
                    </div>
                    <Button size="sm" variant="outline">Complete</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="handover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shift Handover Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Critical Updates</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Sarah Johnson (A-102): Fever spike at 2 PM, medication adjusted</p>
                    <p>• John Smith (A-101): Post-surgery recovery progressing well</p>
                    <p>• New admission expected at 8 PM - Room A-105</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Pending Tasks for Next Shift</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Room A-102: Respiratory therapy at 8 PM</p>
                    <p>• Room A-103: Discharge paperwork completion</p>
                    <p>• Room A-101: Midnight vitals check</p>
                  </div>
                </div>
                <Button className="w-full">Generate Handover Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}