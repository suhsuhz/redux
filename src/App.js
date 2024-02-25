import Search from './search/container/Search';
import React, { useEffect } from 'react';
import 'antd/dist/antd.css'
import { Route } from 'react-router-dom';
import User from './user/container/User';
import Login from './auth/container/Login';
import Signup from './auth/container/Signup';
import { useDispatch } from 'react-redux';
import { actions as authActions } from './auth/state'

function App() {
  // 로딩
  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    const loadingEl = document.getElementById('init-loading');
    bodyEl.removeChild(loadingEl);
  }, []);

  // 앱 마운트시 로그인 되어있는지 액션처리
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.fetchUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Route exact path="/" component={Search} />
      <Route path="/user/:name" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
