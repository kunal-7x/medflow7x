import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Bed,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  MapPin
} from "lucide-react";

interface BedData {
  id: string;
  number: string;
  ward: string;
  floor: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'reserved';
  patient?: {
    name: string;
    id: string;
    admissionDate: string;
    condition: string;
  };
  lastCleaned?: string;
  notes?: string;
}

export function BedManagement() {
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<BedData | null>(null);

  const beds: BedData[] = [
    {
      id: "1",
      number: "ICU-01",
      ward: "ICU",
      floor: 3,
      status: "occupied",
      patient: {
        name: "John Doe",
        id: "P001",
        admissionDate: "2024-01-15",
        condition: "Critical"
      },
      lastCleaned: "2024-01-15 08:00"
    },
    {
      id: "2",
      number: "ICU-02",
      ward: "ICU",
      floor: 3,
      status: "available",
      lastCleaned: "2024-01-15 10:30"
    },
    {
      id: "3",
      number: "GA-101",
      ward: "General Ward A",
      floor: 2,
      status: "occupied",
      patient: {
        name: "Jane Smith",
        id: "P002",
        admissionDate: "2024-01-14",
        condition: "Stable"
      },
      lastCleaned: "2024-01-14 09:00"
    },
    {
      id: "4",
      number: "GA-102",
      ward: "General Ward A",
      floor: 2,
      status: "maintenance",
      notes: "Air conditioning repair needed",
      lastCleaned: "2024-01-13 14:00"
    },
    {
      id: "5",
      number: "GA-103",
      ward: "General Ward A",
      floor: 2,
      status: "cleaning",
      lastCleaned: "In progress"
    },
    {
      id: "6",
      number: "ER-01",
      ward: "Emergency",
      floor: 1,
      status: "reserved",
      notes: "Reserved for incoming ambulance",
      lastCleaned: "2024-01-15 12:00"
    }
  ];

  const wards = ["all", "ICU", "General Ward A", "General Ward B", "Emergency", "Pediatrics"];

  const filteredBeds = beds.filter(bed => {
    const matchesWard = selectedWard === "all" || bed.ward === selectedWard;
    const matchesSearch = bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.ward.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWard && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />;
      case 'occupied':
        return <User className="w-4 h-4" />;
      case 'maintenance':
        return <Settings className="w-4 h-4" />;
      case 'cleaning':
        return <Clock className="w-4 h-4" />;
      case 'reserved':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bed className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-status-available/10 text-status-available border-status-available/20';
      case 'occupied':
        return 'bg-status-occupied/10 text-status-occupied border-status-occupied/20';
      case 'maintenance':
        return 'bg-status-maintenance/10 text-status-maintenance border-status-maintenance/20';
      case 'cleaning':
        return 'bg-status-cleaning/10 text-status-cleaning border-status-cleaning/20';
      case 'reserved':
        return 'bg-status-reserved/10 text-status-reserved border-status-reserved/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const statusCounts = {
    total: beds.length,
    available: beds.filter(b => b.status === 'available').length,
    occupied: beds.filter(b => b.status === 'occupied').length,
    maintenance: beds.filter(b => b.status === 'maintenance').length,
    cleaning: beds.filter(b => b.status === 'cleaning').length,
    reserved: beds.filter(b => b.status === 'reserved').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Bed Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time bed allocation and patient assignment
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Floor Plan View
          </Button>
          <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="medical" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Assign Patient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Patient to Bed</DialogTitle>
                <DialogDescription>
                  Select an available bed and assign a patient
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient-id" className="text-right">
                    Patient ID
                  </Label>
                  <Input id="patient-id" placeholder="P001" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bed-select" className="text-right">
                    Bed
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select available bed" />
                    </SelectTrigger>
                    <SelectContent>
                      {beds
                        .filter(bed => bed.status === 'available')
                        .map(bed => (
                          <SelectItem key={bed.id} value={bed.id}>
                            {bed.number} - {bed.ward}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or notes..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="medical" onClick={() => setIsAssignDialogOpen(false)}>
                  Assign Patient
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="hover:shadow-medical transition-all duration-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{statusCounts.total}</div>
              <div className="text-sm text-muted-foreground">Total Beds</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-medical transition-all duration-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-available">{statusCounts.available}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-medical transition-all duration-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-occupied">{statusCounts.occupied}</div>
              <div className="text-sm text-muted-foreground">Occupied</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-medical transition-all duration-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-reserved">{statusCounts.reserved}</div>
              <div className="text-sm text-muted-foreground">Reserved</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-medical transition-all duration-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-cleaning">{statusCounts.cleaning}</div>
              <div className="text-sm text-muted-foreground">Cleaning</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-medical transition-all duration-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-status-maintenance">{statusCounts.maintenance}</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search beds, patients, or wards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {wards.map(ward => (
                  <SelectItem key={ward} value={ward}>
                    {ward === "all" ? "All Wards" : ward}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => (
          <Card key={bed.id} className="hover:shadow-medical transition-all duration-200 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{bed.number}</CardTitle>
                <Badge variant="outline" className={getStatusColor(bed.status)}>
                  {getStatusIcon(bed.status)}
                  <span className="ml-1 capitalize">{bed.status}</span>
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {bed.ward} - Floor {bed.floor}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bed.patient ? (
                <div className="space-y-2">
                  <div className="font-medium text-sm">Patient: {bed.patient.name}</div>
                  <div className="text-xs text-muted-foreground">
                    ID: {bed.patient.id} • Admitted: {bed.patient.admissionDate}
                  </div>
                  <Badge variant="outline" className={
                    bed.patient.condition === 'Critical' ? 'bg-destructive/10 text-destructive' :
                    bed.patient.condition === 'Stable' ? 'bg-success/10 text-success' :
                    'bg-warning/10 text-warning'
                  }>
                    {bed.patient.condition}
                  </Badge>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {bed.status === 'available' ? 'Ready for patient assignment' :
                   bed.status === 'maintenance' ? 'Under maintenance' :
                   bed.status === 'cleaning' ? 'Being cleaned' :
                   bed.status === 'reserved' ? 'Reserved' : 'Status unknown'}
                </div>
              )}
              
              {bed.notes && (
                <div className="text-xs p-2 bg-muted/50 rounded border-l-2 border-primary/30">
                  {bed.notes}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground">
                Last cleaned: {bed.lastCleaned}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
                {bed.status === 'available' && (
                  <Button 
                    variant="medical" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedBed(bed);
                      setIsAssignDialogOpen(true);
                    }}
                  >
                    Assign
                  </Button>
                )}
                {bed.status === 'occupied' && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Discharge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBeds.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No beds found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}