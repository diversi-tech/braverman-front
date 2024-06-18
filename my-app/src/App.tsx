import  { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Redux/actions';
import Nav from './Component/nav.component';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state:{ user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);

  useEffect(() => {
    // לדוגמה, ניתן לקרוא ל-API כדי לוודא את מצב המשתמש
    const user = { username: 'JohnDoe', role: 'worker' }; // נתונים לדוגמה
    dispatch(setUser(user));
  }, [dispatch]);

 

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Nav />
          <p>Welcome to the app!</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};


export default App;
