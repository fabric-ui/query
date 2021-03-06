import PropTypes from 'prop-types'
import keyTemplate from "../templates/keyTemplate";
import styles from '../styles/Settings.module.css'
import React, {useEffect, useState} from 'react'

import SettingsField from "./SettingsField";
import {Modal, Tab, Tabs} from "@f-ui/core";
import useLocale from "../../locale/useLocale";

export default function Settings(props) {


    const [fields, setFields] = useState({
        hidden: props.keys.filter(f => !f.visible),
        visible: props.keys.filter(f => f.visible),
    })
   const translate = useLocale()
    useEffect(() => {
        setFields({
            hidden: props.keys.filter(f => !f.visible),
            visible: props.keys.filter(f => f.visible),
        })
    }, [props])

    const [open, setOpen] = useState(0)
    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}

            blurIntensity={'1px'}
            className={styles.modal}
        >
            <div className={styles.header}>
               {translate('settings')}
            </div>
            <Tabs
                open={open} setOpen={setOpen}
                className={styles.contentWrapper}
            >
                <Tab label={translate('all')} className={styles.content}>
                    {props.keys.map((e, i) => (
                        <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                            <SettingsField index={i} field={e} dispatchKeys={props.dispatchKeys} actions={props.actions}/>
                        </React.Fragment>
                    ))}
                </Tab>
                <Tab label={translate('visible')} className={styles.content}>
                    {fields.visible.length > 0 ?
                        fields.visible.map((e, i) => (
                            <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                                <SettingsField  index={i} field={e} dispatchKeys={props.dispatchKeys} actions={props.actions}/>
                            </React.Fragment>
                        ))
                        :
                       translate('allHidden')
                    }
                </Tab>
                <Tab label={ translate('hidden')} className={styles.content} styles={{textAlign: fields.hidden.length === 0  ? 'center' : undefined}}>
                    {fields.hidden.length > 0 ?
                        fields.hidden.map((e, i) => (
                            <React.Fragment key={i + '-row-' + JSON.stringify(e.label)}>
                                <SettingsField index={i} field={e} dispatchKeys={props.dispatchKeys} actions={props.actions}/>
                            </React.Fragment>
                        ))
                        : translate('allVisible')
                    }
                </Tab>
            </Tabs>

        </Modal>
    )
}
Settings.propTypes = {

    open: PropTypes.bool,
    setOpen: PropTypes.func,
    keys: PropTypes.arrayOf(keyTemplate),
    dispatchKeys: PropTypes.func,
    actions: PropTypes.object
}
