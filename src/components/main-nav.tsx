// import Link from "next/link"

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/auth components/icons";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {/* <Link
        to="/overview"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        <Icons.logo className="h-8 w-8" />
      </Link> */}
      <Link
        to="/overview"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      {/* <Link
        to="/overview/analytics"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Analytics
      </Link> */}
      <Link
        to="/overview/notes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Notes
      </Link>
      <Link
        to="/overview/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
