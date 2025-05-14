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
    },
    footer: {
      termsOfService: "Terms of Service",
      privacy: "Privacy",
      cookies: "Cookies",
      copyright: "© {year} Huntier Inc. All rights reserved.",
    },
    languageToggle: {
      english: "English",
      chinese: "中文 (Chinese)",
    },
    home: {
      title: "Find Your Dream Job with",
      titleHighlight: "AI-Powered",
      titleEnd: "Matching",
      subtitle:
        "Huntier uses advanced AI to match your skills and preferences with the perfect job opportunities. Get personalized recommendations and apply with confidence.",
      findJobsButton: "Find Jobs",
      viewProfileButton: "View My Profile",
      feature1: "AI-Powered Matching",
      feature2: "10,000+ Jobs",
      feature3: "Free to Use",
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
      filterByTopic: "Filter by Topic"
    },
  },
  zh: {
    navbar: {
      findJobs: "寻找工作",
      companies: "公司",
      resources: "资源",
      about: "关于我们",
      myProfile: "我的简历",
    },
    footer: {
      termsOfService: "服务条款",
      privacy: "隐私政策",
      cookies: "Cookie 政策",
      copyright: "© {year} Huntier Inc. 保留所有权利。",
    },
    languageToggle: {
      english: "English",
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
      filterByTopic: "按主题筛选"
    },
      chinese: "中文",
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
      feature3: "免费使用",
    },
  },
}

export const getDictionary = (locale: string) => {
  return dictionaries[locale] || dictionaries.en
}
