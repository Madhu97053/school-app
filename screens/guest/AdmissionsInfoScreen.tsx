import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, HelpCircle, CheckCircle, Calendar, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const AdmissionsInfoScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const steps = [
    { num: '01', title: 'Enquiry', desc: 'Connect with our counselors to discuss your goals and understand our visionary curriculum.' },
    { num: '02', title: 'Visit', desc: 'Experience our state-of-the-art campus firsthand with a personalized guided tour.' },
    { num: '03', title: 'Form', desc: 'Complete our digital-first application process via the integrated EduVision portal.' },
    { num: '04', title: 'Admission', desc: 'Receive your visionary welcome kit and join our elite community of global learners.' }
  ];

  const eligibility = [
    { title: 'Academic Excellence', desc: 'Minimum 75% aggregate in prerequisite examinations or international equivalent.' },
    { title: 'Language Proficiency', desc: 'IELTS 6.5+ or TOEFL iBT 90+ for international non-native English speakers.' },
    { title: 'Aptitude Testing', desc: 'Successful completion of the EduVision Visionary Thinking Assessment.' },
    { title: 'Interview Round', desc: 'Holistic review through a digital panel discussion with faculty leads.' }
  ];

  const dates = [
    { label: 'Early Access', date: 'Oct 15, 2024' },
    { label: 'Regular Batch', date: 'Jan 20, 2025' },
    { label: 'Scholarship Exam', date: 'Feb 12, 2025' },
    { label: 'Commencement', date: 'Sep 05, 2025' }
  ];

  const docs = [
    'Official Academic Transcripts',
    'Valid Government Identity Card',
    'Letter of Recommendation',
    'Statement of Purpose (Video/Text)',
    'Recent Passport Photograph',
    'Extracurricular Certificates'
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
          <Text className="text-xl font-bold text-white font-display-lg">Admissions Info</Text>
        </View>
        <Pressable className="p-2 active:scale-95">
          <HelpCircle size={22} color="#8ed5ff" />
        </Pressable>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View className="px-5 mb-8">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-3">
            Join the Future of{"\n"}
            <Text className="text-[#8ed5ff]">Learning</Text>
          </Text>
          <Text className="text-white/60 text-sm leading-relaxed font-body-lg">
            A seamless, visionary admissions journey designed to empower your educational aspirations. From initial inquiry to final enrollment, we guide you every step of the way.
          </Text>
        </View>

        {/* Steps */}
        <View className="px-5 mb-8">
          <Text className="text-[#8ed5ff] text-xs font-bold uppercase tracking-widest mb-4">The Journey</Text>
          <View className="gap-4">
            {steps.map((s, idx) => (
              <GlassCard key={idx} className="p-5 border border-white/10 flex-row gap-4" intensity="low">
                <View className="w-10 h-10 rounded-full bg-[#38bdf8]/20 items-center justify-center border border-[#38bdf8]/30">
                  <Text className="text-[#8ed5ff] font-bold text-sm">{s.num}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-base mb-1 font-headline-sm">{s.title}</Text>
                  <Text className="text-white/60 text-xs leading-relaxed font-body-sm">{s.desc}</Text>
                </View>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* Eligibility & Dates */}
        <View className="px-5 mb-8 gap-6">
          <GlassCard className="p-6 border border-white/10" intensity="low">
            <Text className="text-white font-bold text-lg mb-4 font-headline-md">Eligibility Criteria</Text>
            <View className="gap-4">
              {eligibility.map((el, idx) => (
                <View key={idx} className="gap-1 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <Text className="text-[#8ed5ff] font-bold text-xs">{el.title}</Text>
                  <Text className="text-white/60 text-xs font-body-sm leading-relaxed">{el.desc}</Text>
                </View>
              ))}
            </View>
          </GlassCard>

          <GlassCard className="p-6 border border-[#38bdf8]/30 bg-[#38bdf8]/5" intensity="low">
            <Text className="text-white font-bold text-lg mb-4 font-headline-md">Critical Dates</Text>
            <View className="gap-3">
              {dates.map((d, idx) => (
                <View key={idx} className="flex-row justify-between items-center border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                  <Text className="text-white/60 text-xs">{d.label}</Text>
                  <Text className="text-[#8ed5ff] font-bold text-xs">{d.date}</Text>
                </View>
              ))}
            </View>
          </GlassCard>
        </View>

        {/* Required Documentation */}
        <View className="px-5 mb-12">
          <GlassCard className="p-6 border border-white/10" intensity="low">
            <Text className="text-white font-bold text-lg mb-2 font-headline-md">Required Documentation</Text>
            <Text className="text-white/50 text-xs mb-4 font-body-sm">Please ensure high-resolution digital copies of the following are ready for upload.</Text>
            <View className="gap-3">
              {docs.map((doc, idx) => (
                <View key={idx} className="flex-row items-center gap-3">
                  <CheckCircle size={16} color="#8ed5ff" />
                  <Text className="text-white/80 text-xs font-medium font-body-sm">{doc}</Text>
                </View>
              ))}
            </View>
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

export default AdmissionsInfoScreen;
