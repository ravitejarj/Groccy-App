import React from 'react';
import { View } from 'react-native';
import HomeHeader from './HomeHeader';
import SearchBar from './SearchBar';
import PromoBanner from './PromoBanner';
import CategorySelector from './CategorySelector';

const FixedHeader = ({
  searchText,
  onSearchTextChange,
  userAddress,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <>
      <HomeHeader address={userAddress} />
      <View style={{ height: 6 }} />
      <SearchBar
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        rotatingTexts={['grocery store', 'restaurants', 'indian groceries']}
        customStyle={{ height: 48, borderRadius: 24, paddingHorizontal: 14 }}
      />
      <View style={{ height: 12 }} />
      <PromoBanner />
      <View style={{ height: 6 }} />
      <CategorySelector
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
    </>
  );
};

export default FixedHeader;
