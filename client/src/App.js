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
//auth 사용하기 
import Auth from './hoc/auth'

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

          맵핑값 이렇게 정한것 스프링이랑 비슷함
        */}
        {/* auth 사용하려면 Auth로 컴포넌트를 감싸줘야된다.
          auth.js에 
          //adminRoute = null는 어드민인지 판단하는건데 true면 어드민이고 아무것도 안넣으면 자동 null넣는다는 문법이라함
          export default function (SpecificComponent, option, adminRoute = null){
            이거 파라미터에 맞게 넣는것임
      
        */}
          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
