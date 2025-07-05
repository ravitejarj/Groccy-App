import React from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

const LocationMap = ({
  mapRef,
  region,
  setRegion,
  goToCurrentLocation,
  fetchingLocation,
  vendorCircle,
  notServiceable,
}) => {
  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {vendorCircle && !notServiceable && (
          <Circle
            center={{
              latitude: vendorCircle.latitude,
              longitude: vendorCircle.longitude,
            }}
            radius={vendorCircle.deliveryRadiusInMiles * 1609.34}
            strokeColor="rgba(0,122,255,0.5)"
            fillColor="rgba(0,122,255,0.1)"
          />
        )}
      </MapView>

      <View style={styles.pinContainer} pointerEvents="none">
        <Image source={require('@/assets/mobile_images/icons/pin.png')} style={styles.pin} />
      </View>

      <TouchableOpacity style={styles.locateBtn} onPress={goToCurrentLocation}>
        {fetchingLocation ? (
          <ActivityIndicator />
        ) : (
          <Image
            source={require('@/assets/mobile_images/icons/location_icon.png')}
            style={{ width: 24, height: 24 }}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default LocationMap;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,
  },
  pinContainer: {
    position: 'absolute',
    top: '48%',
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    zIndex: 10,
  },
  pin: {
    width: 48,
    height: 48,
  },
  locateBtn: {
    position: 'absolute',
    right: 20,
    bottom: 170,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 24,
    elevation: 4,
    zIndex: 20,
  },
});
