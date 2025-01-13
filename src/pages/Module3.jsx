import CodeBlock from '../components/CodeBlock';

function Module3() {
  const cameraCode = `
// Installation des dépendances
npm install expo-camera expo-media-library

// Composant Camera
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const TakePhotoScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      // Ajouter la photo à la note
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <TouchableOpacity onPress={takePhoto}>
          <Text style={styles.text}>Prendre une photo</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};`;

  const locationCode = `
// Installation de la géolocalisation
npm install expo-location

// Utilisation dans NoteScreen
import * as Location from 'expo-location';

const AddLocationToNote = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  return (
    <View>
      <Button title="Ajouter la localisation" onPress={getLocation} />
      {location && (
        <Text>
          Lat: {location.coords.latitude}, 
          Long: {location.coords.longitude}
        </Text>
      )}
    </View>
  );
};`;

  const notificationsCode = `
// Installation des notifications
npm install expo-notifications

// Configuration des notifications
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Création d'un rappel
const scheduleReminder = async (note) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Rappel: " + note.title,
      body: note.content,
    },
    trigger: {
      seconds: 60 * 60, // Rappel dans 1 heure
    },
  });
};`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Module 3: Fonctionnalités Natives et Finalisation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intégration de la Caméra</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Utilisation de la caméra avec Expo :</p>
          <CodeBlock code={cameraCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Exercice Pratique 1</h3>
            <p>Intégrez la caméra dans l'application :</p>
            <ul className="list-disc pl-6">
              <li>Prise de photo</li>
              <li>Sauvegarde dans la galerie</li>
              <li>Attachement à une note</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Géolocalisation</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Intégration de la géolocalisation :</p>
          <CodeBlock code={locationCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Exercice Pratique 2</h3>
            <p>Ajoutez la géolocalisation aux notes :</p>
            <ul className="list-disc pl-6">
              <li>Obtention des coordonnées</li>
              <li>Affichage sur une carte</li>
              <li>Filtrage par proximité</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Système de notifications :</p>
          <CodeBlock code={notificationsCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Exercice Pratique 3</h3>
            <p>Implémentez les rappels :</p>
            <ul className="list-disc pl-6">
              <li>Programmation de rappels</li>
              <li>Notifications personnalisées</li>
              <li>Gestion des rappels</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Préparation au Déploiement</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Checklist de déploiement :</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vérification des permissions</li>
            <li>Tests sur différents appareils</li>
            <li>Optimisation des performances</li>
            <li>Configuration du build</li>
            <li>Préparation des assets</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Module3;