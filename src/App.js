import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import {addNewCategory, addNewPost, getBoard, getBoards, getCategory, getPost} from "./Utils";


function App() {
  return (
      <div className={"App"}>
          <header className={"App-header"}>
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
          <div className={"App-body"}>
              <Home />
          </div>
      </div>
  );
}


/*** Board selection home ***/
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state =  {
        boards:null,

        boardId:null,
        board:null,

        loaded:false,
        chosen:false
    }

    componentDidMount() {
        getBoards(this);
    }

    renderChosen() {
        return (
            <div>
                <Board boardid={this.state.boardId} />
            </div>
        );
    }
    renderLoaded() {
        return (
            <div>
                <h3>Choose a Board</h3>
                <div className={"Board-selection-container"}>
                    {this.state.boards.map(board =>
                        <div key={board.id} className={"Board-selection"} onClick={() => {this.setState({boardId: board.id, chosen: true});}}>
                            <h4>{board.title}</h4>
                            <div>{board.id}</div>
                        </div>
                    )
                    }
                </div>
            </div>
        );

    }
    renderLoading() {
        return (
            <div>
                <h3>Choose a Board</h3>
                {
                    <h3>Loading...</h3>
                }
            </div>
        );
    }
    render() {
        if (this.state.chosen) {
            return this.renderChosen()
        }
        if (this.state.loaded) {
            return this.renderLoaded()
        }
        return this.renderLoading()
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
        boardid:null,
        loaded:false
    }

    render() {
        if (!this.state.loaded) {
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
                        <div className={"App-category"} onClick={() => addNewCategory(this)}>
                            Add new Category
                        </div>
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



    }

    state = {
        category:null,
        categoryid:null
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
                    {/*
                       this.state.category.posts.map(post =>
                            <Post postid={post} />
                        )
                    */}
                    <div className={"App-post-button"} onClick={() => addNewPost(this)}>
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






export default App;

