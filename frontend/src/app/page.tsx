import { client } from "@/lib/sanity";
import PageBuilder from "@/components/sections/PageBuilder";

export default async function HomePage() {

  const page = await client.fetch(`
        *[
            _type == "page" &&
            pageType == "home"
        ][0]
    `);

  return (
    <PageBuilder
      sections={page?.pageBuilder || []}
    />
  );
}