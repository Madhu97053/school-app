import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { mockFees, mockHomework, mockExams, mockTimetable } from '../../services/mockData';
import { GlassCard } from '../../components/GlassCard';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { CreditCard, Compass, MessageCircle, AlertCircle, Award, Calendar, Clock, BookOpen, PenTool } from 'lucide-react-native';

export const ParentDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, activeChildId, switchChild } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'home' | 'academics' | 'fees' | 'leaves'>('home');

  // Leave Form States
  const [leaveStartDate, setLeaveStartDate] = useState('2026-06-18');
  const [leaveEndDate, setLeaveEndDate] = useState('2026-06-19');
  const [leaveReason, setLeaveReason] = useState('');
  const [studentLeaves, setStudentLeaves] = useState([
    { id: 'sl_1', startDate: '2026-05-10', endDate: '2026-05-11', reason: 'Fever checkup doctor note', status: 'Approved' }
  ]);

  if (!user || !user.children) return null;

  const currentChild = user.children.find(c => c.id === activeChildId) || user.children[0];
  
  // Calculate stats for current active child
  const fees = mockFees[currentChild.id] || [];
  const homework = mockHomework[currentChild.id] || [];
  const exams = mockExams[currentChild.id] || [];
  const timetable = mockTimetable[currentChild.id] || [];

  const pendingFeesCount = fees.filter(f => f.status !== 'paid').length;
  const pendingHwCount = homework.filter(h => h.status === 'pending').length;
  const nextExam = exams[0];

  // Daily Diary for this child
  const childDiaryLogs = [
    { id: 'cd_1', subject: 'Math', topic: 'Completing Matrix Operations sheet', time: '09:00 AM' },
    { id: 'cd_2', subject: 'English', topic: 'Act 3 character profiles and theme essay draft', time: '01:30 PM' },
  ];

  const handleApplyStudentLeave = () => {
    if (!leaveReason.trim()) {
      Alert.alert("Error", "Please enter a reason for the leave.");
      return;
    }
    const newLeave = {
      id: `l_${Math.random()}`,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason,
      status: 'Pending'
    };
    setStudentLeaves(prev => [newLeave, ...prev]);
    Alert.alert("Leave Applied", `Student leave application filed for ${currentChild.name} successfully.`);
    setLeaveReason('');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="mb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-white text-3xl font-extrabold">Parent Portal</Text>
          <Text className="text-white/50 text-sm mt-1">Hello, {user.name}</Text>
        </View>
        
        {/* Child Avatar Switcher */}
        <View className="flex-row space-x-2">
          {user.children.map((child) => (
            <Pressable
              key={child.id}
              onPress={() => switchChild(child.id)}
              className={`p-1 rounded-full border-2 ${
                activeChildId === child.id ? 'border-brand-indigo' : 'border-transparent'
              }`}
            >
              <Image
                source={{ uri: child.avatar }}
                className="w-10 h-10 rounded-full"
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Child Status Summary Card */}
      <GlassCard className="p-5 mb-6 bg-brand-indigo/10" intensity="high">
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: currentChild.avatar }}
            className="w-14 h-14 rounded-full border-2 border-white/20"
          />
          <View className="ml-4">
            <Text className="text-white text-lg font-bold">{currentChild.name}</Text>
            <Text className="text-white/60 text-xs font-semibold uppercase">{currentChild.class}</Text>
          </View>
        </View>

        <View className="flex-row justify-between pt-2 border-t border-white/10">
          <View className="items-center flex-1">
            <Text className="text-white/40 text-[10px] font-bold uppercase mb-1">Attendance</Text>
            <Text className="text-white text-lg font-extrabold">96.8%</Text>
          </View>
          <View className="items-center flex-1 border-x border-white/10">
            <Text className="text-white/40 text-[10px] font-bold uppercase mb-1">Pending HW</Text>
            <Text className="text-amber-400 text-lg font-extrabold">{pendingHwCount}</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-white/40 text-[10px] font-bold uppercase mb-1">Fee Alerts</Text>
            <Text className={`text-lg font-extrabold ${pendingFeesCount > 0 ? 'text-red-400' : 'text-white'}`}>
              {pendingFeesCount}
            </Text>
          </View>
        </View>
      </GlassCard>

      {/* Tabs Selector */}
      <View className="flex-row bg-white/5 p-1 rounded-xl mb-6">
        <Pressable
          onPress={() => setActiveTab('home')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'home' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Home</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('academics')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'academics' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Academics</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('fees')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'fees' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Fees</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('leaves')}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === 'leaves' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Leaves</Text>
        </Pressable>
      </View>

      {/* TAB 1: HOME HUB */}
      {activeTab === 'home' && (
        <View>
          {/* Quick Actions */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between mb-4">
            <Pressable
              onPress={() => navigation.navigate('BusTracking')}
              className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-4 w-[48%] flex-row items-center"
            >
              <Compass size={18} color="#10B981" />
              <Text className="text-white font-bold text-xs ml-3">Track Bus</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Messaging', { chatKey: 'teacher_parent' })}
              className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-4 w-[48%] flex-row items-center"
            >
              <MessageCircle size={18} color="#A78BFA" />
              <Text className="text-white font-bold text-xs ml-3">Message Desk</Text>
            </Pressable>
          </View>

          {/* Upcoming Exams */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Upcoming Exam Schedule</Text>
          {nextExam ? (
            <GlassCard className="p-4 flex-row justify-between items-center mb-6" intensity="medium">
              <View>
                <Text className="text-white font-bold text-base">{nextExam.subject}</Text>
                <Text className="text-white/50 text-xs font-semibold uppercase">{nextExam.examName}</Text>
              </View>
              <View className="items-end">
                <Text className="text-brand-indigo font-bold text-sm">{nextExam.date}</Text>
                <Text className="text-white/40 text-[10px] mt-1">Class Avg: {nextExam.classAverage}%</Text>
              </View>
            </GlassCard>
          ) : null}

          {/* Important notifications */}
          {pendingFeesCount > 0 && (
            <GlassCard className="p-4 border-l-4 border-l-red-500 flex-row items-start mb-6" intensity="low">
              <AlertCircle size={20} color="#EF4444" style={{ marginTop: 2 }} />
              <View className="ml-3 flex-1">
                <Text className="text-white font-bold text-sm">Action Required: Outstanding Dues</Text>
                <Text className="text-white/60 text-xs mt-1">
                  You have tuition or transport invoices pending payment for {currentChild.name}. Please pay online to avoid interruption.
                </Text>
              </View>
            </GlassCard>
          )}
        </View>
      )}

      {/* TAB 2: ACADEMICS & TIMETABLE */}
      {activeTab === 'academics' && (
        <View>
          {/* Daily Homework */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Homework Assignments</Text>
          {homework.map((hw) => (
            <GlassCard key={hw.id} className="p-4 mb-4 flex-row justify-between items-center" intensity="medium">
              <View className="flex-1 mr-3">
                <Text className="text-white font-bold text-sm">{hw.title}</Text>
                <Text className="text-white/50 text-[10px] font-semibold mt-0.5">{hw.subject} • Assigned by {hw.teacherName}</Text>
              </View>
              <View className="bg-brand-indigo/25 px-2.5 py-1 rounded-xl">
                <Text className="text-white text-[10px] font-bold">Due {hw.dueDate.split('-')[2]}</Text>
              </View>
            </GlassCard>
          ))}

          {/* Daily Timetable */}
          <Text className="text-white/80 text-sm font-semibold mb-3 mt-4 ml-1">Class Timetable Slots</Text>
          {timetable.map((slot) => (
            <GlassCard key={slot.id} className="p-4 mb-3 flex-row justify-between items-center" intensity="medium">
              <View>
                <Text className="text-white font-bold text-sm">{slot.subject}</Text>
                <Text className="text-white/50 text-[10px] mt-0.5">{slot.teacher} • {slot.room}</Text>
              </View>
              <View className="flex-row items-center bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Clock size={10} color="#818CF8" />
                <Text className="text-white/60 text-[10px] ml-1.5">{slot.time.split(' ')[0]}</Text>
              </View>
            </GlassCard>
          ))}

          {/* Daily Diary View */}
          <Text className="text-white/80 text-sm font-semibold mb-3 mt-4 ml-1">Daily Diary Logs (What was studied today)</Text>
          {childDiaryLogs.map((log) => (
            <GlassCard key={log.id} className="p-4 mb-3" intensity="medium">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="text-white font-bold text-sm">{log.subject} Lesson Coverage</Text>
                <Text className="text-white/40 text-[9px]">{log.time}</Text>
              </View>
              <Text className="text-white/70 text-xs leading-5">Topics: {log.topic}</Text>
            </GlassCard>
          ))}
        </View>
      )}

      {/* TAB 3: FEES & PAYMENTS */}
      {activeTab === 'fees' && (
        <View>
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Fee Invoices & Arrears</Text>
          {fees.map((fee) => (
            <GlassCard key={fee.id} className="p-4 mb-4 flex-row justify-between items-center" intensity="high">
              <View>
                <Text className="text-white font-bold text-sm">{fee.title}</Text>
                <Text className="text-white/50 text-[10px] uppercase mt-0.5">Due {fee.dueDate} • {fee.category}</Text>
              </View>
              <View className="items-end">
                <Text className="text-white font-black text-base">${fee.amount}</Text>
                <Pressable
                  onPress={() => navigation.navigate('FeePayment')}
                  className={`mt-1.5 px-3 py-1 rounded-lg border ${
                    fee.status === 'paid'
                      ? 'bg-emerald-950/45 border-emerald-500/25'
                      : 'bg-brand-indigo border-brand-indigo/35'
                  }`}
                >
                  <Text className="text-white text-[9px] font-bold uppercase">{fee.status}</Text>
                </Pressable>
              </View>
            </GlassCard>
          ))}
        </View>
      )}

      {/* TAB 4: STUDENT LEAVES */}
      {activeTab === 'leaves' && (
        <View>
          {/* Apply for leave */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row items-center mb-3">
              <Calendar size={20} color="#F59E0B" />
              <Text className="text-white text-base font-bold ml-2">Apply for Student Leave</Text>
            </View>

            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <CustomInput
                  label="From Date"
                  value={leaveStartDate}
                  onChangeText={setLeaveStartDate}
                />
              </View>
              <View className="w-[48%]">
                <CustomInput
                  label="To Date"
                  value={leaveEndDate}
                  onChangeText={setLeaveEndDate}
                />
              </View>
            </View>

            <CustomInput
              label="Reason Details"
              placeholder="e.g. Vacation, sickness note upload..."
              value={leaveReason}
              onChangeText={setLeaveReason}
              multiline
              numberOfLines={2}
            />

            <InteractiveButton
              onPress={handleApplyStudentLeave}
              title="Submit Leave Application"
              variant="secondary"
            />
          </GlassCard>

          {/* Past leaves list */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Leave Request History</Text>
          {studentLeaves.map((leave) => (
            <GlassCard key={leave.id} className="p-4 mb-3 flex-row justify-between items-center" intensity="medium">
              <View>
                <Text className="text-white font-bold text-sm">{leave.reason}</Text>
                <Text className="text-white/40 text-[10px] mt-0.5">{leave.startDate} to {leave.endDate}</Text>
              </View>
              <View className="bg-emerald-950/45 border border-emerald-500/25 px-2.5 py-1 rounded-xl">
                <Text className="text-emerald-450 font-bold text-[9px] uppercase">{leave.status}</Text>
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

export default ParentDashboard;
