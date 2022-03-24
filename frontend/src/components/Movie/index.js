import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import Notification from "../../utils/helper";
// import loginImg from "../../login.svg";

export class SearchMovie extends React.Component {
  constructor(props) {
    super(props);
  }

  openNotification = (description = "", type = "success", duration = 5) => {
    const args = {
      message: "Notification",
      description,
      duration,
    };
    notification[type](args);
  };

  onFinish = (values) => {};

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return <>Hello World</>;
  }
}

export default SearchMovie;
