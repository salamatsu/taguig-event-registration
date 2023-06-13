/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CheckOutlined, CloudDownloadOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import { regExp_Email } from "../../../helpers/regExp";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { searchTraceUser, searchTraceUser_Success, searchTraceUsers } from "../../../store/slices/admin/eventSlice";
import { useEffect, useState } from "react";
import { validateTraceQrCode } from "../../../helpers/validateTrace";
import TraceResults_Modal from "../modal/TraceResults_Modal";

const RegistrationForm = ({
  form,
  onFinish = () => {},
  endYear,
  hanldeOnchangeDate = () => {},
  isloading,
  isQrCode = false,
  isEdit =false
}) => {
  const dispatch = useDispatch()
  const {
    isLoading_searchTraceUser,
    traceUser,
    isLoading_searchTraceUsers,
    list_searchTraceUsers
  } = useSelector((state) => state.eventSlice);
  const name_watch = Form.useWatch([], form);
  const [toggleTraceButton, setToggleTraceButton] = useState(false);
  const [isVisibleTraceResultModal, setIsVisibleTraceResultModal] = useState(false);

  useEffect(() => {
      form
      .validateFields(['firstName', 'lastName'],{
        validateOnly: true,
      })
      .then(
        (values) => {
          setToggleTraceButton(true)
        },
      )
      .catch(error => {
          setToggleTraceButton(false)
      });

  }, [form, name_watch]);

 const callback = () => {
  if(traceUser){
    form.setFieldsValue({
      firstName:traceUser?.firstName,
      middleName:traceUser?.middleName,
      lastName:traceUser?.lastName,
      birthdate: dayjs(traceUser.birthdate),
      email:traceUser?.email,
      sex:traceUser?.sex,
      mobileNumber: traceUser?.mobileNumber?.substring(3),
      guardianName:traceUser.contactPersonName,
      guardianNumber: traceUser?.contactPersonNumber?.substring(3),
    });
    
    form.setFieldsValue({
      firstName:traceUser?.firstName,
      middleName:traceUser?.middleName,
      lastName:traceUser?.lastName,
      birthdate: dayjs(traceUser.birthdate),
      email:traceUser?.email,
      sex:traceUser?.sex,
      mobileNumber: traceUser?.mobileNumber?.substring(3),
      guardianName: traceUser.contactPersonName,
      guardianNumber: traceUser?.contactPersonNumber?.substring(3),
    });
  }else{
    form.setFieldValue('qrCode', null)
  }
 }

  const validateQrCode = () => {
    let qrCode = form.getFieldValue('qrCode')
    if(qrCode){
      const validatedQr = validateTraceQrCode(qrCode)
      if(validatedQr){
        form.setFieldValue('qrCode', validatedQr)
        dispatch(searchTraceUser({
          body:{params: validatedQr},
          callback
        }))
      }else{
        message.warning('INVALID QR CODE')
      }

    }else{
      message.warning('Type / Scan qrcode to proceed')
    }
  }

  const handleSearchTraceUsers = () => {
    dispatch(searchTraceUsers({
      body: {
        firstName: form.getFieldValue('firstName'),
        lastName: form.getFieldValue('lastName'),
      },callback: (result = []) => {
        setIsVisibleTraceResultModal(true)
        if(result.length > 1){
          setIsVisibleTraceResultModal(true)
        }else{
          setIsVisibleTraceResultModal(false)
          const data = result[0]
          dispatch(searchTraceUser_Success(data))
          form.setFieldsValue({
            qrCode: data?.accountId,
            firstName:data?.firstName,
            middleName:data?.middleName,
            lastName:data?.lastName,
            birthdate: dayjs(data.birthdate),
            email:data?.email,
            sex:data?.sex,
            mobileNumber: data?.mobileNumber?.substring(3),
            guardianName: data.contactPersonName,
            guardianNumber: data?.contactPersonNumber?.substring(3),
          });
        }
      }
    }))
  }

  const handleOnSelectTraceUser = async (data) => {
    dispatch(searchTraceUser_Success(data))
    form.setFieldsValue({
      qrCode: data?.accountId,
      firstName:data?.firstName,
      middleName:data?.middleName,
      lastName:data?.lastName,
      birthdate: dayjs(data.birthdate),
      email:data?.email,
      sex:data?.sex,
      mobileNumber: data?.mobileNumber?.substring(3),
      guardianName: data.contactPersonName,
      guardianNumber: data?.contactPersonNumber?.substring(3),
    });
  }
  
  return (
    <div>
      <Form
      disabled={isloading}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          year: dayjs(),
        }}
      >
        <div className=" flex justify-between items-center">
          <Typography.Title level={4}>Personal Information</Typography.Title>
                {!isEdit && 
              <div >
                <Form.Item
                disabled={isLoading_searchTraceUser}
                  label="LOAD T.R.A.C.E. QR CODE"
                  name="qrCode"
                >
                  <Input readOnly={isQrCode} placeholder="SCAN/INPUT QRCODE"  />
                </Form.Item>
                <Button loading={isLoading_searchTraceUser} type="primary" className="w-full" icon={<CheckOutlined />} onClick={validateQrCode}>Validate Account</Button>
            </div>
              }
        </div>
        
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3">
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
          <center className=" col-span-1 md:col-span-2 xl:col-span-3">
            {
              toggleTraceButton && isEdit === false &&
              <div >
                <Button type="default" onClick={handleSearchTraceUsers} loading={isLoading_searchTraceUsers}>Search name from T.R.A.C.E.</Button>
                <Divider />
              </div>
            }
          </center>

          <Form.Item
            className="w-full"
            label="Birthdate (YYYY-MM-DD)"
            name="birthdate"
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

          <Form.Item className="w-full" label="Mobile Number" name="mobileNumber"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
            >
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

          <Form.Item label="Facebook Name" name="fbName"
            >
            <Input placeholder="Enter facebook Name" autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: regExp_Email,
                message: "Invalid email format",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter your username"
            />
          </Form.Item>
        </div>
        <Typography.Title level={4}>Other Information</Typography.Title>

        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3">
          <Form.Item
            label="School Name"
            name="school"
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
                  value: "6",
                  label: "Grade 6",
                },
                {
                  value: "7",
                  label: "Grade 7",
                },
                {
                  value: "8",
                  label: "Grade 8",
                },
                {
                  value: "9",
                  label: "Grade 9",
                },
                {
                  value: "10",
                  label: "Grade 10",
                },
                {
                  value: "11",
                  label: "Grade 11",
                },
                {
                  value: "12",
                  label: "Grade 12",
                },
              ]}
              placeholder="Select grade level"
            />
          </Form.Item>
          <Form.Item
            label="School Year Start"
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
              onChange={hanldeOnchangeDate}
              picker="year"
            />
          </Form.Item>

          <Form.Item label="Religion" name="religion"
            >
            <Input placeholder="Enter religion" autoComplete="off" />
          </Form.Item>

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

          <Form.Item
            className="w-full"
            label="Guardian Mobile Number"
            name="guardianNumber"
          >
            <Input
              placeholder="9 digit number"
              prefix="639"
              maxLength={9}
              onChange={({ target }) => {
                form.setFieldValue(
                  "guardianNumber",
                  // eslint-disable-next-line no-useless-escape
                  target.value.replace(/[- #*;,.<>\{\}\[\]\\\/]|[^0-9]/gi, "")
                );
              }}
              controls={false}
            />
          </Form.Item>
        </div>
        <Form.Item label="Skills you want to learn (Check any)" name="skills"
            >
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

        <Form.Item>
          <Button loading={isloading} type="primary" htmlType="submit" className=" w-full">
            SUBMIT
          </Button>
        </Form.Item>
      </Form>
      <TraceResults_Modal open={isVisibleTraceResultModal} onClose={()=> setIsVisibleTraceResultModal(false)} handleOnSelectTraceUser={handleOnSelectTraceUser} />
    </div>
    
  );
};

export default RegistrationForm;
