import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const LeaveApplicationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [days, setDays] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!days || !reason) {
      Alert.alert('Required', 'Please fill in leave duration and reason.');
      return;
    }
    Alert.alert('Leave Submitted', 'Your leave request has been submitted for approval.');
    setDays('');
    setReason('');
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
          <Text className="text-xl font-bold text-white font-display-lg">Apply for Leave</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10 gap-4" intensity="low">
            <Text className="text-white font-bold text-base font-headline-sm">Leave Application Form</Text>
            <View className="gap-1">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Duration (e.g. 2 Days)</Text>
              <TextInput
                value={days}
                onChangeText={setDays}
                placeholder="e.g. 2 Days"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white font-body-md text-sm"
              />
            </View>
            <View className="gap-1">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Reason for Leave</Text>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Reason for requesting leave..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                multiline
                numberOfLines={3}
                style={{ textAlignVertical: 'top' }}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white font-body-md text-sm"
              />
            </View>
            <Pressable
              onPress={handleSubmit}
              className="bg-[#ddb7ff] w-full py-3.5 rounded-xl items-center justify-center active:scale-95 mt-2"
            >
              <Text className="text-[#101415] font-bold text-xs">Submit Leave Application</Text>
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

export default LeaveApplicationScreen;
