"use client"

import { Button } from "~/components/ui/button"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  modified: string
  url?: string
}

interface FileGridProps {
  items: FileItem[]
  onFolderClick: (folderId: string) => void
}

export default function FileGrid({ items, onFolderClick }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="group bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => item.type === "folder" && onFolderClick(item.id)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              {item.type === "folder" ? (
                <svg className="w-10 h-10 text-primary mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3a2 2 0 012-2h6a2 2 0 012 2v2h7a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V3z" />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10 text-muted-foreground mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
            </div>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8a2 2 0 110-4 2 2 0 010 4zM12 14a2 2 0 110-4 2 2 0 010 4zM12 20a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </Button>
          </div>

          <h3 className="font-medium text-card-foreground truncate text-sm mb-1">{item.name}</h3>

          <p className="text-xs text-muted-foreground">Modified {item.modified}</p>

          {item.type === "file" && item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-2 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              Open file →
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
