import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {VARIANTS} from "./List";
import styles from './styles/Tabs.module.css'
import {Button, Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core";
import useLocale from "../locale/useLocale";

export default function ListTabs(props) {
   const {currentPage, setCurrentPage} = props.hook
   const {currentTab, setCurrentTab} = props
   useEffect(() => {
      setCurrentTab(0)
   }, [props.variant, props.hook.filters])
   const p = useMemo(() => {
      return currentPage - 1 >= 0 ? currentPage - 1 : 0
   }, [currentPage])
   const translate = useLocale()

   const options = useMemo(() => {
      const res = []
      for (let i = 0; i < currentPage; i++) {
         res.push(<DropdownOption option={{
            label: translate('page') + ' ' + i,
            onClick: () => setCurrentTab(i)
         }}/>)
      }
      return res
   }, [currentPage])

   return (
      <div className={[styles.wrapper, props.hook.loading ? styles.loading : ''].join(' ')}
           style={{display: props.variant === VARIANTS.CARDS ? undefined : 'none'}}>

         <Dropdown className={styles.cell} styles={{width: 'fit-content', padding: '0'}}>
            {translate('page')} {currentTab}
            <DropdownOptions>
               {options.map((e, i) => (
                  <React.Fragment key={'tabs-choice-'+ i}>
                     {e}
                  </React.Fragment>
               ))}
            </DropdownOptions>
         </Dropdown>
         <div className={styles.group}>
            <Button
               disabled={currentTab === 0}
               variant={"minimal"}
               styles={{borderRadius: '5px 0 0  5px', background: 'var(--fabric-border-primary)'}}

               className={styles.nav}
               onClick={() => {
                  setCurrentTab(prev => prev - 1)
               }}>
               <span className={'material-icons-round'}>chevron_left</span>
            </Button>

            <Button
               disabled={!props.hook.hasMore && p === currentTab || props.hook.data.length < 15 || props.hook.loading}
               variant={"filled"}
               styles={{borderRadius: '0  5px 5px  0'}}
               className={styles.nav}
               onClick={() => {
                  const t = currentTab
                  setCurrentTab(prev => prev + 1)
                  if (t >= p) setCurrentPage(prev => prev + (currentTab === currentPage ? 2 : 1))
               }}>
               <span className={'material-icons-round'}>chevron_right</span>
            </Button>
         </div>
      </div>)

}
ListTabs.propTypes = {
   currentTab: PropTypes.number,
   setCurrentTab: PropTypes.func,
   fetchNext: PropTypes.func,
   hook: PropTypes.object,
   variant: PropTypes.number
}
