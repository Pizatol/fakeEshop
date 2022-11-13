

import React from 'react'
import css from "../styles/Product_mini_card.module.scss"
import Image from 'next/image'

import StarRating from './StarRating'

import hd600 from '../public/assets/Pictures/inventoryImg/hd600.jpg'


export default function Product_mini_card() {


  return (

	 <div className={css.global_container}>
				<div className={css.image_container}>
					<Image 
						src={hd600}
						height={300}
						width={300}
						layout="responsive"
						alt="headphone"
					/>
				</div>
				<div className={css.price}>
					PRICE
				</div>
				<div className={css.name_product}>
					NAME PRODUCT
				</div>

				<div className={css.rating}>

				<StarRating/>



				</div>




				
	 </div>
  )
}
