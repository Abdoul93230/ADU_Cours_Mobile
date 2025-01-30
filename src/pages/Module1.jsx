import CodeBlock from "../components/CodeBlock";

function Module1() {
  const setupCode = `
// Installation d'Expo CLI
npm install -g expo-cli

// Création du projet
expo init NotesAndTasks
cd NotesAndTasks

// Installation des dépendances de base
npm install @react-navigation/native @react-navigation/stack
npm install @react-native-async-storage/async-storage
npm install react-native-gesture-handler react-native-reanimated
  `;

  const projectStructureCode = `
NotesAndTasks/
├── src/
│   ├── components/
│   │   ├── NoteItem.js
│   │   ├── NoteList.js
│   │   └── NoteForm.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── NoteDetailScreen.js
│   │   └── CreateNoteScreen.js
│   ├── context/
│   │   └── NotesContext.js
│   └── utils/
│       └── storage.js
├── App.js
└── package.json`;

  const noteItemCode = `import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NoteDetailScreen({ route, navigation }) {
  const { note } = route.params;

  const toggleComplete = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      const notes = JSON.parse(savedNotes);
      const updatedNotes = notes.map(n =>
        n.id === note.id ? { ...n, completed: !n.completed } : n
      );
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      navigation.goBack();
    } catch (error) {
      console.error('Erreur mise à jour:', error);
    }
  };

  const setReminder = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission de notifications nécessaire');
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: note.title,
          body: note.description,
        },
        trigger: {
          seconds: 3600, // Rappel dans 1 heure
        },
      });

      Alert.alert('Succès', 'Rappel programmé dans 1 heure');
    } catch (error) {
      console.error('Erreur notification:', error);
    }
  };

  const deleteNote = async () => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer cette note ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const savedNotes = await AsyncStorage.getItem('notes');
              const notes = JSON.parse(savedNotes);
              const updatedNotes = notes.filter(n => n.id !== note.id);
              await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
              navigation.goBack();
            } catch (error) {
              console.error('Erreur suppression:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>

      {note.photo && (
        <Image source={{ uri: note.photo }} style={styles.photo} />
      )}

      {note.location && (
        <Text style={styles.location}>
          📍 {note.location.latitude}, {note.location.longitude}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: note.completed ? '#FF5722' : '#4CAF50' }
        ]}
        onPress={toggleComplete}
      >
        <Text style={styles.buttonText}>
          {note.completed ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
        </Text>
      </TouchableOpacity>

      {note.category === 'tâche' && (
        <TouchableOpacity
          style={[styles.button, styles.reminderButton]}
          onPress={setReminder}
        >
          <Text style={styles.buttonText}>⏰ Définir un rappel</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={deleteNote}
      >
        <Text style={styles.buttonText}>🗑️ Supprimer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 16,
  },
  location: {
    color: '#666',
    marginBottom: 16,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  reminderButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`;

  const noteListCode = `import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  console.log(navigation);
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Erreur chargement notes:", error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && note.completed) ||
      (filter === "pending" && !note.completed) ||
      (filter === "notes" && note.category === "note") ||
      (filter === "tasks" && note.category === "tâche");

    const matchesSearch =
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const FilterButton = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === value && styles.filterButtonActive,
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value && styles.filterButtonTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate("NoteDetail", { note: item })}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.categoryIcon}>
          {item.category === "note" ? "📝" : "✓"}
        </Text>
        <View style={styles.noteContent}>
          <Text
            style={[styles.noteTitle, item.completed && styles.completedText]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.noteDescription,
              item.completed && styles.completedText,
            ]}
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.noteMetadata}>
          <Text style={styles.noteDate}>{item.date}</Text>
          {item.location && <Text style={styles.noteIcon}>📍</Text>}
          {item.photo && <Text style={styles.noteIcon}>📷</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <FilterButton title="Tout" value="all" />
        <FilterButton title="Notes" value="notes" />
        <FilterButton title="Tâches" value="tasks" />
        <FilterButton title="Terminé" value="completed" />
        <FilterButton title="En cours" value="pending" />
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddNote")}
      >
        <Text style={styles.addButtonText}>+ Nouvelle Note</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
    height: 10,
  },
  filterButton: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
    // height:90,
    // flex:1,
    // alignItems:'center',
    // justifyContent:'center'
  },
  filterButtonActive: {
    backgroundColor: "#4CAF50",
  },
  filterButtonText: {
    color: "black",
  },
  filterButtonTextActive: {
    color: "white",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  noteItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noteDescription: {
    fontSize: 14,
    color: "#666",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  noteMetadata: {
    alignItems: "flex-end",
  },
  noteDate: {
    fontSize: 12,
    color: "#666",
  },
  noteIcon: {
    fontSize: 12,
    marginTop: 4,
  },
});
`;

  const noteFormCode = `import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('note');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission de caméra nécessaire');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erreur camera:', error);
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission de localisation nécessaire');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Erreur localisation:', error);
    }
  };

  const saveNote = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      const notes = savedNotes ? JSON.parse(savedNotes) : [];

      const newNote = {
        id: Date.now().toString(),
        title,
        description,
        category,
        photo,
        location,
        date: new Date().toLocaleDateString(),
        completed: false,
      };

      await AsyncStorage.setItem('notes', JSON.stringify([...notes, newNote]));
      navigation.goBack();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}

        >
          <Picker.Item label="Note" value="note" />
          <Picker.Item label="Tâche" value="tâche" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>📷 Prendre une photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.locationButton]} onPress={getLocation}>
        <Text style={styles.buttonText}>📍 Ajouter la localisation</Text>
      </TouchableOpacity>

      {photo && (
        <Image source={{ uri: photo }} style={styles.preview} />
      )}

      {location && (
        <Text style={styles.locationText}>
          📍 {location.latitude}, {location.longitude}
        </Text>
      )}

      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveNote}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  locationButton: {
    backgroundColor: '#FF9800',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 16,
  },
  locationText: {
    color: '#666',
    marginBottom: 16,
  },
});
`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Module 1: Fondamentaux et Structure de Base
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Setup du Projet</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">
            1.1 Installation et Configuration
          </h3>
          <p className="mb-4">Configuration initiale du projet avec Expo :</p>
          <CodeBlock code={setupCode} language="bash" />

          <h3 className="text-xl font-semibold mt-6 mb-3">
            1.2 Structure du Projet
          </h3>
          <p className="mb-4">Organisation recommandée des fichiers :</p>
          <CodeBlock code={projectStructureCode} language="plaintext" />

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">
              ⚡ Exercice Pratique 1
            </h4>
            <p className="mb-2">Créez la structure du projet :</p>
            <ol className="list-decimal pl-6">
              <li>Initialisez un nouveau projet Expo</li>
              <li>Créez l'arborescence des dossiers</li>
              <li>Installez les dépendances nécessaires</li>
              <li>Vérifiez que le projet se lance correctement</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Composants de Base</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">2.1 Composant NoteItem</h3>
          <p className="mb-4">
            Composant pour afficher une note individuelle : NoteDetailScreen.jsx
          </p>
          <CodeBlock code={noteItemCode} language="jsx" />

          <h3 className="text-xl font-semibold mt-6 mb-3">
            2.2 Composant NoteList : HomeScreen.jsx
          </h3>
          <p className="mb-4">Liste scrollable des notes :</p>
          <CodeBlock code={noteListCode} language="jsx" />

          <h3 className="text-xl font-semibold mt-6 mb-3">
            2.3 Composant NoteForm :
          </h3>
          <p className="mb-4">
            Formulaire de création de note : AddNoteScreen.jsx
          </p>
          <CodeBlock code={noteFormCode} language="jsx" />

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">
              ⚡ Exercice Pratique 2
            </h4>
            <p className="mb-2">Implémentez les composants de base :</p>
            <ol className="list-decimal pl-6">
              <li>Créez le composant NoteItem avec le style approprié</li>
              <li>Implémentez la liste scrollable avec FlatList</li>
              <li>Ajoutez le formulaire de création avec validation</li>
              <li>Testez l'interaction entre les composants</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Points Clés à Retenir
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>
                Utilisez{" "}
                <code className="bg-gray-100 px-1 rounded">
                  StyleSheet.create
                </code>{" "}
                pour optimiser les performances
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Préférez les composants fonctionnels avec hooks</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Pensez à la réutilisabilité des composants</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>
                Utilisez la destructuration des props pour plus de clarté
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Évaluation</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Mini-Projet</h3>
          <p className="mb-4">
            Créez une version simple de l'application avec :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Liste des notes fonctionnelle</li>
            <li>Création de nouvelles notes</li>
            <li>Style cohérent et professionnel</li>
            <li>Gestion des erreurs basique</li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">
              🎯 Critères d'Évaluation
            </h4>
            <ul className="space-y-2">
              <li>✓ Fonctionnalités de base (40%)</li>
              <li>✓ Qualité du code (30%)</li>
              <li>✓ Interface utilisateur (20%)</li>
              <li>✓ Gestion des erreurs (10%)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Module1;
