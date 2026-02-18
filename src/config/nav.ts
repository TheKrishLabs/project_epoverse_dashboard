import {
  LayoutDashboard,
  Server,
  FileText,
  Image as ImageIcon,
  Gift,
  BrainCircuit,
  Tags,
  Archive,
  Megaphone,
  Radio,
  User,
  MessageSquare,
  BarChart,
  Video,
  Layout,
  Search,
  Share2,
  Globe,
  Settings,
  Users,
  BookOpen,
} from "lucide-react";

export type SidebarNavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  variant: "default" | "ghost";
  items?: SidebarNavItem[];
};

export type SidebarNavGroup = {
  title: string;
  items: SidebarNavItem[];
};

export const sidebarNav: SidebarNavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        variant: "default",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Post",
        href: "#",
        icon: FileText,
        variant: "ghost",
        items: [
          {
            title: "Add Post",
            href: "/post/add",
            icon: FileText,
            variant: "ghost",
          },
          {
            title: "Post List",
            href: "/post/list",
            icon: FileText,
            variant: "ghost",
          },
          {
            title: "Bulk Post Upload",
            href: "/post/bulk-upload",
            icon: FileText,
            variant: "ghost",
          },
          {
            title: "Breaking Post",
            href: "/post/breaking",
            icon: FileText,
            variant: "ghost",
          },
          {
            title: "Story Manage",
            href: "/story",
            icon: FileText,
            variant: "ghost",
          },
          {
            title: "Post Comments",
            href: "/post/comments",
            icon: FileText,
            variant: "ghost",
          },
        ],
      },
      {
        title: "Video Post",
        href: "/video-post",
        icon: Video,
        variant: "ghost",
      },
      {
        title: "Page",
        href: "/page-builder",
        icon: Layout,
        variant: "ghost",
      },
      {
        title: "Media Library",
        href: "/media-library",
        icon: ImageIcon,
        variant: "ghost",
      },
      {
        title: "Categories",
        href: "/categories",
        icon: Tags,
        variant: "ghost",
      },
      {
        title: "Archive",
        href: "/archive",
        icon: Archive,
        variant: "ghost",
      },
    ],
  },
  {
    title: "Tools & AI",
    items: [
      {
        title: "Ai Writer",
        href: "/ai-writer",
        icon: BrainCircuit,
        variant: "ghost",
      },
      {
        title: "Menu",
        href: "/menu",
        icon: Gift,
        variant: "ghost",
      },
      {
        title: "Reporter",
        href: "/reporter",
        icon: User,
        variant: "ghost",
      },
    ],
  },
  {
    title: "Engagement",
    items: [
      {
        title: "Opinions",
        href: "/opinions",
        icon: MessageSquare,
        variant: "ghost",
      },
      {
        title: "Polls",
        href: "/polls",
        icon: BarChart,
        variant: "ghost",
      },
      {
        title: "Subscribers",
        href: "/subscribers",
        icon: Users,
        variant: "ghost",
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        title: "SEO",
        href: "/seo",
        icon: Search,
        variant: "ghost",
      },
      {
        title: "Advertisement",
        href: "/advertisement",
        icon: Megaphone,
        variant: "ghost",
      },
      {
        title: "Rss Feeds",
        href: "/rss-feeds",
        icon: Radio,
        variant: "ghost",
      },
      {
        title: "Auto Post",
        href: "/auto-post-settings",
        icon: Share2,
        variant: "ghost",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Theme",
        href: "/theme",
        icon: Server,
        variant: "ghost",
      },
      {
        title: "Web Setup",
        href: "/web-setup",
        icon: Globe,
        variant: "ghost",
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        variant: "ghost",
      },
      {
        title: "Update guides",
        href: "/update-guides",
        icon: BookOpen,
        variant: "ghost",
      },
    ],
  },
];
