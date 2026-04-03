"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AuthTemplate.module.css";
import { useAuth } from "@/app/context/AuthContext";
import { useNotification } from "@/app/context/NotificationContext";
import { fetchAPI, ValidationError } from "@/services/fetch-api";
import { LoginInput, RegisterInput, AuthResponse } from "@/types/api-types";

/** Props du template d'auth */
type AuthTemplateProps = {
  isLogin: boolean;
};

/** Erreurs par champ */
type FieldErrors = Record<string, string>;

/** Template pour les pages login et register */
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
        const endpoint = isLogin ? "/login" : "/register";
        const body = isLogin
          ? ({ email, password } as LoginInput)
          : ({ email, password, name: "" } as RegisterInput);

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
    <main className={`${styles["page-content"]} max-md:flex-col`}>
      <section>
        <form onSubmit={handleSubmit} className="card bg-white gap-4 mx-auto">
          <h1>
            {isLogin
              ? "Heureux de vous revoir"
              : "Rejoignez la communauté Kasa"}
          </h1>
          <h3>
            {isLogin
              ? "Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques."
              : "Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs."}
          </h3>

          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="label">Prénom</legend>
                <input
                  id="firstName"
                  type="text"
                  aria-label="Prénom"
                  className={`input ${fieldErrors.firstName ? "input-error" : ""}`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (fieldErrors.firstName)
                      setFieldErrors((prev) => ({ ...prev, firstName: "" }));
                  }}
                />
                {fieldErrors.firstName && (
                  <span className="text-error-content text-sm">
                    {fieldErrors.firstName}
                  </span>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="label">Nom</legend>
                <input
                  id="lastName"
                  type="text"
                  aria-label="Nom"
                  className={`input ${fieldErrors.lastName ? "input-error" : ""}`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (fieldErrors.lastName)
                      setFieldErrors((prev) => ({ ...prev, lastName: "" }));
                  }}
                />
                {fieldErrors.lastName && (
                  <span className="text-error-content text-sm">
                    {fieldErrors.lastName}
                  </span>
                )}
              </fieldset>
            </>
          )}

          <fieldset className="fieldset">
            <legend className="label">Adresse email</legend>
            <input
              id="email"
              type="text"
              aria-label="Email"
              autoComplete="username"
              className={`input ${fieldErrors.email ? "input-error" : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email)
                  setFieldErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {fieldErrors.email && (
              <span className="text-error-content text-sm">
                {fieldErrors.email}
              </span>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="label">Mot de passe</legend>
            <input
              id="password"
              aria-label="Mot de passe"
              className={`input ${fieldErrors.password ? "input-error" : ""}`}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password)
                  setFieldErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            {fieldErrors.password && (
              <span className="text-error-content text-sm">
                {fieldErrors.password}
              </span>
            )}
          </fieldset>

          {!isLogin && (
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox mt-1"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <div>
                {fieldErrors.terms && (
                  <span className="text-error-content text-sm">
                    {fieldErrors.terms}
                  </span>
                )}
                J’accepte les{" "}
                <a href="/cgu" className="underline">
                  conditions générales d’utilisation
                </a>
              </div>
            </label>
          )}

          <button className="btn btn-red" type="submit">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
          {isLogin && <Link href="#">Mot de passe oublié ?</Link>}
          <p className="flex gap-2">
            {isLogin ? (
              <>
                <Link href="/auth/register">
                  {" "}
                  Pas encore de compte ? <strong>Inscrivez-vous</strong>
                </Link>
              </>
            ) : (
              <>
                Déjà membre ?<Link href="/auth/login">Se connecter</Link>
              </>
            )}
          </p>
        </form>
      </section>
    </main>
  );
}
