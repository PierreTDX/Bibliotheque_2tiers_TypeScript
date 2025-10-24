import { GestionnaireBD } from "../BaseDeDonnées/GestionnaireBD";

export class EcranRecherche {
  constructor(private gestionnaire: GestionnaireBD) { }

  async afficher(readline: any): Promise<void> {
    console.log("--- RECHERCHE D'UN LIVRE ---");
    const question = (q: string) => new Promise<string>((res) => readline.question(q, (ans: string) => res(ans.trim())));

    const isbn = await question("ISBN à rechercher : ");
    const livre = this.gestionnaire.rechercherLivre(isbn);

    if (livre) console.log("✓ Livre trouvé :", livre.afficherInfo());
    else console.log("❌ Aucun livre trouvé");
  }
}
