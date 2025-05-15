import { getDictionary } from "@/lib/dictionary";
import { UploadCVClient } from "@/components/upload-cv-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload CV | Huntier",
  description: "Upload your CV and let our AI match you with the perfect job opportunities.",
};

export default async function UploadCVPage({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);
  
  return <UploadCVClient dictionary={dictionary} lang={params.lang} />;
}
