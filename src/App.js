/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import RandExp from "randexp";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Button,
  InputNumber,
  Typography,
  Divider,
} from "antd";

function App() {
  const [password, setPassword] = useState({
    value: null,
  });
  const [number, setNumber] = useState({
    value: 6,
  });

  const onFinish = (values) => {
    if (
      !values.uppercase &&
      !values.symbols &&
      !values.lowercase &&
      !values.number
    ) {
      setPassword({ error: true, value: "Tick at least one of the checkbox" });
    } else if (!values.length) {
      setPassword({ error: true, value: "Length of password invalid" });
    } else {
      const temp = `[${values.uppercase ? "A-Z" : ""}${
        values.lowercase ? "a-z" : ""
      }${values.number ? "0-9" : ""}${values.symbols ? "!@#$%^&*" : ""}]{${
        values.length
      }}`;

      const regex = new RegExp(temp);
      setPassword({ value: new RandExp(regex).gen() });
    }
  };

  const onNumberChange = (value) => {
    if (typeof value !== "number" || value < 6) {
      value = 6;
    } else if (value > 32) {
      value = 32;
    }
    setNumber({ value });
  };

  const tips = "The prime between 6 and 32!";

  return (
    <Row justify="center">
      <Col xs={22} sm={18} md={14} lg={10} xl={6}>
        <Typography.Title level={2}>Password Generator</Typography.Title>
        <Divider />
        <Form
          onFinish={onFinish}
          initialValues={{
            uppercase: true,
            lowercase: true,
            number: true,
            symbols: true,
            length: 6,
          }}
        >
          <Form.Item name="uppercase" valuePropName="checked">
            <Checkbox>UpperCase letters</Checkbox>
          </Form.Item>
          <Form.Item name="lowercase" valuePropName="checked">
            <Checkbox>LowerCase letters</Checkbox>
          </Form.Item>
          <Form.Item name="number" valuePropName="checked">
            <Checkbox>Numbers</Checkbox>
          </Form.Item>
          <Form.Item name="symbols" valuePropName="checked">
            <Checkbox>Symbols</Checkbox>
          </Form.Item>
          <Form.Item
            name="length"
            label="Password length"
            validateStatus={number.validateStatus}
            help={number.errorMsg || tips}
          >
            <InputNumber
              min={6}
              max={32}
              value={number.value}
              onChange={onNumberChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Typography.Title
          copyable={password.value}
          level={4}
          code={password.value}
          type={password.error && "danger"}
        >
          {password.value}
        </Typography.Title>
      </Col>
    </Row>
  );
}

export default App;
