import './App.css';
//라우터 기능하려면 필요함
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//임포트로 각각 페이지 맵핑값에 맞는 js 가져오기
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    //https://reactrouter.com/web/example/basic 사이트에서 퍼온것
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
        {/* <Route exact path="/"><LandingPage/></Route> 
          이거랑 이거랑 같은것
          <Route exact path="/" component={LandingPage}/>
        */}
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
