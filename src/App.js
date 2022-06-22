import './App.css';
import {useState} from 'react'; //상태를 만들어주는 리액트 객체, state 가 변경되면 컴포넌트는 리렌더링 한다.
//컴포넌트 셍성
//리액트에서 사용자 정의태그는 반드시 대문자로 시작
//html 코드는 리턴 옆에서부터 써줘야함
//중요 컴포넌트에서 props(컴포넌트 속성을 모아둔 객체)를 파라미터로 받을 수 있음
function Header(props){
  console.log(props.href);
  return <header>
    <h1>
      <a href='/' onClick={(event)=>{
        event.preventDefault(); //해당 태그가 가진 기본동작 이벤트를 실행시키지않음 (href로 페이지 이동을 하도록 했지만 이를 막음) 
        props.onchange();
      }}>{props.title}</a>
    </h1>
  </header>
}

function Nav(props){

  const lis = [];
  
  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i]

    lis.push(<li key={t.id}><a id = {t.id} href={'/read/'+ t.id} onClick={event=>{
      event.preventDefault(); //해당 태그가 가진 기본동작 이벤트를 실행시키지않음 (href로 페이지 이동을 하도록 했지만 이를 막음) 
      props.onchange(event.target.id);
    }}>{t.title}</a></li>); // 자동으로 생성된 태그의 경우 태그 추적을 위해 식별할수 있는 key가 필요하다.
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // const _mode = useState('WELCOME');  //useState인자는 초기값을 받고 배열을 리턴한다. 1번째 배열은 'WELCOME' 2번째 배열은 함수를 리턴한다.
  // const mode = _mode[0]; //상태값은 0번째 
  // const setMode = _mode[1]; //상태값을 바꿀수 있는 함수인 1번째 인덱스의 함수를 저장한다.
  const [mode, setMode] = useState('WELCOME');  //위의 세줄 코드랑 같음
  const [_id, setId] = useState(null);

  const topics = [{id:1, title:"html", body:"html is ..." }
                , {id:2, title:"css", body:"css is ..." }
                , {id:3, title:"javscript", body:"javscript is ..." }];
  let content = null;
  let _title = null;
  let _body = null;
  if(mode === 'WELCOME'){
    content = <Article title = 'WELCOME' body='hello, web...'></Article>
  }else if(mode === 'READ'){
    
    _title = topics.find(x => x.id === Number(_id)).title;
    _body = topics.find(x => x.id === Number(_id)).body;

    content = <Article title = {_title} body={_body}></Article>
  }

  return (
    //브라우저에 보여지는 영역 App
    // <div className="App">

    // </div>
    //속성으로 지정한 title이나 href 같은 것들이 prop으로 전송된다!!!매우중요!!!
    <div>
      <Header title='react' href='root' onchange = {()=>{
        // mode = 'WELCOME';
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onchange = {(id) => {
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
    </div>
    
  );
}

export default App;
