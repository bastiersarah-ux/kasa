/**
 * @module AuthTemplate
 * @description Template réutilisable pour les pages de connexion et d'inscription.
 * Gère le formulaire, la validation et la soumission vers l'API.
 */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AuthTemplate.module.css";
import { useAuth } from "@/app/context/AuthContext";
import { useNotification } from "@/app/context/NotificationContext";
import { fetchAPI, ValidationError } from "@/services/fetch-api";
import { LoginInput, RegisterInput, AuthResponse } from "@/types/api-types";

/**
 * Props du template d'authentification.
 * @property isLogin - `true` pour le formulaire de connexion, `false` pour l'inscription
 */
type AuthTemplateProps = {
  isLogin: boolean;
};

/** Dictionnaire d'erreurs de validation par nom de champ */
type FieldErrors = Record<string, string>;

/**
 * Template pour les pages de connexion et d'inscription.
 * Affiche un formulaire adapté selon le mode (login/register),
 * gère la validation côté client et la soumission vers l'API.
 * @param props - Props avec le mode de formulaire
 * @returns Le formulaire d'authentification
 */
export default function AuthTemplate({ isLogin }: AuthTemplateProps) {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { showError } = useNotification();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setFieldErrors({});

    if (!isLogin) {
      const errors: FieldErrors = {};

      if (!firstName) errors.firstName = "Le prénom est requis";
      if (!lastName) errors.lastName = "Le nom est requis";

      if (!acceptedTerms) {
        errors.terms = "Vous devez accepter les conditions";
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
    }

    if (
      ![null, undefined, ""].includes(email?.trim()) &&
      ![null, undefined, ""].includes(password?.trim())
    ) {
      try {
        const endpoint = isLogin ? "/auth/login" : "/auth/register";
        const body = isLogin
          ? ({ email, password } as LoginInput)
          : ({
              email,
              password,
              name: `${firstName} ${lastName}`,
            } as RegisterInput);

        const res = await fetchAPI<AuthResponse>(endpoint, {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (res) {
          login(res.user);
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors: FieldErrors = {};
          error.errors.forEach((err) => {
            errors[err.field] = err.message;
          });
          setFieldErrors(errors);
        } else if (error instanceof Error) {
          showError(error.message);
        }
      }
    }
  }

  return (
    <div className={styles["page-content"]}>
      <section>
        <form onSubmit={handleSubmit} className={styles.card}>
          <h1>
            {isLogin
              ? "Heureux de vous revoir"
              : "Rejoignez la communauté Kasa"}
          </h1>

          <h2 className="h3 text-center">
            {isLogin
              ? "Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques."
              : "Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs."}
          </h2>

          {!isLogin && (
            <>
              <div className={styles.fieldset}>
                <label htmlFor="firstName" className={styles.label}>
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`${styles.input} ${
                    fieldErrors.firstName ? styles["input-error"] : ""
                  }`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (fieldErrors.firstName)
                      setFieldErrors((prev) => ({ ...prev, firstName: "" }));
                  }}
                />
                {fieldErrors.firstName && (
                  <span className={styles.error}>{fieldErrors.firstName}</span>
                )}
              </div>

              <div className={styles.fieldset}>
                <label htmlFor="lastName" className={styles.label}>
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`${styles.input} ${
                    fieldErrors.lastName ? styles["input-error"] : ""
                  }`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (fieldErrors.lastName)
                      setFieldErrors((prev) => ({ ...prev, lastName: "" }));
                  }}
                />
                {fieldErrors.lastName && (
                  <span className={styles.error}>{fieldErrors.lastName}</span>
                )}
              </div>
            </>
          )}

          <div className={styles.fieldset}>
            <label htmlFor="email" className={styles.label}>
              Adresse email
            </label>
            <input
              id="email"
              type="text"
              className={`${styles.input} ${
                fieldErrors.email ? styles["input-error"] : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email)
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {fieldErrors.email && (
              <span className={styles.error}>{fieldErrors.email}</span>
            )}
          </div>

          <div className={styles.fieldset}>
            <label htmlFor="password" className={styles.label}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${
                fieldErrors.password ? styles["input-error"] : ""
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password)
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            {fieldErrors.password && (
              <span className={styles.error}>{fieldErrors.password}</span>
            )}
          </div>

          {!isLogin && (
            <label className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span className="inline">
                {fieldErrors.terms && (
                  <span className={styles.error}>{fieldErrors.terms}</span>
                )}
                J’accepte les{" "}
                <a href="#" className="underline!">
                  conditions générales d’utilisation
                </a>
              </span>
            </label>
          )}

          <button
            className={`${styles.btn} ${styles["btn-red"]}`}
            type="submit"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>

          {isLogin && (
            <Link className={styles.link} href="#">
              Mot de passe oublié ?
            </Link>
          )}

          {isLogin ? (
            <Link className={styles.link} href="/auth/register">
              Pas encore de compte ? <strong>Inscrivez-vous</strong>
            </Link>
          ) : (
            <Link className={styles.link} href="/auth/login">
              Déjà membre ? <strong>Se connecter</strong>
            </Link>
          )}
        </form>
      </section>
    </div>
  );
}
