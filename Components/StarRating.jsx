import { useState } from "react";
import css from "../styles/StarRating.module.scss";
import { FaStar } from "react-icons/fa";
import { COMPILER_NAMES } from "next/dist/shared/lib/constants";

export default function StarRating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((start, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            className={css.input_radio}
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            className={css.start}
                            key={index}
                            size={25}
                            color={
                                ratingValue <= (hover || rating)
                                    ? "#ffc107"
                                    : "#e4e5e9"
                            }
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}
