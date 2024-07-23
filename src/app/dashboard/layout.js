
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Tag, Archive, StickyNote, Settings, Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Component({ children }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <header className="sticky top-0 w-full bg-background border-b px-4 md:px-6 flex items-center h-16 shadow-sm z-10">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <StickyNote className="w-6 h-6" />
          <span className="text-lg font-semibold">Google Keep</span>
        </Link>

        <div className="flex items-center gap-4 p-3 ms-auto">
          <DropdownMenu className="bg-white">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  fallback={2}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4 border-r">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4">
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start gap-2 w-full">
                    <StickyNote className="w-5 h-5" />
                    Notes
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start gap-2 w-full">
                    <Archive className="w-5 h-5" />
                    Archived
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start gap-2 w-full">
                    <Tag className="w-5 h-5" />
                    Labels
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start gap-2 w-full">
                    <Settings className="w-5 h-5" />
                    Settings
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </header>
      <div className="flex flex-1 ">
        <nav className="sticky top-16 min-w-[35vh] bg-muted/40 border-r px-4 py-6 hidden md:block h-screen overflow-y-auto">

          <div className="grid gap-4">
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <StickyNote className="w-5 h-5" />
              Notes
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <Archive className="w-5 h-5" />
              Archived
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <Tag className="w-5 h-5" />
              Labels
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <Settings className="w-5 h-5" />
              Settings
            </Button>
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto px-4 py-5 h-full">
          {children}
        </main>
      </div>
    </div>
  );
}

