import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-center p-10 ">
      <div className="w-85.75 max-w-full flex flex-col justify-center items-center text-center gap-5">
        <h1 className="text-[100px]! font-black!">404</h1>
        <p className="h3">
          Il semble que la page que vous cherchez ait pris des vacances… ou
          n’ait jamais existé.
        </p>
        <div className="flex flex-col gap-5 w-50 max-w-50">
          <Link href={"/"} className="btn btn-red w-full">
            Accueil
          </Link>
          <Link href={"/"} className="btn btn-red w-full">
            Logements
          </Link>
        </div>
      </div>
    </div>
  );
}
