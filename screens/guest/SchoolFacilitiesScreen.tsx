import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const SchoolFacilitiesScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const facilities = [
    {
      title: 'Advanced Labs',
      desc: 'Next-generation research facilities equipped with AI-integrated instrumentation and specialized simulation centers.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRCdouZ5lDyHLWuxKOiZE_cN_mn6UT6EsQvnGt3ZwJMvUIRqvquiQS6c2IZp4VxCQPx1NZmKHVrUOa59nxnhvuta3ly-R1HMVtW8yRfcwsbz-gx9n2qmUBPz8ncNgvdIvnb4fbfH6iKXtk0LoqLw8Pkqt2C5kLvsJ1C6SsdRN9-U7t7VdwzpA0xyT3OJvKeTxSQ3c_GQQVDzxY7O21E2mZeXDI5J0lrtqOrp4XelAUjCeTh5CI9h4UGsd_QnLBzi8fbqWxMcFrJkr5'
    },
    {
      title: 'Digital Library',
      desc: 'A vast hybrid repository of digital and physical knowledge, featuring quiet zones, collaborative pods, and databases.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0pZ-_LFlJudKoqBz3KHrBi6gAJy0WWcck-2BjW3PQdiXhSZXQLB27nHUPyf0gzheHH0tnuLV6MQOkGea28-rSEHbmF_wgnmX_h3wUnINCcoMpUjYfHcd0cnKP6wy4yqT98DSRPZdC3LWIsMQXCTW-DdPwCO-FhR19IUfQi_MIyKoNVOq0FuC0eoCC2IdhJZzeHtMwIImWQCBygQi2gcSn_0djMMy35JHStwFV7IX9RAlMDBpZ6DEFrv8SaMCXXzd6YpjZIZTX0zKE'
    },
    {
      title: 'Sports Complex',
      desc: 'Olympic-grade athletic centers including heated pools, professional tracks, and high-performance gyms.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9pR1WHhjXrkZz7FeEePWGlX4fls42RDxqj9YUzAiULbjvvYlh5s2ul--CYzZevE_Xq3O6OLoBxofzFp8EhEzAZREdSoO6crCVonmmFvWFl_pNnMKXyOs-iAgNXJvkwTUXsTGm9kMWR3uQv8zp-W1ag2bjyaa4ofC1_2kx74NKYKL9QFHzHdLAYsSEOMUXddGsFN6c5xr4NNOHmnXzNQ9dQLPXiknqkRvnCXE5LFA580K7l3UAOhq2Iw12sZ7jR-bnLJhu8jp_Zbd0'
    },
    {
      title: 'Eco Transit',
      desc: 'A seamless transit network connecting campus with real-time bus tracking and zero-emission shuttles.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC9n-mReQIeKWvNSyd8bb1kTIuEWvIuSB--s1ZgbFjDZB9eaz6BpMHIQ5VxdlwI-DZNBVBxgP3AN8tfPj3UWjn7QOlVAXyWwiBoGk4-Nr5cI1jDIzO0B2Hpx5J9PIHdK-y9_tQH33Cj8H3Yy9WxGyzacB1lAMP_v4_yiq9_tKDnpQYBiVFtTrbAu_SVkluIDyirHuVwx8VXacWIRwME5pmBl6GWeLOlMljdpjWLatjsBhB_gLROK7kSY0FepoPSZoUvyPqqNM-q3le'
    },
    {
      title: 'Visionary Canteen',
      desc: 'Gourmet dining experience offering diverse, nutritionally-balanced cuisines in a vibrant social hub.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRaKr8MZmE5byKZqdVZ-CFNxKpIpiw2I-lFan76XbWtLE6X41JkKS87Z24T1yI4fH99RglECg9babwd9JsT0AHF9T_YGANlH8sSU37c4xT81wCdjorHO41GHAEh4B1_sTcaOSyRyRySeYB1vggGvZY9tm8DdxhkcT5onyYEuRSQQxuB2NexAPlfRkEWRam4jyjlsm1zpNSSgSj4b9hDlsIcvlo3YtfcIaayRuuOjn9qxZwQucV71rLXofN6f5n0EBj4QLMnVXwp302'
    },
    {
      title: 'Health Center',
      desc: 'Fully-equipped medical room staffed by professional practitioners, providing emergency care and wellness support.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn9Uz76sg9TmgHzzr-L8tCZXFMIWf5WFApZU_a8c8ncaQ9zjpqnOkY7ZiNmaEVFA-0MYRzcfV-JVNsXhrwajCJWHLFxR3R0lxHVJaVO5kqKG2X62wBtI8ANn9ElKvg66N9NYme21h4AoiLl-PJWe4GO6-Jimyo9ELNO8ytk51R25eOYQMWD1F0OE_Rc0VtbMwvXdON-BnBU0svPVNyJzykcGuYzB07p6_Vl4E3bNKQnPqhfwlq6wA_SNSUlaXTmOGWtiinAG6s1U91'
    }
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
          <Text className="text-xl font-bold text-white font-display-lg">Campus Facilities</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-8">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-2">
            World-Class{"\n"}
            <Text className="text-[#8ed5ff]">Infrastructure</Text>
          </Text>
          <Text className="text-white/60 text-sm font-body-lg leading-relaxed">
            Experience an environment designed for innovation, discovery, and personal growth. Our campus features state-of-the-art facilities that empower students.
          </Text>
        </View>

        {/* Facilities List */}
        <View className="px-5 gap-6 mb-8">
          {facilities.map((fac, idx) => (
            <GlassCard key={idx} className="border border-white/10 overflow-hidden" intensity="low">
              <Image 
                source={{ uri: fac.img }}
                className="w-full h-44"
                resizeMode="cover"
              />
              <View className="p-5 gap-2">
                <Text className="text-white font-bold text-lg font-headline-sm">{fac.title}</Text>
                <Text className="text-white/60 text-xs font-body-md leading-relaxed">{fac.desc}</Text>
              </View>
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
});

export default SchoolFacilitiesScreen;
