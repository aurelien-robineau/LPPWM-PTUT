import Header from "../components/Header"
import House from "../components/Icons/house"

const Profile = () => {
	return (
		<div className="profile-page">
			<Header />

			<div className="info__container">
				<h2>Mes informations</h2>

				<div className="info__wrapper">
					<p className="info__tag">Prénom</p>
					<p className="info__content">Michelle</p>
				</div>

				<div className="info__wrapper">
					<p className="info__tag">Nom</p>
					<p className="info__content">Michelle</p>
				</div>

				<div className="info__wrapper">
					<p className="info__tag">ID client</p>
					<p className="info__content">Michelle</p>
				</div>

				<div className="info__wrapper">
					<p className="info__tag">Adresse Mail</p>
					<p className="info__content">Michelle</p>
				</div>

				<h3>Tous mes compteurs</h3>
				<div className="counter__wrapper"><span><House /></span><p>Adresse compteur : contrat kW </p> <a href="">supprimer</a></div>
				<div className="counter__wrapper"><span><House /></span><p>Adresse compteur : contrat kW </p> <a href="">supprimer</a></div>

			</div>

			<div className="goal__container">
				<h2>Mon objectif</h2>
				<label>Déterminez votre objectif de la semaine</label>
				<input
					name="goal"
					type="int"
					id="goal"
				/><span>semaine</span>
			</div>


			<div className="linky__container">
				<h2>Mes compteurs Linky</h2>

				<h3>Compteur principal</h3>
				<select name="favorite__select" id="favorite__select">
					<option value="">Compteur favoris</option>
					<option value="counter-1"><span><House /></span> 3 rue pouche</option>
					<option value="counter-2"><span><House /></span>3 rue pouche</option>
					<option value="counter-3"><span><House /></span>3 rue pouche</option>
				</select>

				<h3>Ajouter un compteur</h3>
				<label htmlFor="linky__number">Numéro du compteur Linky</label>
				<input
					name="linky__number"
					type="int"
					id="linky__number"
				/>

				<div className="linky__checkbox-wrapper">
				<input name="linky__checkbox"
						type="checkbox"
						id="linky__checkbox"
						checked/>
					<label htmlFor="linky__checkbox">Définir en tant que compteur favoris</label>

				</div>


			</div>

		</div>
			)
}

			export default Profile
