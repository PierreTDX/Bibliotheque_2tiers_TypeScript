import { GestionnaireBD } from "../BaseDeDonnées/GestionnaireBD";
import { Livre } from "../Modèles/Livre";

export class EcranAjoutLivre {
  constructor(private gestionnaire: GestionnaireBD) { }

  async afficher(readline: any): Promise<void> {
    console.log("--- AJOUT D'UN LIVRE ---");
    const question = (q: string) => new Promise<string>((res) => readline.question(q, (ans: string) => res(ans.trim())));

    const isbn = await question("ISBN : ");
    const titre = await question("Titre : ");
    const auteur = await question("Auteur : ");
    const anneeStr = await question("Année : ");
    const annee = parseInt(anneeStr, 10);

    if (!isbn || isbn.length < 10) return console.log("❌ ISBN invalide (min. 10 caractères)");
    if (!titre || !auteur) return console.log("❌ Titre et auteur obligatoires");
    if (isNaN(annee) || annee < 1000 || annee > new Date().getFullYear()) return console.log("❌ Année invalide");

    const livre = new Livre(isbn, titre, auteur, annee);
    const ok = this.gestionnaire.ajouterLivre(livre);
    console.log(ok ? "✅ Livre ajouté avec succès" : "❌ Erreur ou ISBN déjà existant");
  }
}
