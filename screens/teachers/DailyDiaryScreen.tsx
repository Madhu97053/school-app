import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Send } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const DailyDiaryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [log, setLog] = useState('');

  const handleSave = () => {
    if (!log) {
      Alert.alert('Required', 'Please write a diary log.');
      return;
    }
    Alert.alert('Success', 'Daily diary log dispatched to parents.');
    setLog('');
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
          <Text className="text-xl font-bold text-white font-display-lg">Daily Diary</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10 gap-4" intensity="low">
            <Text className="text-white font-bold text-base font-headline-sm">New Diary Log Entry</Text>
            <TextInput
              value={log}
              onChangeText={setLog}
              placeholder="e.g. Students completed the physics experiment module. Homework: Exercise 4.2."
              placeholderTextColor="rgba(255,255,255,0.3)"
              multiline
              numberOfLines={4}
              style={{ textAlignVertical: 'top' }}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white font-body-md text-sm"
            />
            <Pressable
              onPress={handleSave}
              className="bg-[#ddb7ff] w-full py-3.5 rounded-xl items-center justify-center flex-row gap-2 active:scale-95 mt-2"
            >
              <Text className="text-[#101415] font-bold text-xs">Dispatch Diary Log</Text>
              <Send size={14} color="#101415" />
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

export default DailyDiaryScreen;
