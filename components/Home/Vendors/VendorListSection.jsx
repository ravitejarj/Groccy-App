import React from 'react';
import VendorList from './VendorList';

const VendorListSection = ({ lat, lng, storeType }) => {
  if (!lat || !lng) return null;

  return (
    <VendorList
      title={storeType === 'grocery' ? 'Grocery Stores' : 'Vendors'}
      storeType={storeType}
      lat={lat}
      lng={lng}
    />
  );
};

export default VendorListSection;
