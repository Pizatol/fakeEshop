

import React from 'react'
import css from '../styles/Product_page.module.scss'
import Product_mini_card from '../Components/Product_mini_card'

export default function ProductsPage() {
  return (
	 <div className={css.global_container}>

		<Product_mini_card/>

	 </div>
  )
}
