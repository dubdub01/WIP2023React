import { Link } from "react-router-dom";

const HomePage = (props) => {
    return ( 
        <>
        <section id="hero" class="py-5">
        <div class="container text-center">
            <h1 class="display-4">Bienvenue sur WIP - Work in Progress !</h1>
            <p class="lead">WIP est une plateforme en ligne qui facilite la mise en relation entre les entreprises et les talents. Que vous soyez une entreprise à la recherche de professionnels qualifiés ou un travailleur indépendant en quête d'opportunités, WIP est là pour vous aider à trouver les bonnes personnes.</p>
            <div class="d-flex flex-column align-items-center">
                <Link to="/companies" class="btn btn-primary my-2">Découvrir nos Companies</Link>
                <Link to="/workers" class="btn btn-primary my-2">Découvrir nos Workers</Link>
            </div>
            <div class="mt-4">
                <Link to="#" class="btn btn-outline-primary mx-2">Inscription</Link>
                <Link to="#" class="btn btn-outline-primary mx-2">Connexion</Link>
            </div>
        </div>
    </section>

    <section id="about" class="py-5">
        <div class="container">
            <h2 class="text-center mb-4">À propos de WIP</h2>
                <p>WIP est une plateforme en ligne qui facilite la mise en relation des entreprises et des travailleurs indépendants. Notre objectif est de simplifier le processus de recrutement et de collaboration en offrant un espace où les entreprises peuvent trouver les talents dont elles ont besoin et où les travailleurs indépendants peuvent trouver des opportunités professionnelles.</p>
            <p>WIP offre une large gamme de secteurs et de compétences, permettant aux entreprises de trouver les meilleurs talents pour leurs projets. Les travailleurs indépendants peuvent créer un profil détaillé, mettre en avant leurs compétences et leur expérience, et être contactés directement par les entreprises intéressées.</p>
        </div>
    </section>
        </>
     );
}


export default HomePage;