import { docs, meta } from '@/.source'
import { DocsBody } from 'fumadocs-ui/page'
import { loader } from 'fumadocs-core/source'
import { createMDXSource } from 'fumadocs-mdx'
import { ThemeToggle } from '@/components/theme-toggle'
import { useMemo } from 'react'

// Create source object
const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
})

// Date formatting helper
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Type for changelog data
interface ChangelogData {
  title: string
  date: string
  version?: string
  tags?: string[]
  body: React.ComponentType
}

interface ChangelogPage {
  url: string
  data: ChangelogData
}

export default function HomePage() {
  // Get all pages and sort by date (newest first) - memoized for performance
  const sortedChangelogs = useMemo(() => {
    const allPages = source.getPages() as ChangelogPage[]
    return allPages.sort((a, b) => {
      const dateA = new Date(a.data.date).getTime()
      const dateB = new Date(b.data.date).getTime()
      return dateB - dateA
    })
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background border */}
      <div className="absolute max-w-5xl left-1/2 -translate-x-1/2 w-full h-full border-x border-border" />

      {/* Header */}
      <div className="border-b border-border/50">
        <div className="max-w-5xl mx-auto relative">
          <div className="p-3 flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Changelog</h1>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-10">
        <div className="relative">
          {sortedChangelogs.map((changelog) => {
            const MDX = changelog.data.body
            const date = new Date(changelog.data.date)
            const formattedDate = formatDate(date)

            return (
              <div key={changelog.url} className="relative">
                <div className="flex flex-col md:flex-row gap-y-6">
                  {/* Left side - Date and Version (Sticky) */}
                  <div className="md:w-48 flex-shrink-0">
                    <div className="md:sticky md:top-8">
                      {/* Vertical gradient line */}
                      <div className="hidden lg:block absolute top-2 -right-[0.5px] w-px h-48 bg-gradient-to-b from-transparent via-primary to-transparent" />

                      <time className="text-sm font-medium text-muted-foreground block mb-3">
                        {formattedDate}
                      </time>

                      {changelog.data.version && (
                        <div className="inline-flex relative z-10 items-center justify-center w-10 h-10 bg-foreground text-background rounded-lg text-sm font-bold">
                          {changelog.data.version}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 md:pl-8 relative pb-10">
                    {/* Vertical timeline line */}
                    <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-primary/30" />

                    <div className="space-y-6">
                      <div className="relative z-10 flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-balance">
                          {changelog.data.title}
                        </h2>

                        {/* Timeline dot */}
                        <div className="hidden md:block absolute top-2 -left-10 w-4 h-4 bg-primary rounded-full z-10" />

                        {/* Tags */}
                        {changelog.data.tags && changelog.data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {changelog.data.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                        <DocsBody>
                          <MDX />
                        </DocsBody>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
