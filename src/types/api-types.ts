/**
 * @module api-types
 * @description Types partagés entre le frontend et l'API backend.
 */

/** Rôles utilisateur possibles dans l'application */
export type Role = "owner" | "client" | "admin";

/** Informations de base d'un utilisateur */
export type BaseUser = {
  /** Identifiant unique */
  id: number;
  /** Nom complet */
  name: string;
  /** URL de la photo de profil */
  picture?: string | null;
};

/** Utilisateur tel qu'affiché dans une liste (avec rôle) */
export type UserListItem = BaseUser & {
  /** Rôle de l'utilisateur */
  role: Role;
};

/** Utilisateur authentifié (inclut l'email) */
export type AuthUser = UserListItem & {
  /** Adresse email */
  email?: string | null;
};

/** Données nécessaires pour créer un utilisateur */
export type CreateUserInput = {
  /** Nom complet */
  name: string;
  /** URL de la photo de profil */
  picture?: string | null;
  /** Rôle à attribuer */
  role?: Role;
};

/** Données modifiables d'un utilisateur */
export type UpdateUserInput = {
  /** Nouveau nom */
  name?: string;
  /** Nouvelle photo de profil */
  picture?: string | null;
  /** Nouveau rôle */
  role?: Role;
};

/** Contenu décodé du token JWT */
export type AuthTokenPayload = {
  /** Identifiant utilisateur */
  id: number;
  /** Rôle de l'utilisateur */
  role: Role;
  /** Nom complet */
  name: string;
  /** Adresse email */
  email: string | null;
};

/** Données du formulaire d'inscription */
export type RegisterInput = {
  /** Nom complet */
  name: string;
  /** Adresse email */
  email: string;
  /** Mot de passe */
  password: string;
  /** URL de la photo de profil */
  picture?: string | null;
  /** Rôle (limité à owner ou client) */
  role?: Extract<Role, "owner" | "client">;
};

/** Données du formulaire de connexion */
export type LoginInput = {
  /** Adresse email */
  email: string;
  /** Mot de passe */
  password: string;
};

/** Données pour demander une réinitialisation de mot de passe */
export type RequestResetInput = {
  /** Email du compte ciblé */
  email: string;
};

/** Données pour réinitialiser le mot de passe */
export type ResetPasswordInput = {
  /** Token de réinitialisation reçu par email */
  token: string;
  /** Nouveau mot de passe */
  password: string;
};

/** Réponse retournée après connexion ou inscription */
export type AuthResponse = {
  /** Token JWT d'authentification */
  token: string;
  /** Profil de l'utilisateur connecté */
  user: AuthUser;
};

/** Réponse à une demande de réinitialisation de mot de passe */
export type RequestResetResponse = {
  ok: true;
  /** Message de confirmation */
  message: string;
  /** Token de réinitialisation (en développement) */
  token?: string;
};

/** Réponse à une réinitialisation de mot de passe réussie */
export type ResetPasswordResponse = {
  ok: true;
};

/** Résumé d'un hôte (propriétaire d'un logement) */
export type HostSummary = {
  /** Identifiant unique */
  id: number;
  /** Nom de l'hôte */
  name: string;
  /** URL de la photo de profil */
  picture?: string | null;
};

/** Résumé d'une propriété (utilisé dans les listes) */
export type PropertySummary = {
  /** Identifiant unique */
  id: string;
  /** Slug URL-friendly */
  slug: string;
  /** Titre du logement */
  title: string;
  /** Description courte */
  description?: string | null;
  /** URL de l'image de couverture */
  cover?: string | null;
  /** Adresse ou ville */
  location?: string | null;
  /** Prix par nuit en euros */
  price_per_night: number;
  /** Moyenne des notes */
  rating_avg: number;
  /** Nombre total de notes */
  ratings_count: number;
  /** Informations de l'hôte */
  host?: HostSummary;
};

/** Détail complet d'une propriété (inclut galerie, équipements et tags) */
export type PropertyDetails = PropertySummary & {
  /** URLs des photos de la galerie */
  pictures: string[];
  /** Liste des équipements disponibles */
  equipments: string[];
  /** Tags / catégories du logement */
  tags: string[];
};

/** Données nécessaires pour créer une propriété */
export type CreatePropertyInput = {
  /** Identifiant personnalisé (optionnel) */
  id?: string;
  /** Titre du logement */
  title: string;
  /** Description */
  description?: string | null;
  /** URL de l'image de couverture */
  cover?: string | null;
  /** Adresse ou ville */
  location?: string | null;
  /** Prix par nuit en euros */
  price_per_night?: number;
  /** Identifiant de l'hôte existant */
  host_id?: number;
  /** Informations du nouvel hôte à créer */
  host?: {
    name: string;
    picture?: string | null;
  };
  /** URLs des photos */
  pictures?: string[];
  /** Liste des équipements */
  equipments?: string[];
  /** Tags / catégories */
  tags?: string[];
};

/** Données modifiables d'une propriété */
export type UpdatePropertyInput = {
  /** Nouveau titre */
  title?: string;
  /** Nouvelle description */
  description?: string | null;
  /** Nouvelle image de couverture */
  cover?: string | null;
  /** Nouvelle localisation */
  location?: string | null;
  /** Nouveau prix par nuit */
  price_per_night?: number;
  /** Nouvel identifiant d'hôte */
  host_id?: number;
  /** Nouvelles informations de l'hôte */
  host?: {
    name: string;
    picture?: string | null;
  };
};

/** Utilisateur ayant laissé une note */
export type RatingUser = BaseUser;

/** Note / avis sur une propriété */
export type Rating = {
  /** Identifiant unique */
  id: number;
  /** Note de 1 à 5 */
  score: number;
  /** Commentaire optionnel */
  comment?: string | null;
  /** Date de création (ISO 8601) */
  created_at: string;
  /** Auteur de la note */
  user: RatingUser;
};

/** Données nécessaires pour ajouter une note */
export type AddRatingInput = {
  /** Identifiant de l'utilisateur */
  user_id: number;
  /** Note de 1 à 5 */
  score: number;
  /** Commentaire optionnel */
  comment?: string | null;
};

/** Résumé des notes d'une propriété */
export type RatingsSummary = {
  /** Moyenne des notes */
  rating_avg: number;
  /** Nombre total de notes */
  ratings_count: number;
  /** Liste complète des notes */
  ratings: Rating[];
};

/** Élément de la liste des favoris (identique à un résumé de propriété) */
export type FavoriteListItem = PropertySummary;

/** Réponse retournée après ajout ou suppression d'un favori */
export type FavoriteActionResponse = {
  ok: true;
};

/** But de l'upload d'image */
export type UploadPurpose =
  | "property-cover"
  | "property-picture"
  | "user-picture"
  | "other"
  | null;

/** Réponse retournée après l'upload d'une image */
export type UploadImageResponse = {
  /** URL publique de l'image uploadée */
  url: string;
  /** Nom du fichier sur le serveur */
  filename: string;
  /** Taille du fichier en octets */
  size: number;
  /** Type MIME du fichier */
  mimetype: string;
  /** But de l'upload */
  purpose: UploadPurpose;
  /** Identifiant de la propriété associée */
  property_id?: string;
  /** Instructions pour utiliser l'image */
  instructions: string;
};

/** Statut de suppression d'une image */
export type DeleteImageStatus = "deleted" | "not_found" | "error";

/** Résultat de suppression d'une image individuelle */
export type DeleteImageResult = {
  /** Nom du fichier */
  filename: string;
  /** Statut de la suppression */
  status: DeleteImageStatus;
  /** Message d'erreur éventuel */
  error?: string;
};

/** Réponse retournée après la suppression d'images */
export type DeleteImagesResponse = {
  /** Succès global de l'opération */
  ok: boolean;
  /** Fichiers supprimés avec succès */
  deleted: string[];
  /** Fichiers non trouvés */
  not_found: string[];
  /** Erreurs rencontrées */
  errors: { filename: string; error: string }[];
  /** Détail par fichier */
  results: DeleteImageResult[];
};

/** Format d'erreur standard de l'API */
export type ApiError = {
  /** Message d'erreur */
  error: string;
};
