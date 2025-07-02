import React from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { Text, List, Divider, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { BACKGROUND, PRIMARY, TEXT, CARD_BACKGROUND } from '../constants/theme.js';

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [locationTracking, setLocationTracking] = React.useState(true);
  const [dataSaving, setDataSaving] = React.useState(false);

  const toggleSwitch = (setting, value, setter) => {
    setter(!value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Paramètres" navigation={navigation} />
      
      <ScrollView style={styles.scrollView}>
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences générales</Text>
          
          <List.Item
            title="Mode sombre"
            description="Activer/désactiver le thème sombre"
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props => <List.Icon {...props} icon="theme-light-dark" color={PRIMARY} />}
            right={props => (
              <Switch
                value={darkMode}
                onValueChange={() => toggleSwitch('darkMode', darkMode, setDarkMode)}
                color={PRIMARY}
              />
            )}
          />
          
          <Divider style={styles.divider} />
          
          <List.Item
            title="Notifications"
            description="Activer/désactiver les notifications push"
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props => <List.Icon {...props} icon="bell" color={PRIMARY} />}
            right={props => (
              <Switch
                value={notifications}
                onValueChange={() => toggleSwitch('notifications', notifications, setNotifications)}
                color={PRIMARY}
              />
            )}
          />

          <Divider style={styles.divider} />
          
          <List.Item
            title="Suivi de localisation"
            description="Activer/désactiver le suivi de localisation en arrière-plan"
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props => <List.Icon {...props} icon="map-marker" color={PRIMARY} />}
            right={props => (
              <Switch
                value={locationTracking}
                onValueChange={() => toggleSwitch('locationTracking', locationTracking, setLocationTracking)}
                color={PRIMARY}
              />
            )}
          />
          
          <Divider style={styles.divider} />
          
          <List.Item
            title="Mode économie de données"
            description="Réduire la fréquence des mises à jour GPS pour économiser les données"
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props => <List.Icon {...props} icon="data-matrix" color={PRIMARY} />}
            right={props => (
              <Switch
                value={dataSaving}
                onValueChange={() => toggleSwitch('dataSaving', dataSaving, setDataSaving)}
                color={PRIMARY}
              />
            )}
          />
        </Surface>
        
        <Surface style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          
          <List.Item
            title="À propos"
            description="Informations sur l'application"
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props => <List.Icon {...props} icon="information" color={PRIMARY} />}
            right={props => <List.Icon {...props} icon="chevron-right" color={PRIMARY} />}
            onPress={() => {}}
          />
          
          <Divider style={styles.divider} />
          
          <List.Item
            title="Version"
            description="1.0.0"
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={props => <List.Icon {...props} icon="apps" color={PRIMARY} />}
          />
        </Surface>
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
  section: {
    backgroundColor: CARD_BACKGROUND,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY,
    padding: 16,
  },
  itemTitle: {
    color: TEXT,
    fontSize: 16,
  },
  itemDescription: {
    color: TEXT,
    opacity: 0.7,
  },
  divider: {
    backgroundColor: BACKGROUND,
    height: 1,
    marginLeft: 72,
  },
});

export default SettingsScreen;