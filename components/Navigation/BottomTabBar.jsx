import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useCart } from '../Cart/CartContext.jsx'; // ✅ added

const tabs = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home', path: '/' },
  { name: 'Orders', icon: 'receipt-outline', activeIcon: 'receipt', path: '/orders' },
  { name: 'Cart', icon: 'cart-outline', activeIcon: 'cart', path: '/cart' },
  { name: 'Profile', icon: 'person-outline', activeIcon: 'person', path: '/profile' },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartItems } = useCart(); // ✅ use cart context

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pathname]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          const color = isActive ? '#FF460A' : '#757575';

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push(tab.path);
              }}
            >
              <Animated.View
                style={[
                  styles.tabItem,
                  isActive && { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <View style={{ position: 'relative' }}>
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={24}
                    color={color}
                    style={isActive ? styles.activeGlow : undefined}
                  />
                  {tab.name === 'Cart' && cartItems.length > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.label, isActive && styles.labelActive]}>
                  {tab.name === 'Orders' ? 'Order' : tab.name}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingBottom: 28,
    paddingTop: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    elevation: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  labelActive: {
    color: '#FF460A',
    fontWeight: '600',
  },
  activeGlow: {
    shadowColor: '#FF460A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
