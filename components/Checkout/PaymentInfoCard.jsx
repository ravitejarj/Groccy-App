import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentInfoCard({ card, onEditCard }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <TouchableOpacity onPress={onEditCard} activeOpacity={0.8} style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.cardRow}>
              {/* Optional card brand icon */}
              {card?.brand?.toLowerCase() === 'visa' && (
                <Image
                  source={require('@/assets/mobile_images/icons/visa.png')}
                  style={styles.cardIcon}
                />
              )}
              {card?.brand?.toLowerCase() === 'mastercard' && (
                <Image
                  source={require('@/assets/mobile_images/icons/mastercard.png')}
                  style={styles.cardIcon}
                />
              )}

              <Text style={styles.cardText}>
                {card ? `${card.brand} •••• ${card.last4}` : 'No card selected'}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginLeft: 4,
  },
  cardWrapper: {},
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  cardIcon: {
    width: 32,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
});
