"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Linkedin, 
  AlertCircle, 
  Check, 
  ChevronRight, 
  Sparkles,
  X,
  Plus,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AnimatedBackground } from "@/components/animated-background";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

interface UploadCVClientProps {
  dictionary: {
    uploadcv: {
      title: string;
      subtitle: string;
      instructions: {
        title: string;
        english: string;
        chinese: string;
      };
      dropzone: {
        title: string;
        subtitle: string;
        formats: string;
        dragActive: string;
      };
      or: string;
      linkedin: {
        title: string;
        placeholder: string;
        button: string;
      };
      processing: {
        title: string;
        subtitle: string;
      };
      form: {
        name: string;
        email: string;
        phone: string;
        skills: string;
        addSkill: string;
        experience: string;
        education: string;
        languages: string;
        jobPreferences: string;
        remoteOption: string;
        relocationOption: string;
        salaryExpectations: string;
        submit: string;
        privacyNotice: string;
      };
      success: {
        title: string;
        subtitle: string;
        cta: string;
      };
      error: {
        generic: string;
        fileSize: string;
        fileType: string;
        emptyFields: string;
      };
    };
  };
  lang: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  chineseName: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).min(1, { message: "Add at least one skill." }),
  languages: z.array(z.string()).min(1, { message: "Add at least one language." }),
  experience: z.string(),
  workHistory: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    isCurrent: z.boolean().optional()
  })).optional(),
  educationLevel: z.string(),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    field: z.string().optional(),
    graduationYear: z.string(),
  })).optional(),
  certifications: z.array(z.string()).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    url: z.string().optional(),
  })).optional(),
  remoteWork: z.boolean(),
  relocation: z.boolean(),
  salaryExpectations: z.number().min(0).max(1000000),
  additionalInfo: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
});

const experienceOptions = [
  "0-1", "1-2", "2-3", "3-5", "5-7", "7-10", "10+"
];

const languageOptions = [
  "English", "Chinese", "Spanish", "French", "German", 
  "Japanese", "Korean", "Russian", "Arabic", "Portuguese"
];

const educationLevelOptions = [
  "High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", 
  "PhD", "Vocational Training", "Professional Certification", "Other"
];

const locationOptions = [
  "Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Hangzhou", 
  "Chengdu", "Xi'an", "Nanjing", "Wuhan", "Tianjin", "Other"
];

export function UploadCVClient({ dictionary, lang }: UploadCVClientProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add safe access to dictionary with fallback
  const d = dictionary?.uploadcv || {
    title: "Upload Your CV",
    subtitle: "Let our AI analyze your skills and match you with the perfect job opportunities",
    instructions: {
      title: "Instructions",
      english: "Please complete the form below with your professional information.",
      chinese: "请在下面表格中填写您的专业信息。"
    },
    dropzone: {
      title: "Drop your CV here",
      subtitle: "or click to browse files",
      formats: "Supported formats: PDF, DOCX (max 5MB)",
      dragActive: "Drop to upload"
    },
    or: "OR",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      skills: "Skills",
      addSkill: "Add Skill",
      experience: "Years of Experience",
      education: "Education",
      languages: "Languages",
      jobPreferences: "Job Preferences",
      remoteOption: "Open to remote work",
      relocationOption: "Open to relocation",
      salaryExpectations: "Salary Expectations",
      submit: "Find Matching Jobs",
      privacyNotice: "By submitting, you agree to our Terms and Privacy Policy"
    },
    success: {
      title: "CV Uploaded Successfully!",
      subtitle: "We've analyzed your profile and found matching opportunities.",
      cta: "View Matching Jobs"
    },
    error: {
      generic: "Something went wrong. Please try again.",
      fileSize: "File is too large. Maximum size is 5MB.",
      fileType: "Invalid file format. Please upload a PDF or DOCX file.",
      emptyFields: "Please fill in all required fields."
    }
  };
  
  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: [],
      experience: "0-1",
      education: "",
      languages: ["English"],
      remoteWork: true,
      relocation: false,
      salaryExpectations: "",
      additionalInfo: "",
    },
  });

  const addSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      form.setValue("skills", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    form.setValue("skills", newSkills);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsProcessing(true);
    
    // Simulate submitting the form
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      console.log(data);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const fileType = file.type;
      
      if (!allowedTypes.includes(fileType)) {
        setError(d.error.fileType);
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError(d.error.fileSize);
        return;
      }

      setError(null);
      // File is valid but we're not processing it in this simpler form approach
    }
  };

  return (
    <div className="relative min-h-screen pb-16">
      {/* Animated background with green gradient */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <AnimatedBackground 
          intensity={3} 
          speed={3} 
          colorStart="rgba(16, 185, 129, 0.15)" 
          colorEnd="rgba(10, 10, 10, 0)"
        />
        
        {/* Gradient blobs */}
        <div className="absolute top-20 right-[5%] w-72 h-72 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-300/5 dark:from-emerald-600/10 dark:to-teal-500/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-teal-400/10 to-emerald-300/5 dark:from-teal-600/10 dark:to-emerald-500/5 blur-3xl"></div>
      </div>

      <div className="container max-w-4xl mx-auto pt-16 px-4 relative z-10">
        <AnimatePresence mode="wait">
          {!isSuccess && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 inline-block">
                  {d.title}
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {d.subtitle}
                </p>
              </div>

              {/* Instructions section */}
              <Card className="mb-8 border-border/40 bg-card/50 backdrop-blur-sm p-6">
                <h2 className="text-xl font-semibold mb-4">{d.instructions.title}</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                    <p className="text-sm">{d.instructions.english}</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-md">
                    <p className="text-sm">{d.instructions.chinese}</p>
                  </div>
                </div>
              </Card>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card className="border-border/40 bg-card/50 backdrop-blur-sm p-6">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{d.form.name} *</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{d.form.email} *</FormLabel>
                                <FormControl>
                                  <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{d.form.phone}</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{d.form.experience} *</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select years of experience" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {experienceOptions.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option} years
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Skills */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">{d.form.skills} *</h3>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a skill..."
                              value={skillInput}
                              onChange={(e) => setSkillInput(e.target.value)}
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addSkill();
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              variant="secondary"
                              onClick={addSkill}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {d.form.addSkill}
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <Badge 
                                key={skill} 
                                variant="secondary"
                                className="py-1.5 pl-2 pr-1 flex items-center gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:hover:bg-emerald-800"
                              >
                                {skill}
                                <button
                                  type="button"
                                  className="ml-1 rounded-full p-0.5 hover:bg-emerald-200 dark:hover:bg-emerald-800"
                                  onClick={() => removeSkill(skill)}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                            {skills.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                No skills added yet. Please add at least one skill.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Education & Languages */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="education"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{d.form.education}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Bachelor's Degree in Computer Science, University of Example, 2020"
                                  {...field}
                                  className="resize-none h-24"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div>
                          <FormLabel>{d.form.languages} *</FormLabel>
                          <div className="space-y-2 mt-2">
                            {languageOptions.map((language) => (
                              <div key={language} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`language-${language}`}
                                  checked={form.watch("languages").includes(language)}
                                  onChange={(e) => {
                                    let currentLangs = form.watch("languages");
                                    if (e.target.checked) {
                                      form.setValue("languages", [...currentLangs, language]);
                                    } else {
                                      form.setValue(
                                        "languages",
                                        currentLangs.filter((lang) => lang !== language)
                                      );
                                    }
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label htmlFor={`language-${language}`} className="text-sm">
                                  {language}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Job Preferences */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">{d.form.jobPreferences}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="remoteWork"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    {d.form.remoteOption}
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="relocation"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    {d.form.relocationOption}
                                  </FormLabel>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="salaryExpectations"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>{d.form.salaryExpectations}</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g., $60,000 - $80,000 per year" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* CV Upload (Optional) */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Upload CV (Optional)</h3>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                          file:rounded-md file:border-0 file:text-sm file:font-semibold
                          file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100
                          dark:file:bg-emerald-900/30 dark:file:text-emerald-400"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          {d.dropzone.formats}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="flex flex-col items-center gap-4">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        d.form.submit
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      {d.form.privacyNotice}
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </form>
              </Form>
            </motion.div>
          )}

          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <h2 className="text-2xl font-bold">{d.success.title}</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {d.success.subtitle}
              </p>
                <Button 
                className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
              >
                {d.success.cta}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
