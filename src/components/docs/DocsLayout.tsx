import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, ChevronLeft, Github, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import DocsSearch from "@/components/docs/DocsSearch";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Installation", href: "/docs/installation", keywords: "install setup npm yarn npx global local" },
      { label: "CLI Options", href: "/docs/cli-options", keywords: "command line flags arguments output" },
      { label: "Configuration File", href: "/docs/configuration", keywords: "config yaml json settings options file" },
    ],
  },
  {
    title: "Features",
    items: [
      { label: "Sorting", href: "/docs/sorting", keywords: "sort order alphabetical properties paths" },
      { label: "Filtering", href: "/docs/filtering", keywords: "filter remove exclude include tags operations" },
      { label: "Formatting & Casing", href: "/docs/formatting", keywords: "format case camel snake kebab naming" },
      { label: "Overlays", href: "/docs/overlays", keywords: "overlay merge extend override patch" },
      { label: "Generate", href: "/docs/generate", keywords: "generate create output produce" },
      { label: "Split & Bundle", href: "/docs/split-bundle", keywords: "split bundle multi file components refs" },
      { label: "Convert", href: "/docs/convert", keywords: "convert transform swagger openapi yaml json" },
      { label: "Rename", href: "/docs/rename", keywords: "rename replace title description operationId" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { label: "Programmatic Usage", href: "/docs/programmatic", keywords: "api programmatic javascript typescript code import" },
    ],
  },
];

const allPages = sections.flatMap((s) => s.items);

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const currentIndex = allPages.findIndex((p) => p.href === location.pathname);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const sidebar = (
    <nav className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="mb-2 text-sm font-semibold text-foreground">{section.title}</h4>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <ChevronRight className="h-3 w-3 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="text-lg font-bold tracking-tight">
              openapi-format
            </Link>
            <span className="hidden sm:inline text-sm text-muted-foreground">/ docs</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex gap-2 text-muted-foreground text-sm h-8 px-3"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-3.5 w-3.5" />
              Search docs…
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <a href="https://openapi-format-playground.vercel.app" target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="gap-1.5">
                Playground
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            <a
              href="https://github.com/thim81/openapi-format"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />

      <div className="container flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r py-8 pr-6">
          {sidebar}
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <aside className="relative z-50 w-72 h-full bg-background border-r p-6 pt-4 overflow-y-auto">
              {sidebar}
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 py-8 lg:pl-8">
          <div className="max-w-3xl">
            {children}

            {/* Prev / Next navigation */}
            <nav className="mt-12 flex items-stretch gap-4 border-t pt-6">
              {prev ? (
                <Link
                  to={prev.href}
                  className="group flex flex-1 flex-col items-start rounded-lg border p-4 transition-colors hover:bg-accent/50"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ChevronLeft className="h-3 w-3" /> Previous
                  </span>
                  <span className="mt-1 text-sm font-medium group-hover:text-foreground">{prev.label}</span>
                </Link>
              ) : <div className="flex-1" />}
              {next ? (
                <Link
                  to={next.href}
                  className="group flex flex-1 flex-col items-end rounded-lg border p-4 transition-colors hover:bg-accent/50"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    Next <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="mt-1 text-sm font-medium group-hover:text-foreground">{next.label}</span>
                </Link>
              ) : <div className="flex-1" />}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
