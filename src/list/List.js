import PropTypes from 'prop-types'
import styles from './styles/List.module.css'
import Header from "./components/Header";
import React, {useMemo, useState} from "react";
import keyTemplate from "./templates/keyTemplate";
import useList from "./hook/useList";
import Settings from "./components/Settings";
import {DataProvider, Icon} from "@f-ui/core"
import Element from "./components/Element";
import Validate from "./components/Validate";
import ListTabs from "./ListTabs";
import useListData from "../hooks/useListData";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export const VARIANTS = {
   EMBEDDED: 0,
   MINIMAL: 1,
   CARDS: 2
}
export default function List(props) {
   const {keys, keysDispatcher, actions, setOpenSettings, openSettings} = useList(props.keys)

   const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)
   const [variant, setVariant] = useState(props.defaultVisualization === 'card' ? VARIANTS.CARDS : VARIANTS.EMBEDDED)
   const visualizeKeys = useMemo(() => {
      return keys.filter(k => k.type !== 'image' && variant !== VARIANTS.CARDS || variant === VARIANTS.CARDS)
   }, [variant])

   const hook = useListData(visualizeKeys.filter(k => k.visible), props.hook.data.map(d => {
      if (props.mapKeyOnNull && !d.data[props.mapKeyOnNull.key])
         return {...d.data, [props.mapKeyOnNull.key]: props.mapKeyOnNull.value(d.data)}
      return d.data
   }), variant !== VARIANTS.MINIMAL)
   const [onValidation, setOnValidation] = useState({})
   const [currentTab, setCurrentTab] = useState(0)

   const toRender = useMemo(() => {
      if (variant === VARIANTS.CARDS)
         return props.hook.data.slice(currentTab * 15, currentTab * 15 + 15)
      return props.hook.data
   }, [props.hook.data, variant, currentTab])

   const nodes = useMemo(() => {
      const isCard = variant === VARIANTS.CARDS
      const arr = isCard ? new Array(15).fill(0) : toRender

      let multiplier = currentTab
      if (props.hook.loading && currentTab > 0)
         multiplier = currentTab - 1

      return arr.map((e, index) => {
         return (
            <React.Fragment key={index + '-list-row'}>
               <Element
                  cardHeight={props.cardHeight}
                  setOnValidation={setOnValidation}
                  onRowClick={props.onRowClick}
                  variant={variant}
                  isLast={index === props.hook.data.length - 1}
                  data={isCard ? toRender[index] : e.data}
                  page={multiplier}
                  fetchPage={props.hook.currentPage}
                  loading={props.hook.loading}
                  options={props.options}
                  index={index + (variant === VARIANTS.CARDS ? multiplier * 15 : 0)}
                  lastElementRef={variant !== VARIANTS.CARDS && index === props.hook.data.length - 1 ? lastElementRef : undefined}
               />
            </React.Fragment>
         )
      })

   }, [toRender, props.hook.loading, variant])

   return (
      <DataProvider.Provider value={hook}>
         <div className={styles.container}>
            <Validate onValidation={onValidation} setOnValidation={setOnValidation} keys={keys}/>
            <Settings
               open={openSettings}

               keys={visualizeKeys} actions={actions} setOpen={setOpenSettings}
               dispatchKeys={keysDispatcher}/>
            <Header
               hasCardView={props.hasCardView}

               title={props.title}
               variant={variant} setVariant={setVariant}
               noFilters={props.noFilters}
               createOption={props.createOption}
               onCreate={props.onCreate}
               hook={props.hook}
               keys={visualizeKeys}
               actions={actions}
               dispatch={keysDispatcher}
               setOpenSettings={setOpenSettings}
            />

            <div
               className={styles.tableWrapper}
            >
               <ListTabs
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab} hook={props.hook}
                  variant={variant}/>
               {props.hook.data.length === 0 && !props.hook.loading ?
                  <div className={styles.empty}>
                     <Icon styles={{fontSize: '75px'}}>folder</Icon>
                     Nada encontrado
                  </div>
                  :
                  null
               }
               {variant === VARIANTS.CARDS ?
                  <div className={styles.listCards}>
                     {nodes}
                  </div>
                  :
                  nodes
               }
            </div>
         </div>
      </DataProvider.Provider>
   )
}

List.propTypes = {
   cardHeight: PropTypes.string,
   defaultVisualization: PropTypes.oneOf(['card', 'list']),
   mapKeyOnNull: PropTypes.shape({key: PropTypes.string, value: PropTypes.func}),
   hasCardView: PropTypes.bool,
   children: PropTypes.func,
   options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.any
   })),

   noFilters: PropTypes.bool,
   hook: PropTypes.object.isRequired,
   onRowClick: PropTypes.func.isRequired,
   keys: PropTypes.arrayOf(keyTemplate).isRequired,
   controlButtons: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.element,
      label: PropTypes.any,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      validadeChoice: PropTypes.bool,
      validationMessage: PropTypes.string
   })),
   title: PropTypes.any,

   createOption: PropTypes.bool,
   onCreate: PropTypes.func,
   onlyVisualization: PropTypes.bool
}
