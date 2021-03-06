import PropTypes from 'prop-types'
import styles from '../styles/Header.module.css'
import React, {useMemo} from "react";
import useHeader from "../hook/useHeader";
import keyTemplate from "../templates/keyTemplate";
import Filter from "../../filter/Filter";
import {Button, Dropdown, DropdownOption, DropdownOptions, Icon, ToolTip} from "@f-ui/core";
import {VARIANTS} from "../List";
import useLocale from "../../locale/useLocale";


export default function Header(props) {
   const {
      getType,
      parseDate,
   } = useHeader()

   const translate = useLocale()
   const options = useMemo(() => {
      const base = [
         {
            label: translate('minimal'),
            icon: 'format_list_bulleted',
            onClick: () => props.setVariant(VARIANTS.MINIMAL),
            variant: VARIANTS.MINIMAL
         },
         {
            label: translate('extended'),
            icon: 'view_list',
            onClick: () => props.setVariant(VARIANTS.EMBEDDED),
            variant: VARIANTS.EMBEDDED
         }
      ]
      if (props.hasCardView)
         base.push({
            label: 'Card',
            icon: 'dashboard',
            onClick: () => props.setVariant(VARIANTS.CARDS),
            variant: VARIANTS.CARDS
         })

      return base
   }, [props.hasCardView])

   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            {props.title}
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
               <div className={styles.buttonGroup}>
                  {options.map((o, i) => (
                     <React.Fragment key={'bt-' + i}>
                        <Button
                           variant={"minimal"}
                           highlight={props.variant === o.variant}
                           onClick={() => o.onClick()}
                           className={styles.button}
                           styles={{
                              borderRadius: i === 0 ? '3px 0  0 3px' : i === options.length - 1 ? ' 0 3px  3px 0 ' : '0',
                              fontSize: 'unset',
                              background: 'var(--fabric-border-primary)'
                           }}
                        >
                           <Icon styles={{fontSize: '1.1rem'}}>{o.icon}</Icon>
                           <ToolTip>
                              {o.label}
                           </ToolTip>
                        </Button>
                     </React.Fragment>
                  ))}
               </div>

               <Dropdown
                  hideArrow={true}
                  variant={"minimal"}
                  className={styles.button}
                  styles={{background: 'var(--fabric-border-primary)'}}
               >
                  <Icon styles={{fontSize: '1.2rem'}}>more_vert</Icon>
                  <DropdownOptions>

                     <DropdownOption option={{
                        label: translate('reload'),
                        icon: <Icon styles={{fontSize: '1.2rem'}}>refresh</Icon>,
                        onClick: () => {
                           props.hook.clean()
                        }
                     }}/>
                     <DropdownOption option={{
                        label: translate('settings'),
                        icon: <Icon styles={{fontSize: '1.2rem'}}>settings</Icon>,
                        onClick: () => {
                           props.setOpenSettings(true)
                        }
                     }}/>

                  </DropdownOptions>
               </Dropdown>

               <Button
                  styles={{display: props.createOption ? undefined : 'none', color: 'white'}}
                  onClick={() => props.onCreate()}
                  variant={"filled"}
                  className={styles.button}>
                  <Icon styles={{fontSize: '1.2rem'}}>
                     add
                  </Icon>
               </Button>
            </div>
         </div>

         {props.noFilters ?
            null
            :
            <Filter
               keys={props.keys.filter(e => e.type !== 'image' && e.label)} filters={props.hook.filters}
               setFilters={props.hook.setFilters}
               getType={getType}
               variant={props.variant}
               hook={props.hook}
               parseDate={parseDate}
               noFilters={props.noFilters}
            />
         }

      </div>

   )
}

Header.propTypes = {
   variant: PropTypes.number,
   setVariant: PropTypes.func,
   hasCardView: PropTypes.bool,

   hook: PropTypes.object,
   noFilters: PropTypes.bool,
   dispatch: PropTypes.func,
   actions: PropTypes.object,

   title: PropTypes.any,

   keys: PropTypes.arrayOf(keyTemplate).isRequired,

   setOpenSettings: PropTypes.func,

   createOption: PropTypes.bool,
   onCreate: PropTypes.func,


   setSelfContained: PropTypes.func,
   selfContained: PropTypes.bool
}
