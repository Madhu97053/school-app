import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../../components/GlassCard';
import { AdminStaffHeader } from '../../components/AdminStaffHeader';
import { Search, MapPin, Phone, MessageSquare, Trophy, TrendingUp, BookOpen, User, Star, Award, TrendingDown, Minus } from 'lucide-react-native';

export const StudentPerformanceScreen: React.FC<any> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Attendance', 'Fees', 'Documents'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0d2a24', '#121414']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <AdminStaffHeader 
        onBackPress={() => navigation.goBack()}
        title="Admin Panel"
        icon={
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150' }} 
            className="w-8 h-8 rounded-full border border-emerald-500/30"
          />
        }
        rightAction={
          <Pressable>
            <Search size={24} color="#34D399" />
          </Pressable>
        }
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="items-center mb-8 mt-4">
          <View className="relative mb-6">
            <View className="w-36 h-36 rounded-full border-4 border-[#00f1a1] p-1.5 shadow-[0_0_30px_rgba(0,241,161,0.5)] items-center justify-center bg-[#101415]">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300' }} 
                className="w-full h-full rounded-full opacity-80"
              />
            </View>
            <View className="absolute -bottom-3 right-4">
              <View className="bg-[#00f1a1] px-3 py-1 rounded-full shadow-lg shadow-[#00f1a1]/50">
                <Text className="text-[#101415] font-bold text-xs tracking-wider">ACTIVE</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-3xl font-bold mb-3">Julian Voss</Text>
          <View className="flex-row space-x-3">
            <View className="bg-[#101415] border border-[#00f1a1]/30 px-4 py-1.5 rounded-full">
              <Text className="text-[#00f1a1] text-xs font-semibold">Class 3-B</Text>
            </View>
            <View className="bg-[#101415] border border-white/20 px-4 py-1.5 rounded-full">
              <Text className="text-white/70 text-xs font-semibold">ID: EV-2024-8831</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 pl-1" contentContainerStyle={{ paddingRight: 20 }}>
          {tabs.map((tab) => (
            <Pressable 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              className={`mr-3 px-5 py-2.5 rounded-xl ${activeTab === tab ? 'bg-[#46f1c5]' : 'bg-transparent border border-white/10'}`}
            >
              <Text className={`${activeTab === tab ? 'text-[#101415] font-bold' : 'text-white/70 font-semibold'}`}>{tab}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Overview Tab Content */}
        {activeTab === 'Overview' && (
          <View className="gap-y-3">
            <View className="flex-row space-x-3">
              <GlassCard intensity="low" className="flex-1 p-4">
                <Text className="text-white/60 text-xs mb-1">DOB</Text>
                <Text className="text-white text-base font-semibold">14 May 2012</Text>
              </GlassCard>
              <GlassCard intensity="low" className="flex-1 p-4">
                <Text className="text-white/60 text-xs mb-1">Admission Date</Text>
                <Text className="text-white text-base font-semibold">02 Jan 2024</Text>
              </GlassCard>
            </View>

            <View className="flex-row space-x-3">
              <GlassCard intensity="low" className="flex-1 p-4">
                <Text className="text-white/60 text-xs mb-1">Blood Group</Text>
                <Text className="text-emerald-400 text-base font-semibold">A+ Pos</Text>
              </GlassCard>
              <GlassCard intensity="low" className="flex-1 p-4">
                <Text className="text-white/60 text-xs mb-1">House</Text>
                <Text className="text-white text-base font-semibold">Emerald</Text>
              </GlassCard>
            </View>

            <GlassCard intensity="low" className="p-4 mt-2">
              <View className="flex-row items-center mb-2">
                <MapPin size={16} color="#A1A1AA" />
                <Text className="text-white/60 text-xs ml-2">Current Address</Text>
              </View>
              <Text className="text-white/90 text-sm leading-6">
                42 Quantum Heights, Silicon Valley District,{"\n"}EdTech City, 94043
              </Text>
            </GlassCard>

            <GlassCard intensity="low" className="p-5 mt-2">
              <Text className="text-white/60 text-xs font-semibold tracking-wider mb-4 uppercase">Parent Contact</Text>
              
              <View className="flex-row justify-between items-center mb-4 border-b border-white/5 pb-4">
                <View>
                  <Text className="text-white text-base font-semibold mb-0.5">Marcus Voss</Text>
                  <Text className="text-white/50 text-xs">Primary Guardian</Text>
                </View>
                <View className="flex-row space-x-2">
                  <Pressable className="w-10 h-10 rounded-full border border-white/10 items-center justify-center bg-white/5 mr-2">
                    <Phone size={18} color="#34D399" />
                  </Pressable>
                  <Pressable className="w-10 h-10 rounded-full border border-white/10 items-center justify-center bg-white/5">
                    <MessageSquare size={18} color="#34D399" />
                  </Pressable>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-white text-base font-semibold mb-0.5">Elena Voss</Text>
                  <Text className="text-white/50 text-xs">Secondary Guardian</Text>
                </View>
                <View className="flex-row space-x-2">
                  <Pressable className="w-10 h-10 rounded-full border border-white/10 items-center justify-center bg-white/5 mr-2">
                    <Phone size={18} color="#34D399" />
                  </Pressable>
                  <Pressable className="w-10 h-10 rounded-full border border-white/10 items-center justify-center bg-white/5">
                    <MessageSquare size={18} color="#34D399" />
                  </Pressable>
                </View>
              </View>
            </GlassCard>

            <GlassCard intensity="low" className="p-5 mt-2 border-l-4 border-l-emerald-400">
              <View className="flex-row justify-between items-end">
                <View>
                  <Text className="text-white/60 text-xs mb-2">Academic Performance</Text>
                  <Text className="text-emerald-400 text-4xl font-bold tracking-tighter">88.4%</Text>
                </View>
                <View className="items-end">
                  <Text className="text-white/60 text-xs mb-1">Rank</Text>
                  <Text className="text-white text-xl font-bold">4th <Text className="text-white/50 text-base">/ 32</Text></Text>
                </View>
              </View>
            </GlassCard>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
});

export default StudentPerformanceScreen;
