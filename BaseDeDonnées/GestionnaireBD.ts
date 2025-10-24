import Database from "better-sqlite3";
import { Livre } from "../Modèles/Livre";

type LivreRow = {
  isbn: string;
  titre: string;
  auteur: string;
  annee: number;
  disponible: number; // 0 ou 1 dans la DB
};

export class GestionnaireBD {
  private db: Database.Database;

  constructor() {
    this.db = new Database("./bibliotheque.db");
    this.initialiserTables();
  }

  private initialiserTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS livres (
        isbn TEXT PRIMARY KEY,
        titre TEXT NOT NULL,
        auteur TEXT NOT NULL,
        annee INTEGER,
        disponible INTEGER DEFAULT 1
      );
    `);
  }

  ajouterLivre(livre: Livre): boolean {
    try {
      const stmt = this.db.prepare(`
        INSERT INTO livres (isbn, titre, auteur, annee, disponible)
        VALUES (?, ?, ?, ?, ?)
      `);
      stmt.run(livre.isbn, livre.titre, livre.auteur, livre.annee, livre.disponible ? 1 : 0);
      return true;
    } catch {
      return false;
    }
  }

  obtenirTousLesLivres(): Livre[] {
    const rows = this.db.prepare("SELECT * FROM livres").all() as LivreRow[];
    return rows.map(r => {
      const livre = new Livre(r.isbn, r.titre, r.auteur, r.annee);
      livre.disponible = r.disponible === 1;
      return livre;
    });
  }

  rechercherLivre(isbn: string): Livre | null {
    const r = this.db.prepare("SELECT * FROM livres WHERE isbn = ?").get(isbn) as LivreRow | undefined;
    if (!r) return null;

    const livre = new Livre(r.isbn, r.titre, r.auteur, r.annee);
    livre.disponible = r.disponible === 1;
    return livre;
  }

  emprunterLivre(isbn: string): boolean {
    const res = this.db.prepare("UPDATE livres SET disponible = 0 WHERE isbn = ? AND disponible = 1").run(isbn);
    return res.changes > 0;
  }

  retournerLivre(isbn: string): boolean {
    const res = this.db.prepare("UPDATE livres SET disponible = 1 WHERE isbn = ?").run(isbn);
    return res.changes > 0;
  }
}
