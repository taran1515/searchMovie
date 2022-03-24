import React, { Component } from "react";
import { Tabs, Select } from "antd";

import SearchMovieTab from "./searchMovie";

export class MoviePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Select></Select>
        <Tabs type="card">
          <Tabs.TabPane tab="Movies Tab" key="1">
            <SearchMovieTab />
          </Tabs.TabPane>
        </Tabs>
      </>
    );
  }
}

export default SearchMovieTab;
