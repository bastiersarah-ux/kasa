import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "src/helpers/auth-cookie";

function decodeJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payload = parts[1];
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decoded = Buffer.from(padded, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Décoder le JWT pour extraire l'ID utilisateur
    const payload = decodeJWT(token);
    if (!payload?.id) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 },
      );
    }

    // Appeler le backend pour récupérer le profil utilisateur
    // Le backend n'a pas /auth/me, donc on utilise /api/users/:id
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
    const response = await fetch(`${apiUrl}/api/users/${payload.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: response.status },
      );
    }

    const user = await response.json();

    // Formater la réponse avec le format attendu { user: {...} }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
