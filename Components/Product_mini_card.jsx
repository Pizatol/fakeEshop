

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
						alt="headphone"
					/>
				</div>

				<div className={css.name_product}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, neque?
				</div>

				<div className={css.price}>
					<p> 450  <span>€</span> </p>
				</div>
				

				<div className={css.rating}>

				<StarRating/>



				</div>




				
	 </div>
  )
}
