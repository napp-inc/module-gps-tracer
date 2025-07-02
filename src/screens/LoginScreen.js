import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { BACKGROUND, CARD_BACKGROUND, TEXT } from '../constants/theme';
import { PRIMARY } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email?.trim() || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      await AsyncStorage.setItem('userToken', token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }],
      })
    } catch (error) {
      Alert.alert('Erreur', 'Échec de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.appTitle}>GPS Tracker</Text>
        <Text style={styles.appSubtitle}>Module de similation GPS</Text>
      </View>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        outlineColor={PRIMARY}
        activeOutlineColor={PRIMARY}
        textColor={TEXT}
        theme={{ colors: { text: TEXT, placeholder: TEXT } }}
      />
      
      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        mode="outlined"
        outlineColor={PRIMARY}
        activeOutlineColor={PRIMARY}
        textColor={TEXT}
        right={
          <TextInput.Icon 
            icon={secureTextEntry ? "eye" : "eye-off"} 
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            color={PRIMARY}
          />
        }
        theme={{ colors: { text: TEXT, placeholder: TEXT } }}
      />
      
      <Button 
        mode="contained" 
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleLogin}
        loading={loading}
      >
        {loading ? 'Traitement...' : 'Se connecter'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: PRIMARY,
    marginBottom: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: TEXT,
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: CARD_BACKGROUND,
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
    backgroundColor: PRIMARY,
  },
  buttonText: {
    color: BACKGROUND,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;