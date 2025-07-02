import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { BACKGROUND, PRIMARY, TEXT } from '../constants/theme.js';
import { vehicles } from '../data/mockData';
import VehicleCard from '../components/VehiculeCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllVehicules, getLoading, takeAllVehicules } from '../redux/reducers/vehicule/vehicule.js';
import { useDispatch, useSelector } from 'react-redux';
import { GRAY_MOYEN } from '../styles/colors.js';

const VehiculesScreen = ({ navigation }) => {

  const loading = useSelector(getLoading);
  const vehicules = useSelector(takeAllVehicules);
  const usedCars = vehicules?.filter(item => item.statut === "USED")
  const dispatch = useDispatch()

  const handleStartTracking = (vehicle) => {
    navigation.navigate('Tracking', { 
      trackingType: 'vehicle', 
      item: vehicle 
    });
  };

  useEffect(() => {
    const fetchVehicules = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log("Token ", token)
      dispatch(getAllVehicules(token));
    };

    fetchVehicules();
  }, [dispatch]);



  return (
    <SafeAreaView style={styles.container}>
      <Header title="Véhicules" navigation={navigation} />
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Sélectionnez un véhicule pour le module GPS
        </Text>

        {loading ? (
          <View style={{ paddingVertical: 15 }}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        ) : (
            <FlatList
                data={usedCars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <VehicleCard 
                        vehicle={item} 
                        onPress={handleStartTracking} 
                    />
                )}
                ListEmptyComponent={
                <View style={styles.emptyContent}>
                  <Text style={{ color: '#666', fontSize: 16, textAlign: 'center' }}>
                    Aucun véhicule utilisé
                  </Text>
                </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    color: TEXT,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
   emptyContent:{
    padding:40,
    // borderWidth:1,
    flexDirection:'row',
    justifyContent:'center',
    // borderRadius:8,
    // borderColor:GRAY_MOYEN
  }
});

export default VehiculesScreen;