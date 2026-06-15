import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const HomeworkAssignmentsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [hwTitle, setHwTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleCreate = () => {
    if (!hwTitle || !dueDate) {
      Alert.alert('Required', 'Please enter homework title and due date.');
      return;
    }
    Alert.alert('Success', 'Homework assignment created.');
    setHwTitle('');
    setDueDate('');
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
          <Text className="text-xl font-bold text-white font-display-lg">Homework Creator</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10 gap-4" intensity="low">
            <Text className="text-white font-bold text-base font-headline-sm">Create Assignment</Text>
            <View className="gap-1">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Homework Description</Text>
              <TextInput
                value={hwTitle}
                onChangeText={setHwTitle}
                placeholder="e.g. Physics Exercise 4.2 Mechanics"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white font-body-md text-sm"
              />
            </View>
            <View className="gap-1">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Due Date</Text>
              <TextInput
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="e.g. Jun 25, 2026"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white font-body-md text-sm"
              />
            </View>
            <Pressable
              onPress={handleCreate}
              className="bg-[#ddb7ff] w-full py-3.5 rounded-xl items-center justify-center flex-row gap-2 active:scale-95 mt-2"
            >
              <Plus size={14} color="#101415" />
              <Text className="text-[#101415] font-bold text-xs">Create Assignment</Text>
            </Pressable>
          </GlassCard>
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

export default HomeworkAssignmentsScreen;
