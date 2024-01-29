import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLazyQuery} from '@apollo/client';
import {GET_COUNTRIES} from '../schema';

export default function CountriesName() {
  const [getCountryName, {loading, error, data}] = useLazyQuery(GET_COUNTRIES);
  const [searchCountry, setSearchCountry] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getCountryName();
  }, []);

  const renderCountry = ({item}) => (
    <Pressable
      style={styles.countryContainer}
      onPress={() =>
        navigation.navigate('CountriesDetail', {
          name: item.name,
          capital: item.capital,
          currency: item.currency,
          phone: item.phone,
          languages: item.languages,
          continent: item.continent,
          emoji: item.emoji,
        })
      }>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.capital}>{item.emoji}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#CED4DA" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const filteredData = data?.countries.filter(country =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Text style={styles.title}>Countries Explorer</Text>
      <TextInput
        style={styles.input}
        value={searchCountry}
        onChangeText={setSearchCountry}
        placeholder="Search Country"
        placeholderTextColor="#777"
      />

      <FlatList
        data={filteredData}
        renderItem={renderCountry}
        keyExtractor={item => item.name}
        ListEmptyComponent={() => (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Data Found</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#343A40',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'center',
    color: '#CED4DA',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#343A40',
    paddingHorizontal: 15,
    marginBottom: 16,
    color: '#CED4DA',
  },
  countryContainer: {
    backgroundColor: '#6C757D',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343A40',
  },
  capital: {
    fontSize: 22,
  },
  loadingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#343A40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: 18,
    color: '#555',
  },
});
