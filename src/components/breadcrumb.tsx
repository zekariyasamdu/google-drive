"use client"

import { Button } from "~/components/ui/button"

interface BreadcrumbItem {
  id: string
  name: string
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[]
  onNavigate: (folderId: string) => void
}

export default function Breadcrumb({ breadcrumbs, onNavigate }: BreadcrumbProps) {
  return (
    <div className="border-b border-border bg-card px-6 py-3 flex items-center gap-2">
      {breadcrumbs.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-secondary"
            onClick={() => onNavigate(item.id)}
          >
            {item.name}
          </Button>
          {index < breadcrumbs.length - 1 && (
            /* Replaced lucide-react ChevronRight icon with inline SVG */
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
