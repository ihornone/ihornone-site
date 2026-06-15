import Link from "next/link"

const navLinks = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Stack", "/stack"],
  ["Now", "/now"],
] as const

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ihornone" },
  { label: "Telegram", href: "https://t.me/ihornone" },
  { label: "Email", href: "mailto:you@example.com" },
]

export default function Footer() {
  return (
    <footer className="px-6 pt-16 pb-10" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="mx-auto flex flex-col gap-10" style={{ maxWidth: 1120 }}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: "var(--color-accent)" }}>
                <span className="text-white font-bold text-[13px] font-mono leading-none select-none"
                  style={{ letterSpacing: "-0.5px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "-1px" }}
                >
                  {"{}"}
                </span>
              </span>
              <span className="text-[15px] font-semibold text-[var(--color-text)]" style={{ letterSpacing: "-0.3px" }}>
                ihornone
              </span>
            </Link>
            <p className="m-0 text-[var(--color-text-muted)] text-center sm:text-left"
              style={{ fontSize: 13, lineHeight: 1.5, letterSpacing: "-0.26px", maxWidth: 220 }}
            >
              Full-stack developer crafting mobile, web, and desktop apps.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col items-center sm:items-start gap-3">
              <span className="text-[var(--color-text-muted)] text-xs font-semibold uppercase tracking-wider" style={{ letterSpacing: "0.06em" }}>
                Pages
              </span>
              {navLinks.map(([label, href]) => (
                <Link key={label} href={href}
                  className="no-underline text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)]"
                  style={{ fontSize: 14, letterSpacing: "-0.28px" }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-center sm:items-start gap-3">
              <span className="text-[var(--color-text-muted)] text-xs font-semibold uppercase tracking-wider" style={{ letterSpacing: "0.06em" }}>
                Social
              </span>
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                  className="no-underline text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text)]"
                  style={{ fontSize: 14, letterSpacing: "-0.28px" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 text-center" style={{ borderTop: "1px solid var(--color-border)" }}>
          <p className="m-0 text-[var(--color-text-muted)]" style={{ fontSize: 12, letterSpacing: "-0.24px" }}>
            &copy; {new Date().getFullYear()} ihornone. Built with React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  )
}
