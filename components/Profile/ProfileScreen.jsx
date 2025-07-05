import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import ProfileHeader from './ProfileHeader';
import ProfileSectionCard from './ProfileSectionCard';
import LogoutModal from './LogoutModal';

export default function ProfileScreen() {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaWrapper style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <ProfileHeader />
        </View>

        <ProfileSectionCard
          title="ACCOUNT"
          items={[
            { label: '📝 Edit Profile', route: '/profile-update' },
            { label: '📍 My Address', route: '/address-update' },
            { label: '🧾 My Orders', onPress: () => router.push('/orders') },
          ]}
        />

        <ProfileSectionCard
          title="PAYMENTS"
          items={[{ label: '💳 Saved Cards', onPress: () => router.push('/payment-methods') }]}
        />

        <ProfileSectionCard
          title="SUPPORT"
          items={[
            { label: '📬 Contact Us', route: '/contact-us' },
            { label: '💬 Help & Support', route: '/help' },
            { label: '❓ FAQ', route: '/faq' },
            { label: '📄 Terms & Privacy', onPress: () => {} },
          ]}
        />

        <ProfileSectionCard
          title="SECURITY"
          items={[{ label: '🚪 Log out', onPress: () => setLogoutVisible(true) }]}
        />

        <Text style={styles.versionText}>App Version 2.8.10</Text>
      </ScrollView>

      {logoutVisible && <LogoutModal onClose={() => setLogoutVisible(false)} />}
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    paddingVertical: 24,
    paddingBottom: 64,
  },
  headerCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    elevation: 1,
  },
  versionText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 12,
    marginTop: 20,
  },
});
