import { CloudDownloadOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { regExp_Email } from "../../../helpers/regExp";
import { login } from "../../../store/slices/admin/authSlice";

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [endYear, setEndYear] = useState("YYYY");

  const successCb = () => {
    location.reload();
  };
  const onChange = (date) => {
    setEndYear(date.add(1, "year").format("YYYY"));
  };

  const onFinish = async (values) => {
    dispatch(
      login({
        successCb,
        body: values,
      })
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <div className=" flex justify-between items-center">
        <Typography.Title level={4}>Personal Information</Typography.Title>

        <Button
          type="primary"
          icon={<CloudDownloadOutlined />}
          className=" flex items-center justify-center"
        >
          <b>LOAD T.R.A.C.E. ACCOUNT</b>
        </Button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-3">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter your first name!",
            },
          ]}
        >
          <Input placeholder="Enter first Name" autoComplete="off" />
        </Form.Item>
        <Form.Item label="Middle Name" name="middleName">
          <Input placeholder="Enter middle Name" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
          ]}
        >
          <Input placeholder="Enter Last Name" autoComplete="off" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Birthdate (YYYY-MM-DD)"
          name="birthdate"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Birthdate is required!",
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder="Select birth date"
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="sex"
          rules={[
            {
              required: true,
              message: "Please enter your gender!",
            },
          ]}
        >
          <Select
            options={[
              {
                value: "0",
                label: "Male",
              },
              {
                value: "1",
                label: "Female",
              },
            ]}
            placeholder="Select gender"
          />
        </Form.Item>

        <Form.Item className="w-full" label="Mobile Number" name="mobileNumber">
          <Input
            placeholder="9 digit number"
            prefix="639"
            maxLength={9}
            onChange={({ target }) => {
              form.setFieldValue(
                "mobileNumber",
                // eslint-disable-next-line no-useless-escape
                target.value.replace(/[- #*;,.<>\{\}\[\]\\\/]|[^0-9]/gi, "")
              );
            }}
            controls={false}
          />
        </Form.Item>

        <Form.Item label="Facebook Name" name="fbName">
          <Input placeholder="Enter facebook Name" autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            // {
            //   type: "email",
            //   message: "Invalid email format.",
            // },
            {
              pattern: regExp_Email,
              message: "Invalid email format",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Enter your username"
          />
        </Form.Item>
      </div>
      <Typography.Title level={4}>Other Information</Typography.Title>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-3">
        <Form.Item
          label="School Name"
          name="schoolName"
          rules={[
            {
              required: true,
              message: "Please enter your school name!",
            },
          ]}
        >
          <Input placeholder="Enter school Name" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Grade Level"
          name="grade"
          rules={[
            {
              required: true,
              message: "Please select your grade level!",
            },
          ]}
        >
          <Select
            options={[
              {
                value: "Grade 6",
                label: "Grade 6",
              },
              {
                value: "Grade 7",
                label: "Grade 7",
              },
              {
                value: "Grade 8",
                label: "Grade 8",
              },
              {
                value: "Grade 9",
                label: "Grade 9",
              },
              {
                value: "Grade 10",
                label: "Grade 10",
              },
              {
                value: "Grade 11",
                label: "Grade 11",
              },
              {
                value: "Grade 12",
                label: "Grade 12",
              },
            ]}
            placeholder="Select grade level"
          />
        </Form.Item>
        <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1wmcjyn">
          <label className="ant-form-item-required">School Year</label>
          <div className="flex">
            <Form.Item
              name="year"
              rules={[
                {
                  required: true,
                  message: "Please select your school year!",
                },
              ]}
            >
              <DatePicker
                inputReadOnly={true}
                onChange={onChange}
                picker="year"
              />{" "}
              - {endYear}
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label="Guardian Name"
          name="guardianName"
          rules={[
            {
              required: true,
              message: "Please enter your guardian name!",
            },
          ]}
        >
          <Input placeholder="Enter guardian name" autoComplete="off" />
        </Form.Item>
        <Form.Item label="Religion" name="religion">
          <Input placeholder="Enter religion" autoComplete="off" />
        </Form.Item>
        <Form.Item label="Skills you want to learn (Check any)" name="skill">
          <Checkbox.Group>
            <div className=" grid  grid-cols-1 lg:grid-cols-2">
              {[
                "TAEKWONDO/SPORTS",
                "MUSIC/SINGING/INSTR",
                "SPEAKING/COMSKILLS",
                "CAREER GROWTH",
                "STUDIES/MEMORY",
              ].map((data, i) => (
                <Checkbox key={i} value={data}>
                  {data}
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className=" w-full">
          SUBMIT
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
