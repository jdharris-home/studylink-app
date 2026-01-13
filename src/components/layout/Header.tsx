import { BookHeart } from "lucide-react";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="grid h-16 shrink-0 grid-cols-3 items-center border-b px-4 md:px-6">
      <div className="flex items-center gap-3">
        <BookHeart className="h-7 w-7 text-primary" />
        <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
          StudyLink
        </h1>
      </div>
      <div className="flex justify-center">{children}</div>
      <div />
    </header>
  );
}
