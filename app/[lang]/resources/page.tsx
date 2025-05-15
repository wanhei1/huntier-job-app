import { getDictionary } from "@/lib/dictionary"
import { ResourcesClient } from "@/components/resources-client"

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  // Await the params if it's a promise
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);
  
  return <ResourcesClient dictionary={dictionary} lang={lang} />;
}
