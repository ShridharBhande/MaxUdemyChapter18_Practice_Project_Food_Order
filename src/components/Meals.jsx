import { useEffect, useState } from "react";
import MealItems from "./MealItems";


export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeal() {
            const mealsData = await fetch("http://localhost:3000/meals" , {
                method: 'GET'
            })

            if(!mealsData.ok) {
                //...some code
            }

            const meals = await mealsData.json();
            console.log("-- meals data --->", meals)
            setLoadedMeals(meals);
        }

        fetchMeal();
    },[])

    return(
        <>
            <ul id="meals"> 
                {loadedMeals.map((meal) => (
                  <MealItems key={meal.id} meal={meal} />
                ))}
            </ul>
        </>
    )

}