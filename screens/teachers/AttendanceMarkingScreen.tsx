import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const AttendanceMarkingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({
    'stud_001': 'Present',
    'stud_002': 'Present'
  });

  const students = [
    { id: 'stud_001', name: 'Vamshi' },
    { id: 'stud_002', name: 'Sneha' }
  ];

  const toggleAttendance = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    Alert.alert('Success', 'Attendance sheet recorded successfully.');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e055a', '#101415']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#ddb7ff" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Mark Attendance</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {students.map((stud) => (
            <GlassCard key={stud.id} className="p-5 border border-white/10 gap-3" intensity="low">
              <Text className="text-white font-bold text-base font-headline-sm">{stud.name}</Text>
              <View className="flex-row gap-2">
                {['Present', 'Absent', 'Late'].map((status: any) => (
                  <Pressable
                    key={status}
                    onPress={() => toggleAttendance(stud.id, status)}
                    className={`flex-1 py-2.5 rounded-xl border items-center justify-center ${
                      attendance[stud.id] === status 
                        ? 'bg-[#ffe5a0] border-[#ffe5a0]' 
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <Text className={`text-xs font-semibold ${attendance[stud.id] === status ? 'text-[#000]' : 'text-white/60'}`}>
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </GlassCard>
          ))}
          <Pressable
            onPress={handleSave}
            className="bg-[#ddb7ff] w-full py-4 rounded-xl items-center justify-center active:scale-95 shadow-[0_0_12px_rgba(221,183,255,0.3)] mt-2"
          >
            <Text className="text-[#101415] font-bold text-sm">Save Attendance Sheet</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101415',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 35,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 50,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 100 : 85,
    paddingBottom: 40,
  },
});

export default AttendanceMarkingScreen;
