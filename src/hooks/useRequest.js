import React, {useContext, useState} from "react";
import axios from "axios";
import useLocale from "../locale/useLocale";
import {useAlert} from "@f-ui/core";

export default function useRequest(sS = true) {
   const [showSuccess, setShowSuccess] = useState(sS)
   const translate = useLocale()
   useAlert(true)
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
