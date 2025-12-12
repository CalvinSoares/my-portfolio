"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import enTranslations from "../locales/en.json";
import ptTranslations from "../locales/pt.json";

type Language = "en" | "pt";
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Opcional: Salvar preferência no localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Função simples para pegar valores aninhados (ex: "nav.home")
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = language === "en" ? enTranslations : ptTranslations;

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Retorna a chave se não encontrar a tradução
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
