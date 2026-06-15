import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import { GlassCard } from '../../components/GlassCard';
import { InteractiveButton } from '../../components/InteractiveButton';
import { mockKPIs, mockLeaves, LeaveRequest } from '../../services/mockData';
import { Users, GraduationCap, Percent, DollarSign, BellRing, Briefcase, Calendar, CheckSquare, XSquare } from 'lucide-react-native';

export const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'operations' | 'staff'>('analytics');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);

  // Mock Expenses
  const expensesList = [
    { id: 'exp_1', title: 'Fiber Internet & Bandwidth', category: 'Utilities', amount: 850, date: 'June 05' },
    { id: 'exp_2', title: 'Main Campus Electricity Grid', category: 'Utilities', amount: 3200, date: 'June 04' },
    { id: 'exp_3', title: 'Software ERP Licensing', category: 'Subscr.', amount: 1200, date: 'May 28' },
    { id: 'exp_4', title: 'HVAC Duct Maintenance', category: 'Repairs', amount: 450, date: 'May 20' },
  ];

  // Mock Daily Diary logs
  const dailyDiaryLogs = [
    { id: 'dl_1', teacher: 'Sarah Jenkins', grade: 'Grade 9-A', subject: 'Math', topic: 'Quadratic equation factoring and graphing', time: '09:00 AM' },
    { id: 'dl_2', teacher: 'Dr. Alvarez M.', grade: 'Grade 10-B', subject: 'Physics', topic: 'Experimenting with pendulums and kinetic coefficients', time: '11:15 AM' },
    { id: 'dl_3', teacher: 'Smith K.', grade: 'Grade 9-A', subject: 'English', topic: 'Analysis of Macbeth Soliloquy in Act 3 Scene 2', time: '01:30 PM' },
  ];

  // Mock Staff data
  const staffList = [
    { id: 'st_1', name: 'Marcus Vance', email: 'marcus@aurelia.edu', role: 'Registrar Staff', baseSalary: 3200, category: 'Administrative', paid: true, attendance: '98%' },
    { id: 'st_2', name: 'Sarah Jenkins', email: 'sarah@aurelia.edu', role: 'Math Lead Teacher', baseSalary: 4200, category: 'Teaching Staff', paid: false, attendance: '96%' },
    { id: 'st_3', name: 'Dr. Alvarez M.', email: 'alvarez@aurelia.edu', role: 'Science Head', baseSalary: 4800, category: 'Teaching Staff', paid: false, attendance: '97%' },
    { id: 'st_4', name: 'David Miller', email: 'david@aurelia.edu', role: 'Clerk / Assistant', baseSalary: 2400, category: 'Support Staff', paid: true, attendance: '93%' },
  ];

  const [staffData, setStaffData] = useState(staffList);

  const handleBroadcast = () => {
    if (!broadcastMessage.trim()) {
      Alert.alert("Error", "Broadcast message cannot be empty.");
      return;
    }
    Alert.alert("Broadcast Sent", `System Broadcast dispatched to all portals:\n"${broadcastMessage}"`);
    setBroadcastMessage('');
  };

  const handleLeaveAction = (id: string, action: 'approved' | 'rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
    Alert.alert("Leave Updated", `Leave request has been ${action}.`);
  };

  const handleReleaseSalary = (staffId: string, name: string) => {
    setStaffData(prev => prev.map(s => s.id === staffId ? { ...s, paid: true } : s));
    Alert.alert("Salary Disbursed", `Payment process approved and initiated for ${name}.`);
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="mb-6">
        <Text className="text-white text-3xl font-extrabold">Executive Hub</Text>
        <Text className="text-white/50 text-sm mt-1">Super Admin Analytics & Control</Text>
      </View>

      {/* Tabs Selector */}
      <View className="flex-row bg-white/5 p-1 rounded-xl mb-6">
        <Pressable
          onPress={() => setActiveTab('analytics')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'analytics' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-sm font-semibold">Analytics</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('operations')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'operations' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-sm font-semibold">Operations</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('staff')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'staff' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-sm font-semibold">Staff & Payroll</Text>
        </Pressable>
      </View>

      {/* TAB 1: ANALYTICS & CONTROL */}
      {activeTab === 'analytics' && (
        <View>
          {/* KPI Section */}
          <View className="flex-row flex-wrap justify-between mb-4">
            <GlassCard className="w-[48%] p-4 mb-4" intensity="medium">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white/60 text-[10px] font-semibold uppercase">Total Students</Text>
                <GraduationCap size={18} color="#3B82F6" />
              </View>
              <Text className="text-white text-2xl font-extrabold">{mockKPIs.totalStudents}</Text>
              <Text className="text-emerald-450 text-[10px] mt-1">+4.2% from last term</Text>
            </GlassCard>

            <GlassCard className="w-[48%] p-4 mb-4" intensity="medium">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white/60 text-[10px] font-semibold uppercase">Teachers</Text>
                <Users size={18} color="#A78BFA" />
              </View>
              <Text className="text-white text-2xl font-extrabold">{mockKPIs.totalTeachers}</Text>
              <Text className="text-white/40 text-[10px] mt-1">Ratio 1:16 ratio</Text>
            </GlassCard>

            <GlassCard className="w-[48%] p-4 mb-4" intensity="medium">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white/60 text-[10px] font-semibold uppercase">Attendance</Text>
                <Percent size={18} color="#10B981" />
              </View>
              <Text className="text-white text-2xl font-extrabold">{mockKPIs.attendanceRate}%</Text>
              <Text className="text-emerald-450 text-[10px] mt-1">Optimal Range</Text>
            </GlassCard>

            <GlassCard className="w-[48%] p-4 mb-4" intensity="medium">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white/60 text-[10px] font-semibold uppercase">Total Revenue</Text>
                <DollarSign size={18} color="#F59E0B" />
              </View>
              <Text className="text-white text-2xl font-extrabold">${mockKPIs.revenue.toLocaleString()}</Text>
              <Text className="text-emerald-450 text-[10px] mt-1">98% collected</Text>
            </GlassCard>
          </View>

          {/* Expenses Breakdown */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Monthly School Expenses</Text>
          <GlassCard className="p-4 mb-6" intensity="medium">
            {expensesList.map((item) => (
              <View key={item.id} className="flex-row justify-between items-center py-2 border-b border-white/5 last:border-b-0">
                <View>
                  <Text className="text-white font-semibold text-sm">{item.title}</Text>
                  <Text className="text-white/40 text-[10px] uppercase font-semibold mt-0.5">{item.category} • {item.date}</Text>
                </View>
                <Text className="text-red-400 font-bold text-sm">${item.amount}</Text>
              </View>
            ))}
          </GlassCard>

          {/* Emergency Broadcasts */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row items-center mb-3">
              <BellRing size={20} color="#EF4444" />
              <Text className="text-white text-base font-bold ml-2">Emergency Broadcast System</Text>
            </View>
            <TextInput
              placeholder="Type emergency alert for students, parents, and teachers..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={broadcastMessage}
              onChangeText={setBroadcastMessage}
              multiline
              numberOfLines={3}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm mb-4"
            />
            <InteractiveButton
              onPress={handleBroadcast}
              title="Dispatch System Broadcast"
              variant="primary"
              style={{ backgroundColor: '#EF4444' }}
            />
          </GlassCard>
        </View>
      )}

      {/* TAB 2: OPERATIONS & LEAVES */}
      {activeTab === 'operations' && (
        <View>
          {/* Leave Approvals */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Pending Leave Approvals</Text>
          {leaves.filter(l => l.status === 'pending').length === 0 ? (
            <GlassCard className="p-4 mb-6 items-center" intensity="medium">
              <Text className="text-white/40 text-sm">No pending leave requests found.</Text>
            </GlassCard>
          ) : (
            leaves.filter(l => l.status === 'pending').map((leave) => (
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
            ))
          )}

          {/* Daily Diary View */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Daily Diary Logs (Audits)</Text>
          <View className="space-y-4">
            {dailyDiaryLogs.map((log) => (
              <GlassCard key={log.id} className="p-4 mb-4" intensity="medium">
                <View className="flex-row justify-between items-center mb-2">
                  <View>
                    <Text className="text-white font-bold text-sm">{log.grade} • {log.subject}</Text>
                    <Text className="text-white/40 text-[10px] font-semibold mt-0.5">Teacher: {log.teacher}</Text>
                  </View>
                  <View className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <Text className="text-white/60 text-[9px] font-bold">{log.time}</Text>
                  </View>
                </View>
                <Text className="text-white/70 text-xs leading-5">Topics: {log.topic}</Text>
              </GlassCard>
            ))}
          </View>
        </View>
      )}

      {/* TAB 3: STAFF & PAYROLL */}
      {activeTab === 'staff' && (
        <View>
          {/* Salary Categories */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Salary Categories Config</Text>
          <GlassCard className="p-4 mb-6" intensity="medium">
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-1">
                <Text className="text-white text-sm font-semibold">Administrative Staff</Text>
                <Text className="text-brand-indigo text-xs font-bold">$2,000 - $4,000 / mo</Text>
              </View>
              <View className="flex-row justify-between items-center py-1 border-t border-white/5 mt-2 pt-2">
                <Text className="text-white text-sm font-semibold">Teaching Staff</Text>
                <Text className="text-brand-indigo text-xs font-bold">$3,500 - $6,000 / mo</Text>
              </View>
              <View className="flex-row justify-between items-center py-1 border-t border-white/5 mt-2 pt-2">
                <Text className="text-white text-sm font-semibold">Support & Logistics</Text>
                <Text className="text-brand-indigo text-xs font-bold">$1,500 - $2,800 / mo</Text>
              </View>
            </View>
          </GlassCard>

          {/* Staff List, Attendance, and Salary Release */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Staff Management & Payroll</Text>
          {staffData.map((staff) => (
            <GlassCard key={staff.id} className="p-5 mb-4" intensity="medium">
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-white font-bold text-base">{staff.name}</Text>
                  <Text className="text-white/40 text-xs mt-0.5">{staff.role} • {staff.email}</Text>
                </View>
                <View className="bg-brand-indigo/20 border border-brand-indigo/35 px-2.5 py-0.5 rounded-full">
                  <Text className="text-brand-indigo text-[10px] font-bold">{staff.attendance} Att.</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center border-t border-white/5 pt-3.5 mt-2">
                <View>
                  <Text className="text-white/40 text-[9px] uppercase font-bold">Base Salary</Text>
                  <Text className="text-white font-extrabold text-base">${staff.baseSalary}</Text>
                </View>

                {staff.paid ? (
                  <View className="bg-emerald-950/45 border border-emerald-500/25 px-4 py-2 rounded-xl">
                    <Text className="text-emerald-450 font-bold text-xs">Released ✓</Text>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => handleReleaseSalary(staff.id, staff.name)}
                    className="bg-brand-indigo px-4 py-2 rounded-xl"
                  >
                    <Text className="text-white font-bold text-xs">Release Salary</Text>
                  </Pressable>
                )}
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

export default SuperAdminDashboard;
