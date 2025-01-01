"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from 'lucide-react'

const navigation = [
  { name: "Overview", href: "#" },
  { name: "Analytics", href: "#" },
  { name: "Notes", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Help", href: "#" },
]

export function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <span className="font-medium">Alicia Koch</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <nav className="flex space-x-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={activeTab === item.name ? "text-primary" : "text-muted-foreground"}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8 w-[300px]" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">shadcn</span>
                <span className="text-sm text-muted-foreground">m@example.com</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

