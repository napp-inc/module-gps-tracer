import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import { BACKGROUND, PRIMARY, TEXT } from "../constants/theme";
import * as Location from "expo-location";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebaseConfig";
import { API_URL, LOCAL_URL } from "../constants/api";

const TrackingScreen = ({ navigation, route }) => {
  const { item: vehicle } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Appuyez sur "Démarrer" pour commencer le suivi');
  const [lastSentPosition, setLastSentPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const unsubscribeRef = useRef(null);
  const locationSubscription = useRef(null);

  const [onUpdateLocation, setOnUpdateLocation] = useState(false);



  const startTracking = async () => {
    setLoading(true);
    setStatus("Initialisation du Module GPS...");

    try {
      // Demande des permissions
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        setStatus("Permission de localisation refusée");
        setLoading(false);
        return;
      }

      // Vérification que les services de localisation sont activés
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        setStatus("Veuillez activer le GPS pour continuer");
        setLoading(false);
        return;
      }

      // Configuration des options de localisation pour haute précision
      const locationOptions = {
        accuracy: Location.Accuracy.High, // précision max
        distanceInterval: 10, // Metres (declenche les mises à jour tous les 10m)
        timeInterval: 5000, // Millisecondes (ou toutes les 5 secondes)
      };

      // Obtenir la position actuelle, une fois
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAccuracy(location.coords.accuracy);

      // Démarrer le suivi continu en temps réel
      locationSubscription.current = await Location.watchPositionAsync(
        locationOptions,
        (newLocation) => {
          setCurrentLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
          setAccuracy(newLocation.coords.accuracy);
        }
      );

      setIsTracking(true);
      setStatus("Suivi GPS activé - Prêt à envoyer les positions");
      setLoading(false);

      // Démarrer l'écoute Firestore
      setupFirestoreListener(vehicle.id);

    } catch (error) {
      console.error("Erreur GPS:", error);
      setStatus("Erreur lors de l'initialisation du GPS");
      setLoading(false);
    }
  };

  console.log("Current Position ", currentLocation)

  const setupFirestoreListener = (vehicleId) => {
    const vehicleRef = doc(db, "Vehicule", vehicleId);

    unsubscribeRef.current = onSnapshot(
      vehicleRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const vehicleData = docSnapshot.data();
          console.log("get Position ", vehicleData)
          if (vehicleData?.mustSendPosition) {
             console.log("Sending  ")
            //sendCurrentPosition(vehicleId);
            setOnUpdateLocation(true)
          }
        } else {
          console.log("Le document véhicule n'existe pas");
          setStatus("Véhicule non trouvé dans la base de données");
        }
      },
      (error) => {
        console.error("Erreur d'écouteur Firestore:", error);
        setStatus("Erreur de connexion au serveur");
      }
    );
  };

  const sendCurrentPosition = async (vehicleId) => {
    console.log("currentLocation===",currentLocation)
    if (!currentLocation) {
      setStatus("Position actuelle non disponible");
      return;
    }

    setStatus("Envoi de la position en cours...");
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("Token d'authentification manquant");
      }

      // Calcul de la vitesse si disponible
      const speed = currentLocation.speed ? 
        parseFloat((currentLocation.speed * 3.6).toFixed(1)) : // Conversion m/s → km/h
        0;

      const payload = {
        idVehicule: vehicleId,
        nouvellePosition: {
          localisation: {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          vitesse: speed,
          precision: accuracy ? parseFloat(accuracy.toFixed(1)) : null,
        },
      };

      const response = await axios.put(
        // `${API_URL}/tracking/updatePositionVehicule`,
        `http://172.19.200.178:5000/stagiaire-2025/us-central1/tracking/updatePositionVehicule`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        setLastSentPosition(currentLocation);
        setStatus(
          `Position envoyée (précision: ${accuracy ? accuracy.toFixed(1) + 'm' : 'N/A'})`
        );
      } else {
        setStatus(`Erreur: ${response.data.message || "Erreur lors de l'envoi"}`);
      }
    } catch (error) {
      console.error("Erreur API:", error);
      setStatus(`Erreur: ${error.message || "Échec de l'envoi"}`);
    } finally {
      setLoading(false);
    }
  };

  const stopTracking = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    setIsTracking(false);
    setStatus("Suivi GPS arrêté");
  };

  useEffect(() => {
    
  if(onUpdateLocation) {
    sendCurrentPosition(vehicle?.id);
    setOnUpdateLocation(false)
  }
  }, [onUpdateLocation,vehicle?.id])
  

  useEffect(() => {
    return () => {
      // Nettoyage à la destruction du composant
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={`Suivi: ${vehicle.immatriculation}`}
        navigation={navigation}
        showBackButton={true}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Suivi GPS du véhicule</Text>
        <Text style={styles.message}>{status}</Text>

        {currentLocation && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Position actuelle:</Text>
            <Text style={styles.locationText}>
              Latitude: {currentLocation.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {currentLocation.longitude.toFixed(6)}
            </Text>
            {accuracy && (
              <Text style={styles.locationText}>
                Précision: {accuracy.toFixed(1)} mètres
              </Text>
            )}
          </View>
        )}

        {/* {lastSentPosition && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Dernière position envoyée:</Text>
            <Text style={styles.locationText}>
              Latitude: {lastSentPosition.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {lastSentPosition.longitude.toFixed(6)}
            </Text>
          </View>
        )} */}

        {!isTracking ? (
          <TouchableOpacity
            style={styles.button}
            onPress={startTracking}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Démarrer le suivi GPS</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={stopTracking}
          >
            <Text style={styles.buttonText}>Arrêter le suivi</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: TEXT,
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: TEXT,
    textAlign: "center",
    marginBottom: 30,
  },
  locationContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  locationText: {
    color: TEXT,
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  stopButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TrackingScreen;