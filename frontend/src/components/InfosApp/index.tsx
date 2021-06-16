const InfosApp = () => {
    return (
        <div className="login-informations-container">
            <h2>
                Maîtrisez votre consommation d’électricité avec{" "}
                <span className="bold-800">Enyu</span>
            </h2>

            <div className="feature-tracker-row">
                <div className="feature-text-container">
                    <p>
                        Fixez et atteignez votre{" "}
                        <span className="bold-800">
                            objectif de consommation.
                        </span>
                    </p>
                </div>

                <div className="tracker"></div>
            </div>

            <div className="feature-graph-row">
                <div className="graph"></div>

                <div className="feature-text-container">
                    <p>
                        Trackez et comparez votre consommation grace à des{" "}
                        <span className="bold-800">graphiques</span>.
                    </p>
                </div>
            </div>

            <div className="feature-plant-row">
                <div className="feature-text-container">
                    <div className="feature-paragraph-container">
                        <p>
                            Faites pousser Planty en maintenant votre
                            consommation inférieur à celle{" "}
                            <span className="bold-800">
                                moyenne des foyers similaires de votre région
                            </span>
                            .
                        </p>
                        <p>
                            Elle vous donnera toutes les{" "}
                            <span className="bold-800">
                                astuces écologiques
                            </span>{" "}
                            nécessaires à sa croissance.
                        </p>
                    </div>
                </div>

                <div className="plant"></div>
            </div>
        </div>
    )
}

export default InfosApp
