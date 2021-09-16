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

                        <Board board={this.state.currentBoard}/>
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

function getBoard(id) {
    var board = null;

    var myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");

    var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    var myRequest = new Request('kaban/boards/' + id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => board = data)
        .catch(console.log)
    return board;
}

function getBoardForCategory(id,category) {
    var board = null;

    var myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");

    var myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    var myRequest = new Request('kaban/boards/1',myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => board = data)
        .catch(console.log)
    category.setState({board:board});
}

class BoardSelector extends React.Component {
    state = {
        number:0
    };

    onClick() {
        console.log("preesed")
    }

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

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state.post = this.props.post
    }

    state = {
        post:null
    }
    render() {
        return (
        <div className={"App-post"}>
            <h4 className={"App-post-header"}>{this.state.post.title}</h4>
            <p>Content</p>
        </div>
        );
    }
}



class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state.board = props.board
    }

    state = {
        board: "Hello world"
    }
    render() {
        return (
            <div className={"App-board"}>
                <h2 className={"App-board-header"}>{this.state.board.title}</h2>
                <div className={"Board-canvas"} >
                    <div className={"App-category-container"}>
                        {
                            this.state.board.categories.map(category =>
                                <Category category={category} board={this.state.board} />
                            )
                        }
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
        this.state.category = props.category;
        this.state.board = props.board;
        this.state.board = props.board;
        this.addNewPost = this.addNewPost.bind(this)


    }

    state = {
        category:null,
        board:null,
    }

    addNewPost(board, category) {
        console.log("Adding post to board " + board + " and category " + category);

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

        var myRequest = new Request('kaban/posts/1',myInit);

        fetch(myRequest,myInit)
            .catch(console.log)
        console.log("Added");
       getBoardForCategory(board.id,this)


    }

    render() {
        console.log(this.state.category);
        if (this.state.board === null) {
            return (
                <div className={"App-category"}>
                    <h3 className={"App-category-header"}>{this.state.category.name}</h3>
                    <div className={"App-post-container"}>
                        Loading
                        <div className={"App-post-button"} onClick={() => this.addNewPost(this.state.board.id,this.state.category.id)}>Add new Post</div>
                    </div>
                </div>
            );
        }
        return (
            <div className={"App-category"}>
                <h3 className={"App-category-header"}>{this.state.category.name}</h3>
                <div className={"App-post-container"}>
                    {
                        this.state.board.posts.map(p =>
                       <Post post={p}/>
                    )}
                    <div className={"App-post-button"} onClick={() => this.addNewPost(this.state.board.id,this.state.category.id)}>Add new Post</div>
                </div>
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
