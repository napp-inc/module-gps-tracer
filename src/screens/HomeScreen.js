import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { BACKGROUND, CARD_BACKGROUND, PRIMARY, TEXT } from '../constants/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Accueil" navigation={navigation} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text style={styles.welcomeTitle}>Bienvenue sur GPS Tracker</Text>
            <Text style={styles.welcomeText}>
              Pour commencer à utiliser le module GPS, veuillez sélectionner un véhicule 
              ou un sac pour démarrer le suivi en temps réel.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            icon="car" 
            onPress={() => navigation.navigate('Vehicles')}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Véhicules
          </Button>
          
          <Button 
            mode="contained" 
            icon="bag-personal" 
            onPress={() => navigation.navigate('Bags')}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Sacs
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: CARD_BACKGROUND,
    marginBottom: 30,
    borderRadius: 10,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '45%',
    backgroundColor: PRIMARY,
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonText: {
    color: BACKGROUND,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;