import React from "react";
import { Input, Button, Row, notification, Table } from "antd";
import { handleMovieSearch } from "../../api/index";
// import loginImg from "../../login.svg";

export class SearchMovieTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      filteredMovies: [],
      offset: 0,
      limit: 10,
    };
  }

  componentDidMount = () => {
    this.fetchMovies();
  };

  fetchMovies = async () => {
    const { searchKeyword, offset, limit } = this.state;
    console.log("searchKeyword", searchKeyword);
    if (searchKeyword.length === 0) {
      return;
    }

    const body = {
      searchKeyword,
      limit,
      offset,
    };
    const data = await handleMovieSearch(body);

    if (data.success === true) {
      this.setState({
        filteredMovies: data.response,
      });
      this.openNotification("Successfully Fetch Movies");
    } else {
      this.openNotification("Failed  to Fetch Movies");
    }
  };

  handleChange = (name, value) => {
    // name null check
    if (!name) {
      console.error("name is undefined or empty, please check.");
      return;
    }

    console.log("name-value", name, value);

    this.setState({
      [name]: value,
    });
  };

  openNotification = (description = "", type = "success", duration = 5) => {
    const args = {
      message: "Notification",
      description,
      duration,
    };
    notification[type](args);
  };

  getData = () => {
    const data = this.state.filteredMovies;

    console.log("data", data);

    const columns = [
      {
        title: "Search Keyword",
        dataIndex: "searchKeyword",
        key: "searchKeyword",
      },
      {
        title: "Movie Title",
        dataIndex: "title",
        key: "title",
      },
    ];

    return { data, columns };
  };

  handlePrevious = () => {
    const { offset, limit } = this.state;

    if (offset === 0) {
      return;
    }

    this.setState({ offset: offset - limit }, this.fetchMovies);
  };

  handleNext = () => {
    const { offset, limit } = this.state;

    console.log(offset, limit);

    if (offset === 0) {
      return;
    }

    this.setState({ offset: offset + limit }, this.fetchMovies);
  };

  render() {
    const { data, columns } = this.getData();
    return (
      <>
        <br />
        <br />
        <Input
          style={{ width: 250 }}
          placeholder="Search Movie by Title"
          onChange={(e) => this.handleChange("searchKeyword", e.target.value)}
          value={this.state.searchKeyword}
        />
        <br />
        <br />

        <Button type="primary" onClick={this.fetchMovies}>
          Submit
        </Button>

        <Table
          style={{ width: "100vw", marginTop: "30px" }}
          bordered
          pagination={false}
          dataSource={data}
          columns={columns}
        />
        <br />

        <Row justify="center">
          <Button type="primary" onClick={this.handlePrevious}>
            Previous
          </Button>
          &nbsp;
          <Button type="primary" onClick={this.handleNext}>
            Next
          </Button>
        </Row>
      </>
    );
  }
}

export default SearchMovieTab;
