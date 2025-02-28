
import Header from './Header'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Browse from './Home'
import Login from './Login'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import CheckBookAvailability from './BookAvailability';
import IssueBook from './IssueBook';
import ReturnBook from './ReturnBook';
import BookGenres from './BookGenres';
import GenreBooks from './GenreBooks';
import BooksByGenre from './GenreBooks';

const Body = () => {

    const dispatch= useDispatch();

    // const navigate = useNavigate();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/browse",
      element: <Browse/>
    },
    {
      path : "/book-availability",
      element : <CheckBookAvailability/>
    },
    {
      path : "/issue-book",
      element : <IssueBook/>
    },
    {
      path : "/return-book",
      element : <ReturnBook/>
    },
    {
      path : "/genres",
      element : <BookGenres/>
    },
    {
      path : "/genre/:genre",
      element : <BooksByGenre/>
    }
  ])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const {uid, email, displayName, photoURL} = user;
      dispatch(addUser({uid:uid, displayName:displayName, email:email, photoURL: photoURL }));
    //   Navigate()

      // ...
    } else {
      // User is signed out
      dispatch(removeUser);
      // ...
    }
  },[]);

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body