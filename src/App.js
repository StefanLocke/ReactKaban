import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from 'react-dom'

function App() {
  return (
        <Application></Application>
  );
}

class Application extends React.Component {


    state = {
        board: "loading"
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
        console.log("doing get")
        fetch(" http://localhost:8080/kaban/boards/1")
            .then(res => res.json())
            .then((data) => {
                this.setState({board:data})
            })
            .catch(console.log)
    }




    render() {
        console.log(this.state.board)
        if (this.state.board == "loading") {
            return (<div>Loading</div>);
        }
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
                <body className="App-body">
                    <Board board={this.state.board}/>
                </body>
            </div>
        );
    }
}



class Post extends React.Component {

    render() {
        return (
        <div className={"App-post"}>
            <h4 className={"App-post-header"}>Title</h4>
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
                        <Category />
                        <Category />
                        <Category />
                        <Category />
                        <Category />
                        <Category />
                        <AddCategoryButton/>
                    </div>

                </div>
            </div>
        );
    }
}



class Category extends React.Component {

    render() {
        return (
            <div className={"App-category"}>
                <h3 className={"App-category-header"}>Category x</h3>
                <div className={"App-post-container"}>
                    <Post />
                    <Post />
                </div>


            </div>
        );
    }
}

class AddCategoryButton extends React.Component {
    render() {
        return (
            <div>
                <a className={"App-category-button"} >Add new Category</a>
            </div>
        );
    }
}



export default App;
