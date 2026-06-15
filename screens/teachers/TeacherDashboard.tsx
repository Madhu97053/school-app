import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassCard } from '../../components/GlassCard';
import { CustomInput } from '../../components/CustomInput';
import { InteractiveButton } from '../../components/InteractiveButton';
import { ClipboardList, PlusCircle, Calendar, DollarSign, PenTool, BookOpen, AlertTriangle } from 'lucide-react-native';

const hwSchema = z.object({
  title: z.string().min(4, { message: "Title must be at least 4 characters" }),
  desc: z.string().min(10, { message: "Description must be at least 10 characters" }),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use YYYY-MM-DD format" }),
});

type HwFormData = z.infer<typeof hwSchema>;

const leaveSchema = z.object({
  leaveType: z.string().min(2, { message: "Leave type is required" }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use YYYY-MM-DD" }),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Use YYYY-MM-DD" }),
  reason: z.string().min(5, { message: "Reason must be at least 5 characters" }),
});

type LeaveFormData = z.infer<typeof leaveSchema>;

export const TeacherDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'schedule' | 'academics' | 'diary' | 'hr'>('schedule');
  
  // Mock Attendance state
  const [attendance, setAttendance] = useState([
    { id: "s1", name: "Ethan Warren", status: 'Present' },
    { id: "s2", name: "Ava Montgomery", status: 'Present' },
    { id: "s3", name: "Lucas Vance", status: 'Absent' },
    { id: "s4", name: "Zoe Castillo", status: 'Present' },
  ]);

  // Mock Lesson plan & Daily Diary Entries
  const [diaryClass, setDiaryClass] = useState('Grade 9-A');
  const [diarySubject, setDiarySubject] = useState('Mathematics');
  const [diaryTopics, setDiaryTopics] = useState('');

  // Leave Balances
  const [leaveBalances, setLeaveBalances] = useState({ cl: 5, sl: 8, el: 12 });

  const { control: hwControl, handleSubmit: handleHwSubmit, reset: resetHw, formState: { errors: hwErrors } } = useForm<HwFormData>({
    resolver: zodResolver(hwSchema)
  });

  const { control: leaveControl, handleSubmit: handleLeaveSubmit, reset: resetLeave, formState: { errors: leaveErrors } } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: 'Casual Leave',
      startDate: '2026-06-18',
      endDate: '2026-06-20',
      reason: ''
    }
  });

  const onHwSubmit = (data: HwFormData) => {
    Alert.alert("Homework Published", `Homework "${data.title}" successfully assigned to Grade 9-A Math.`);
    resetHw();
  };

  const onLeaveApply = (data: LeaveFormData) => {
    Alert.alert(
      "Leave Application Filed",
      `Applied for ${data.leaveType} from ${data.startDate} to ${data.endDate}.\nStatus: Pending Approvals.`
    );
    resetLeave();
  };

  const handleDiaryLog = () => {
    if (!diaryTopics.trim()) {
      Alert.alert("Error", "Lesson diary covered topics cannot be empty.");
      return;
    }
    Alert.alert(
      "Diary Logged",
      `Class Lesson Diary successfully recorded for ${diaryClass} (${diarySubject}).\nTopics sent to Super Admin.`
    );
    setDiaryTopics('');
  };

  const cycleStatus = (id: string) => {
    const statuses = ['Present', 'Absent', 'Late', 'Half Day'];
    setAttendance(prev => prev.map(student => {
      if (student.id === id) {
        const nextIdx = (statuses.indexOf(student.status) + 1) % statuses.length;
        return { ...student, status: statuses[nextIdx] };
      }
      return student;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Absent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Late': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Half Day': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="mb-6">
        <Text className="text-white text-3xl font-extrabold">Teacher Desk</Text>
        <Text className="text-white/50 text-sm mt-1">Classroom & Academic Tools</Text>
      </View>

      {/* Tabs Selector */}
      <View className="flex-row bg-white/5 p-1 rounded-xl mb-6">
        <Pressable
          onPress={() => setActiveView('schedule')}
          className={`flex-1 py-3 rounded-lg items-center ${activeView === 'schedule' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Schedule</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveView('academics')}
          className={`flex-1 py-3 rounded-lg items-center ${activeView === 'academics' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Academics</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveView('diary')}
          className={`flex-1 py-3 rounded-lg items-center ${activeView === 'diary' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">Daily Diary</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveView('hr')}
          className={`flex-1 py-3 rounded-lg items-center ${activeView === 'hr' ? 'bg-brand-indigo' : ''}`}
        >
          <Text className="text-white text-[11px] font-semibold">HR & Leave</Text>
        </Pressable>
      </View>

      {/* TAB 1: SCHEDULE & DUTIES */}
      {activeView === 'schedule' && (
        <View>
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Today's Class Schedule</Text>
          <GlassCard className="p-4 mb-4" intensity="medium">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-white font-bold text-base">Grade 9-A Mathematics</Text>
              <Text className="text-brand-indigo text-xs font-semibold">Slot 1: 08:30 - 09:30 AM</Text>
            </View>
            <Text className="text-white/60 text-xs">Topic: Algebraic Expressions and Matrices</Text>
          </GlassCard>

          <GlassCard className="p-4 mb-4" intensity="medium">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-white font-bold text-base">Grade 10-B Geometry</Text>
              <Text className="text-brand-indigo text-xs font-semibold">Slot 3: 11:00 - 12:00 PM</Text>
            </View>
            <Text className="text-white/60 text-xs">Topic: Theorems of Similarity and Proportion</Text>
          </GlassCard>

          <Text className="text-white/80 text-sm font-semibold mb-3 mt-4 ml-1">Exam Invigilation Duties</Text>
          <GlassCard className="p-4 mb-4 border-l-4 border-l-amber-400" intensity="medium">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-white font-bold text-sm">Algebra Term 1 Exam</Text>
                <Text className="text-white/50 text-[10px] uppercase font-semibold">Room 402 • Main Block</Text>
              </View>
              <Text className="text-brand-indigo text-xs font-bold">June 15, 9 AM - 12 PM</Text>
            </View>
          </GlassCard>
        </View>
      )}

      {/* TAB 2: ACADEMICS & GRADES */}
      {activeView === 'academics' && (
        <View>
          {/* Attendance Checklist */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <ClipboardList size={22} color="#10B981" />
                <Text className="text-white text-lg font-bold ml-2">Mark Class Attendance</Text>
              </View>
              <Text className="text-white/50 text-xs">Grade 9-A</Text>
            </View>
            
            <Text className="text-white/40 text-[10px] mb-4">Tap on status tags to cycle (Present → Absent → Late → Half Day)</Text>

            {attendance.map((student) => (
              <View key={student.id} className="flex-row justify-between items-center py-3 border-b border-white/5">
                <Text className="text-white text-base font-semibold">{student.name}</Text>
                <Pressable
                  onPress={() => cycleStatus(student.id)}
                  className={`px-3 py-1.5 rounded-full border ${getStatusColor(student.status)}`}
                >
                  <Text className="font-bold text-[10px] uppercase">{student.status}</Text>
                </Pressable>
              </View>
            ))}

            <InteractiveButton
              onPress={() => Alert.alert("Attendance Synchronized", "Attendance registered and notifications dispatched.")}
              title="Synchronize Attendance"
              variant="accent"
              className="mt-6"
            />
          </GlassCard>

          {/* Homework Publisher */}
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row items-center mb-4">
              <PlusCircle size={22} color="#6366F1" />
              <Text className="text-white text-lg font-bold ml-2">Assign Homework Task</Text>
            </View>

            <Controller
              control={hwControl}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Homework Title"
                  placeholder="e.g. Quad Equations Part 2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={hwErrors.title?.message}
                />
              )}
            />

            <Controller
              control={hwControl}
              name="desc"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Instructions & Description"
                  placeholder="List questions, guidelines or page ranges..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={hwErrors.desc?.message}
                  multiline
                  numberOfLines={3}
                />
              )}
            />

            <Controller
              control={hwControl}
              name="dueDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Due Date (YYYY-MM-DD)"
                  placeholder="2026-06-20"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={hwErrors.dueDate?.message}
                />
              )}
            />

            <InteractiveButton
              onPress={handleHwSubmit(onHwSubmit)}
              title="Publish Homework"
              variant="secondary"
              className="mt-4"
            />
          </GlassCard>
        </View>
      )}

      {/* TAB 3: DAILY DIARY ENTRY */}
      {activeView === 'diary' && (
        <GlassCard className="p-5" intensity="high">
          <View className="flex-row items-center mb-4">
            <PenTool size={22} color="#A78BFA" />
            <Text className="text-white text-lg font-bold ml-2">Lesson Diary Logger</Text>
          </View>
          <Text className="text-white/60 text-xs mb-4">Record lesson topic details and coverage logs to submit directly to school super admin audits.</Text>
          
          <CustomInput
            label="Class / Section Logged"
            value={diaryClass}
            onChangeText={setDiaryClass}
          />
          <CustomInput
            label="Subject Logged"
            value={diarySubject}
            onChangeText={setDiarySubject}
          />
          <CustomInput
            label="Topic Details Covered Today"
            placeholder="Describe sections completed, workbook pages, labs etc..."
            value={diaryTopics}
            onChangeText={setDiaryTopics}
            multiline
            numberOfLines={4}
          />

          <InteractiveButton
            onPress={handleDiaryLog}
            title="Log Today's Lesson"
            variant="accent"
          />
        </GlassCard>
      )}

      {/* TAB 4: HR & LEAVE */}
      {activeView === 'hr' && (
        <View>
          {/* Salary Details */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">My Salary & Pay Details</Text>
          <GlassCard className="p-5 mb-6" intensity="high">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-white/40 text-[10px] uppercase font-bold">Base Teaching Salary</Text>
                <Text className="text-white text-2xl font-extrabold">$4,200 / mo</Text>
              </View>
              <DollarSign size={28} color="#10B981" />
            </View>
            <View className="border-t border-white/5 pt-4 space-y-2">
              <View className="flex-row justify-between py-1">
                <Text className="text-white/50 text-xs">Medical Allowance</Text>
                <Text className="text-white text-xs font-bold">$150</Text>
              </View>
              <View className="flex-row justify-between py-1 border-t border-white/5">
                <Text className="text-white/50 text-xs">Current Month Pay Status</Text>
                <Text className="text-emerald-450 text-xs font-bold">Released & Transferred</Text>
              </View>
            </View>
          </GlassCard>

          {/* Leave Balances */}
          <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">My Leave Balances</Text>
          <View className="flex-row justify-between mb-6">
            <GlassCard className="w-[30%] p-3 items-center" intensity="medium">
              <Text className="text-white/40 text-[9px] uppercase font-bold">Casual</Text>
              <Text className="text-white text-xl font-extrabold mt-1">{leaveBalances.cl}</Text>
            </GlassCard>
            <GlassCard className="w-[30%] p-3 items-center" intensity="medium">
              <Text className="text-white/40 text-[9px] uppercase font-bold">Sick</Text>
              <Text className="text-white text-xl font-extrabold mt-1">{leaveBalances.sl}</Text>
            </GlassCard>
            <GlassCard className="w-[30%] p-3 items-center" intensity="medium">
              <Text className="text-white/40 text-[9px] uppercase font-bold">Privilege</Text>
              <Text className="text-white text-xl font-extrabold mt-1">{leaveBalances.el}</Text>
            </GlassCard>
          </View>

          {/* Apply for Leave Form */}
          <GlassCard className="p-5" intensity="high">
            <View className="flex-row items-center mb-4">
              <Calendar size={20} color="#F59E0B" />
              <Text className="text-white text-lg font-bold ml-2">Apply for Personal Leave</Text>
            </View>

            <Controller
              control={leaveControl}
              name="leaveType"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Leave Type Selection"
                  placeholder="e.g. Casual Leave"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={leaveErrors.leaveType?.message}
                />
              )}
            />

            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <Controller
                  control={leaveControl}
                  name="startDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="From Date"
                      placeholder="YYYY-MM-DD"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={leaveErrors.startDate?.message}
                    />
                  )}
                />
              </View>
              <View className="w-[48%]">
                <Controller
                  control={leaveControl}
                  name="endDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="To Date"
                      placeholder="YYYY-MM-DD"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={leaveErrors.endDate?.message}
                    />
                  )}
                />
              </View>
            </View>

            <Controller
              control={leaveControl}
              name="reason"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  label="Reason Details"
                  placeholder="Describe reason for leave..."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={leaveErrors.reason?.message}
                  multiline
                  numberOfLines={2}
                />
              )}
            />

            <InteractiveButton
              onPress={handleLeaveSubmit(onLeaveApply)}
              title="Submit Leave Request"
              variant="secondary"
              className="mt-4"
            />
          </GlassCard>
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

export default TeacherDashboard;
