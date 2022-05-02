import {Button, DataRow, Modal} from "@f-ui/core";
import styles from '../styles/Validate.module.css'
import PropTypes from "prop-types";
import React from "react";
import useLocale from "../../locale/useLocale";

export default function Validate(props) {
   const translate = useLocale()
    return (
        <Modal
            open={Object.keys(props.onValidation).length > 0}
            handleClose={() => props.setOnValidation({})}
            className={styles.modal} blurIntensity={'1px'}
        >
            <div className={styles.message}>
                {props.onValidation.message}
            </div>
            <DataRow
                object={props.onValidation.data}
                keys={props.keys}
                selfContained={true}
            />

            <div className={styles.choices}>
                <Button styles={{'--fabric-accent-color': '#ff5555'}} onClick={() => props.setOnValidation({})} variant={'filled'}>
                   {translate('no')}
                </Button>
                <Button styles={{'--fabric-accent-color': '#0095ff'}} onClick={() => {
                    props.onValidation.onAccept()
                    props.setOnValidation({})
                }} variant={'filled'}>
                   {translate('yes')}
                </Button>
            </div>
        </Modal>
    )
}
Validate.propTypes = {
    keys: PropTypes.array,
    setOnValidation: PropTypes.func,
    onValidation: PropTypes.object
}
