import CodeBlock from '../components/CodeBlock';

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

  const noteItemCode = `
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NoteItem = ({ title, content, date, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
      <Text numberOfLines={2} style={styles.content}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 12,
    color: '#666666',
  },
  content: {
    fontSize: 14,
    color: '#4a4a4a',
    lineHeight: 20,
  },
});

export default NoteItem;`;

  const noteListCode = `
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onNotePress }) => {
  const renderItem = ({ item }) => (
    <NoteItem
      title={item.title}
      content={item.content}
      date={item.createdAt}
      onPress={() => onNotePress(item)}
    />
  );

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingVertical: 8,
  },
});

export default NoteList;`;

  const noteFormCode = `
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onSubmit({
        title,
        content,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      });
      setTitle('');
      setContent('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre de la note"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Contenu de la note"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Créer la note" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default NoteForm;`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Module 1: Fondamentaux et Structure de Base</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Setup du Projet</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">1.1 Installation et Configuration</h3>
          <p className="mb-4">Configuration initiale du projet avec Expo :</p>
          <CodeBlock code={setupCode} language="bash" />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Structure du Projet</h3>
          <p className="mb-4">Organisation recommandée des fichiers :</p>
          <CodeBlock code={projectStructureCode} language="plaintext" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">⚡ Exercice Pratique 1</h4>
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
          <p className="mb-4">Composant pour afficher une note individuelle :</p>
          <CodeBlock code={noteItemCode} language="jsx" />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Composant NoteList</h3>
          <p className="mb-4">Liste scrollable des notes :</p>
          <CodeBlock code={noteListCode} language="jsx" />
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Composant NoteForm</h3>
          <p className="mb-4">Formulaire de création de note :</p>
          <CodeBlock code={noteFormCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">⚡ Exercice Pratique 2</h4>
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
        <h2 className="text-2xl font-semibold mb-4">3. Points Clés à Retenir</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Utilisez <code className="bg-gray-100 px-1 rounded">StyleSheet.create</code> pour optimiser les performances</span>
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
              <span>Utilisez la destructuration des props pour plus de clarté</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Évaluation</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Mini-Projet</h3>
          <p className="mb-4">Créez une version simple de l'application avec :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Liste des notes fonctionnelle</li>
            <li>Création de nouvelles notes</li>
            <li>Style cohérent et professionnel</li>
            <li>Gestion des erreurs basique</li>
          </ul>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">🎯 Critères d'Évaluation</h4>
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