import React from "react";

import axios from "axios";
import {useContext, useState} from "react";
import {AlertProvider} from "@f-ui/core";

export default function useRequest(sS = true) {
    const alert = useContext(AlertProvider)
    const [showSuccess, setShowSuccess] = useState(sS)

    const make = async (params, overrideShowSuccess, showError=true) => {
        let res

        try {
            res = await axios(params)

            if (showSuccess||overrideShowSuccess) alert.pushAlert('Sucesso', 'success')
        } catch (e) {
            if(showError)
                alert.pushAlert('Algum erro ocorreu', 'error')
        }

        return res
    }

    return {
        setShowSuccess,
        showSuccess,
        make
    }
}
