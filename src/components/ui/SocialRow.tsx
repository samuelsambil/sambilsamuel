import { FiGithub, FiLinkedin, FiMail, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { socials } from "@/lib/content";

const links = [
  { href: socials.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: socials.github, label: "GitHub", Icon: FiGithub },
  { href: socials.twitter, label: "X", Icon: FaXTwitter },
  { href: socials.youtube, label: "YouTube", Icon: FiYoutube },
  { href: socials.email, label: "Email", Icon: FiMail },
];

export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center border border-line text-muted transition-all duration-300 hover:border-line-gold hover:text-gold-strong"
        >
          <Icon className="h-[0.95rem] w-[0.95rem]" />
        </a>
      ))}
    </div>
  );
}
