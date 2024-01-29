import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GET_COUNTRIES} from '../schema';

import {useLazyQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';

const CountriesDetail = ({navigation}) => {
  const [getCountryName, {loading, error, data}] = useLazyQuery(GET_COUNTRIES);

  const route = useRoute();
  const {name, capital, currency, phone, languages, continent, emoji} =
    route.params;

  React.useEffect(() => {
    getCountryName();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#CED4DA" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>
          Error:
          {error.message}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#CED4DA" />
      </View>
    );
  }

  const languageNames = languages.map(language => language.name).join(', ');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <TouchableOpacity onPress={navigation.goBack}>
        <Text style={styles.header}>Country Detail</Text>
      </TouchableOpacity>

      <View style={styles.infoContainerHeader}>
        <Text style={styles.valueHeader}>{name}</Text>
        <Text style={styles.valueHeader}>{emoji}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Capital:</Text>
        <Text style={styles.value}>{capital}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{currency}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Languages:</Text>
        <Text style={styles.value}>{languageNames}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Continent:</Text>
        <Text style={styles.value}>{continent.name}</Text>
      </View>
    </View>
  );
};
export default CountriesDetail;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    padding: 20,
    backgroundColor: '#343A40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    fontSize: 24,
    color: '#CED4DA',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#343A40',
  },
  backIcon: {
    fontSize: 24,
    position: 'absolute',
    top: 17,
    color: '#CED4DA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 8,
    textAlign: 'center',
    color: '#CED4DA',
  },
  infoContainerHeader: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    color: 'white',
    marginHorizontal: 50,
  },
  label: {
    color: '#CED4DA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueHeader: {
    color: '#CED4DA',
    fontSize: 30,
    fontWeight: 'bold',
  },
  value: {
    color: '#CED4DA',
    fontSize: 16,
  },
});
