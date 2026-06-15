import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Search, Plus, Trash } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const UserManagementScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filterChips = ['ALL', 'TEACHERS', 'ADMIN STAFF', 'PARENTS', 'STUDENTS'];

  const users = [
    { id: 'ED-001', name: 'Dr. Aris Thorne', role: 'Super Admin', status: 'Active', dept: 'ADMIN STAFF' },
    { id: 'ED-042', name: 'Elena Vance', role: 'Faculty Lead', status: 'Active', dept: 'TEACHERS' },
    { id: 'ED-119', name: 'Julian Cross', role: 'Maintenance', status: 'Inactive', dept: 'ADMIN STAFF' },
    { id: 'ED-088', name: 'Sarah Miller', role: 'IT Staff', status: 'Active', dept: 'ADMIN STAFF' },
    { id: 'ED-412', name: 'Dorian Black', role: 'Prefect', status: 'Active', dept: 'STUDENTS' }
  ];

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === 'ALL' || u.dept === filter;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <Text className="text-xl font-bold text-white font-display-lg">User Management</Text>
        </View>
        <Pressable className="bg-[#f0c110] p-2 rounded-full active:scale-95 shadow-[0_0_12px_rgba(240,193,16,0.4)]">
          <Plus size={18} color="#000" />
        </Pressable>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
            <Search size={18} color="rgba(255,255,255,0.4)" className="mr-3" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search users by name or ID..."
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="flex-1 text-white font-body-md text-sm"
            />
          </View>
        </View>

        {/* Filter Chips */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {filterChips.map((c) => (
              <Pressable
                key={c}
                onPress={() => setFilter(c)}
                className={`px-5 py-2.5 rounded-full mr-3 border ${
                  filter === c 
                    ? 'bg-[#f0c110] border-[#f0c110] shadow-[0_0_12px_rgba(240,193,16,0.3)]' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <Text className={`text-xs font-semibold ${filter === c ? 'text-[#000]' : 'text-white/60'}`}>{c}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* User list */}
        <View className="px-5 gap-4 mb-8">
          {filteredUsers.map((u, idx) => (
            <GlassCard key={idx} className="p-4 border border-white/10 flex-row items-center justify-between" intensity="low">
              <View className="gap-1 flex-1 pr-4">
                <View className="flex-row items-center gap-2">
                  <Text className="text-white font-bold text-sm font-headline-sm">{u.name}</Text>
                  <View className={`px-2 py-0.5 rounded ${u.status === 'Active' ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                    <Text className={`text-[9px] font-bold ${u.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>{u.status}</Text>
                  </View>
                </View>
                <Text className="text-[#ffe5a0] text-xs font-semibold font-label-lg">{u.role} • {u.id}</Text>
              </View>
              <Pressable className="p-2 active:scale-95">
                <Trash size={16} color="rgba(255,255,255,0.4)" />
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
  chipsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
});

export default UserManagementScreen;
