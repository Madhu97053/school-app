import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/useAuthStore';

const { width } = Dimensions.get('window');

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { user } = useAuthStore();
  const role = user?.role || 'guest';
  const isFloating = role === 'super_admin' || role === 'parent' || role === 'guest';

  return (
    <View style={isFloating ? styles.floatingContainer : styles.fullWidthContainer}>
      <LinearGradient
        colors={['#383f47', '#1f2429', '#101415']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.blurContainer}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const activeTintColor = options.tabBarActiveTintColor || '#f5c518';
          const inactiveTintColor = options.tabBarInactiveTintColor || '#a9e3ffff';

          return (
            <Pressable
              key={index}
              onPress={onPress}
              className={`flex-1 items-center justify-center py-2 ${isFocused ? 'scale-105' : 'scale-100'
                }`}
              style={{
                opacity: isFocused ? 1 : 0.7,
              }}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? activeTintColor : inactiveTintColor,
                  size: 24,
                })}
              <Text
                style={{
                  color: isFocused ? activeTintColor : inactiveTintColor,
                  fontSize: 10,
                  marginTop: 4,
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}
              >
                {label as string}
              </Text>
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: '5%',
    right: '5%',
    width: '90%',
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)', // Glossy edge highlight
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  fullWidthContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 64,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderTopWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)', // Glossy edge highlight
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  blurContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
});
