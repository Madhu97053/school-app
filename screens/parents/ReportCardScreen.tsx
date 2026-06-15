import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { mockExams } from '../../services/mockData';
import { GlassCard } from '../../components/GlassCard';
import { ArrowLeft, Award, TrendingUp, BarChart2 } from 'lucide-react-native';

export const ReportCardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { activeChildId } = useAuthStore();
  const exams = mockExams[activeChildId || 'stud_001'] || [];

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View className="flex-row items-center mb-6">
        <Pressable onPress={() => navigation.goBack()} className="p-3 bg-white/5 border border-white/10 rounded-2xl">
          <ArrowLeft size={20} color="#FFFFFF" />
        </Pressable>
        <Text className="text-white text-xl font-bold ml-4">Academic Analytics</Text>
      </View>

      {/* Aggregate Overview Card */}
      <GlassCard className="p-5 mb-6 bg-brand-purple/15" intensity="high" glowColor="rgba(124, 58, 237, 0.3)">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-white/40 text-[10px] font-bold uppercase">Term 1 Performance</Text>
            <Text className="text-white text-2xl font-extrabold">Grade Point A-</Text>
          </View>
          <Award size={36} color="#A78BFA" />
        </View>
        
        <View className="flex-row justify-between border-t border-white/10 pt-3">
          <View className="items-center flex-1">
            <Text className="text-white/40 text-[9px] font-bold uppercase mb-1">Rank Trend</Text>
            <View className="flex-row items-center">
              <TrendingUp size={12} color="#10B981" />
              <Text className="text-white text-sm font-bold ml-1">#4 in Class</Text>
            </View>
          </View>
          <View className="items-center flex-1 border-l border-white/10">
            <Text className="text-white/40 text-[9px] font-bold uppercase mb-1">Average Grade</Text>
            <Text className="text-emerald-450 font-bold text-sm">88.2%</Text>
          </View>
        </View>
      </GlassCard>

      {/* Subject Grades List */}
      <Text className="text-white/80 text-sm font-semibold mb-3 ml-1">Subject Performance Analysis</Text>
      {exams.map((exam) => (
        <GlassCard key={exam.id} className="p-4 mb-4" intensity="medium">
          <View className="flex-row justify-between items-start mb-2">
            <View>
              <Text className="text-white font-bold text-base">{exam.subject}</Text>
              <Text className="text-white/50 text-[10px] uppercase font-semibold mt-0.5">{exam.examName}</Text>
            </View>
            <View className="bg-brand-indigo/25 border border-brand-indigo/35 px-2.5 py-1 rounded-xl">
              <Text className="text-white font-black text-xs">{exam.grade}</Text>
            </View>
          </View>

          {/* Marks Progress and Average indicator */}
          <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-white/5">
            <View>
              <Text className="text-white/40 text-[9px] font-bold uppercase">Score</Text>
              <Text className="text-white font-extrabold text-sm">{exam.marksObtained} / {exam.maxMarks}</Text>
            </View>
            <View className="items-end">
              <Text className="text-white/40 text-[9px] font-bold uppercase">Class Average</Text>
              <Text className="text-white/70 text-xs font-semibold">{exam.classAverage}%</Text>
            </View>
          </View>
        </GlassCard>
      ))}
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

export default ReportCardScreen;
