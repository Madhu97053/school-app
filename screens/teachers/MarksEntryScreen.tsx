import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const MarksEntryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [marks, setMarks] = useState<Record<string, string>>({
    'stud_001': '85',
    'stud_002': '90'
  });

  const students = [
    { id: 'stud_001', name: 'Vamshi' },
    { id: 'stud_002', name: 'Sneha' }
  ];

  const toggleMarks = (id: string, score: string) => {
    setMarks(prev => ({ ...prev, [id]: score }));
  };

  const handleSave = () => {
    Alert.alert('Success', 'Marks recorded successfully.');
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
          <Text className="text-xl font-bold text-white font-display-lg">Marks Entry</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8 gap-5">
          {students.map((stud) => (
            <GlassCard key={stud.id} className="p-5 border border-white/10 flex-row items-center justify-between" intensity="low">
              <Text className="text-white font-bold text-base font-headline-sm">{stud.name}</Text>
              <TextInput
                value={marks[stud.id]}
                onChangeText={(score) => toggleMarks(stud.id, score)}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Marks / 100"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="w-24 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-white font-body-md text-sm text-center"
              />
            </GlassCard>
          ))}
          <Pressable
            onPress={handleSave}
            className="bg-[#ddb7ff] w-full py-4 rounded-xl items-center justify-center active:scale-95 shadow-[0_0_12px_rgba(221,183,255,0.3)] mt-2"
          >
            <Text className="text-[#101415] font-bold text-sm">Save Marks Sheet</Text>
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

export default MarksEntryScreen;
