import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, GraduationCap, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { GlassCard } from '../../components/GlassCard';

export const FacultyShowcaseScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedDept, setSelectedDept] = useState('All');

  const depts = ['All', 'Sciences', 'Humanities', 'Engineering', 'Design', 'Business'];

  const faculty = [
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Head of Science',
      degree: 'Ph.D in Astrophysics',
      exp: '15+ Years Experience',
      dept: 'Sciences',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLMF7kKCQOINwGCptlsid4XVzIJeE9lpseMUas9wyYR6mTEp6twKJKwWKCZi_Xm7VU43G5nvYneTmGBC0GaC2Ku8VW6md1jdhdVPgYTU_zX8oPKK7C9vYKpk2yKAsZDIS_cSKVnrIQoecH0QDfwohseAd7w5zX5-6P2wKzS-DBhwqUpgKv0IxLPR7CNGdPv1iYhSS-b59a1QCCoE1v34DxLtntva3bGY14l-t-0XoV6VlOszMO4kGTrDieo-3bomuvw2FVDhCX1Lr'
    },
    {
      name: 'Prof. David Chen',
      role: 'Lead Quantitative Researcher',
      degree: 'Ph.D in Applied Mathematics',
      exp: '22+ Years Experience',
      dept: 'Sciences',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmN2Z_SmkrCLQLcas1U2Q9pDL7uTa0sdz6brm3obLPsA3dYdAavs49CBLJ2RVzsJtuc7946QRGKKE9URm_PCu5-r--F74K4nt95u-tYHWtuu5pcePJpizQDwOQ8u-1C7jNs69nzf3T0KU7cV9fXcnbXTmOeKO_nhltSCaYNoah-l7VLyE-f3TMRNLDY5SbmddBotIvMfOKbkJjauouszfnwUa1DJmfdf_TG0_yRYlvBnKkigkuFDStAGqYd3-nBC1A492aQNZsqhzD'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Senior Design Architect',
      degree: 'M.Arch from Harvard GSD',
      exp: '12+ Years Experience',
      dept: 'Design',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCETrkOtbrWqxfoot50KfYxkpbPrgKCHv4EWXsXcnaWw-y188f2kNX37I9b7TnccaW8S0MyqMst9o_PQxsCD5yJoZv_4vtbPooR70CjT1PnpMNjfK7dZY-7ltMJca5j18CawpRLkJDyOu5qNRVAY4yAp7ThvxTNz1QyZAYAU2rgLy-MKntoC-weSNEtINKXqsYvHAa9qx63CNrSqsMNwOGtr-wm-_woLRDTqr-XWy8pjNLL1gpFvlcJpTFwHNfV8Wo0gs8e76dNF0yI'
    },
    {
      name: 'Dr. Robert Vance',
      role: 'Director of Economics',
      degree: 'Ph.D in Global Economics',
      exp: '18+ Years Experience',
      dept: 'Business',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSxRUcRuHyMela1NpdKa6hFIlpFfs3Q6K02v23mgULo2zJBDqVlMEiK07H_gSN2Cu1jCG4XXmyPScTjOrjkJCvG4k-VU9QfZdUiok2D0-KP4FtwHD15MovOV0odIKFYJ25DMNzKpyyGNYJ99wx5Ar6Y_1c_N9SC0rw2dQQkKsY0IUCkcrDPHB0Y9wZ-GdfLMPjkMxi-4S1qfj2R0LEy4zyEBcVSfcRg8Q5BSAV4riQRQsOSxkDaannFII2HCWkMIiH10l9r1vGl6jA'
    },
    {
      name: 'Dr. Amelia Thorne',
      role: 'Head of Humanities',
      degree: 'Ph.D in Literature',
      exp: '20+ Years Experience',
      dept: 'Humanities',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBzah9qLyA7Q6eup5IcL9apOALyGP0mQJCcah-Vt-LbrT6EEz7YLmRsmBZ8aHd_oEEMyj8hdrA3f60PzkpbKiXl52N_cJbVet_FlhS1SLet87QZAQsm-JGD52yhs0jvDYpbGMVTqFDLfV6KJPub66WzEupaI964HBTot0v7KzjEdHtHCsxQ55HFwkOxXWfxGhT1vktnS5oCOIBu4LYSkDnQq4yMpT3TiOPGR94ROMfKkLWuLUAS80vg-4-EKmOdvkUXrp1kZ0bURmL'
    },
    {
      name: 'Marcus Thompson',
      role: 'Lead AI Research',
      degree: 'M.S. in Machine Learning',
      exp: '10+ Years Experience',
      dept: 'Engineering',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZwtN7l0GsJD76fvA-qp-3OD38v9uB3JwKhHg5y-9TJfSoHX0s1cE9TT3Adu7CW-r9q86eOrgaeOJKhi1elrFKQP4q-oQdgk47nvSjAu52-I47opMJPBYX9qSDixPU2QujYAaomMV5XhDdMxQsXNjDcwQHLM0G2-YLjl_l3a19-mudQFhOdzT7IB42gkF2Mnpu8d0LTIPz9s8T4Q_aT4S9tygod893zNe707ydO2oFs_eUZkNaQbbfY_NpkwZjj5ydOnzMOcJH4DXo'
    }
  ];

  const filteredFaculty = selectedDept === 'All' 
    ? faculty 
    : faculty.filter(f => f.dept === selectedDept);

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
          <Text className="text-xl font-bold text-white font-display-lg">Our Faculty</Text>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View className="px-5 mb-6 text-center items-center">
          <Text className="text-white text-3xl font-extrabold font-display-lg leading-tight mb-2">
            Meet the <Text className="text-[#8ed5ff]">Visionaries</Text>
          </Text>
          <Text className="text-white/60 text-sm font-body-lg leading-relaxed text-center">
            Our world-class faculty members combine academic excellence with deep industry experience to guide the next generation of leaders.
          </Text>
        </View>

        {/* Filter Chips */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {depts.map((d) => (
              <Pressable
                key={d}
                onPress={() => setSelectedDept(d)}
                className={`px-5 py-2.5 rounded-full mr-3 border ${
                  selectedDept === d 
                    ? 'bg-[#38bdf8] border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.3)]' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <Text className={`text-xs font-semibold ${selectedDept === d ? 'text-[#004965]' : 'text-white/60'}`}>{d}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Faculty Grid */}
        <View className="px-5 mb-8 gap-5">
          {filteredFaculty.map((f, idx) => (
            <GlassCard key={idx} className="p-5 border border-white/10 items-center justify-center flex-row gap-5" intensity="low">
              <Image 
                source={{ uri: f.img }}
                className="w-24 h-24 rounded-full border-2 border-[#8ed5ff]/40"
                resizeMode="cover"
              />
              <View className="flex-1 gap-2">
                <View>
                  <Text className="text-white font-bold text-base font-headline-sm">{f.name}</Text>
                  <Text className="text-[#8ed5ff] text-xs font-semibold font-label-lg">{f.role}</Text>
                </View>
                <View className="gap-1">
                  <View className="flex-row items-center gap-2">
                    <GraduationCap size={14} color="rgba(255,255,255,0.4)" />
                    <Text className="text-white/50 text-[10px] font-body-sm">{f.degree}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Clock size={14} color="rgba(255,255,255,0.4)" />
                    <Text className="text-white/50 text-[10px] font-body-sm">{f.exp}</Text>
                  </View>
                </View>
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
  chipsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
});

export default FacultyShowcaseScreen;
