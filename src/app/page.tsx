import { Header } from "@/components/layout/Header";
import { StudyViews } from "@/components/StudyViews";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <StudyViews />
    </div>
  );
}
