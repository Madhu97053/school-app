import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const LeaveApprovalsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [leaves, setLeaves] = useState([
    { id: 1, name: 'Ms. Priya Reddy', role: 'Mathematics Teacher', days: '2 Days', reason: 'Medical Leave request', status: 'Pending' },
    { id: 2, name: 'Elena Vance', role: 'Faculty Lead', days: '1 Day', reason: 'Personal Leave request', status: 'Pending' }
  ]);

  const handleAction = (id: number, status: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    Alert.alert('Success', `Leave request has been ${status.toLowerCase()}.`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1d2022', '#101415']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#ffe5a0" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Leave Approvals</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {leaves.map((l, idx) => (
            <GlassCard key={idx} className="p-5 border border-white/10 gap-4" intensity="low">
              <View className="gap-1">
                <Text className="text-white font-bold text-base font-headline-sm">{l.name}</Text>
                <Text className="text-[#ffe5a0] text-xs font-semibold font-label-lg">{l.role}</Text>
              </View>
              <View className="border-t border-white/5 pt-3 gap-2">
                <Text className="text-white/60 text-xs font-body-sm leading-relaxed">• Reason: {l.reason}</Text>
                <Text className="text-[#ffe5a0] text-xs font-bold font-body-sm">• Duration: {l.days}</Text>
              </View>
              {l.status === 'Pending' ? (
                <View className="flex-row gap-3 mt-2">
                  <Pressable
                    onPress={() => handleAction(l.id, 'Approved')}
                    className="flex-1 bg-emerald-500 py-3 rounded-xl items-center justify-center active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  >
                    <Text className="text-[#101415] font-bold text-xs">Approve</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleAction(l.id, 'Rejected')}
                    className="flex-1 border border-red-500/30 bg-red-500/10 py-3 rounded-xl items-center justify-center active:scale-95"
                  >
                    <Text className="text-red-400 font-bold text-xs">Reject</Text>
                  </Pressable>
                </View>
              ) : (
                <View className="mt-2 items-center py-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Text className={`text-xs font-bold ${l.status === 'Approved' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {l.status}
                  </Text>
                </View>
              )}
            </GlassCard>
          ))}
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

export default LeaveApprovalsScreen;
