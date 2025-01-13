function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Formation React Native (20h)</h1>
      
      {/* Méthodologie d'Enseignement */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Méthodologie d'Enseignement</h2>
        <div className="space-y-6">
          <div>
            <p className="text-gray-700 mb-4">
              Cette formation adopte une approche pratique et progressive, centrée sur le développement d'une application mobile complète. L'apprentissage se fait par la pratique, avec 70% du temps consacré aux exercices pratiques et 30% à la théorie.
            </p>

            <p className="text-gray-700 mb-4">
              Chaque session est structurée pour maximiser l'apprentissage : nous commençons par une introduction théorique courte, suivie d'une démonstration pratique, puis les apprenants mettent en pratique les concepts à travers des exercices guidés.
            </p>

            <h3 className="text-xl font-semibold mb-2">Progression du Cours</h3>
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Module 1 (6h) : Les Fondamentaux</p>
                <p>Mise en place de l'environnement et création des premières fonctionnalités de l'application. Cette phase établit les bases solides nécessaires pour la suite du développement.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Module 2 (8h) : Développement des Fonctionnalités</p>
                <p>Implémentation des fonctionnalités principales de l'application, en se concentrant sur la navigation et la gestion des données.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Module 3 (6h) : Finalisation et Enrichissement</p>
                <p>Intégration des fonctionnalités avancées et préparation de l'application pour un environnement de production.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction à React Native */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction à React Native</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Qu'est-ce que React Native ?</h3>
            <p className="text-gray-700">
              React Native est un framework open-source créé par Facebook qui permet de développer des applications mobiles natives pour iOS et Android en utilisant JavaScript et React. Les principaux avantages sont :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Un seul code base pour iOS et Android</li>
              <li>Performance proche du natif</li>
              <li>Grande communauté et écosystème riche</li>
              <li>Développement rapide et efficace</li>
              <li>Hot Reloading pour un développement plus fluide</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">React Native vs React</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full mt-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">React Native</th>
                    <th className="px-4 py-2 text-left">React (Web)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Utilise des composants natifs (View, Text)</td>
                    <td className="border px-4 py-2">Utilise des éléments HTML (div, span)</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">StyleSheet pour le styling</td>
                    <td className="border px-4 py-2">CSS standard</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Pas de DOM</td>
                    <td className="border px-4 py-2">Manipule le DOM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Expo */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Expo : La Plateforme de Développement</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Qu'est-ce qu'Expo ?</h3>
            <p className="text-gray-700">
              Expo est un ensemble d'outils et de services construits autour de React Native qui simplifie le développement d'applications mobiles.
            </p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Avantages d'Expo :</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Configuration minimale requise</li>
                <li>Accès facile aux APIs natives</li>
                <li>Déploiement et tests simplifiés</li>
                <li>Mises à jour OTA (Over The Air)</li>
                <li>Large collection de composants prêts à l'emploi</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Expo Go</h3>
            <p className="text-gray-700">
              Expo Go est l'application client qui permet de tester vos applications en développement :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Test instantané sur appareil physique</li>
              <li>Pas besoin de build natif</li>
              <li>Partage facile avec QR code</li>
              <li>Accès aux APIs Expo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Composants Fondamentaux */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Composants Fondamentaux</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Composants de Base</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>View</strong> : Conteneur principal (équivalent à div)
                <p className="mt-1 text-sm">Utilisé pour le layout et le conteneur de base</p>
              </li>
              <li>
                <strong>Text</strong> : Affichage de texte
                <p className="mt-1 text-sm">Tout texte doit être dans un composant Text</p>
              </li>
              <li>
                <strong>Image</strong> : Affichage d'images
                <p className="mt-1 text-sm">Supporte les images locales et distantes</p>
              </li>
              <li>
                <strong>ScrollView</strong> : Vue scrollable
                <p className="mt-1 text-sm">Pour le contenu défilant</p>
              </li>
              <li>
                <strong>TextInput</strong> : Champ de saisie
                <p className="mt-1 text-sm">Pour la saisie utilisateur</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Layout et Style */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Layout et Style</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Flexbox en React Native</h3>
            <p className="text-gray-700">
              React Native utilise Flexbox pour le layout, avec quelques différences par rapport au web :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>flexDirection: 'column' par défaut</li>
              <li>Les unités sont sans dimensions (pas de px, em, etc.)</li>
              <li>Positions absolute et relative disponibles</li>
              <li>Pas de float ni de display: inline</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">StyleSheet API</h3>
            <p className="text-gray-700">
              L'API StyleSheet offre une façon optimisée de définir les styles :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Validation des styles au moment de la création</li>
              <li>Optimisation des performances</li>
              <li>Styles immuables et réutilisables</li>
            </ul>
          </div>
        </div>
      </section>

      {/* APIs Natives */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">APIs Natives Importantes</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">AsyncStorage</h3>
              <p className="text-sm text-gray-700">Stockage de données persistant et asynchrone</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Geolocation</h3>
              <p className="text-sm text-gray-700">Accès à la position de l'utilisateur</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Camera</h3>
              <p className="text-sm text-gray-700">Accès à l'appareil photo</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Notifications</h3>
              <p className="text-sm text-gray-700">Gestion des notifications push</p>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation de l'Application */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Présentation de l'Application Notes&Tasks</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Fonctionnalités principales :</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Prise de notes avec photos</li>
            <li>Gestion de tâches avec rappels</li>
            <li>Géolocalisation des notes/tâches</li>
            <li>Synchronisation en ligne</li>
            <li>Partage de notes</li>
          </ul>
        </div>
      </section>

      {/* Structure du Cours */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Structure du cours</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Module 1: Fondamentaux et Structure de Base (6h)</h3>
            <p className="text-gray-700">Setup du projet et interface de base</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Module 2: Navigation et Données (8h)</h3>
            <p className="text-gray-700">Navigation multi-écrans et persistence des données</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Module 3: Fonctionnalités Natives et Finalisation (6h)</h3>
            <p className="text-gray-700">Intégration native et déploiement</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;