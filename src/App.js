import './App.scss';
import { useCallback, useEffect, useState } from 'react';
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
  }, [getMeowFact])

  function getFavourited(){
    var favs = localStorage.getItem("Meowfacts");
    setFavouritedFacts(favs);
  }

  useEffect(() => {
    // this action will DISPATCH to the STORE, using the setFavourite REDUCER to update the array
    dispatch(setFavourites(favouritedFacts));
  }, [favouritedFacts, dispatch])

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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"/>


      <div className='generator'>
        <p className='fact'>{fact}</p>
        <span className='buttons'>
          <button onClick={() => { favourite(); getFavourited()}}>Purrr<i className="fas fa-heart button-icon"></i></button>
          <button onClick={() => getMeowFact()}>Meow<i className="fas fa-plus button-icon"></i></button>
          <button onClick={() => {setFavouriteDisplay(true)}}>Paw<i className="fas fa-list button-icon"></i></button>
        </span>
      </div>
      {favouriteDisplay && (
        <div className='favourites'>
          <div className='heading-container'>
            <h2 className='favourites-heading'>Favourited</h2>
          </div>
          <div className='fact-list'>
          {
            JSON.parse(favourited).map((fav, index) => {
              return (
                <p key={index} className='favourite-fact'>{fav}</p>
              )
            })
          }
          </div>
        </div>
      )}
    </div>
  );
}

export default App;