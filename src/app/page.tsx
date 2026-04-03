import { PropertyDetails } from "@/types/api-types";
import HomeClient from "@/app/HomeClient";
import { listProperties } from "@/services";

export default async function HomePage() {
  const properties = await listProperties();

  return (
    <>
      <HomeClient properties={properties as PropertyDetails[]} />
    </>
  );
}
