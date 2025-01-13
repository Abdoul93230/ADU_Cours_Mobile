import CodeBlock from '../components/CodeBlock';

function Module2() {
  const navigationSetupCode = `
// Installation des dépendances de navigation
npm install @react-navigation/native @react-navigation/stack

// Dans App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="NotesList" 
          component={NotesListScreen}
          options={{ title: 'Mes Notes' }}
        />
        <Stack.Screen 
          name="NoteDetail" 
          component={NoteDetailScreen}
          options={{ title: 'Détail de la Note' }}
        />
        <Stack.Screen 
          name="CreateNote" 
          component={CreateNoteScreen}
          options={{ title: 'Nouvelle Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`;

  const asyncStorageCode = `
// Installation d'AsyncStorage
npm install @react-native-async-storage/async-storage

// Utilisation dans NotesContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Charger les notes
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
    }
  };

  // Sauvegarder une note
  const saveNote = async (newNote) => {
    try {
      const updatedNotes = [...notes, newNote];
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };
}`;

  const filteringCode = `
// Composant de recherche et filtrage
const NotesListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <CategoryPicker
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FlatList
        data={filteredNotes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
      />
    </View>
  );
};`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Module 2: Navigation et Données</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Navigation Multi-écrans</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Configuration de React Navigation :</p>
          <CodeBlock code={navigationSetupCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Exercice Pratique 1</h3>
            <p>Implémentez la navigation entre trois écrans :</p>
            <ul className="list-disc pl-6">
              <li>Liste des notes</li>
              <li>Détail d'une note</li>
              <li>Création de note</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Persistence des Données</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Utilisation d'AsyncStorage :</p>
          <CodeBlock code={asyncStorageCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Exercice Pratique 2</h3>
            <p>Créez un système de persistence complet :</p>
            <ul className="list-disc pl-6">
              <li>Sauvegarde des notes</li>
              <li>Chargement au démarrage</li>
              <li>Mise à jour et suppression</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filtrage et Recherche</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Implémentation du système de filtrage :</p>
          <CodeBlock code={filteringCode} language="jsx" />
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Exercice Pratique 3</h3>
            <p>Ajoutez les fonctionnalités de recherche :</p>
            <ul className="list-disc pl-6">
              <li>Recherche par titre</li>
              <li>Filtrage par catégorie</li>
              <li>Tri par date</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Module2;