import styles from "../styles/Element.module.css";
import {DataRow, Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core"
import PropTypes from "prop-types";
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {VARIANTS} from "../List";

export default function Element(props) {
   const [openDropdown, setOpenDropdown] = useState(false)
   const [open, setOpen] = useState(false)

   const isCard = useMemo(() => {
      return props.variant === VARIANTS.CARDS
   }, [props.variant])
   function getRandomHeight(){
      const min = 250, max = 350
      return Math.floor(Math.random() * (max - min + 1) + min) + 'px'
   }
   return (
      <div
         className={styles.listRow}
         onMouseEnter={() => setOpen(true)}
         onMouseLeave={() => setOpen(false)}
      >
         {props.options && props.options.length > 0 && (open || openDropdown) ? (
            <Dropdown
               variant={'filled'}
               className={[styles.dropdown, isCard ? styles.card : ''].join(' ')}
               onOpen={() => setOpenDropdown(true)}
               onClose={() => setOpenDropdown(false)}>
               <DropdownOptions>
                  {props.options.map((o, oI) => (
                     <React.Fragment key={oI + 'list-option'}>
                        <DropdownOption
                           option={{
                              ...o, onClick: () => {
                                 if (o.validadeChoice)
                                    props.setOnValidation({
                                       data: props.data,
                                       message: o.validationMessage,
                                       onAccept: () => o.onClick(props.data)
                                    })
                                 else
                                    o.onClick(props.data)

                              }
                           }}/>
                     </React.Fragment>
                  ))}
               </DropdownOptions>
            </Dropdown>
         ) : null}

         {props.loading && isCard  ?
            <div className={styles.load} style={{height: getRandomHeight()}}/>
            :
            <DataRow
               asCard={isCard}
               className={styles.row}
               cellStyles={{maxHeight: '50vh'}}
               styles={{
                  background: props.highlight ? 'var(--fabric-accent-color)' : isCard || props.linearColor ? 'var(--fabric-background-secondary)' : props.index % 2 === 0 ? 'var(--fabric-background-tertiary)' : undefined,
                  borderRadius: isCard ? undefined : props.index === 0 ? '5px 5px 0 0' : props.isLast ? '0 0 5px 5px' : 0
               }}
               index={props.index}
               onClick={() => props.onRowClick(props.data)}
               reference={props.lastElementRef}/>
         }

      </div>
   )
}

Element.propTypes = {
   linearColor: PropTypes.bool,
   highlight: PropTypes.bool,
   loading: PropTypes.bool,
   variant: PropTypes.number,
   setOnValidation: PropTypes.func,
   onRowClick: PropTypes.func,
   lastElementRef: PropTypes.func,
   data: PropTypes.object,
   options: PropTypes.array,
   index: PropTypes.number,
   page: PropTypes.number,
   fetchPage: PropTypes.number
}
