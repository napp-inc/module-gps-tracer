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

const simulatedPositions = [
  {latitude: -4.44084, longitude: 15.25881},
  {latitude: -4.4412, longitude: 15.25882},
  {latitude: -4.44122, longitude: 15.25898},
  {latitude: -4.44127, longitude: 15.25905},
  {latitude: -4.44127, longitude: 15.25957},
  {latitude: -4.442, longitude: 15.25956},
  {latitude: -4.44206, longitude: 15.25904},
  {latitude: -4.44194, longitude: 15.25849},
  {latitude: -4.44179, longitude: 15.25816},
  {latitude: -4.44159, longitude: 15.25787},
  {latitude: -4.44134, longitude: 15.25759},
  {latitude: -4.44105, longitude: 15.25736},
  {latitude: -4.44076, longitude: 15.25719},
  {latitude: -4.44044, longitude: 15.25707},
  {latitude: -4.44011, longitude: 15.257},
  {latitude: -4.43971, longitude: 15.25698},
  {latitude: -4.43952, longitude: 15.25698},
  {latitude: -4.43932, longitude: 15.25696},
  {latitude: -4.43772, longitude: 15.25764},
  {latitude: -4.43731, longitude: 15.25778},
  {latitude: -4.43663, longitude: 15.25793},
  {latitude: -4.43605, longitude: 15.25801},
  {latitude: -4.43528, longitude: 15.25804},
  {latitude: -4.43258, longitude: 15.25796},
  {latitude: -4.42584, longitude: 15.25778},
  {latitude: -4.42426, longitude: 15.25771},
  {latitude: -4.42403, longitude: 15.25772},
  {latitude: -4.42354, longitude: 15.25783},
  {latitude: -4.42306, longitude: 15.25798},
  {latitude: -4.42261, longitude: 15.25818},
  {latitude: -4.42215, longitude: 15.25847},
  {latitude: -4.42048, longitude: 15.25952},
  {latitude: -4.42, longitude: 15.25979},
  {latitude: -4.4195, longitude: 15.25998},
  {latitude: -4.41918, longitude: 15.26007},
  {latitude: -4.41881, longitude: 15.26011},
  {latitude: -4.4183, longitude: 15.26008},
  {latitude: -4.41783, longitude: 15.26},
  {latitude: -4.41746, longitude: 15.25987},
  {latitude: -4.41468, longitude: 15.25866},
  {latitude: -4.41389, longitude: 15.25841},
  {latitude: -4.41321, longitude: 15.25824},
  {latitude: -4.41236, longitude: 15.25804},
  {latitude: -4.41186, longitude: 15.25789},
  {latitude: -4.41051, longitude: 15.25744},
  {latitude: -4.40975, longitude: 15.25716},
  {latitude: -4.40792, longitude: 15.25659},
  {latitude: -4.40748, longitude: 15.25646},
  {latitude: -4.40721, longitude: 15.25646},
  {latitude: -4.40699, longitude: 15.25651},
  {latitude: -4.407, longitude: 15.25658},
  {latitude: -4.40696, longitude: 15.2567},
  {latitude: -4.40688, longitude: 15.25676},
  {latitude: -4.40676, longitude: 15.25678},
  {latitude: -4.40666, longitude: 15.25673},
  {latitude: -4.40659, longitude: 15.25664},
  {latitude: -4.40659, longitude: 15.25655},
  {latitude: -4.40664, longitude: 15.25644},
  {latitude: -4.40665, longitude: 15.25642},
  {latitude: -4.40638, longitude: 15.25628},
  {latitude: -4.40626, longitude: 15.25625},
  {latitude: -4.40583, longitude: 15.2562},
  {latitude: -4.40529, longitude: 15.25621},
  {latitude: -4.4047, longitude: 15.25627},
  {latitude: -4.4044, longitude: 15.25633},
  {latitude: -4.40383, longitude: 15.25646},
  {latitude: -4.40361, longitude: 15.25653},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  // {latitude: -4.43858312096143, longitude: 15.256902041143666},
  
];

const VehicleTrackingScreen = ({ navigation, route }) => {
  const { item: vehicle } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false); // demarreur tracking
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    'Appuyez sur "Démarrer" pour lancer le module'
  );
  const [lastSentPosition, setLastSentPosition] = useState(null);
  const unsubscribeRef = useRef(null);

  console.log("Vehicule ", vehicle?.id)

  const [currentPositionIndex, setCurrentPositionIndex] = useState(simulatedPositions.length - 1);


  const startTracking = async () => {
    setLoading(true);
    setStatus("Initialisation du Module GPS...");

    try {
      let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        setStatus("Permission de localisation refusée");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // user position recuperé, on demarre
      setIsTracking(true);
      setStatus("Module GPS activé - En attente de positions à envoyer");
      setLoading(false);

      setupFirestoreListener(vehicle.id);  // ecouteur branché
    } catch (error) {
      console.error("Erreur GPS:", error);
      setStatus("Erreur lors de l'initialisation du GPS");
      setLoading(false);
    }
  };

  const setupFirestoreListener = (vehicleId) => {
    const vehicleRef = doc(db, "Vehicule", vehicleId);

    unsubscribeRef.current = onSnapshot(
      vehicleRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const vehicleData = docSnapshot.data();
          console.log("Nouvelle donnée véhicule:", vehicleData);

          if (vehicleData?.mustSendPosition) {  // si mustSendPosition est true envoi la position
            sendRandomPosition(vehicleId);
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
  
  console.log("index",currentPositionIndex,simulatedPositions[currentPositionIndex] )

  const sendRandomPosition = async (vehicleId) => {
    setStatus("Envoi de la position en cours...");

    const token = await AsyncStorage.getItem("userToken");
    try {
      // simulation d'une position recuperer dans le trajet
     // const randomIndex = Math.floor(Math.random() * simulatedPositions.length);
      const randomPosition = simulatedPositions[currentPositionIndex];
      setCurrentPositionIndex((c)=> c-3)
      const speed = 30 + Math.random() * 50;

      const payload = {
        idVehicule: vehicleId,
        nouvellePosition: {
          localisation: {
            latitude: randomPosition.latitude,
            longitude: randomPosition.longitude,
          },
          vitesse: parseFloat(speed.toFixed(1)),
        },
      }

      console.log("Payload ", payload)

      const response = await axios.put(
        `${API_URL}/tracking/updatePositionVehicule`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        setLastSentPosition(randomPosition);  // save last send position
        setStatus(
          `Position envoyée: ${randomPosition.latitude.toFixed(
            6
          )}, ${randomPosition.longitude.toFixed(6)}`
        );
      } else {
        setStatus(
          `Erreur: ${response.data.message || response.data.error || "Erreur lors de l'envoi"}`
        );
      }
    } catch (error) {
      console.error("Erreur API:", error);
      let errorMessage = "Échec de l'envoi de la position";

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `Erreur ${error.response.status}: ${error.response.statusText}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatus(`Erreur: ${errorMessage}`);
    }
  };

  useEffect(() => {
    // deconnecte l'ecouteur quand on quitte le composant
    return () => {
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
        <Text style={styles.title}>Module GPS du véhicule</Text>
        <Text style={styles.message}>{status}</Text>

        {currentLocation && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Position actuelle:</Text>
            <Text style={styles.locationText}>
              Lat: {currentLocation.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Long: {currentLocation.longitude.toFixed(6)}
            </Text>
          </View>
        )}

        {lastSentPosition && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Dernière position envoyée:</Text>
            <Text style={styles.locationText}>
              Lat: {lastSentPosition.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Long: {lastSentPosition.longitude.toFixed(6)}
            </Text>
          </View>
        )}

        {!isTracking ? (
          <TouchableOpacity
            style={styles.button}
            onPress={startTracking}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Démarrer le module GPS</Text>
            )}
          </TouchableOpacity>
        ) : (
          <Text style={styles.activeText}>
            Suivi GPS actif - En attente d'instructions...
          </Text>
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  activeText: {
    color: PRIMARY,
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default VehicleTrackingScreen;
