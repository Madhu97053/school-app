import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const SubstitutionManagementScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const list = [
    { absClass: 'Grade 8-A', period: 'Period 3', absentTeacher: 'Ms. Priya Reddy', substitute: 'Sarah (Admin Staff)', status: 'Pending' }
  ];

  const handleAssign = () => {
    Alert.alert('Success', 'Substitute teacher assigned successfully.');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0d2a24', '#121414']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#46f1c5" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">Substitutions</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {list.map((item, idx) => (
            <GlassCard key={idx} className="p-5 border border-white/10 gap-3" intensity="low">
              <View className="flex-row justify-between border-b border-white/5 pb-2.5">
                <Text className="text-white font-bold text-sm font-headline-sm">{item.absClass} • {item.period}</Text>
                <Text className="text-[#46f1c5] text-xs font-semibold font-label-lg">{item.status}</Text>
              </View>
              <View className="gap-1 mb-2">
                <Text className="text-white/60 text-xs font-body-sm">• Absent: {item.absentTeacher}</Text>
                <Text className="text-white/60 text-xs font-body-sm">• Substitute Candidate: {item.substitute}</Text>
              </View>
              <Pressable
                onPress={handleAssign}
                className="bg-[#46f1c5] w-full py-3 rounded-xl items-center justify-center active:scale-95 shadow-[0_0_12px_rgba(70,241,197,0.3)]"
              >
                <Text className="text-[#0d2a24] font-bold text-xs">Assign Substitution</Text>
              </Pressable>
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

export default SubstitutionManagementScreen;
