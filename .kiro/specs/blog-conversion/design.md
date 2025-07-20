# 设计文档

## 概述

将现有的变更日志模板转换为功能完整的博客系统，保持其优雅的时间线设计、深色模式支持和响应式布局特色。新的博客系统将基于现有的 Next.js 15 + Fumadocs + Tailwind CSS 技术栈，扩展功能以支持完整的博客体验。

## 架构

### 技术栈保持
- **框架**: Next.js 15 (App Router)
- **内容管理**: Fumadocs MDX
- **样式**: Tailwind CSS + shadcn/ui
- **主题**: next-themes
- **字体**: Geist Sans & Mono
- **TypeScript**: 完整类型安全

### 新增技术组件
- **搜索**: 基于 Flexsearch 的客户端搜索
- **RSS**: 使用 feed 库生成 RSS 2.0
- **SEO**: next-seo 增强 SEO 功能
- **图片优化**: Next.js Image 组件
- **代码高亮**: Prism.js 或 Shiki

### 目录结构设计

```
blog-system/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局
│   ├── page.tsx                 # 首页 (文章列表)
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx         # 单篇文章页面
│   │   └── page.tsx             # 博客列表页面
│   ├── categories/
│   │   ├── [category]/
│   │   │   └── page.tsx         # 分类页面
│   │   └── page.tsx             # 所有分类页面
│   ├── tags/
│   │   ├── [tag]/
│   │   │   └── page.tsx         # 标签页面
│   │   └── page.tsx             # 所有标签页面
│   ├── search/
│   │   └── page.tsx             # 搜索结果页面
│   ├── rss.xml/
│   │   └── route.ts             # RSS 路由
│   ├── sitemap.xml/
│   │   └── route.ts             # Sitemap 路由
│   └── robots.txt/
│       └── route.ts             # Robots.txt 路由
├── content/                      # 博客内容 (重命名自 changelog/content)
│   ├── posts/                   # 博客文章
│   └── pages/                   # 静态页面 (关于我们等)
├── components/
│   ├── blog/                    # 博客特定组件
│   │   ├── article-card.tsx     # 文章卡片
│   │   ├── article-header.tsx   # 文章头部
│   │   ├── article-content.tsx  # 文章内容
│   │   ├── article-footer.tsx   # 文章底部
│   │   ├── category-badge.tsx   # 分类徽章
│   │   ├── tag-list.tsx         # 标签列表
│   │   ├── search-box.tsx       # 搜索框
│   │   ├── pagination.tsx       # 分页组件
│   │   ├── related-posts.tsx    # 相关文章
│   │   └── share-buttons.tsx    # 分享按钮
│   ├── layout/                  # 布局组件
│   │   ├── header.tsx           # 网站头部
│   │   ├── footer.tsx           # 网站底部
│   │   ├── sidebar.tsx          # 侧边栏
│   │   └── navigation.tsx       # 导航菜单
│   ├── ui/                      # 现有 UI 组件 + 新增
│   └── ...                      # 现有组件
├── lib/
│   ├── blog.ts                  # 博客相关工具函数
│   ├── search.ts                # 搜索功能
│   ├── rss.ts                   # RSS 生成
│   ├── seo.ts                   # SEO 工具
│   └── ...                      # 现有工具
└── ...
```

## 组件和接口

### 核心数据模型

```typescript
// lib/types.ts
export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  lastModified?: string
  category: string
  tags: string[]
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  featured?: boolean
  draft?: boolean
  readingTime?: number
  coverImage?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface Category {
  slug: string
  name: string
  description?: string
  color?: string
  postCount: number
}

export interface Tag {
  slug: string
  name: string
  postCount: number
}

export interface SearchResult {
  post: BlogPost
  matches: {
    title?: string[]
    content?: string[]
  }
}
```

### 主要组件设计

#### 1. 文章列表组件 (ArticleList)
```typescript
interface ArticleListProps {
  posts: BlogPost[]
  showPagination?: boolean
  showCategories?: boolean
  showTags?: boolean
  layout?: 'timeline' | 'grid' | 'list'
}
```

#### 2. 搜索组件 (SearchBox)
```typescript
interface SearchBoxProps {
  placeholder?: string
  onSearch: (query: string) => void
  suggestions?: SearchResult[]
  showSuggestions?: boolean
}
```

#### 3. 分类/标签组件
```typescript
interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
}

interface TagListProps {
  tags: Tag[]
  selectedTags?: string[]
  onTagClick?: (tag: string) => void
}
```

## 数据模型

### MDX 前置元数据扩展

```yaml
---
title: "文章标题"
description: "文章描述"
date: "2025-01-20"
lastModified: "2025-01-21"
category: "技术"
tags: ["Next.js", "React", "TypeScript"]
author:
  name: "作者姓名"
  avatar: "/avatars/author.jpg"
featured: true
draft: false
coverImage: "/images/cover.jpg"
seo:
  title: "自定义 SEO 标题"
  description: "自定义 SEO 描述"
  keywords: ["关键词1", "关键词2"]
---
```

### 内容组织结构

```
content/
├── posts/
│   ├── 2025/
│   │   ├── 01/
│   │   │   ├── blog-conversion.mdx
│   │   │   └── nextjs-tips.mdx
│   │   └── 02/
│   └── categories.json          # 分类配置
├── pages/
│   ├── about.mdx
│   └── contact.mdx
└── config/
    ├── site.json               # 网站配置
    └── navigation.json         # 导航配置
```

## 错误处理

### 1. 内容加载错误
- 404 页面：文章不存在时显示友好的 404 页面
- 错误边界：使用 React Error Boundary 捕获组件错误
- 回退机制：搜索失败时显示默认内容

### 2. 搜索错误处理
```typescript
// lib/search.ts
export class SearchError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'SearchError'
  }
}

export const handleSearchError = (error: SearchError) => {
  switch (error.code) {
    case 'INDEX_NOT_FOUND':
      return '搜索索引未找到，请稍后重试'
    case 'QUERY_TOO_SHORT':
      return '搜索关键词至少需要2个字符'
    default:
      return '搜索出现错误，请稍后重试'
  }
}
```

### 3. RSS 生成错误
- 内容解析失败时跳过该文章
- 生成过程中的错误记录到日志
- 提供基础的 RSS 结构作为回退

## 测试策略

### 1. 单元测试
- **工具函数测试**: `lib/` 目录下的所有工具函数
- **组件测试**: 使用 React Testing Library 测试关键组件
- **数据处理测试**: MDX 解析、搜索功能、RSS 生成

### 2. 集成测试
- **页面渲染测试**: 确保所有页面正确渲染
- **路由测试**: 验证动态路由和静态路由
- **搜索功能测试**: 端到端搜索流程测试

### 3. 性能测试
- **Core Web Vitals**: LCP, FID, CLS 指标监控
- **图片优化测试**: 验证图片懒加载和优化
- **搜索性能测试**: 大量内容下的搜索响应时间

### 4. SEO 测试
- **Meta 标签验证**: 确保每个页面都有正确的 meta 标签
- **结构化数据测试**: 验证 JSON-LD 结构化数据
- **Sitemap 验证**: 确保 sitemap.xml 包含所有页面

## 性能优化策略

### 1. 静态生成优化
- 使用 `generateStaticParams` 预生成所有文章页面
- 分类和标签页面的静态生成
- 增量静态再生 (ISR) 用于内容更新

### 2. 搜索优化
- 客户端搜索索引的懒加载
- 搜索结果的虚拟滚动
- 搜索查询的防抖处理

### 3. 图片和资源优化
- Next.js Image 组件的自动优化
- 图片的懒加载和占位符
- 字体的预加载和优化

### 4. 缓存策略
- 静态资源的长期缓存
- API 路由的适当缓存头
- 客户端数据的内存缓存

## 迁移策略

### 1. 内容迁移
- 将 `changelog/content/` 重命名为 `content/posts/`
- 更新现有 MDX 文件的前置元数据格式
- 添加分类和更多标签信息

### 2. 组件重构
- 保持现有的时间线设计组件
- 扩展现有组件以支持新功能
- 添加新的博客特定组件

### 3. 配置更新
- 更新 `source.config.ts` 以支持新的内容结构
- 修改 `lib/site.ts` 配置以反映博客特性
- 更新 `package.json` 依赖项

### 4. 渐进式增强
- 第一阶段：基础博客功能 (文章列表、单篇文章)
- 第二阶段：分类和标签系统
- 第三阶段：搜索和 RSS 功能
- 第四阶段：SEO 优化和性能提升