import { getDictionary } from "@/lib/dictionary";
import { EnhancedCVClient } from "@/components/enhanced-cv-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload CV | Huntier",
  description: "Upload your CV and let our AI match you with the perfect job opportunities.",
};

export default async function UploadCVPage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  // In Next.js 15, we need to await params before accessing its properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);

  // Update metadata based on language
  if (lang === 'zh') {
    metadata.title = "上传简历 | Huntier";
    metadata.description = "上传您的简历，让我们的AI为您匹配完美的工作机会。";
  }
  
  return <EnhancedCVClient dictionary={dictionary} lang={lang} />;
}
