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
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  skills: z.array(z.string()).min(1, { message: "Add at least one skill." }),
  experience: z.string(),
  education: z.string().optional(),
  languages: z.array(z.string()).min(1, { message: "Add at least one language." }),
  remoteWork: z.boolean(),
  relocation: z.boolean(),
  salaryExpectations: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const experienceOptions = [
  "0-1", "1-2", "2-3", "3-5", "5-7", "7-10", "10+"
];

const languageOptions = [
  "English", "Chinese", "Spanish", "French", "German", 
  "Japanese", "Korean", "Russian", "Arabic", "Portuguese"
];

export function UploadCVClient({ dictionary, lang }: UploadCVClientProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const d = dictionary.uploadcv;
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

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
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
    setSelectedFile(file);
    
    // Simulate processing
    processFile(file);
  };

  const processFile = (file: File) => {
    setIsProcessing(true);
    
    // Simulate AI processing the file
    setTimeout(() => {
      setIsProcessing(false);
      setShowForm(true);
      
      // Pre-fill form with mock extracted data
      form.setValue("name", "Alex Johnson");
      form.setValue("email", "alex.johnson@example.com");
      form.setValue("skills", ["React", "JavaScript", "TypeScript", "CSS"]);
      setSkills(["React", "JavaScript", "TypeScript", "CSS"]);
    }, 3000);
  };

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedinUrl(e.target.value);
  };

  const importLinkedIn = () => {
    if (!linkedinUrl.includes('linkedin.com/')) {
      setError('Please enter a valid LinkedIn URL');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowForm(true);
      
      // Pre-fill form with mock extracted data
      form.setValue("name", "Alex Johnson");
      form.setValue("email", "alex.johnson@example.com");
      form.setValue("skills", ["React", "JavaScript", "TypeScript", "CSS"]);
      setSkills(["React", "JavaScript", "TypeScript", "CSS"]);
    }, 3000);
  };

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
  };  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsProcessing(true);
    
    // Simulate submitting the form
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      console.log(data);
    }, 2000);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 inline-block">
            {d.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {d.subtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showForm && !isProcessing && !isSuccess && (
            <motion.div
              key="upload-options"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm">
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer relative",
                    isDragging
                      ? "border-emerald-400 bg-emerald-50/50 dark:border-emerald-500/50 dark:bg-emerald-950/10"
                      : "border-border bg-background/50 hover:bg-background/80 dark:hover:bg-background/10"
                  )}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileInputChange}
                  />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    
                    <h3 className="text-xl font-semibold">
                      {isDragging ? d.dropzone.dragActive : d.dropzone.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {d.dropzone.subtitle}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {d.dropzone.formats}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex items-center gap-4">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-muted-foreground text-sm font-medium">{d.or}</span>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <Card className="border-border/40 bg-card/50 backdrop-blur-sm p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{d.linkedin.title}</h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      placeholder={d.linkedin.placeholder}
                      className="flex-1"
                      value={linkedinUrl}
                      onChange={handleLinkedInChange}
                    />
                    <Button 
                      onClick={importLinkedIn}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {d.linkedin.button}
                    </Button>
                  </div>
                </div>
              </Card>

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
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut" 
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    delay: 0.6,
                    ease: "easeInOut" 
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{d.processing.title}</h3>
              <p className="text-muted-foreground text-center max-w-md">
                {d.processing.subtitle}
              </p>
              
              <div className="mt-8 flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-muted-foreground">Please wait...</span>
              </div>
            </motion.div>
          )}

          {showForm && !isSuccess && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{d.form.name}</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>{d.form.email}</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} />
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
                            <FormLabel>{d.form.experience}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {experienceOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option} {option === "10+" ? "" : "years"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem>
                          <FormLabel>{d.form.skills}</FormLabel>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                placeholder="React, JavaScript, etc."
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
                                onClick={addSkill}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                {d.form.addSkill}
                              </Button>
                            </div>
                            
                            {skills.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2">
                                {skills.map((skill) => (
                                  <Badge 
                                    key={skill} 
                                    variant="secondary"
                                    className="flex items-center gap-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/50"
                                  >
                                    {skill}
                                    <button
                                      type="button"
                                      onClick={() => removeSkill(skill)}
                                      className="rounded-full hover:bg-emerald-300/20 ml-1"
                                    >
                                      <X className="h-3 w-3" />
                                      <span className="sr-only">Remove</span>
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{d.form.education}</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Bachelor's in Computer Science, University of California, 2018-2022"
                              className="resize-none"
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{d.form.languages}</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              const currentLangs = field.value || [];
                              if (!currentLangs.includes(value)) {
                                field.onChange([...currentLangs, value]);
                              }
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Add a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languageOptions.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {field.value && field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {field.value.map((language) => (
                                <Badge 
                                  key={language} 
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {language}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filtered = field.value.filter(
                                        (lang) => lang !== language
                                      );
                                      field.onChange(filtered);
                                    }}
                                    className="rounded-full hover:bg-muted ml-1"
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove</span>
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <h3 className="font-medium mb-3">{d.form.jobPreferences}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="remote-work">{d.form.remoteOption}</Label>
                          </div>
                          <FormField
                            control={form.control}
                            name="remoteWork"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="remote-work"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="relocation">{d.form.relocationOption}</Label>
                          </div>
                          <FormField
                            control={form.control}
                            name="relocation"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="relocation"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="salaryExpectations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{d.form.salaryExpectations}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. $80,000 - $100,000" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <p className="text-xs text-muted-foreground mb-6">
                        {d.form.privacyNotice}
                      </p>
                      
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white"
                        size="lg"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {d.form.submit}
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </motion.div>
          )}

          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-6 flex items-center justify-center"
              >
                <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-3">{d.success.title}</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {d.success.subtitle}
              </p>
              
              <Button 
                className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white"
                size="lg"
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
