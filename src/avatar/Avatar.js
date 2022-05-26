import React, {useMemo} from "react";
import PropTypes from "prop-types";
import styles from './styles/Avatar.module.css'

export default function Avatar(props) {
   const size = useMemo(() => {
      switch (props.size) {
         case "big":
            return '130px'
         case "medium":
            return '65px'
         case 'huge':
            return '200px'
         default:
            return '25px'
      }
   }, [props.size])
   return (<div className={styles.wrapper}
                data-size={props.size}
                style={{
                   border: props.outlined ? 'var(--fabric-border-primary) 1px solid' : "unset",
                   borderRadius: props.variant === 'square' ? '5px' : undefined
                }}>
      {props.src ? <img
         className={[styles.img, props.className].join(' ')}
         style={props.styles} src={props.src}
         alt={props.alt}/> : <span style={{fontSize: size}} className={'material-icons-round'}>account_circle</span>}
   </div>)
}
Avatar.propTypes = {
   outlined: PropTypes.bool, styles: PropTypes.object, className: PropTypes.string,
   variant: PropTypes.oneOf(['square', 'circle']),
   size: PropTypes.oneOf(['small', 'medium', 'big', 'huge']),
   src: PropTypes.string, alt: PropTypes.string.isRequired
}
