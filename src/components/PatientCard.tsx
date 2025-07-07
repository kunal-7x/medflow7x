import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Calendar,
  MapPin,
  Heart,
  Activity,
  FileText,
  Phone,
  Mail,
  AlertTriangle
} from "lucide-react";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: 'Critical' | 'Stable' | 'Good' | 'Fair';
    bedNumber: string;
    admissionDate: string;
    doctor: string;
    diagnosis: string;
    allergies?: string[];
    vitals: {
      heartRate: number;
      bloodPressure: string;
      temperature: number;
      oxygenSat: number;
    };
    lastUpdated: string;
    avatar?: string;
    contactInfo: {
      phone: string;
      email: string;
      emergencyContact: string;
    };
  };
}

export function PatientCard({ patient }: PatientCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Fair':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Stable':
        return 'bg-success/10 text-success border-success/20';
      case 'Good':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getVitalStatus = (vital: string, value: number) => {
    // Simple logic for demonstration
    if (vital === 'heartRate') {
      return value > 100 || value < 60 ? 'text-warning' : 'text-success';
    }
    if (vital === 'temperature') {
      return value > 37.5 || value < 36 ? 'text-warning' : 'text-success';
    }
    if (vital === 'oxygenSat') {
      return value < 95 ? 'text-destructive' : 'text-success';
    }
    return 'text-foreground';
  };

  return (
    <Card className="hover:shadow-medical transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <CardDescription className="flex items-center gap-4 mt-1">
                <span>{patient.age}y • {patient.gender}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {patient.bedNumber}
                </span>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getConditionColor(patient.condition)}>
            {patient.condition === 'Critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {patient.condition}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">ID:</span>
            <span className="ml-2 font-medium">{patient.id}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Doctor:</span>
            <span className="ml-2 font-medium">{patient.doctor}</span>
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Diagnosis:</span>
            <span className="ml-2 font-medium">{patient.diagnosis}</span>
          </div>
        </div>

        {/* Allergies */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div>
            <span className="text-sm text-muted-foreground">Allergies:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-destructive/10 text-destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Vitals */}
        <div className="border rounded-lg p-3 bg-muted/20">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Latest Vitals</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heart Rate:</span>
              <span className={getVitalStatus('heartRate', patient.vitals.heartRate)}>
                {patient.vitals.heartRate} bpm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">BP:</span>
              <span>{patient.vitals.bloodPressure}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Temp:</span>
              <span className={getVitalStatus('temperature', patient.vitals.temperature)}>
                {patient.vitals.temperature}°C
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">O2 Sat:</span>
              <span className={getVitalStatus('oxygenSat', patient.vitals.oxygenSat)}>
                {patient.vitals.oxygenSat}%
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>{patient.contactInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3" />
            <span>{patient.contactInfo.email}</span>
          </div>
        </div>

        {/* Admission Info */}
        <div className="text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Admitted: {patient.admissionDate}</span>
          </div>
          <div className="mt-1">
            <span>Last updated: {patient.lastUpdated}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="w-4 h-4 mr-1" />
            Chart
          </Button>
          <Button variant="medical" size="sm" className="flex-1">
            <Activity className="w-4 h-4 mr-1" />
            Vitals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}