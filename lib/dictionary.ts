// Simple dictionary implementation without dynamic imports
// to avoid chunk loading issues
const dictionaries: Record<string, any> = {
  en: {
    navbar: {
      findJobs: "Find Jobs",
      companies: "Companies",
      resources: "Resources",
      about: "About",
      myProfile: "My Profile",
      uploadCV: "Upload CV"
    },
    footer: {
      termsOfService: "Terms of Service",
      privacy: "Privacy",
      cookies: "Cookies",
      copyright: "© {year} Huntier Inc. All rights reserved.",
      description: "AI-powered job matching platform helping professionals find their perfect career match.",
      services: "Services",
      jobSearch: "Job Search",
      careerGuidance: "Career Guidance",
      skillAssessment: "Skill Assessment",
      resumeBuilder: "Resume Builder",
      company: "Company",
      aboutUs: "About Us",
      careers: "Careers",
      press: "Press",
      blog: "Blog",
      legal: "Legal",
      licensing: "Licensing",
      sitemap: "Sitemap",
      accessibility: "Accessibility",
      doNotSell: "Do Not Sell My Info",
      social: {
        twitter: "Twitter",
        linkedin: "LinkedIn",
        instagram: "Instagram",
        github: "GitHub"
      }
    },
    languageToggle: {
      english: "English",
      chinese: "中文 (Chinese)"
    },
    home: {
      title: "Find Your Dream Job with",
      titleHighlight: "AI-Powered",
      titleEnd: "Matching",
      subtitle: "Huntier uses advanced AI to match your skills and preferences with the perfect job opportunities. Get personalized recommendations and apply with confidence.",
      findJobsButton: "Find Jobs",
      viewProfileButton: "View My Profile",
      feature1: "AI-Powered Matching",
      feature2: "10,000+ Jobs",
      feature3: "Free to Use"
    },
    resources: {
      title: "Career Resources",
      subtitle: "Enhance your career with our curated collection of resources, guides, and tools",
      searchPlaceholder: "Search resources...",
      categories: {
        all: "All Resources",
        articles: "Articles",
        videos: "Videos",
        tools: "Tools",
        guides: "Guides"
      },
      featured: "Featured Resource",
      popular: "Popular Resources",
      newContent: "New Content",
      readMore: "Read More",
      watchNow: "Watch Now",
      tryNow: "Try Now",
      saveButton: "Save",
      savedButton: "Saved",
      relatedResources: "Related Resources",
      shareResource: "Share Resource",
      filterByTopic: "Filter by Topic",
      browseByTopic: "Browse by Topic",
      browseByCategory: "Browse by Category",
      searchResults: "Search Results",
      noResults: "No matching resources found",
      adjustSearch: "Try adjusting your search or filters",
      clearFilters: "Clear all filters"
    },    uploadcv: {
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
      linkedin: {
        title: "Import from LinkedIn",
        placeholder: "Paste your LinkedIn profile URL",
        button: "Import Profile"
      },
      processing: {
        title: "Analyzing your CV",
        subtitle: "Our AI is extracting your skills, experience, and preferences"
      },
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
        submit: "Save Resume",
        privacyNotice: "By submitting, you agree to our Terms and Privacy Policy"
      },
      success: {
        title: "CV Uploaded Successfully!",
        subtitle: "We'll analyze your profile and match you with relevant opportunities",
        cta: "View matching jobs"
      },
      error: {
        generic: "Something went wrong. Please try again.",
        fileSize: "File is too large. Maximum size is 5MB.",
        fileType: "Invalid file type. Please upload a PDF or DOCX file.",
        emptyFields: "Please fill in all required fields."
      }
    },
    about: {
      established: "Established 2020",
      ourMission: "Our Mission",
      missionStatement: "To connect talent with opportunity through AI-driven semantic matching that considers not just skills, but values, goals, and potential using next-generation vectorized technology.",
      partnerWithUs: "Partner with Us",
      stats: {
        matchAccuracy: "Match Accuracy",
        fasterHiring: "Faster Hiring",
        happyUsers: "Happy Users"
      },
      aiPoweredMatching: "AI-Powered Matching",
      semanticSearch: "Semantic search technology",
      ourStory: "Our Story",
      storyTitle: "Transforming How People Find Their Dream Jobs",
      storyDescription: "Founded in 2020, Huntier was created to solve a fundamental problem: traditional job boards weren't matching people with opportunities that truly fit their skills, values, and potential.",
      problem: {
        title: "The Problem",
        description: "The job market was filled with inefficient keyword matching that missed context and nuance. Candidates struggled to find fitting roles, and companies missed out on ideal talent. Traditional hiring processes were outdated, biased, and lacked semantic understanding."
      },
      solution: {
        title: "Our Solution",
        description: "We built a next-generation AI platform using advanced vectorized matching and semantic search that understands the true meaning behind skills, experiences, and job requirements to create perfect connections between job seekers and employers."
      },
      impact: {
        title: "The Impact",
        description: "Today, Huntier has helped over 1 million people find jobs they love with a 94% satisfaction rate. Our AI-powered interviews and avatars have saved companies thousands of hours in recruitment, resulting in better matches and 35% higher retention rates."
      },
      featuredTechnology: "Featured Technology",
      avatarTitle: "AI-Driven Avatars for Interviews",
      avatarDescription: "Our newest technology creates lifelike AI avatars that conduct initial screening interviews, allowing candidates to practice and prepare in a stress-free environment while helping employers identify the best matches efficiently.",
      learnMore: "Learn More",
      aiAvatarTechnology: "AI Avatar Technology Preview",
      ourValues: "Our Values",
      valuesDescription: "The principles that guide everything we do at Huntier.",
      values: {
        empowering: {
          title: "Empowering Job Seekers",
          description: "We believe in giving job seekers the tools and information they need to make confident career decisions."
        },
        accessible: {
          title: "Accessible to All",
          description: "We're committed to making career opportunities accessible to everyone, regardless of background or experience."
        },
        innovative: {
          title: "Innovation-Driven",
          description: "We continuously push the boundaries of what's possible in job matching through AI and technology."
        },
        community: {
          title: "Community-Focused",
          description: "We build stronger career communities by connecting like-minded professionals and supporting knowledge sharing."
        }
      },
      ourTeam: "Our Team",
      teamDescription: "Meet the talented people behind Huntier.",
      joinUs: "Join the Future of Job Matching",
      joinUsDescription: "Huntier is growing rapidly, and we're always looking for talented individuals to join our mission.",
      benefits: {
        impactful: {
          title: "Impactful Work",
          description: "Your work directly helps people find fulfilling careers and companies build stronger teams."
        },
        culture: {
          title: "Innovation-First Culture",
          description: "We're at the cutting edge of AI and job-matching technology, constantly exploring new ideas."
        },
        growth: {
          title: "Growth Opportunities",
          description: "A fast-growing company means plenty of opportunities to develop your skills and advance your career."
        },
        remote: {
          title: "Remote-First",
          description: "Work from anywhere with flexible arrangements that prioritize your well-being and productivity."
        }
      },
      viewPositions: "View Open Positions",
      backedBy: "Backed by Leading Investors",
      featuredIn: "Featured In"
    }
  },
  zh: {
    navbar: {
      findJobs: "寻找工作",
      companies: "公司",
      resources: "资源",
      about: "关于我们",
      myProfile: "我的简历",
      uploadCV: "上传简历"
    },
    footer: {
      termsOfService: "服务条款",
      privacy: "隐私政策",
      cookies: "Cookie 政策",
      copyright: "© {year} Huntier Inc. 保留所有权利。",
      description: "AI驱动的求职匹配平台，帮助专业人士找到完美的职业匹配。",
      services: "服务",
      jobSearch: "职位搜索",
      careerGuidance: "职业指导",
      skillAssessment: "技能评估",
      resumeBuilder: "简历构建器",
      company: "公司",
      aboutUs: "关于我们",
      careers: "招聘信息",
      press: "媒体报道",
      blog: "博客",
      legal: "法律",
      licensing: "授权",
      sitemap: "网站地图",
      accessibility: "无障碍访问",
      doNotSell: "请勿出售我的信息",
      social: {
        twitter: "推特",
        linkedin: "领英",
        instagram: "Instagram",
        github: "GitHub"
      }
    },
    languageToggle: {
      english: "English",
      chinese: "中文"
    },
    home: {
      title: "通过",
      titleHighlight: "AI 驱动",
      titleEnd: "匹配找到理想工作",
      subtitle: "Huntier 使用先进的人工智能技术，将您的技能和偏好与完美的工作机会相匹配。获取个性化推荐，自信申请。",
      findJobsButton: "寻找工作",
      viewProfileButton: "查看我的简历",
      feature1: "AI 驱动匹配",
      feature2: "10,000+ 个工作",
      feature3: "免费使用"
    },
    resources: {
      title: "职业资源",
      subtitle: "通过我们精心策划的资源、指南和工具提升您的职业生涯",
      searchPlaceholder: "搜索资源...",
      categories: {
        all: "所有资源",
        articles: "文章",
        videos: "视频",
        tools: "工具",
        guides: "指南"
      },
      featured: "精选资源",
      popular: "热门资源",
      newContent: "最新内容",
      readMore: "阅读更多",
      watchNow: "立即观看",
      tryNow: "立即尝试",
      saveButton: "保存",
      savedButton: "已保存",
      relatedResources: "相关资源",
      shareResource: "分享资源",
      filterByTopic: "按主题筛选",
      browseByTopic: "按主题浏览",
      browseByCategory: "按类别浏览",
      searchResults: "搜索结果",
      noResults: "未找到匹配的资源",
      adjustSearch: "请调整您的搜索或筛选条件",
      clearFilters: "清除所有筛选"
    },    uploadcv: {
      title: "上传您的简历",
      subtitle: "让我们的AI分析您的技能并匹配最适合您的工作机会",
      instructions: {
        title: "使用说明",
        english: "Please complete the form below with your professional information.",
        chinese: "请在下面表格中填写您的专业信息。"
      },
      dropzone: {
        title: "将简历拖放到这里",
        subtitle: "或点击浏览文件",
        formats: "支持的格式：PDF、DOCX（最大5MB）",
        dragActive: "松开鼠标上传"
      },
      or: "或者",
      linkedin: {
        title: "从领英导入",
        placeholder: "粘贴您的领英个人资料网址",
        button: "导入个人资料"
      },
      processing: {
        title: "正在分析您的简历",
        subtitle: "我们的AI正在提取您的技能、经验和偏好"
      },
      form: {
        name: "全名",
        email: "电子邮件地址",
        phone: "电话号码",
        skills: "技能",
        addSkill: "添加技能",
        experience: "工作经验年限",
        education: "教育背景",
        languages: "语言能力",
        jobPreferences: "工作偏好",
        remoteOption: "接受远程工作",
        relocationOption: "接受异地工作",
        salaryExpectations: "期望薪资",
        submit: "查找匹配的工作",
        privacyNotice: "提交即表示您同意我们的条款和隐私政策"
      },
      success: {
        title: "简历上传成功！",
        subtitle: "我们将分析您的个人资料并匹配相关机会",
        cta: "查看匹配的工作"
      },
      error: {
        generic: "出了点问题。请重试。",
        fileSize: "文件太大。最大大小为5MB。",
        fileType: "无效的文件类型。请上传PDF或DOCX文件。",
        emptyFields: "请填写所有必填字段。"
      }
    },
    about: {
      established: "成立于2020年",
      ourMission: "我们的使命",
      missionStatement: "通过AI驱动的语义匹配连接人才与机会，不仅考虑技能，还考虑价值观、目标和潜力，使用下一代向量化技术。",
      partnerWithUs: "与我们合作",
      stats: {
        matchAccuracy: "匹配准确度",
        fasterHiring: "招聘速度提升",
        happyUsers: "满意用户"
      },
      aiPoweredMatching: "AI驱动匹配",
      semanticSearch: "语义搜索技术",
      ourStory: "我们的故事",
      storyTitle: "改变人们寻找理想工作的方式",
      storyDescription: "Huntier成立于2020年，旨在解决一个根本性问题：传统招聘网站无法将人才与真正契合其技能、价值观和潜力的机会相匹配。",
      problem: {
        title: "问题",
        description: "就业市场充斥着低效的关键词匹配，忽略了上下文和细微差别。求职者难以找到适合的岗位，企业也错过了理想人才。传统招聘流程已经过时，存在偏见，缺乏语义理解。"
      },
      solution: {
        title: "我们的解决方案",
        description: "我们构建了一个下一代AI平台，使用先进的向量化匹配和语义搜索，理解技能、经验和职位要求背后的真正含义，为求职者和雇主创造完美连接。"
      },
      impact: {
        title: "影响",
        description: "如今，Huntier已帮助超过100万人找到他们喜爱的工作，满意率达94%。我们的AI驱动面试和虚拟形象为公司节省了数千小时的招聘时间，带来更好的匹配和35%更高的留任率。"
      },
      featuredTechnology: "特色技术",
      avatarTitle: "AI驱动的面试虚拟形象",
      avatarDescription: "我们最新的技术创建了逼真的AI虚拟形象，进行初步筛选面试，让候选人能在无压力的环境中练习和准备，同时帮助雇主高效识别最佳匹配。",
      learnMore: "了解更多",
      aiAvatarTechnology: "AI虚拟形象技术预览",
      ourValues: "我们的价值观",
      valuesDescription: "指导Huntier一切工作的原则。",
      values: {
        empowering: {
          title: "赋能求职者",
          description: "我们相信为求职者提供必要的工具和信息，使他们能够自信地做出职业决策。"
        },
        accessible: {
          title: "人人可及",
          description: "我们致力于让职业机会对所有人开放，无论背景或经验如何。"
        },
        innovative: {
          title: "创新驱动",
          description: "我们通过AI和技术不断突破职位匹配领域的可能性边界。"
        },
        community: {
          title: "社区为本",
          description: "我们通过连接志同道合的专业人士并支持知识共享，构建更强大的职业社区。"
        }
      },
      ourTeam: "我们的团队",
      teamDescription: "认识Huntier背后的优秀人才。",
      joinUs: "加入未来的职位匹配",
      joinUsDescription: "Huntier正在快速发展，我们始终寻找有才华的个人加入我们的使命。",
      benefits: {
        impactful: {
          title: "有影响力的工作",
          description: "您的工作直接帮助人们找到充实的职业，帮助公司建立更强大的团队。"
        },
        culture: {
          title: "创新优先的文化",
          description: "我们处于AI和职位匹配技术的前沿，不断探索新想法。"
        },
        growth: {
          title: "成长机会",
          description: "快速成长的公司意味着有大量机会发展您的技能和推进职业发展。"
        },
        remote: {
          title: "远程优先",
          description: "灵活的工作安排，让您可以在任何地方工作，优先考虑您的福祉和生产力。"
        }
      },
      viewPositions: "查看空缺职位",
      backedBy: "领先投资者支持",
      featuredIn: "媒体报道"
    }
  }
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale] || dictionaries.en;
}