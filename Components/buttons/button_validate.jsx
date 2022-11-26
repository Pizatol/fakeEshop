

import React from 'react'
import css from '../../styles/Button_validate.module.scss'

export default function button_validate( { props} ) {


  return (


	 <button type='button' className={css.global_container}>
		{props}
	 </button>
  )
}
