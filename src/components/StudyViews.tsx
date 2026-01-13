"use client";

import { Fragment, useState, useRef } from "react";
import { GripVertical, Video, X } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { StudyTabs } from "@/components/StudyTabs";

type Site = "rediscoveringgod" | "biblegateway" | "zoom";

const DEFAULT_BIBLE_URL = "https://www.biblegateway.com/";

export function StudyViews() {
  const [bibleUrl, setBibleUrl] = useState(DEFAULT_BIBLE_URL);
  const [tempBibleUrl, setTempBibleUrl] = useState(DEFAULT_BIBLE_URL);
  const [meetingId, setMeetingId] = useState("403 506 9201");
  const [meetingPassword, setMeetingPassword] = useState("");

  const [activeSingleTab, setActiveSingleTab] =
    useState<Site>("rediscoveringgod");
  const [visibleSites, setVisibleSites] = useState<Site[]>([
    "rediscoveringgod",
  ]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleTabClick = (e: React.MouseEvent, site: Site) => {
    const isModifierPressed = e.metaKey || e.ctrlKey;

    if (isModifierPressed) {
      e.preventDefault();
      setVisibleSites((prevSites) => {
        if (prevSites.includes(site)) {
          if (prevSites.length === 1) return prevSites;
          return prevSites.filter((s) => s !== site);
        } else {
          return [...prevSites, site];
        }
      });
    } else {
      setActiveSingleTab(site);
      setVisibleSites([site]);
    }
  };

  const handleJoinMeeting = () => {
    window.open("https://zoom.us/join", "_blank", "noopener,noreferrer");
  };

  const handleCloseSite = (siteToClose: Site) => {
    if (visibleSites.length > 1) {
      setVisibleSites((prevSites) =>
        prevSites.filter((site) => site !== siteToClose)
      );
    }
  };

  const handleDragSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newVisibleSites = [...visibleSites];
    const draggedItemContent = newVisibleSites.splice(dragItem.current, 1)[0];
    newVisibleSites.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setVisibleSites(newVisibleSites);
  };

  const renderBibleGatewayContent = (isMultiView: boolean, view: Site) => (
    <div className="flex h-full flex-col bg-card">
      <div className="p-4 border-b">
        <div className="relative grid w-full items-center gap-2">
          <Label
            htmlFor={`bible-url-input-${view}`}
            className={`text-base ${isMultiView ? "pl-8" : ""}`}
          >
            Enter a Bible study website URL
          </Label>
          <div
            className={`flex w-full items-start gap-2 ${
              isMultiView ? "pt-2" : ""
            }`}
          >
            <div className="flex-1 space-y-1.5">
              <Input
                id={`bible-url-input-${view}`}
                type="url"
                value={tempBibleUrl}
                onChange={(e) => setTempBibleUrl(e.target.value)}
                placeholder="https://www.your-bible-site.com"
                aria-label="Bible study website URL"
              />
              <p className="text-xs text-muted-foreground">
                Note: Not all websites can be embedded. Bible Gateway is
                recommended.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => setBibleUrl(tempBibleUrl)}
                className="w-full sm:w-auto"
                size={isMultiView ? "sm" : "default"}
              >
                {isMultiView ? "Load" : "Load Site"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTempBibleUrl(DEFAULT_BIBLE_URL);
                  setBibleUrl(DEFAULT_BIBLE_URL);
                }}
                className="w-full sm:w-auto"
                size={isMultiView ? "sm" : "default"}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-muted/20">
        <iframe
          src={bibleUrl}
          className="h-full w-full border-0"
          title="Bible Gateway"
          allow="fullscreen"
          key={bibleUrl}
        ></iframe>
      </div>
    </div>
  );

  const renderView = (view: Site) => {
    switch (view) {
      case "rediscoveringgod":
        return (
          <iframe
            src="https://www.rediscoveringgod.ca/"
            className="h-full w-full border-0"
            title="ReDiscovering God"
            allow="fullscreen"
          ></iframe>
        );
      case "biblegateway":
        return renderBibleGatewayContent(false, view);
      case "zoom":
        return (
          <div className="flex h-full items-center justify-center bg-muted/20 p-4">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Join Zoom Meeting
                </CardTitle>
                <CardDescription>
                  Enter your meeting details below. A new tab will open to
                  join.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-id">Meeting ID</Label>
                  <Input
                    id="meeting-id"
                    placeholder="e.g. 123 456 7890"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="No Password"
                    value={meetingPassword}
                    onChange={(e) => setMeetingPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleJoinMeeting}>
                  <Video className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
    }
  };

  const isMultiView = visibleSites.length > 1;

  const renderPanelContent = (view: Site) => {
    if (view === "biblegateway") {
      return renderBibleGatewayContent(true, view);
    }
    return renderView(view);
  };

  return (
    <>
      <Header>
        <StudyTabs visibleSites={visibleSites} onTabClick={handleTabClick} />
      </Header>
      <main className="flex-1 overflow-hidden">
        {isMultiView ? (
          <div className="h-full">
            <PanelGroup direction="horizontal">
              {visibleSites.map((view, index) => (
                <Fragment key={view}>
                  <Panel
                    defaultSize={100 / visibleSites.length}
                    draggable={true}
                    onDragStart={(e) => {
                      dragItem.current = index;
                      const target = e.target as HTMLElement;
                      target
                        .closest("[data-panel-id]")
                        ?.classList.add("dragging");
                    }}
                    onDragEnter={(e) => {
                      dragOverItem.current = index;
                      const target = e.target as HTMLElement;
                      const panelEl = target.closest("[data-panel-id]");
                      if (panelEl) {
                        panelEl.classList.add("drag-over");
                      }
                    }}
                    onDragLeave={(e) => {
                      const target = e.target as HTMLElement;
                      const panelEl = target.closest("[data-panel-id]");
                      if (panelEl) {
                        panelEl.classList.remove("drag-over");
                      }
                    }}
                    onDragEnd={(e) => {
                      handleDragSort();
                      const target = e.target as HTMLElement;
                      document
                        .querySelectorAll("[data-panel-id]")
                        .forEach((el) => {
                          el.classList.remove("dragging", "drag-over");
                        });
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="relative h-full w-full bg-card">
                      <div className="absolute top-2 left-2 z-10 h-6 w-6 cursor-grab active:cursor-grabbing bg-background/50 hover:bg-background/80 rounded-md flex items-center justify-center">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10 h-6 w-6 bg-background/50 hover:bg-background/80"
                        onClick={() => handleCloseSite(view)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close {view}</span>
                      </Button>
                      <div
                        className={`h-full w-full ${
                          view === "biblegateway" ? "" : "pt-8"
                        }`}
                      >
                        {renderPanelContent(view)}
                      </div>
                    </div>
                  </Panel>
                  {index < visibleSites.length - 1 && (
                    <PanelResizeHandle className="w-2 bg-border hover:bg-primary/20 transition-colors" />
                  )}
                </Fragment>
              ))}
            </PanelGroup>
          </div>
        ) : (
          <div className="h-full">{renderView(activeSingleTab)}</div>
        )}
      </main>
    </>
  );
}
