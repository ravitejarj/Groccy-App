// components/OrderStatus/OrderFailedScreen.jsx
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OrderFailedScreen() {
  const router = useRouter();

  const orderId = '#123456';
  const errorReason = 'Payment was declined.';
  const storeName = 'Desi Brothers';
  const amount = '$22.45';

  const handleRetry = () => router.push('/checkout_screen');
  const handleContactSupport = () => router.push('/help');
  const handleGoHome = () => router.push('/(tabs)');

  return (
    <SafeAreaWrapper style={styles.safe}>
      <View style={styles.container}>
        {/* ❌ Animation in Red Circle */}
        <View style={styles.animationWrapper}>
          <View style={styles.circle}>
            <LottieView
              source={require('@/assets/mobile_images/animations/order_failed.json')}
              autoPlay
              loop
              speed={0.6}
              style={styles.lottie}
            />
          </View>
        </View>

        {/* 😞 Emoji + Title */}
        <Text style={styles.title}>😞 Order Could Not Be Placed</Text>
        <Text style={styles.subText}>
          Your order <Text style={styles.bold}>{orderId}</Text> from <Text style={styles.bold}>{storeName}</Text> could not be completed.
        </Text>

        {/* ❗ Error Reason */}
        <Text style={styles.errorReason}>Reason: {errorReason}</Text>
        <Text style={styles.infoNote}>Don’t worry — you haven’t been charged.</Text>

        {/* 🔁 Retry + Cart Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={handleRetry}>
            <Ionicons name="refresh" size={18} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={styles.primaryBtnText}>Retry This Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/cart')}>
            <Ionicons name="cart" size={18} color="#F44336" style={{ marginRight: 6 }} />
            <Text style={styles.secondaryBtnText}>View Cart</Text>
          </TouchableOpacity>
        </View>

        {/* 📞 Contact & Home */}
        <TouchableOpacity style={styles.ghostBtn} onPress={handleContactSupport}>
          <Text style={styles.ghostBtnText}>📞 Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ghostBtn} onPress={handleGoHome}>
          <Text style={styles.ghostBtnText}>🏠 Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationWrapper: {
    marginBottom: 12,
  },
  circle: {
    backgroundColor: '#FFF5F5',
    borderRadius: 100,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D32F2F',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  errorReason: {
    fontSize: 14,
    color: '#B00020',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  infoNote: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '600',
    color: '#222',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginBottom: 20,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F44336',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryBtn: {
    flex: 1,
    borderColor: '#F44336',
    borderWidth: 1.5,
    borderRadius: 24,
    paddingVertical: 13,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '600',
  },
  ghostBtn: {
    paddingVertical: 10,
    marginTop: 2,
  },
  ghostBtnText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
