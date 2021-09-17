

export function getBoard(id,comp) {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    let myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    let myRequest = new Request('kaban/boards/'+id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => {
            comp.setState({board:data,loaded:true})
        })
        .catch(console.log)
}

export function getCategory(id,comp) {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Host","localhost:3000")
    let myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    let myRequest = new Request('kaban/category/'+id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => {
            comp.setState({category:data})
        })
        .catch(console.log)

}

export function getPost(id,comp) {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    let myInit = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };

    let myRequest = new Request('kaban/posts/'+id,myInit);

    fetch(myRequest,myInit)
        .then(res => res.json())
        .then((data) => {
            comp.setState({post:data})
        })
        .catch(console.log)
}

export function addNewPost(parentCategory) {
    let myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-type", "application/json");
    let myInit = {
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

    let myRequest = new Request('kaban/posts/'+parentCategory.state.categoryid,myInit);

    fetch(myRequest,myInit)
        .then(getCategory(parentCategory.state.categoryid,parentCategory))
        .catch(console.log)
    console.log("Added");
}

export function addNewCategory(parentBoard) {
    let myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-type", "application/json");
    let myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body : "{\n" +
            "  \"id\": 0,\n" +
            "  \"name\": \"string\"" +
            "}"
    };

    let myRequest = new Request('kaban/category/'+parentBoard.state.boardid,myInit);

    fetch(myRequest,myInit)
        .then(getBoard(parentBoard.state.boardid,parentBoard))
        .catch(console.log)
    console.log("Added");
}

export function getBoards(parent) {
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
            parent.setState({boards:data})
        })
        .then(() =>
            parent.setState({loaded:true}))
        .catch(console.log)
}

