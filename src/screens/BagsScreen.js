import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { MD2Colors, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { BACKGROUND, TEXT } from '../constants/theme';
import { bags } from '../data/mockData';
import BagCard from '../components/BagCard';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading, getSacs, takeAllSacs } from '../redux/reducers/sac';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BagsScreen = ({ navigation }) => {

  const loading = useSelector(getLoading);
  const sacs = useSelector(takeAllSacs);
  const dispatch = useDispatch()

  const handleStartTracking = (bag) => {
    navigation.navigate('Tracking', { 
      trackingType: 'bag', 
      item: bag 
    });
  };

  useEffect(() => {
    const fetchSacs = async () => {
      const token = await AsyncStorage.getItem('userToken');
      dispatch(getSacs(token));
    };

    fetchSacs();
  }, [dispatch]);

  console.log("Sacs ", sacs)

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Sacs" navigation={navigation} />
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Sélectionnez un sac pour démarrer le suivi GPS
        </Text>

         {loading ? (
          <View style={{ paddingVertical: 15 }}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        ) : (
            <FlatList
                data={bags}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BagCard 
                    bag={item} 
                    onPress={handleStartTracking} 
                    />
                )}
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
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default BagsScreen;