import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateLargeDataset } from '@/lib/mockDataGenerator';

// Types
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: 'Critical' | 'Stable' | 'Good' | 'Fair';
  bedNumber: string;
  admissionDate: string;
  doctor: string;
  diagnosis: string;
  allergies: string[];
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
    timestamp: string;
  };
  vitalsHistory: Array<{
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
    timestamp: string;
  }>;
  lastUpdated: string;
  contactInfo: {
    phone: string;
    email: string;
    emergencyContact: string;
  };
  status: 'active' | 'discharged';
}

export interface Bed {
  id: string;
  number: string;
  ward: string;
  floor: number;
  status: 'occupied' | 'available' | 'maintenance' | 'cleaning';
  patientId?: string;
  assignedDate?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  phone: string;
  notes?: string;
}

export interface Order {
  id: string;
  patientId: string;
  patientName: string;
  type: 'Lab' | 'Imaging' | 'Pharmacy';
  test: string;
  doctor: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  ordered: string;
  priority: 'routine' | 'urgent' | 'stat';
  result?: string;
  completedDate?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  doctor: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'discontinued';
  administrationLog: Array<{
    timestamp: string;
    administeredBy: string;
    notes?: string;
  }>;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  shift: string;
  phone: string;
  email: string;
  status: 'active' | 'on-leave' | 'off-duty';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  patientId?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  items: Array<{
    description: string;
    amount: number;
  }>;
  insuranceClaimId?: string;
}

// Context
interface HospitalDataContextType {
  patients: Patient[];
  beds: Bed[];
  appointments: Appointment[];
  orders: Order[];
  medications: Medication[];
  staff: Staff[];
  alerts: Alert[];
  bills: Bill[];
  
  addPatient: (patient: Omit<Patient, 'id'>) => string;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  dischargePatient: (id: string) => void;
  updatePatientVitals: (id: string, vitals: Patient['vitals']) => void;
  
  assignBed: (bedId: string, patientId: string) => void;
  releaseBed: (bedId: string) => void;
  transferPatient: (patientId: string, newBedId: string) => void;
  updateBedStatus: (bedId: string, status: Bed['status']) => void;
  
  addAppointment: (appointment: Omit<Appointment, 'id'>) => string;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  addOrder: (order: Omit<Order, 'id'>) => string;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  
  addMedication: (medication: Omit<Medication, 'id'>) => string;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  administerMedication: (id: string, administeredBy: string, notes?: string) => void;
  
  addStaff: (staff: Omit<Staff, 'id'>) => string;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  
  addAlert: (alert: Omit<Alert, 'id'>) => string;
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  deleteAlert: (id: string) => void;
  
  addBill: (bill: Omit<Bill, 'id'>) => string;
  updateBill: (id: string, updates: Partial<Bill>) => void;
  deleteBill: (id: string) => void;
  
  getAnalytics: () => any;
  resetData: () => void;
  exportAllData: () => any;
  importData: (data: any) => void;
}

const HospitalDataContext = createContext<HospitalDataContextType | null>(null);

export const HospitalDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('hospitalData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // If old small dataset, regenerate
        if (parsed.patients && parsed.patients.length < 50) {
          return generateLargeDataset();
        }
        return parsed;
      } catch {
        return generateLargeDataset();
      }
    }
    return generateLargeDataset();
  });

  useEffect(() => {
    localStorage.setItem('hospitalData', JSON.stringify(data));
  }, [data]);

  const generateId = (prefix: string) => `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

  // Patient Operations
  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const id = generateId('P');
    setData((prev: any) => ({ ...prev, patients: [...prev.patients, { ...patient, id }] }));
    return id;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setData((prev: any) => ({ ...prev, patients: prev.patients.map((p: any) => p.id === id ? { ...p, ...updates } : p) }));
  };

  const deletePatient = (id: string) => {
    setData((prev: any) => ({
      ...prev,
      patients: prev.patients.filter((p: any) => p.id !== id),
      beds: prev.beds.map((b: any) => b.patientId === id ? { ...b, patientId: undefined, status: 'available' } : b)
    }));
  };

  const dischargePatient = (id: string) => {
    setData((prev: any) => ({
      ...prev,
      patients: prev.patients.map((p: any) => p.id === id ? { ...p, status: 'discharged', bedNumber: 'Discharged' } : p),
      beds: prev.beds.map((b: any) => b.patientId === id ? { ...b, patientId: undefined, status: 'cleaning' } : b)
    }));
  };

  const updatePatientVitals = (id: string, vitals: Patient['vitals']) => {
    setData((prev: any) => ({
      ...prev,
      patients: prev.patients.map((p: any) => p.id === id ? { ...p, vitals, vitalsHistory: [vitals, ...p.vitalsHistory], lastUpdated: 'Just now' } : p)
    }));
  };

  // Bed Operations
  const assignBed = (bedId: string, patientId: string) => {
    setData((prev: any) => ({
      ...prev,
      beds: prev.beds.map((b: any) => b.id === bedId ? { ...b, patientId, status: 'occupied', assignedDate: new Date().toISOString().split('T')[0] } : b),
      patients: prev.patients.map((p: any) => p.id === patientId ? { ...p, bedNumber: prev.beds.find((b: any) => b.id === bedId)?.number || p.bedNumber } : p)
    }));
  };

  const releaseBed = (bedId: string) => {
    setData((prev: any) => ({
      ...prev,
      beds: prev.beds.map((b: any) => b.id === bedId ? { ...b, patientId: undefined, status: 'available', assignedDate: undefined } : b)
    }));
  };

  const transferPatient = (patientId: string, newBedId: string) => {
    const currentBed = data.beds.find((b: any) => b.patientId === patientId);
    if (currentBed) releaseBed(currentBed.id);
    assignBed(newBedId, patientId);
  };

  const updateBedStatus = (bedId: string, status: Bed['status']) => {
    setData((prev: any) => ({ ...prev, beds: prev.beds.map((b: any) => b.id === bedId ? { ...b, status } : b) }));
  };

  // Appointment Operations
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const id = generateId('A');
    setData((prev: any) => ({ ...prev, appointments: [...prev.appointments, { ...appointment, id }] }));
    return id;
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setData((prev: any) => ({ ...prev, appointments: prev.appointments.map((a: any) => a.id === id ? { ...a, ...updates } : a) }));
  };

  const deleteAppointment = (id: string) => {
    setData((prev: any) => ({ ...prev, appointments: prev.appointments.filter((a: any) => a.id !== id) }));
  };

  // Order Operations
  const addOrder = (order: Omit<Order, 'id'>) => {
    const id = generateId('O');
    setData((prev: any) => ({ ...prev, orders: [...prev.orders, { ...order, id }] }));
    return id;
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setData((prev: any) => ({ ...prev, orders: prev.orders.map((o: any) => o.id === id ? { ...o, ...updates } : o) }));
  };

  const deleteOrder = (id: string) => {
    setData((prev: any) => ({ ...prev, orders: prev.orders.filter((o: any) => o.id !== id) }));
  };

  // Medication Operations
  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const id = generateId('M');
    setData((prev: any) => ({ ...prev, medications: [...prev.medications, { ...medication, id }] }));
    return id;
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setData((prev: any) => ({ ...prev, medications: prev.medications.map((m: any) => m.id === id ? { ...m, ...updates } : m) }));
  };

  const deleteMedication = (id: string) => {
    setData((prev: any) => ({ ...prev, medications: prev.medications.filter((m: any) => m.id !== id) }));
  };

  const administerMedication = (id: string, administeredBy: string, notes?: string) => {
    setData((prev: any) => ({
      ...prev,
      medications: prev.medications.map((m: any) => m.id === id ? {
        ...m,
        administrationLog: [{ timestamp: new Date().toISOString(), administeredBy, notes }, ...m.administrationLog]
      } : m)
    }));
  };

  // Staff Operations
  const addStaff = (staff: Omit<Staff, 'id'>) => {
    const id = generateId('S');
    setData((prev: any) => ({ ...prev, staff: [...prev.staff, { ...staff, id }] }));
    return id;
  };

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setData((prev: any) => ({ ...prev, staff: prev.staff.map((s: any) => s.id === id ? { ...s, ...updates } : s) }));
  };

  const deleteStaff = (id: string) => {
    setData((prev: any) => ({ ...prev, staff: prev.staff.filter((s: any) => s.id !== id) }));
  };

  // Alert Operations
  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const id = generateId('AL');
    setData((prev: any) => ({ ...prev, alerts: [{ ...alert, id }, ...prev.alerts] }));
    return id;
  };

  const markAlertAsRead = (id: string) => {
    setData((prev: any) => ({ ...prev, alerts: prev.alerts.map((a: any) => a.id === id ? { ...a, isRead: true } : a) }));
  };

  const markAllAlertsAsRead = () => {
    setData((prev: any) => ({ ...prev, alerts: prev.alerts.map((a: any) => ({ ...a, isRead: true })) }));
  };

  const deleteAlert = (id: string) => {
    setData((prev: any) => ({ ...prev, alerts: prev.alerts.filter((a: any) => a.id !== id) }));
  };

  // Bill Operations
  const addBill = (bill: Omit<Bill, 'id'>) => {
    const id = generateId('BIL');
    setData((prev: any) => ({ ...prev, bills: [...prev.bills, { ...bill, id }] }));
    return id;
  };

  const updateBill = (id: string, updates: Partial<Bill>) => {
    setData((prev: any) => ({ ...prev, bills: prev.bills.map((b: any) => b.id === id ? { ...b, ...updates } : b) }));
  };

  const deleteBill = (id: string) => {
    setData((prev: any) => ({ ...prev, bills: prev.bills.filter((b: any) => b.id !== id) }));
  };

  // Analytics
  const getAnalytics = () => {
    const totalPatients = data.patients.filter((p: any) => p.status === 'active').length;
    const totalBeds = data.beds.length;
    const occupiedBeds = data.beds.filter((b: any) => b.status === 'occupied').length;
    const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;
    const todayAppointments = data.appointments.filter((a: any) => a.date === new Date().toISOString().split('T')[0]).length;
    const pendingOrders = data.orders.filter((o: any) => o.status === 'pending').length;
    const completedOrders = data.orders.filter((o: any) => o.status === 'completed').length;
    const activeStaff = data.staff.filter((s: any) => s.status === 'active').length;
    const totalRevenue = data.bills.reduce((s: number, b: any) => s + b.amount, 0);
    const pendingPayments = data.bills.filter((b: any) => b.status === 'pending').length;
    return { totalPatients, totalBeds, occupiedBeds, occupancyRate, todayAppointments, pendingOrders, completedOrders, activeStaff, totalRevenue, pendingPayments, unreadAlerts: data.alerts.filter((a: any) => !a.isRead).length };
  };

  const resetData = () => {
    const fresh = generateLargeDataset();
    setData(fresh);
  };

  const exportAllData = () => data;

  const importData = (imported: any) => {
    setData(imported);
  };

  const value: HospitalDataContextType = {
    ...data,
    addPatient, updatePatient, deletePatient, dischargePatient, updatePatientVitals,
    assignBed, releaseBed, transferPatient, updateBedStatus,
    addAppointment, updateAppointment, deleteAppointment,
    addOrder, updateOrder, deleteOrder,
    addMedication, updateMedication, deleteMedication, administerMedication,
    addStaff, updateStaff, deleteStaff,
    addAlert, markAlertAsRead, markAllAlertsAsRead, deleteAlert,
    addBill, updateBill, deleteBill,
    getAnalytics, resetData, exportAllData, importData
  };

  return <HospitalDataContext.Provider value={value}>{children}</HospitalDataContext.Provider>;
};

export const useHospitalData = () => {
  const context = useContext(HospitalDataContext);
  if (!context) throw new Error('useHospitalData must be used within a HospitalDataProvider');
  return context;
};
