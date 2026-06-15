import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Send, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const EnquiryFormScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [childName, setChildName] = useState('');
  const [grade, setGrade] = useState('Select Grade');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!parentName || !mobile || !childName) {
      Alert.alert('Required Fields', 'Please fill in parent name, mobile number, and child name.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Success',
        'Thank you! Your enquiry has been received. Our team will contact you within 24 hours.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  const grades = [
    'Grade 1 - Primary',
    'Grade 6 - Middle',
    'Grade 9 - High School',
    'A-Levels / IB DP'
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a2a3a', '#101415']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top App Bar */}
      <BlurView intensity={30} tint="dark" style={styles.header}>
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} className="p-1 active:scale-95">
            <ChevronLeft size={24} color="#8ed5ff" />
          </Pressable>
          <Text className="text-xl font-bold text-white font-display-lg">New Enquiry</Text>
        </View>
        <Sparkles size={20} color="#8ed5ff" />
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-6">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-2">
            Begin Your <Text className="text-[#8ed5ff]">Visionary</Text> Journey
          </Text>
          <Text className="text-white/60 text-sm font-body-lg leading-relaxed">
            Join an elite community of learners. Fill out the enquiry form below, and our admissions office will guide you through the next steps.
          </Text>
        </View>

        <View className="px-5 mb-8">
          <GlassCard className="p-6 border border-white/10 gap-5" intensity="low">
            <View className="gap-1.5">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Parent Name</Text>
              <TextInput
                value={parentName}
                onChangeText={setParentName}
                placeholder="e.g. John Doe"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white font-body-md text-sm"
              />
            </View>

            <View className="gap-1.5">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Mobile Number</Text>
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="e.g. +1 (555) 000-0000"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="phone-pad"
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white font-body-md text-sm"
              />
            </View>

            <View className="gap-1.5">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Child Name</Text>
              <TextInput
                value={childName}
                onChangeText={setChildName}
                placeholder="e.g. Jane Doe"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white font-body-md text-sm"
              />
            </View>

            <View className="gap-1.5">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Class Applying For</Text>
              <View className="flex-row flex-wrap gap-2">
                {grades.map((g) => (
                  <Pressable
                    key={g}
                    onPress={() => setGrade(g)}
                    className={`px-4 py-2.5 rounded-xl border ${
                      grade === g ? 'bg-[#38bdf8] border-[#38bdf8]' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <Text className={`text-xs font-semibold ${grade === g ? 'text-[#004965]' : 'text-white/60'}`}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="gap-1.5">
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1 font-label-md">Message</Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Any specific requirements or questions..."
                placeholderTextColor="rgba(255,255,255,0.3)"
                multiline
                numberOfLines={4}
                style={{ textAlignVertical: 'top' }}
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-xl text-white font-body-md text-sm"
              />
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#38bdf8] w-full py-4 rounded-xl items-center justify-center flex-row gap-2 active:scale-95 mt-2 shadow-[0_0_16px_rgba(56,189,248,0.4)]"
            >
              <Text className="text-[#004965] font-bold text-sm font-label-lg">
                {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
              </Text>
              <Send size={16} color="#004965" />
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

export default EnquiryFormScreen;
