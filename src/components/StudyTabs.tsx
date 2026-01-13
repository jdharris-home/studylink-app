"use client";

import { cn } from "@/lib/utils";
import { BookMarked, BookOpen, Video } from "lucide-react";

type Site = "rediscoveringgod" | "biblegateway" | "zoom";

interface StudyTabsProps {
  visibleSites: Site[];
  onTabClick: (e: React.MouseEvent, site: Site) => void;
}

export function StudyTabs({ visibleSites, onTabClick }: StudyTabsProps) {
  const sites: Site[] = ["rediscoveringgod", "biblegateway", "zoom"];

  return (
    <div className="flex items-center gap-4">
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-accent p-1 text-muted-foreground">
        {sites.map((site) => (
          <button
            key={site}
            onClick={(e) => onTabClick(e, site)}
            data-state={visibleSites.includes(site) ? "active" : "inactive"}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border",
              "data-[state=inactive]:border-transparent data-[state=inactive]:hover:bg-muted/50 data-[state=inactive]:hover:text-muted-foreground",
              "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border-border"
            )}
          >
            {site === "rediscoveringgod" && <BookOpen className="mr-2 h-4 w-4" />}
            {site === "biblegateway" && <BookMarked className="mr-2 h-4 w-4" />}
            {site === "zoom" && <Video className="mr-2 h-4 w-4" />}
            {site.charAt(0).toUpperCase() +
              site.slice(1).replace("god", " God")}
          </button>
        ))}
      </div>
      <div className="hidden sm:block text-xs text-muted-foreground whitespace-nowrap">
        Hold Ctrl/Cmd and click to multi-select
      </div>
    </div>
  );
}
