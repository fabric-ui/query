import styles from "../styles/Settings.module.css";

import React from "react";
import PropTypes from "prop-types";
import {Button} from "@f-ui/core";
import useLocale from "../../locale/useLocale";

export default function SettingsField(props){

   const translate = useLocale()
    return (
        <div className={styles.fieldRow} style={{background: props.index % 2 === 0 ? 'var(--fabric-background-secondary)' : undefined}}>
            <div className={styles.fieldLabel}>
                {props.field.type === 'image' ? translate('image') : props.field.label}
            </div>
            <Button
                className={styles.visibilityButton}
                onClick={() => {
                    props.dispatchKeys({
                        type: props.actions.UPDATE_VISIBILITY,
                        payload: props.field
                    })
                }}>
                {props.field.visible ?
                    <span className="material-icons-round" style={{fontSize: '1.1rem'}}>visibility</span>
                    :
                    <span className="material-icons-round" style={{fontSize: '1.1rem'}}>visibility_off</span>
                }

            </Button>
        </div>
    )
}
SettingsField.propTypes={
    index: PropTypes.number,
    field: PropTypes.object,
    actions: PropTypes.object,
    dispatchKeys: PropTypes.func
}
