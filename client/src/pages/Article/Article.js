import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Article extends Component {
  // Setting our component's initial state
  state = {
    search: "",
    articles: [],
    url: "",
    date: "",
    savedArticles: []
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res => 
        this.setState({ savedArticles: res.data})
      )
      .catch(err=> console.log(err));
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    API.getArticles(this.state.search)
      .then(res => {
        this.setState({ articles: res.data.response.docs});
        console.log(res.data);
      })
      .catch(err=> console.log(err));
    this.setState({search: "", author: "", synopsis: ""});
  };

  saveArticle = (title, date, url) => {
    console.log(title);
    console.log(date);
    console.log(url);
    API.saveArticle({
      title: title,
      date: date,
      url: url
    })
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  }

  deleteArticle = (id) => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err=> console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Article Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Search Term (Required)"
              />
              <FormBtn
                disabled={!(this.state.search)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <a href={article.url}>
                        <strong>
                          Title: {article.title} <br></br>
                          Published On: {article.date}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {/* <h1>{this.state.articles}</h1> */}
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => {
                  return (
                    <ListItem key={article.docs}>
                      <a href={article.web_url}>
                        <strong>
                          Title: {article.headline.main} <br></br>
                          Published On: {article.pub_date}
                        </strong>
                      </a>
                      <SaveBtn onClick={() => this.saveArticle(article.headline.main, article.pub_date, article.web_url)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Article;
