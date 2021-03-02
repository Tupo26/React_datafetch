import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class News extends React.Component{
	constructor(props){
		super(props);
		this.state = { 
			isloaded: false,
			posts: [] 
		};
	}
	
	componentWillMount(){
		this.fetchData();
	}
	
	fetchData(){
		fetch('http://hn.algolia.com/api/v1/search?tags=front_page')
			.then(response => response.json())
			.then((result) => {
				this.setState({
					isloaded: true,
					posts: result.hits
				});
			})
	}
	
	render(){
		const isloaded = this.state.isloaded;
		const posts = this.state.posts;
		
		if(!isloaded)
			return <div>Loading..</div>;
		else{
			return(
			<ul>
			{posts.map(post => (
				<li key={post.objectID}>
					<a href={post.url}>{post.title}</a>
				</li>
			))}
			</ul> ); 
		 }
	}
}

function App() {
  return (
    <div className="App">
		<p>Datan nouto itse harjoitus</p>
		<h1>Hacker News REST API</h1>
		<div className="list">
			<News />
		</div>
    </div>
  );
}

export default App;
