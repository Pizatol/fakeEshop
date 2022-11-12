

import React, {useContext} from 'react'
import { LoginContext } from '../context/LoginContext';

import css from '../styles/BasketPage.module.scss'

export default function BasketPage() {

	const { user } = useContext(LoginContext);
  return (


	 <div className={css.global_container}>
		<h1> BASKET PAGE</h1>
		<h1> BASKET PAGE</h1>
		
		{
			user ? (
				<p>Logged</p>
			) : (
				<p>not logged</p>
			)
		}

	 </div>
  )
}
