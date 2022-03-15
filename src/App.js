import { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFavourite, unfavourite } from './app/slices/slice';
//implement redux store
//save to redux store
//display list from store

function App() {

  const [fact, setFact] = useState();
  const [favourited, setFavourited] = useState();
  const [favouriteDisplay, setFavouriteDisplay] = useState(false);
  const favs = useSelector((state) => state.favourite.value)
  const dispatch = useDispatch();

  useEffect(() => {
    getMeowFact()
  }, [])

  // function getFavourited(){
  //   // var favs = localStorage.getItem("Meowfacts");
  //   // setFavourited(favs);

  //   // get favourited items from Redux store
    
  //   setFavourited(favs);
  // }

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
    // this action will dispatch to the store
    dispatch(setFavourite(fact));
  }

  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/aaffc30d60.js" crossOrigin="anonymous"></script>
      <p>{fact}</p>
      <button onClick={() => {favourite()}}><i className="fa-solid fa-heart"></i>Purrr</button>
      <button onClick={() => getMeowFact()}>Meow</button>
      <button onClick={() => {setFavouriteDisplay(true)}}>Paw</button>
      {favouriteDisplay && (
        <span className='favourites'>
          <h2>Favourited</h2>
          {
            JSON.parse(favourited).map((fav) => {
              
              return (
                <p>{fav}</p>
              )
            })
          }
        </span>
      )}
      
    </div>
  );
}

export default App;