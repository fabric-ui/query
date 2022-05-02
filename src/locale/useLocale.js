import React, {useContext} from 'react'
import {LanguageContext} from "@f-ui/core";
import LocaleEN from "./LocaleEN";
import LocalePT from "./LocalePT";

export default function useLocale() {
  const locale = useContext(LanguageContext)
  return (word) => {
    switch (locale) {
      case 'en':
        return LocaleEN[word]
      default:
        return LocalePT[word]
    }
  }
}
