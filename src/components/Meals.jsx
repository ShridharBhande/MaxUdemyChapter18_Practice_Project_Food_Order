import { useEffect, useState } from "react";
import MealItems from "./MealItems";
import Error from "./Error";
import useHttp from "../hook/useHttp";

// It is Important to create {} outside the function
const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  // {} != {} ==> bcoz evry time reference of the object will different and it is a dependecny of the useCallback and bcoz of dependecny change it will recall sendRequest Method again again anf that why useHttp call goes into loop
  // const { data: loadedMeals, error, isLoading } = useHttp("http://localhost:3000/meals", {}, [])
  
  const { data: loadedMeals, error, isLoading } = useHttp("http://localhost:3000/meals", requestConfig, [])

  console.log("-- loadmeal error  ", error);
  if (isLoading) {
    return <p className="center">Loading Data...</p>
  }

  if(error) {
     return <Error title="Failed to Fetch meals" message={error} />
  }

  // useEffect(() => {
  //     async function fetchMeal() {
  //         const mealsData = await fetch("http://localhost:3000/meals" , {
  //             method: 'GET'
  //         })

  //         if(!mealsData.ok) {
  //             //...some code
  //         }

  //         const meals = await mealsData.json();
  //         console.log("-- meals data --->", meals)
  //         setLoadedMeals(meals);
  //     }

  //     fetchMeal();
  // },[])

  return (
    <>
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <MealItems key={meal.id} meal={meal} />
        ))}
      </ul>
    </>
  )
}