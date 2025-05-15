"use client";

import { useState, useRef, useEffect } from "react";
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
  Loader2,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,  Languages
} from "lucide-react";
import { USFlag as FlagUS, CNFlag as FlagCN } from "@/components/icons/flag-icons";
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
import { Slider } from "@/components/ui/slider";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedBackground } from "@/components/animated-background";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

interface EnhancedCVClientProps {
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

const educationLevelOptions = [
  "High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", 
  "PhD", "Vocational Training", "Professional Certification", "Other"
];

const locationOptions = [
  "Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Hangzhou", 
  "Chengdu", "Xi'an", "Nanjing", "Wuhan", "Tianjin", "Other"
];

export function EnhancedCVClient({ dictionary, lang }: EnhancedCVClientProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [languageInput, setLanguageInput] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);  const [certificationInput, setCertificationInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      salaryExpectations: "Salary Expectations (¥)",
      submit: "Save Resume",
      privacyNotice: "By submitting, you agree to our Terms and Privacy Policy"
    },    success: {
      title: "CV Uploaded Successfully!",
      subtitle: "We've analyzed your profile and enhanced your resume.",
      cta: "Save and Continue"
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
      firstName: "",
      lastName: "",
      chineseName: "",
      email: "",
      phone: "",
      location: "",
      skills: [],
      languages: ["English"],
      experience: "0-1",
      workHistory: [{ company: "", position: "", startDate: "", isCurrent: false }],
      educationLevel: "Bachelor's Degree",
      education: [{ degree: "", institution: "", graduationYear: "" }],
      certifications: [],
      projects: [{ name: "", description: "" }],
      remoteWork: true,
      relocation: false,
      salaryExpectations: 10000,
      additionalInfo: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
    },
  });

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control: form.control,
    name: "workHistory"
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education"
  });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: "projects"
  });
  // Effect to initialize state from form values and watch for changes
  useEffect(() => {
    console.log("Form skills at init:", form.getValues()?.skills);
    
    // Set initial default skill for the form if it doesn't have any
    if (!form.getValues()?.skills || form.getValues()?.skills.length === 0) {
      console.log("Setting initial default skills in the form");
      form.setValue("skills", []);
    }
    
    // Set the initial skills from form values
    const initialSkills = form.getValues()?.skills || [];
    setSkills(initialSkills);
    console.log("Initial skills state set:", initialSkills);
    
    // Watch for changes to skills in the form
    const subscription = form.watch((value) => {
      if (value.skills) {
        console.log("Skills updated in form:", value.skills);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const addSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      form.setValue("skills", newSkills);
      console.log("Updated skills:", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
    form.setValue("skills", newSkills);
    console.log("Updated skills after removal:", newSkills);
  };

  const addLanguage = () => {
    if (languageInput.trim() !== "" && !languages.includes(languageInput.trim())) {
      const newLanguages = [...languages, languageInput.trim()];
      setLanguages(newLanguages);
      form.setValue("languages", newLanguages);
      setLanguageInput("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    const newLanguages = languages.filter(language => language !== languageToRemove);
    setLanguages(newLanguages);
    form.setValue("languages", newLanguages);
  };

  const addCertification = () => {
    if (certificationInput.trim() !== "" && !certifications.includes(certificationInput.trim())) {
      const newCertifications = [...certifications, certificationInput.trim()];
      setCertifications(newCertifications);
      form.setValue("certifications", newCertifications);
      setCertificationInput("");
    }
  };

  const removeCertification = (certificationToRemove: string) => {
    const newCertifications = certifications.filter(cert => cert !== certificationToRemove);
    setCertifications(newCertifications);
    form.setValue("certifications", newCertifications);
  };  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form submission started");
    console.log("Form data:", JSON.stringify(data, null, 2));
    
    // Validate that we have at least one skill
    if (!data.skills || data.skills.length === 0) {
      console.error("Skills validation failed - no skills provided");
      setError("Please add at least one skill");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
      try {
      // Prepare applicant data with detailed structure matching the database schema
      const applicantData = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email.trim(),
        phone: data.phone || null,
        skills: Array.isArray(data.skills) ? data.skills.filter(Boolean) : [], 
        experience: data.experience || null,
        // Include work history if available
        workHistory: Array.isArray(data.workHistory) && data.workHistory.length > 0 
          ? data.workHistory.map(job => ({
              company: job.company,
              position: job.position,
              startDate: job.startDate,
              endDate: job.endDate || null,
              description: job.description || null,
              isCurrent: !!job.isCurrent
            }))
          : undefined,
        // Include education level and details
        educationLevel: data.educationLevel || null,
        education: Array.isArray(data.education) && data.education.length > 0
          ? data.education.map(edu => ({
              degree: edu.degree,
              institution: edu.institution,
              field: edu.field || null, 
              graduationYear: edu.graduationYear
            }))
          : undefined,
        languages: Array.isArray(data.languages) ? data.languages.filter(Boolean) : [],
        // Include additional profile links
        githubUrl: data.githubUrl || null,
        portfolioUrl: data.portfolioUrl || null,
        jobPreferences: {
          additionalInfo: data.additionalInfo || "",
          location: data.location || "",
          portfolioUrl: data.portfolioUrl || "",
          githubUrl: data.githubUrl || ""
        },
        remoteOption: !!data.remoteWork, // ensure boolean
        relocationOption: !!data.relocation, // ensure boolean
        salaryExpectations: data.salaryExpectations ? data.salaryExpectations.toString() : null,
        linkedinUrl: data.linkedinUrl || null
      };console.log("Sending data to API:", JSON.stringify(applicantData, null, 2));
      
      try {
        console.log("Calling API endpoint: /api/applicants");
        const response = await fetch('/api/applicants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicantData),
        });
        
        console.log("API Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! Status: ${response.status}`, errorText);
          setIsProcessing(false);
          setError(`Server error: ${response.status}. Please try again later.`);
          return;
        }
        
        // Parse response
        try {
          const result = await response.json();
          console.log("API Response data:", JSON.stringify(result, null, 2));
          
          if (result.success) {
            setIsProcessing(false);
            setIsSuccess(true);
            console.log("Application submitted successfully:", result.data?.id);
            
            // Log to confirm data was saved to database
            console.log("Database record ID:", result.data?.id);
            console.log("Database record created:", result.data?.createdAt || result.data?.created_at);
            
            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Clear form after successful submission
            form.reset();
          } else {
            setIsProcessing(false);
            const errorMessage = result.error || dictionary.uploadcv.error.generic;
            setError(errorMessage);
            console.error('Error from API:', errorMessage);
          }
        } catch (parseError) {
          console.error("Error parsing API response:", parseError);
          setIsProcessing(false);
          setError("Error parsing server response. Please try again.");
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        setIsProcessing(false);
        setError("Network error, please try again.");
      }
    } catch (error) {
      console.error('Unexpected error during form submission:', error);
      setIsProcessing(false);
      setError(dictionary.uploadcv.error.generic);
    }
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

  const formatMoney = (value: number): string => {
    return `¥${value.toLocaleString()}`;
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
          {!isSuccess && (            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-16">
                <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl"></div>
                <div className="absolute -top-8 right-0 w-32 h-32 rounded-full bg-blue-400/10 blur-3xl"></div>                <div className="text-center relative">
                  <div className="inline-block relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="absolute -top-10 -left-10 md:-left-16 w-16 h-16 md:w-24 md:h-24"
                    >
                      <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-400/30">
                        <path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                      </svg>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute -top-2 -right-4 md:-right-10 w-8 h-8"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 opacity-70 dark:opacity-50 animate-pulse"></div>
                    </motion.div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 tracking-tight">
                      {d.title}
                    </h1>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto relative">
                      <span className="relative inline-block">
                        <span className="relative z-10">{d.subtitle}</span>
                        <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/10 -z-10 rounded-lg"></span>
                      </span>
                    </p>
                  </motion.div>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card className="border-border/40 bg-card/50 backdrop-blur-sm p-6">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-emerald-500" />
                          Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="chineseName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Chinese Name (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="李明" {...field} />
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
                                  <Input placeholder="+86 123 4567 8910" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your location" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {locationOptions.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="linkedinUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Linkedin className="h-4 w-4 text-blue-600" />
                                  LinkedIn
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="https://linkedin.com/in/..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="githubUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Github className="h-4 w-4" />
                                  GitHub
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="https://github.com/..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="portfolioUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-emerald-600" />
                                  Portfolio
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="https://myportfolio.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Skills */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-amber-400" />
                          {d.form.skills} *
                        </h3>
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
                              variant="outline"
                              onClick={addSkill}
                              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              {d.form.addSkill}
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (                              <Badge 
                                key={skill} 
                                variant="secondary"
                                className="py-1.5 pl-3 pr-2 flex items-center gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-800/60"
                              >
                                {skill}
                                <span
                                  role="button"
                                  tabIndex={0}
                                  className="ml-1 rounded-full p-0.5 hover:bg-emerald-200 dark:hover:bg-emerald-800 cursor-pointer"
                                  onClick={() => removeSkill(skill)}
                                  onKeyDown={(e) => e.key === 'Enter' && removeSkill(skill)}
                                >
                                  <X className="h-3 w-3" />
                                </span>
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
                      
                      {/* Languages */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Languages className="h-5 w-5 text-blue-500" />
                          {d.form.languages} *
                        </h3>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a language..."
                              value={languageInput}
                              onChange={(e) => setLanguageInput(e.target.value)}
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addLanguage();
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={addLanguage}
                              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Language
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {languages.map((language) => (                              <Badge 
                                key={language} 
                                variant="secondary"
                                className="py-1.5 pl-3 pr-2 flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:hover:bg-blue-800/60"
                              >
                                {language}
                                <span
                                  role="button"
                                  tabIndex={0}
                                  className="ml-1 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer"
                                  onClick={() => removeLanguage(language)}
                                  onKeyDown={(e) => e.key === 'Enter' && removeLanguage(language)}
                                >
                                  <X className="h-3 w-3" />
                                </span>
                              </Badge>
                            ))}
                            {languages.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                No languages added yet. Please add at least one language.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Experience */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-indigo-500" />
                          Work Experience
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem className="mb-6">
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
                        
                        <div className="space-y-4">
                          <Accordion type="single" collapsible className="w-full">
                            {workFields.map((field, index) => (
                              <AccordionItem value={`work-${index}`} key={field.id} className="border rounded-md px-4 py-2 border-muted">
                                <AccordionTrigger className="py-2 hover:no-underline">
                                  <div className="flex justify-between w-full items-center">
                                    <div className="text-left">
                                      <span className="font-medium">
                                        {form.watch(`workHistory.${index}.position`) || "New Position"}
                                      </span>
                                      <span className="text-muted-foreground ml-2">
                                        {form.watch(`workHistory.${index}.company`) && `at ${form.watch(`workHistory.${index}.company`)}`}
                                      </span>
                                    </div>
                                    {index > 0 && (
                                      <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon"
                                        className="ml-auto h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeWork(index);
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                                    <FormField
                                      control={form.control}
                                      name={`workHistory.${index}.company`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Company</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="Company name" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`workHistory.${index}.position`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Position</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="Job title" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`workHistory.${index}.startDate`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Start Date</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="MM/YYYY" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`workHistory.${index}.isCurrent`}
                                      render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-3">
                                          <div className="space-y-0.5">
                                            <FormLabel>Current Position</FormLabel>
                                            <FormDescription className="text-xs">
                                              Is this your current job?
                                            </FormDescription>
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
                                    
                                    {!form.watch(`workHistory.${index}.isCurrent`) && (
                                      <FormField
                                        control={form.control}
                                        name={`workHistory.${index}.endDate`}
                                        render={({ field }) => (
                                          <FormItem className="md:col-span-2">
                                            <FormLabel>End Date</FormLabel>
                                            <FormControl>
                                              <Input {...field} placeholder="MM/YYYY" />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    )}
                                    
                                    <FormField
                                      control={form.control}
                                      name={`workHistory.${index}.description`}
                                      render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                          <FormLabel>Description</FormLabel>
                                          <FormControl>
                                            <Textarea 
                                              {...field} 
                                              placeholder="Describe your responsibilities, achievements, and skills used"
                                              className="min-h-[100px] resize-none"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => appendWork({
                              company: "",
                              position: "",
                              startDate: "",
                              endDate: "",
                              description: "",
                              isCurrent: false
                            })}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Work Experience
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Education */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-purple-500" />
                          {d.form.education}
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="educationLevel"
                          render={({ field }) => (
                            <FormItem className="mb-6">
                              <FormLabel>Highest Education Level *</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your highest education level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {educationLevelOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-4">
                          <Accordion type="single" collapsible className="w-full">
                            {educationFields.map((field, index) => (
                              <AccordionItem value={`education-${index}`} key={field.id} className="border rounded-md px-4 py-2 border-muted">
                                <AccordionTrigger className="py-2 hover:no-underline">
                                  <div className="flex justify-between w-full items-center">
                                    <div className="text-left">
                                      <span className="font-medium">
                                        {form.watch(`education.${index}.degree`) || "New Degree"}
                                      </span>
                                      <span className="text-muted-foreground ml-2">
                                        {form.watch(`education.${index}.institution`) && `at ${form.watch(`education.${index}.institution`)}`}
                                      </span>
                                    </div>
                                    {index > 0 && (
                                      <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon"
                                        className="ml-auto h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeEducation(index);
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                                    <FormField
                                      control={form.control}
                                      name={`education.${index}.degree`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Degree</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="Bachelor of Science" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`education.${index}.institution`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Institution</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="University name" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`education.${index}.field`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Field of Study</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="e.g., Computer Science" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    
                                    <FormField
                                      control={form.control}
                                      name={`education.${index}.graduationYear`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Graduation Year</FormLabel>
                                          <FormControl>
                                            <Input {...field} placeholder="YYYY" />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => appendEducation({
                              degree: "",
                              institution: "",
                              field: "",
                              graduationYear: ""
                            })}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Education
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Certifications */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-amber-500" />
                          Certifications & Licenses
                        </h3>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a certification..."
                              value={certificationInput}
                              onChange={(e) => setCertificationInput(e.target.value)}
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addCertification();
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={addCertification}
                              className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/30"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Certification
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {certifications.map((cert) => (                              <Badge 
                                key={cert} 
                                variant="secondary"
                                className="py-1.5 pl-3 pr-2 flex items-center gap-1 bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:hover:bg-amber-800/60"
                              >
                                {cert}
                                <span
                                  role="button"
                                  tabIndex={0}
                                  className="ml-1 rounded-full p-0.5 hover:bg-amber-200 dark:hover:bg-amber-800 cursor-pointer"
                                  onClick={() => removeCertification(cert)}
                                  onKeyDown={(e) => e.key === 'Enter' && removeCertification(cert)}
                                >
                                  <X className="h-3 w-3" />
                                </span>
                              </Badge>
                            ))}
                            {certifications.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                No certifications added yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Job Preferences */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-rose-500" />
                          {d.form.jobPreferences}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="salaryExpectations"
                          render={({ field: { value, onChange } }) => (
                            <FormItem className="space-y-6">
                              <div className="space-y-1">
                                <FormLabel>{d.form.salaryExpectations}</FormLabel>
                                <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                                  {formatMoney(value)}
                                </span>
                              </div>
                              
                              <FormControl>
                                <Slider
                                  min={5000}
                                  max={100000}
                                  step={1000}
                                  defaultValue={[value]}
                                  onValueChange={(vals) => onChange(vals[0])}
                                  className="w-full"
                                />
                              </FormControl>
                              
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>¥5,000</span>
                                <span>¥50,000</span>
                                <span>¥100,000</span>
                              </div>
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      {/* Additional Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                        <FormField
                          control={form.control}
                          name="additionalInfo"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  placeholder="Add any other information you'd like employers to know about you..."
                                  {...field}
                                  className="min-h-[120px] resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Separator />
                      
                      {/* CV Upload (Optional) */}
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Upload className="h-5 w-5 text-indigo-500" />
                          Upload CV (Optional)
                        </h3>
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
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          {d.form.submit}
                        </>
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
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto"
              >
                <Check className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              
              <h2 className="text-3xl font-bold">{d.success.title}</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {d.success.subtitle}
              </p>
              
              <Button 
                className="mt-8 px-8 py-6 text-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600"
                size="lg"
              >
                {d.success.cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
