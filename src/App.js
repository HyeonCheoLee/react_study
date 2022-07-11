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

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault(); //reload 막기위해
      const title = event.target.title.value; //event.target는 해당 이벤트가 발생한 지점을 가리키므로 해당 태그를 가리키게 된다. !!
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <textarea name='body' placeholder='body'></textarea>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}

function Update(props){
  const [title, setTitle] = useState(props.title);  //입력박스 입력이 되지않아 state를 생성하여 입력한다. 
  const [body, setBody] = useState(props.body);

  return <article>
  <h2>Update</h2>
  <form onSubmit={event=>{
    event.preventDefault(); //reload 막기위해
    const title = event.target.title.value; //event.target는 해당 이벤트가 발생한 지점을 가리키므로 해당 태그를 가리키게 된다. !!
    const body = event.target.body.value;
    props.onUpdate(title,body);
  }}>
    <p><input type='text' name='title' placeholder='title' value={title} onChange={event=>{
      setTitle(event.target.value); //onChange는 마지막 한글자만 적용이된다. 따라서 글자가 추가될때마다 State를 다시 저장한다.
    }}/></p> 
    <textarea name='body' placeholder='body' value={body} onChange={event=>{
      setBody(event.target.value);
    }}></textarea>
    <p><input type='submit' value='Update'></input></p>
  </form>
</article>
}

function App() {
  // const _mode = useState('WELCOME');  //useState인자는 초기값을 받고 배열을 리턴한다. 1번째 배열은 'WELCOME' 2번째 배열은 함수를 리턴한다.
  // const mode = _mode[0]; //상태값은 0번째 
  // const setMode = _mode[1]; //상태값을 바꿀수 있는 함수인 1번째 인덱스의 함수를 저장한다.
  const [mode, setMode] = useState('WELCOME');  //위의 세줄 코드랑 같음
  const [_id, setId] = useState(null);
  const [nextId, setNextId] = useState(4); //현재  topoics에 id가 3까지있으므로 4를 주는것임 다른 의미는 없음
  const [topics, setTopics] = useState([{id:1, title:"html", body:"html is ..." } //데이터집합 그냥 더미데이터임
                , {id:2, title:"css", body:"css is ..." }
                , {id:3, title:"javscript", body:"javscript is ..." }]);
  let content = null;
  let contextContent = null;
  let _title = null;
  let _body = null;
  if(mode === 'WELCOME'){
    content = <Article title = 'WELCOME' body='hello, web...'></Article>
  }else if(mode === 'READ'){
    console.log(topics, _id)
    
    _title = topics.find(x => x.id === Number(_id)).title;
    _body = topics.find(x => x.id === Number(_id)).body;

    content = <Article title = {_title} body={_body}></Article>
    //react에서는 하나의 태그안에 html을 작성해야한다. 그러기 위하여 <></> 이렇게 빈태그(아무의미가 없는태그)를 넣어서 태그 두개를 이어붙힐수 있다.!!!!!
    contextContent = <><li> 
    <a href={'/update/' + _id} onClick={event=>{  //클릭한경우 발생하는 함수이므로 Update 버튼만 생김 클릭하는 순간 setMode가 실행
    event.preventDefault();
    setMode('UPDATE');
  }}>Update</a> 
  </li>
  <li> 
    <a onClick={()=>{  //클릭한경우 발생하는 함수이므로 Update 버튼만 생김 클릭하는 순간 setMode가 실행
      const newTopics = [...topics];
      newTopics.splice(newTopics[newTopics.findIndex(x=>x.id === Number(_id))],1);
      console.log(newTopics);
      setTopics(newTopics);
      setMode('WELCOME');
  }}>Delete</a> 
  </li>
  </>
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]; //topics 복제
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
      
    }}></Create>
  }else if(mode === 'UPDATE'){
    let title1, body1 = null;
    title1 = topics.find(x => x.id === Number(_id)).title;  //Array 함수 find()에서 x는 해당 배열중 하나의 값을 의미한다. find 함수 검색!!
    body1 = topics.find(x => x.id === Number(_id)).body;
    content = <Update title={title1} body={body1} onUpdate = {(title, body)=>{  //props로 title 와 body와 onUpdate를 받아온다.
      const newTopics = [...topics];
      const updateTopic = {id:Number(_id), title:title, body:body}; //===으로 비교를 하기때문에 자료형또한 맞춰줘야한다. 

      newTopics[newTopics.findIndex(x=>x.id === Number(_id))] = updateTopic;
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
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
      <ul>
        <li>
          <a href='/create' onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>
        </li>
        {contextContent}
      </ul>

      
    </div>
    
  );
}

export default App;
