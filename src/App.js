import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
        <Application></Application>
  );
}

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.setBoard = this.setBoard.bind(this)
    }
    state = {
        boards: [],
        currentBoard:null
    }

    setBoard(thing) {
        this.setState({currentBoard:thing})
    }


    /*choose(){

        return (
            <div>
                <h4>menu</h4>
                <button onClick={this.openBoards}>OpenBoards</button>
            </div>
        );
    }*/

    componentDidMount(){
        var myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");

        var myInit = { method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default' };

        var myRequest = new Request('kaban/boards',myInit);

        fetch(myRequest,myInit)
            .then(res => res.json())
            .then((data) => {
                this.setState({boards:data})
            })
            .catch(console.log)
    }




    render() {
        console.log(this.state.boards)
        if (this.state.boards === "undefined") {
            return (<div>Loading {this.state.boards}</div>);
        }

        if (this.state.currentBoard != null)
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Kaban implementation using React and JAX-RS
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub sources.
                        </a>
                    </header>
                    <div className="App-body">

                        <Board boardid={this.state.currentBoard.id}/>
                    </div>
                </div>
            );
        return (
            //<Test board={this.state.board}/>

            /*<div>
                {this.state.board}
            </div>*/
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Kaban implementation using React and JAX-RS
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub sources.
                    </a>
                </header>
                <div className="App-body">

                    <BoardSelector boards={this.state.boards} setter={this.setBoard} />
                </div>
            </div>
        );
    }
}


function getBoard(id,comp) {
    var board = null;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    var myRequest = new Request('kaban/boards/'+id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => {
            comp.setState({board:data})
        })
        .catch(console.log)
}

function getCategory(id,comp) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    var myRequest = new Request('kaban/category/'+id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => {
            comp.setState({category:data})
        })
        .catch(console.log)

}

function getPost(id,comp) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    var myRequest = new Request('kaban/posts/'+id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => {
            comp.setState({post:data})
        })
        .catch(console.log)
}



class BoardSelector extends React.Component {
    state = {
        number:0
    };


    render() {
        if (this.state.number != 0) {
            return (
                <div>
                    <h3>Board</h3>
                    {getBoard(this.state.number)}
                </div>
            );
        }
        return (
            <div>
                <h3>Choose a board to visualise</h3>
                <ul>
                    {
                        this.props.boards.map((board) =>
                            <li><a href={"#"} onClick={() => {
                                this.props.setter(board)
                            }}><span>{board.id} - {board.title}</span></a></li>
                        )
                    }
                </ul>
            </div>
        );

    }
}



class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state.boardid = props.boardid
    }

    componentDidMount() {
        getBoard(this.state.boardid,this)
    }

    state = {
        board:null,
        boardid:null
    }

    render() {
        if (this.state.board === null) {
            return (
                <div className={"App-board"}>
                    <h2 className={"App-board-header"}>Loading...</h2>
                </div>
            );
        }
        return (
            <div className={"App-board"}>
                <h2 className={"App-board-header"}>{this.state.board.title}</h2>
                <div className={"Board-canvas"} >
                    <div className={"App-category-container"}>
                        {this.state.board.categories.map(category =>
                            <Category categoryid={category}/>
                        )}
                        <AddCategoryButton/>
                    </div>

                </div>
            </div>
        );
    }
}



class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state.categoryid = props.categoryid;

        this.addNewPost = this.addNewPost.bind(this)


    }

    state = {
        category:null,
        categoryid:null
    }

    addNewPost(categoryid) {

        var myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-type", "application/json");
        var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body : "{\n" +
                "    \"id\": 0,\n" +
                "    \"title\": \"new title\",\n" +
                "    \"content\": \"some content\",\n" +
                "    \"category\": null,\n" +
                "    \"tags\": null\n" +
                "}"
        };

        var myRequest = new Request('kaban/posts/'+categoryid,myInit);

        fetch(myRequest,myInit)
            .then(getCategory(categoryid,this))
            .catch(console.log)
        console.log("Added");


    }

    componentDidMount() {
        getCategory(this.state.categoryid,this)
    }

    render() {
        console.log(this.state.category);
        if (this.state.category === null) {
            return (
                <div className={"App-category"}>
                    <h3 className={"App-category-header"}>Loading...</h3>
                </div>
            );
        }
        return (
            <div className={"App-category"}>
                <h3 className={"App-category-header"}>{this.state.category.name}</h3>
                <div className={"App-post-container"}>
                    {
                       this.state.category.posts.map(post =>
                            <Post postid={post} />
                        )
                    }
                    <div className={"App-post-button"} onClick={() => this.addNewPost(this.state.categoryid)}>
                        Add new Post
                    </div>
                </div>
            </div>
        );
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state.postid = this.props.postid
    }
    componentDidMount() {
        getPost(this.state.postid,this)
    }

    state = {
        post:null,
        postid:null
    }
    render() {
        if (this.state.post === null ){
            return (
                <div className={"App-post"}>
                    <h4 className={"App-post-header"}>Loading...</h4>
                </div>
            );
        }
        return (
            <div className={"App-post"}>
                <h4 className={"App-post-header"}>{this.state.post.title}</h4>
                <p>{this.state.post.content}</p>
            </div>
        );
    }
}



class AddCategoryButton extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}



export default App;
