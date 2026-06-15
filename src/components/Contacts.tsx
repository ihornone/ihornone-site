const links = [
  { label: "Telegram", href: "https://t.me/ihornone", icon: "/icons/telegram.svg" },
  { label: "GitHub", href: "https://github.com/ihornone", icon: "/icons/github.svg" },
  { label: "Email", href: "mailto:you@example.com", icon: "/icons/gmail-2026.svg" },
]

export default function Contacts() {
  return (
    <section id="contact" className="px-8 pb-32">
      <div className="mx-auto w-full" style={{ maxWidth: 1120 }}>
        <div className="text-center">
          <p className="text-[var(--color-accent-light)] text-sm font-medium tracking-wide uppercase mb-3" style={{ letterSpacing: "0.08em" }}>
            Contact
          </p>
          <h2 className="text-[var(--color-text)] font-semibold m-0 mb-4"
            style={{ fontSize: 36, lineHeight: 1.25, letterSpacing: "-0.72px" }}
          >
            Let&apos;s connect
          </h2>
          <p className="text-[var(--color-text-secondary)] m-0 mb-10"
            style={{ fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.36px" }}
          >
            Always open to interesting projects and conversations.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {links.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 no-underline rounded-xl border transition-all duration-200 hover:bg-[var(--color-accent-bg)] hover:border-[var(--color-accent-light)]"
                style={{ padding: "14px 28px", background: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
              >
                <img src={link.icon} alt="" className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="text-[var(--color-text)] font-medium" style={{ fontSize: 16, letterSpacing: "-0.32px" }}>
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
