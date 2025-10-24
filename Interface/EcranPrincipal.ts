import * as readline from "readline";
import { GestionnaireBD } from "../BaseDeDonnées/GestionnaireBD";
import { EcranAjoutLivre } from "./EcranAjoutLivre";
import { EcranRecherche } from "./EcranRecherche";

export class EcranPrincipal {
  private gestionnaire: GestionnaireBD;
  private rl: readline.Interface;
  private ajoutLivre: EcranAjoutLivre;
  private recherche: EcranRecherche;

  constructor() {
    this.gestionnaire = new GestionnaireBD();
    this.ajoutLivre = new EcranAjoutLivre(this.gestionnaire);
    this.recherche = new EcranRecherche(this.gestionnaire);
    this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }

  private question(q: string): Promise<string> {
    return new Promise((res) => this.rl.question(q, (ans) => res(ans.trim())));
  }

  async afficherMenu() {
    while (true) {
      console.log("\n=== SYSTÈME DE BIBLIOTHÈQUE ===");
      console.log("1. Ajouter un livre");
      console.log("2. Afficher tous les livres");
      console.log("3. Rechercher un livre");
      console.log("4. Emprunter un livre");
      console.log("5. Retourner un livre");
      console.log("6. Quitter");

      const choix = await this.question("> ");
      switch (choix) {
        case "1": await this.ajoutLivre.afficher(this.rl); break;
        case "2": this.afficherTous(); break;
        case "3": await this.recherche.afficher(this.rl); break;
        case "4": await this.emprunterLivre(); break;
        case "5": await this.retournerLivre(); break;
        case "6": console.log("Au revoir !"); this.rl.close(); process.exit(0);
        default: console.log("Choix invalide");
      }
    }
  }

  afficherTous() {
    const livres = this.gestionnaire.obtenirTousLesLivres();
    if (livres.length === 0) return console.log("Aucun livre disponible");
    livres.forEach((livre) => console.log(livre.afficherInfo()));
  }

  async emprunterLivre() {
    const isbn = await this.question("ISBN du livre à emprunter : ");
    const ok = this.gestionnaire.emprunterLivre(isbn);
    console.log(ok ? "✓ Livre emprunté" : "❌ Livre non disponible ou inexistant");
  }

  async retournerLivre() {
    const isbn = await this.question("ISBN du livre à retourner : ");
    const ok = this.gestionnaire.retournerLivre(isbn);
    console.log(ok ? "✓ Livre retourné" : "❌ Erreur lors du retour");
  }
}

new EcranPrincipal().afficherMenu();
