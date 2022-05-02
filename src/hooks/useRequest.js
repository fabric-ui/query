import React, {useContext, useState} from "react";
import axios from "axios";
import {AlertProvider} from "@f-ui/core";
import useLocale from "../locale/useLocale";

export default function useRequest(sS = true) {
   const alert = useContext(AlertProvider)
   const [showSuccess, setShowSuccess] = useState(sS)
   const translate = useLocale()
   const make = async (params, overrideShowSuccess, showError = true) => {
      let res
      try {
         res = await axios(params)
         if (showSuccess || overrideShowSuccess) alert.pushAlert(translate('success'), 'success')
      } catch (e) {
         if (showError)
            alert.pushAlert(translate('error'), 'error')
      }

      return res
   }

   return {
      setShowSuccess,
      showSuccess,
      make
   }
}
