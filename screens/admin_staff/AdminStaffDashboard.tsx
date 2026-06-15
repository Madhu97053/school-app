import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Pressable, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../../components/GlassCard';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { mockKPIs, mockLeaves, LeaveRequest } from '../../services/mockData';
import { UserPlus, CalendarDays, Search, DollarSign, Clock, FileText, CheckCircle2 } from 'lucide-react-native';

const enrollSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  guardianEmail: z.string().email({ message: "Invalid email address" }),
  className: z.string().min(2, { message: "Specify class (e.g. Grade 9-A)" }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use YYYY-MM-DD" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
});

type EnrollFormData = z.infer<typeof enrollSchema>;

export const AdminStaffDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'schedules' | 'finances'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);

  // Timetable Designer State
  const [targetClass, setTargetClass] = useState('Grade 9-A');
  const [assignedTeacher, setAssignedTeacher] = useState('Sarah Jenkins');
  
  // Cash Payment State
  const [cashStudentId, setCashStudentId] = useState('stud_001');
  const [cashAmount, setCashAmount] = useState('');
  const [receiptNo, setReceiptNo] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm<EnrollFormData>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      fullName: '',
      guardianEmail: '',
      className: '',
      dob: '2012-05-15',
      phone: '',
    }
  });

  const onEnrollSubmit = (data: EnrollFormData) => {
    Alert.alert(
      "Enrollment Success",
      `Student ${data.fullName} is successfully registered!\nAdmission Number: ADM_${Math.floor(100000 + Math.random() * 900000)}\nClass: ${data.className}\nTC Verified: Pending.`
    );
    reset();
  };

  const handleSearch = () => {
    if (searchQuery.toLowerCase().includes('ethan') || searchQuery.toLowerCase().includes('warren')) {
      setSelectedStudent({
        id: 'stud_001',
        name: 'Ethan Warren',
        admNo: 'ADM_240901',
        class: 'Grade 9-A',
        dob: '2011-04-12',
        attendance: '95.6%',
        guardian: 'Elizabeth Warren',
        phone: '+1 (555) 019-2834',
        altPhone: '+1 (555) 019-2899',
        tcStatus: 'Verified & Logged',
        avatar: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=120'
      });
    } else {
      Alert.alert("Not Found", "No student record matches the search query.");
      setSelectedStudent(null);
    }
  };

  const handleLogCashPayment = () => {
    if (!cashAmount || isNaN(Number(cashAmount))) {
      Alert.alert("Error", "Enter a valid cash amount.");
      return;
    }
    const genReceipt = `REC_CSH_${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptNo(genReceipt);
    Alert.alert(
      "Cash Payment Recorded",
      `Cash payment of $${cashAmount} logged successfully!\nReceipt No: ${genReceipt}\nStatus: Settled.`
    );
    setCashAmount('');
  };

  const handleLeaveAction = (id: string, action: 'approved' | 'rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
    Alert.alert("Leave Status Updated", `Staff leave request has been ${action}.`);
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="mb-6">
        <Text className="text-white text-3xl font-extrabold">Staff Operations</Text>
        <Text className="text-white/50 text-sm mt-1">Registrar & Management Panel</Text>
      </View>

      {/* Tabs Selector */}
      <View className="flex-row bg-white/5 p-1 rounded-xl mb-6">
        <Pressable
          onPress={() => setActiveTab('students')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'students' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-sm font-semibold">Students</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('schedules')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'schedules' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-sm font-semibold">Schedules</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('finances')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'finances' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-sm font-semibold">Finance & Operations</Text>
        </Pressable>
      </View>

      {/* TAB 1: STUDENTS & ADMISSION */}
      {activeTab === 'students' && (
        <View>
          {/* Search Directory */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <Text className="text-white text-base font-bold mb-3">Student Records Lookup</Text>
            <View className="flex-row items-center mb-4">
              <TextInput
                placeholder="Enter Student Name (e.g. Ethan)..."
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mr-2"
              />
              <Pressable onPress={handleSearch} className="bg-brand-indigo p-3 rounded-xl">
                <Search size={18} color="#FFFFFF" />
              </Pressable>
            </View>

            {selectedStudent && (
              <View className="border-t border-white/5 pt-4">
                <Text className="text-white font-bold text-lg">{selectedStudent.name}</Text>
                <Text className="text-white/50 text-xs mt-0.5">{selectedStudent.admNo} • {selectedStudent.class}</Text>
                
                <View className="mt-4 space-y-2">
                  <View className="flex-row justify-between py-1">
                    <Text className="text-white/40 text-xs">Date of Birth</Text>
                    <Text className="text-white text-xs font-semibold">{selectedStudent.dob}</Text>
                  </View>
                  <View className="flex-row justify-between py-1 border-t border-white/5">
                    <Text className="text-white/40 text-xs">Attendance %</Text>
                    <Text className="text-emerald-400 text-xs font-semibold">{selectedStudent.attendance}</Text>
                  </View>
                  <View className="flex-row justify-between py-1 border-t border-white/5">
                    <Text className="text-white/40 text-xs">Guardian Name</Text>
                    <Text className="text-white text-xs font-semibold">{selectedStudent.guardian}</Text>
                  </View>
                  <View className="flex-row justify-between py-1 border-t border-white/5">
                    <Text className="text-white/40 text-xs">Contact Phone</Text>
                    <Text className="text-white text-xs font-semibold">{selectedStudent.phone}</Text>
                  </View>
                  <View className="flex-row justify-between py-1 border-t border-white/5">
                    <Text className="text-white/40 text-xs">TC Document</Text>
                    <Text className="text-brand-indigo text-xs font-semibold">{selectedStudent.tcStatus}</Text>
                  </View>
                </View>
              </View>
            )}
          </GlassCard>

          {/* Enroll Student Form */}
          <GlassCard className="p-5" intensity="high">
            <View className="flex-row items-center mb-4">
              <UserPlus size={20} color="#818CF8" />
              <Text className="text-white text-lg font-bold ml-2">New Student Enrollment</Text>
            </View>

            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Student Full Name"
                  placeholder="e.g. Liam Henderson"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="guardianEmail"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Guardian Primary Email"
                  placeholder="e.g. parent@email.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.guardianEmail?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <Controller
                  control={control}
                  name="className"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Grade / Class"
                      placeholder="e.g. Grade 9-A"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.className?.message}
                    />
                  )}
                />
              </View>
              <View className="w-[48%]">
                <Controller
                  control={control}
                  name="dob"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.dob?.message}
                    />
                  )}
                />
              </View>
            </View>

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Guardian Contact Number"
                  placeholder="e.g. 5550192834"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
            />

            <InteractiveButton
              onPress={handleSubmit(onEnrollSubmit)}
              title="Complete Registration"
              variant="accent"
              className="mt-4"
            />
          </GlassCard>
        </View>
      )}

      {/* TAB 2: SCHEDULES */}
      {activeTab === 'schedules' && (
        <View>
          {/* Timetable Designer */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row items-center mb-3">
              <Clock size={20} color="#818CF8" />
              <Text className="text-white text-base font-bold ml-2">Class Timetable Designer</Text>
            </View>
            <CustomInput
              label="Academic Class"
              value={targetClass}
              onChangeText={setTargetClass}
            />
            <CustomInput
              label="Assign Class Teacher"
              value={assignedTeacher}
              onChangeText={setAssignedTeacher}
            />
            <InteractiveButton
              onPress={() => Alert.alert("Timetable Saved", `Timetable structured for ${targetClass} with Lead Teacher ${assignedTeacher}.`)}
              title="Publish Timetable Schedule"
              variant="secondary"
            />
          </GlassCard>

          {/* Exam Scheduler */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row items-center mb-3">
              <CalendarDays size={20} color="#F59E0B" />
              <Text className="text-white text-base font-bold ml-2">Examination Scheduler</Text>
            </View>
            <Text className="text-white/60 text-xs mb-4">Design exam schedules and assign teacher invigilator duties.</Text>
            
            <InteractiveButton
              onPress={() => Alert.alert("Exam Scheduled", "Midterm Term 2 invigilation schedules dispatched to teaching staff.")}
              title="Configure Exam Invigilation"
              variant="primary"
            />
          </GlassCard>

          {/* Substitute Teacher Assigner */}
          <GlassCard className="p-5" intensity="high">
            <View className="flex-row items-center mb-4">
              <CheckCircle2 size={20} color="#34D399" />
              <Text className="text-white text-lg font-bold ml-2">Substitute Teacher Assigner</Text>
            </View>
            <View className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
              <Text className="text-white font-bold text-base mb-1">Grade 9-A Mathematics</Text>
              <Text className="text-white/50 text-xs uppercase font-semibold">Teacher: Jenkins S. (On Leave)</Text>
              <Text className="text-amber-400 text-xs font-semibold mt-2">Recommended: Dr. Alvarez M. (Available Slot 2)</Text>
            </View>
            <InteractiveButton
              onPress={() => Alert.alert("Substitute Assigned", "Dr. Alvarez M. has been assigned as substitute teacher.")}
              title="Approve Substitute"
              variant="primary"
            />
          </GlassCard>
        </View>
      )}

      {/* TAB 3: FINANCES & OPERATIONS */}
      {activeTab === 'finances' && (
        <View>
          {/* Fee Defaulters List */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Fee Defaulters List</Text>
          <GlassCard className="p-4 mb-6" intensity="medium">
            <View className="flex-row justify-between items-center py-2 border-b border-white/5">
              <View>
                <Text className="text-white font-semibold text-sm">Ethan Warren (Grade 9-A)</Text>
                <Text className="text-white/40 text-[10px]">Overdue: Bus Transport - June</Text>
              </View>
              <Text className="text-red-400 font-bold text-sm">$120</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b border-white/5 mt-1">
              <View>
                <Text className="text-white font-semibold text-sm">Liam Miller (Grade 10-B)</Text>
                <Text className="text-white/40 text-[10px]">Overdue: Term 2 Tuition</Text>
              </View>
              <Text className="text-red-400 font-bold text-sm">$1,200</Text>
            </View>
          </GlassCard>

          {/* Log Cash Payments */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row items-center mb-3">
              <DollarSign size={20} color="#34D399" strokeWidth={2.5} />
              <Text className="text-white text-base font-bold ml-2">Record Cash Payment</Text>
            </View>
            <CustomInput
              label="Student ID Lookup"
              value={cashStudentId}
              onChangeText={setCashStudentId}
            />
            <CustomInput
              label="Settle Cash Amount ($)"
              placeholder="e.g. 500"
              value={cashAmount}
              onChangeText={setCashAmount}
              keyboardType="numeric"
            />
            <InteractiveButton
              onPress={handleLogCashPayment}
              title="Record Payment & Generate PDF Receipt"
              variant="accent"
            />
            {receiptNo ? (
              <View className="mt-3 bg-emerald-950/20 border border-emerald-500/25 p-3 rounded-xl flex-row justify-between items-center">
                <Text className="text-white text-xs font-semibold">Active Receipt: {receiptNo}</Text>
                <Pressable onPress={() => Alert.alert("Receipt Printed", "PDF receipt dispatched.")}>
                  <Text className="text-emerald-400 text-xs font-bold">Print/Share</Text>
                </Pressable>
              </View>
            ) : null}
          </GlassCard>

          {/* Staff Leave Approvals */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Staff Leave Approvals</Text>
          {leaves.filter(l => l.status === 'pending').map((leave) => (
            <GlassCard key={leave.id} className="p-4 mb-4" intensity="medium">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-white font-bold text-base">{leave.name}</Text>
                  <Text className="text-white/50 text-xs font-semibold uppercase">{leave.role} • {leave.leaveType}</Text>
                </View>
                <Text className="text-brand-indigo text-xs font-semibold">{leave.startDate} to {leave.endDate}</Text>
              </View>
              <Text className="text-white/70 text-sm mb-4">{leave.reason}</Text>
              <View className="flex-row space-x-3">
                <Pressable
                  onPress={() => handleLeaveAction(leave.id, 'approved')}
                  className="bg-emerald-600 px-4 py-2.5 rounded-xl flex-1 items-center"
                >
                  <Text className="text-white font-bold text-xs">Approve</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleLeaveAction(leave.id, 'rejected')}
                  className="bg-red-950/60 border border-red-500/30 px-4 py-2.5 rounded-xl flex-1 items-center"
                >
                  <Text className="text-red-400 font-bold text-xs">Reject</Text>
                </Pressable>
              </View>
            </GlassCard>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
});

export default AdminStaffDashboard;
