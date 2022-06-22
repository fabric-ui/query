import styles from '../styles/SelectorModal.module.css'
import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {Button, DataProvider, DataRow, DropdownProvider, Icon} from "@f-ui/core";
import ListTabs from "../../list/ListTabs";
import {VARIANTS} from "../../list/List";
import Element from "../../list/components/Element";
import useLocale from "../../locale/useLocale";
import useListData from "../../hooks/useListData";

export default function SelectorModal(props) {
   const [currentTab, setCurrentTab] = useState(0)
   const dropdownContext = useContext(DropdownProvider)

   const toRender = useMemo(() => {
      return props.hook.data.slice(currentTab * 15, currentTab * 15 + 15)
   }, [props.hook.data, currentTab])
   const visualizeKeys = useMemo(() => {
      return props.keys.filter(k => k.type !== 'image')
   }, [])

   const hook = useListData(
      visualizeKeys.filter(k => k.visible),
      props.hook.data.map(d => {
         if (props.mapKeyOnNull && !d.data[props.mapKeyOnNull.key])
            return {...d.data, [props.mapKeyOnNull.key]: props.mapKeyOnNull.value(d.data)}
         return d.data
      }), false)

   const nodes = toRender.map((e, index) => (
      <React.Fragment key={e.id + '-list-row'}>
         <Element
            highlight={props.value === e.data}
            setOnValidation={() => null}
            onRowClick={() => {
               props.handleChange(e.data)
               if (dropdownContext.setOpen)
                  dropdownContext.setOpen(false)
            }}
            cellStyles={{
               fontWeight: '550',
               fontSize: '.7rem'
            }}
            variant={VARIANTS.MINIMAL}
            isLast={index === props.hook.data.length - 1}
            data={e.data}
            page={currentTab}
            fetchPage={props.hook.currentPage}
            linearColor={true}
            index={index + currentTab * 15}
         />
      </React.Fragment>
   ))

   const translate = useLocale()
   return (
      <div
         className={styles.wrapper}
      >

         <div style={{display: 'flex', width: '100%', alignItems: 'center', gap: '4px'}}>

            {typeof props.value === 'object' && props.value && Object.keys(props.value).length > 0 ?

               <DataRow
                  onClick={() => {
                     if (props.onClick) props.onClick()

                  }}
                  keys={props.keys} object={props.value}
                  styles={{
                     padding: 0,
                     width: '100%',
                     background: 'var(--fabric-background-tertiary)',
                     borderColor: 'var(--fabric-accent-color)',
                     borderWidth: '2px'
                  }}
               /> : <DataRow
                  onClick={() => {
                     if (props.onClick) props.onClick()

                  }}
                  styles={{
                     padding: '0 4px',
                     width: '100%',
                     background: 'var(--fabric-border-primary)'
                  }}
                  keys={[{label: '', type: 'string', key: 'k'}]}
                  object={{k: translate('nothing')}}
               />}

            <Button
               variant={'filled'}
               onClick={() => {
                  props.handleChange(null)
               }}
               styles={{
                  '--fabric-accent-color': '#ff5555',
                  height: '100%',
                  background: 'var(--fabric-accent-color)',
                  display: props.value && Object.keys(props.value).length > 0 ? undefined : 'none'
               }}
               className={styles.headerButton}
               disabled={!props.value}
               attributes={{
                  title: translate('clean')
               }}>
               <Icon styles={{fontSize: '1.1rem'}}>delete</Icon>
            </Button>
            <Button
               variant={'outlined'}
               onClick={() => props.hook.clean()}
               className={styles.headerButton}
               // styles={{                        background: 'var(--fabric-accent-color)',}}
               attributes={{

                  title: translate('reload')
               }}
            >
               <Icon styles={{fontSize: '1.1rem'}}>refresh</Icon>
            </Button>
         </div>
         <DataProvider.Provider value={hook}>

            <div className={styles.rows}>
               <ListTabs
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab} hook={props.hook}
                  variant={VARIANTS.CARDS}/>
               <div className={styles.headers}>
                  {props.keys.map(k => (
                     <div key={k.key + '-object-property'} title={k.label}
                          style={{
                             width: k.additionalWidth ? `calc(100% + ${k.additionalWidth})` : '100%',
                             padding: '0 8px'
                          }} className={styles.overflowEllipsis}>
                        {k.label}
                     </div>
                  ))}
               </div>
               {props.hook.data.length === 0 ? (
                     <div className={styles.empty} title={translate('nothing')}>
                        <Icon styles={{fontSize: '70px'}}>folder</Icon>
                     </div>
                  ) :
                  nodes
               }
            </div>
         </DataProvider.Provider>
      </div>)


}
SelectorModal.propTypes = {
   data: PropTypes.array, keys: PropTypes.array, createOption: PropTypes.bool,


   cleanState: PropTypes.func, value: PropTypes.object, handleChange: PropTypes.func,

   label: PropTypes.string, hook: PropTypes.object, identificationKey: PropTypes.string
}
