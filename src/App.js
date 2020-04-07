/* eslint-disable prettier/prettier */
import React, { useState } from "react";
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
  const [pLength, setPLength] = useState({
    value: 6,
  });

  const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const randomUpperCase = () => {
    return String.fromCharCode(randomInt(26) + 65);
  };

  const randomLowerCase = () => {
    return String.fromCharCode(randomInt(26) + 97);
  };

  const randomNumber = () => {
    return +String.fromCharCode(randomInt(10) + 48);
  };

  const randomSymbol = () => {
    const symbols = "!#$%&()*+,.";
    return Array.from(symbols)[randomInt(symbols.length)];
  };

  const funcs = {
    uppercase: randomUpperCase,
    lowercase: randomLowerCase,
    number: randomNumber,
    symbols: randomSymbol,
  };

  const onFinish = (values) => {
    const { uppercase, lowercase, number, symbols, length } = values;
    const types = [
      { uppercase },
      { lowercase },
      { number },
      { symbols },
    ].filter((item) => Object.values(item)[0]);
    if (!types.length || !length) {
      setPassword({ error: true, value: "Invalid Input" });
    } else {
      let value = "";
      for (let i = 0; i < length; i += 1) {
        value += funcs[Object.keys(types[randomInt(types.length)])[0]]();
      }
      setPassword({ value });
    }
  };

  const onNumberChange = (value) => {
    if (typeof value !== "number" || value < 6) {
      value = 6;
    } else if (value > 32) {
      value = 32;
    }
    setPLength({ value });
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
            validateStatus={pLength.validateStatus}
            help={pLength.errorMsg || tips}
          >
            <InputNumber
              min={6}
              max={32}
              value={pLength.value}
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
