import { Link } from "react-router-dom";

const HomePage = (props) => {
  return (
    <div className="bg-gradient-to-r from-blue-950 to-teal-900 text-white min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto">
      <section className="text-center p-6">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue sur WIP - Work in Progress !
        </h1>
        <p className="text-lg">
          WIP est une plateforme en ligne qui facilite la mise en relation entre les entreprises et les talents. Que vous soyez une entreprise à la recherche de professionnels qualifiés ou un travailleur indépendant en quête d'opportunités, WIP est là pour vous aider à trouver les bonnes personnes.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
  <Link
    to="/companies"
    className="bg-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
  >
    Découvrir nos Companies
  </Link>
  <Link
    to="/workers"
    className="bg-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
  >
    Découvrir nos Workers
  </Link>
</div>

      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">À propos de WIP</h2>
        <p className="text-lg">
          WIP est une plateforme en ligne qui facilite la mise en relation des entreprises et des travailleurs indépendants. Notre objectif est de simplifier le processus de recrutement et de collaboration en offrant un espace où les entreprises peuvent trouver les talents dont elles ont besoin et où les travailleurs indépendants peuvent trouver des opportunités professionnelles.
        </p>
        <p className="text-lg">
          WIP offre une large gamme de secteurs et de compétences, permettant aux entreprises de trouver les meilleurs talents pour leurs projets. Les travailleurs indépendants peuvent créer un profil détaillé, mettre en avant leurs compétences et leur expérience, et être contactés directement par les entreprises intéressées.
        </p>
      </section>
    </div>
    </div>
  );
}

export default HomePage;
