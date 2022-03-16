import './App.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFavourites } from './app/slices/slice';

function App() {
  const [fact, setFact] = useState();
  const [favouriteDisplay, setFavouriteDisplay] = useState(false);
  const [favouritedFacts, setFavouritedFacts] = useState([]);
  const favourited = useSelector((state) => state.favourite.value);
  const dispatch = useDispatch();

  useEffect(() => {
    getMeowFact();
    getFavourited();
  }, [])

  function getFavourited(){
    var favs = localStorage.getItem("Meowfacts");
    setFavouritedFacts(favs);
  }

  useEffect(() => {
    // this action will DISPATCH to the STORE, using the setFavourite REDUCER to update the array
    dispatch(setFavourites(favouritedFacts));
  }, [favouritedFacts])

  function getMeowFact(){
    fetch('https://meowfacts.herokuapp.com/').then(data => data.json()).then(responseData => {
      setFact(responseData.data);
    })
  }

  function favourite(){
    var savedMeows;
    
    if (localStorage.getItem("Meowfacts") !== null){
      savedMeows = JSON.parse(localStorage.getItem("Meowfacts"));
    }
   
    if (savedMeows === undefined){
      savedMeows = fact;
    } else {
      savedMeows.push(fact[0]);
    }

    localStorage.setItem('Meowfacts', JSON.stringify(savedMeows));
  }

  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/aaffc30d60.js" crossOrigin="anonymous"></script>
      <p className='fact'>{fact}</p>
      <span className='buttons'>
        <button onClick={() => { favourite(); getFavourited()}}><i className="fa-solid fa-heart"></i>Purrr</button>
        <button onClick={() => getMeowFact()}>Meow</button>
        <button onClick={() => {setFavouriteDisplay(true)}}>Paw</button>
      </span>
      {favouriteDisplay && (
        <div className='favourites'>
          <h2>Favourited</h2>
          {
            JSON.parse(favourited).map((fav, index) => {
              return (
                <p key={index}>{fav}</p>
              )
            })
          }
        </div>
      )}
    </div>
  );
}

export default App;