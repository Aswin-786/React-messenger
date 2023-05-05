import './index.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/Context'
import FullChats from './components/FullChats';
import { ChatContext } from './store/ChatContext';

function App() {

  // Get authentication context
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  // Get Firebase context
  const { firebase } = useContext(FirebaseContext);
  // Get chat context
  const { data } = React.useContext(ChatContext);

  // to manage loading status 
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // check if there is a logged in user
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [setCurrentUser, firebase]);
  // checking user login or not
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return null;
    }
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return children;
  }
  // Redirect to home page if chatId is not present
  const ChatProtect = ({ children }) => {
    if (data.chatId === 'null') {
      return <Redirect to="/" />;
    }
    return children;
  }

  return (
    <Router>
      <Route exact path='/'>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/chat'>
        <ChatProtect>
          <FullChats />
        </ChatProtect>

      </Route>
    </Router>
  );
}
export default App;