import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ChevronDown, AlertTriangle, Lightbulb, TrendingUp, Mail } from 'lucide-react-native';

export const StudentPerformanceScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View className="absolute inset-0 bg-[#150E22]" />
      
      {/* Header */}
      <View style={styles.header}>
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full border border-[#ddb7ff] p-0.5 items-center justify-center bg-[#1a1525]">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150' }} 
              className="w-full h-full rounded-full"
            />
          </View>
          <Text className="text-[#ddb7ff] text-2xl font-bold ml-3 tracking-tight">EduCommand</Text>
        </View>
        <Pressable className="w-10 h-10 rounded-xl items-center justify-center bg-white/5 border border-white/10">
          <Bell size={20} color="#EABFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Title */}
        <View className="mb-6">
          <Text className="text-white text-[32px] font-extrabold tracking-tight mb-2">Student Performance</Text>
          <Text className="text-[#A1A1AA] text-sm">Deep dive into individual academic metrics and trends.</Text>
        </View>

        {/* Student Selector */}
        <View className="bg-[#2a1b4e]/80 border border-[#ddb7ff]/20 rounded-2xl px-5 py-3 flex-row justify-between items-center mb-8 shadow-lg">
          <View className="flex-row items-center">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' }} 
              className="w-10 h-10 rounded-full mr-4 border border-[#ddb7ff]/30"
            />
            <View>
              <Text className="text-[#EABFFF] text-[10px] font-bold tracking-widest uppercase mb-0.5">SELECT STUDENT</Text>
              <Text className="text-white font-bold text-base">Julian Sterling</Text>
            </View>
          </View>
          <ChevronDown size={20} color="#EABFFF" />
        </View>

        {/* Subject Mastery */}
        <View className="bg-[#1e1136] border border-white/5 rounded-[32px] p-6 mb-8 shadow-lg">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-white text-2xl font-bold mb-1">Subject Mastery</Text>
              <Text className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase">CURRENT SEMESTER SCORE %</Text>
            </View>
            <View className="bg-white/10 border border-white/5 px-4 py-1.5 rounded-full flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-[#EABFFF] mr-2 shadow-[0_0_8px_#EABFFF]" />
              <Text className="text-[#EABFFF] text-[10px] font-bold">Live Data</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-end h-40 mt-4 px-2">
            {[
              { label: 'MATH', height: '90%' },
              { label: 'PHYS', height: '65%' },
              { label: 'BIOL', height: '80%' },
              { label: 'HIST', height: '45%' },
              { label: 'LIT', height: '85%' },
              { label: 'CHEM', height: '60%' },
            ].map((item, index) => (
              <View key={index} className="items-center w-[12%]">
                <View className="w-full bg-[#150E22]/80 rounded-t-xl overflow-hidden" style={{ height: 120, justifyContent: 'flex-end' }}>
                  <View style={{ width: '100%', height: item.height as any, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#EABFFF' }} />
                </View>
                <Text className="text-white/80 text-[10px] font-bold mt-4">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Rank Trend */}
        <View className="bg-[#1C1C1E] border border-white/5 rounded-[32px] p-6 mb-8 shadow-lg overflow-hidden relative">
          <Text className="text-white text-2xl font-bold mb-1">Rank Trend</Text>
          <Text className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase mb-8">GLOBAL CLASSROOM POSITION</Text>
          
          {/* Mock Chart Area */}
          <View className="h-28 mb-4 justify-center relative">
            <View className="absolute inset-x-0 top-1/2 h-[3px] bg-[#EABFFF] rounded-full shadow-[0_0_12px_#EABFFF]" style={{ elevation: 10, shadowColor: '#EABFFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 8 }} />
            <View className="flex-row justify-between items-center h-full pt-4 relative">
              <View className="w-3 h-3 rounded-full bg-[#EABFFF] border-[3px] border-[#1C1C1E] z-10" style={{ transform: [{ translateY: 15 }] }} />
              <View className="w-3 h-3 rounded-full bg-[#EABFFF] border-[3px] border-[#1C1C1E] z-10" style={{ transform: [{ translateY: -5 }] }} />
              <View className="w-3 h-3 rounded-full bg-[#EABFFF] border-[3px] border-[#1C1C1E] z-10" style={{ transform: [{ translateY: 20 }] }} />
              <View className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-[#1C1C1E] shadow-[0_0_16px_#fff] z-10" style={{ transform: [{ translateY: -20 }] }} />
            </View>
          </View>

          <View className="flex-row justify-between mb-8 px-1">
            <Text className="text-[#A1A1AA] text-xs font-bold">Ex. 01</Text>
            <Text className="text-[#A1A1AA] text-xs font-bold">Ex. 02</Text>
            <Text className="text-[#A1A1AA] text-xs font-bold">Ex. 03</Text>
            <Text className="text-white/60 text-xs font-bold">Latest</Text>
          </View>

          <View className="flex-row justify-between items-end border-t border-white/5 pt-5 mt-2">
            <View>
              <Text className="text-[#A1A1AA] text-sm mb-1">Current Rank</Text>
              <Text className="text-[#EABFFF] text-3xl font-bold">#04</Text>
            </View>
            <View className="bg-[#10b981]/20 border border-[#10b981]/30 px-4 py-1.5 rounded-full flex-row items-center">
              <TrendingUp size={14} color="#10b981" className="mr-1" />
              <Text className="text-[#10b981] text-xs font-bold">+2</Text>
            </View>
          </View>
        </View>

        {/* Benchmarking */}
        <View className="flex-row justify-between items-center mb-6 mt-4">
          <Text className="text-white text-[28px] font-bold tracking-tight">Benchmarking</Text>
          <View className="flex-row">
            <View className="flex-row items-center mr-4">
              <View className="w-2 h-2 rounded-full bg-[#10b981] mr-1.5" />
              <Text className="text-white font-bold text-xs">Above</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-[#f87171] mr-1.5" />
              <Text className="text-white font-bold text-xs">Below</Text>
            </View>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          {[
            { subject: 'Mathematics', val: '+12%', type: 'Above Avg' },
            { subject: 'Physics', val: '+05%', type: 'Above Avg' },
            { subject: 'History', val: '-08%', type: 'Below Avg' },
            { subject: 'Biology', val: '+02%', type: 'Above Avg' },
            { subject: 'Literature', val: '+18%', type: 'Above Avg' },
            { subject: 'Chemistry', val: '-04%', type: 'Below Avg' },
          ].map((item, index) => {
            const isAbove = item.type === 'Above Avg';
            return (
              <View key={index} className="w-[48%] bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 mb-4 shadow-lg">
                <Text className="text-white/90 text-sm mb-4 font-medium">{item.subject}</Text>
                <View className="flex-row items-center">
                  <Text className="text-white text-xl font-bold mr-2">{item.val}</Text>
                  <View className={`px-2 py-1 rounded-md ${isAbove ? 'bg-[#10b981]/20' : 'bg-[#f87171]/20'}`}>
                    <Text className={`text-[10px] font-bold ${isAbove ? 'text-[#10b981]' : 'text-[#f87171]'}`}>{item.type}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Priority: History */}
        <View className="bg-[#1A1A1A] border-2 border-[#f97316]/50 rounded-[32px] p-6 mb-6 relative overflow-hidden">
          {/* Faint alert icon in background */}
          <View className="absolute -right-4 -top-4 opacity-[0.03]">
            <AlertTriangle size={140} color="#f97316" />
          </View>
          
          <View className="flex-row items-center mb-5">
            <AlertTriangle size={24} color="#f97316" />
            <Text className="text-white text-lg font-bold ml-3">Priority: History</Text>
          </View>
          
          <Text className="text-[#A1A1AA] text-[15px] leading-relaxed mb-6">
            Julian is struggling with chronological timelines and cause-effect analysis in 19th-century modules.
          </Text>

          <Text className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase mb-3">SUGGESTED ACTION</Text>
          <View className="bg-[#2a2a35] border border-transparent rounded-2xl p-5 mb-6">
            <Text className="text-[#A1A1AA] text-sm italic leading-relaxed">
              "Schedule a 15-minute sync to review the Napoleonic Era mind-map. Assign visual timeline exercises for homework."
            </Text>
          </View>

          <Pressable className="bg-[#f97316]/10 border border-[#f97316]/30 flex-row items-center justify-center py-4 rounded-xl">
            <Mail size={18} color="#f97316" />
            <Text className="text-[#f97316] font-bold text-base ml-2">Nudge Guardian</Text>
          </Pressable>
        </View>

        {/* Progress Note: Chemistry */}
        <View className="bg-[#1A1A1A] border-2 border-[#EABFFF]/30 rounded-[32px] p-6 mb-8 relative overflow-hidden">
          <View className="absolute -right-4 -bottom-4 opacity-[0.03]">
            <Lightbulb size={140} color="#EABFFF" />
          </View>
          
          <View className="flex-row items-center mb-5">
            <Lightbulb size={24} color="#EABFFF" />
            <Text className="text-white text-lg font-bold ml-3">Progress Note: Chemistry</Text>
          </View>
          
          <Text className="text-[#A1A1AA] text-[15px] leading-relaxed mb-6">
            Steady improvement in stoichiometric calculations, but conceptual gaps remain in organic bonding.
          </Text>

          <View className="bg-[#2a2a35] border border-transparent rounded-2xl p-5 flex-row justify-between items-center">
            <Text className="text-[#A1A1AA] text-sm font-medium">Interactive Quiz Score</Text>
            <Text className="text-[#EABFFF] text-lg font-bold">74%</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#150E22',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default StudentPerformanceScreen;
