"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Header from "../components/Header";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <section id="Home" className="relative min-h-screen overflow-hidden bg-[#120d1d] text-[#f8f4ff]">
      <div className="pixel-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[32rem] w-[32rem] rounded-full bg-[#6f45d6]/25 blur-3xl" />
      <Header />

      <main className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-36 shrink-0 items-center justify-center">
                <img src="/images/pixel-art/ataque-2.gif" alt="" aria-hidden="true" className="h-full w-full object-contain [image-rendering:pixelated]" />
              </div>
              <p className="eyebrow">01 — {t("hero.role")}</p>
            </div>
            <p className="mt-10 text-sm font-medium text-[#a6aaa2]">{t("hero.greeting")}</p>
            <h1 className="mt-2 whitespace-nowrap text-6xl font-semibold leading-[0.9] tracking-[-0.065em] text-[#f8f4ff] sm:text-7xl lg:text-[5.5rem]">
              Calvin Soares
            </h1>
            <p className="mt-9 max-w-xl text-2xl font-medium leading-[1.12] tracking-[-0.035em] text-[#e4d9f5] md:text-3xl">
              {t("hero.headline")}
            </p>
            <p className="mt-6 max-w-lg border-l-2 border-[#f6c744] pl-4 text-base leading-relaxed text-[#b9accb]">
              {t("hero.description")}
            </p>
          </div>

          <div className="mt-12 border-t border-[#4c3b66] pt-6">
            <p className="font-technical text-[11px] font-semibold uppercase text-[#f6c744]">{t("hero.availability")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="pixel-frame inline-flex items-center gap-2 bg-[#f6c744] px-5 py-3 text-sm font-bold text-[#211734] transition-colors hover:bg-[#ffe89d]">
                {t("hero.primary_cta")} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/Contact" className="pixel-frame inline-flex items-center gap-2 border border-[#8d62f7] bg-[#2d2044] px-5 py-3 text-sm font-semibold text-[#f8f4ff] transition-colors hover:border-[#f6c744] hover:text-[#f6c744]">
                <Mail className="h-4 w-4" /> {t("hero.secondary_cta")}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-technical text-[11px] font-semibold uppercase text-[#b9accb]">
              <a className="transition-colors hover:text-[#f6c744]" href="https://github.com/CalvinSoares" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="transition-colors hover:text-[#f6c744]" href="https://www.linkedin.com/in/calvinsoares/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="transition-colors hover:text-[#f6c744]" href="https://www.tiktok.com/@pato_programador?lang=pt-BR" target="_blank" rel="noopener noreferrer">TikTok ↗</a>
            </div>
          </div>
        </div>

        <aside className="pixel-frame self-center border border-[#8d62f7] bg-[#211734] p-3 shadow-[10px_10px_0_#4c2f8f] md:p-4">
          <div className="flex items-center justify-between border-b border-[#4c3b66] px-2 pb-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#b9accb]">
            <span>Selected work / 2026</span><span className="text-[#f6c744]">01</span>
          </div>
          <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#2d2044]">
            <Image src="/images/projects/devatlas3.png" alt="Tela do projeto DevMappa" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-top" />
          </div>
          <div className="grid gap-5 px-2 py-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                  <img src="/images/pixel-art/duck-3.gif" alt="Pato em pixel art" className="h-full w-full object-contain [image-rendering:pixelated]" />
                </div>
                <p className="font-technical text-[10px] font-bold uppercase tracking-[0.14em] text-[#f6c744]">Case em destaque</p>
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">DevMappa</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#b9accb]">Arquitetura de software transformada em experiência prática, visual e interativa.</p>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#f6c744] hover:text-[#ffe89d]">Abrir case <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </aside>
      </main>
    </section>
  );
}
