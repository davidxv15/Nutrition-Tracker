import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import NavBar from "./Components/NavBar/NavBar";
import TotalCount from "./Components/InputControls/TotalCount";
import TotalDelete from "./Components/InputControls/TotalDelete";
import TotalMealInput from "./Components/InputControls/TotalMealInput";
import MealsList from "./Components/MealsList/MealsList";
import Modal from "./Components/Modal/Modal";
import MealsFilter from "./Components/MealsFilter/MealsFilter";
// import Calendar from "react-calendar";
// import CalendarComponent from './Components/CalendarComponent/Calendar';
// import "react-calendar/dist/Calendar.css";

const App = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [date, setDate] = useState(new Date());
  // const [dailyIntake, setDailyIntake] = useState({});

  const addMealsHandler = () => {
    const oldMeals = meals ? [...meals] : [];
    const meal = {
      mealName,
      calories,
      id: Math.floor(Math.random() * 1000),
      date: date.toISOString().slice(0, 10),
    };

    const newMeals = oldMeals.concat(meal);

    if (calories <= 0 || mealName === "") {
      setOpenModal(true);
    } else {
      setMeals(newMeals);
      localStorage.setItem("meals", JSON.stringify(newMeals));
    }

    setMealName("");
    setCalories(0);
  };

  const deleteMealHandler = (id) => {
    const oldMeals = [...meals];
    const newMeals = oldMeals.filter((meal) => meal.id !== id);

    setMeals(newMeals);
    localStorage.setItem("meals", JSON.stringify(newMeals));
  };

  const deleteAllMeals = () => {
    setMeals([]);
    localStorage.clear();
  };

  const total =
    meals !== null
      ? meals
          .filter((meal) => meal.date === date.toISOString().slice(0, 10))
          .map((meal) => meal.calories)
          .reduce((acc, value) => acc + +value, 0)
      : 0;

  useEffect(() => {
    const oldState = [...meals];
    if (selectedFilter === "Ascending") {
      const ascendingMeals = oldState.sort((a, b) => a.calories - b.calories);
      setMeals(ascendingMeals);
    } else if (selectedFilter === "Descending") {
      const descendingMeals = oldState.sort((a, b) => b.calories - a.calories);
      setMeals(descendingMeals);
    }
  }, [selectedFilter]);

  useEffect(() => {
    const localStorageMeals = JSON.parse(localStorage.getItem("meals"));
    setMeals(localStorageMeals);
  }, [setMeals]);

  // const handleDateChange = (newDate) => {
  //   setDate(newDate);
  // };

  // useEffect(() => {
  //   const dateKey = date.toDateString();
  //   const filteredMeals = meals.filter((meal) => {
  //     const mealDate = new Date(meal.date).toDateString();
  //     return mealDate === dateKey;
  //   });
  //   const intake = filteredMeals.reduce((acc, meal) => acc + meal.calories, 0);
  //   setDailyIntake({ [dateKey]: intake });
  // }, [date, meals]);

  return (
    <div className="App">
      <NavBar />
      {openModal ? <Modal setOpenModal={setOpenModal} /> : ""}
      <TotalCount total={total} />
      <TotalDelete deleteAllMeals={deleteAllMeals} />
      <TotalMealInput
        addMealsHandler={addMealsHandler}
        mealName={mealName}
        calories={calories}
        setMealName={setMealName}
        setCalories={setCalories}
      />

      <div className="app__meals__container">
        <MealsFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <MealsList meals={meals} deleteMealHandler={deleteMealHandler} />
      </div>

      {/* Calendar component
      <div>
        <h2>Calendar</h2>
        <CalendarComponent date={date} handleDateChange={handleDateChange} />
      </div> */}
    </div>
  );
};

export default App;
