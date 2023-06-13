/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, Modal, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { passwordCapitalLetter, passwordLength, passwordNumber, passwordSmallLetter, passwordSpecialChar } from "../../../helpers/regExp"
import { changeAdminUserPassword } from "../../../store/slices/admin/adminUsers_Slice"

const AdminUser_NewPass_Form = ({
    open = false,
    onClose = () => {},
  }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const {isLoading_changeAdminUserPassword} = useSelector(state => state.adminUsers_Slice)
    const {currentUser} = useSelector(state => state.authSlice)

    const callback = () => {
      onClose()
    }

    const onFinish = (values) => {
      dispatch(changeAdminUserPassword({
        body: {
          body: {password: values.password},
          params: currentUser.accountId
        },
        callback
      }))
    }

    return (
    
    <Modal
      destroyOnClose={true}
      centered
      open={open}
      footer={[]}
      closable={false}
      className=" flex content-center justify-center"
      onCancel={onClose}
    >
        
        <h3 className="text-4xl font-bold ">Change Password</h3>
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              className="w-full"
              label="New Password"
              name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: passwordSmallLetter,
                message: "Atleast 1 small letter",
              },
              {
                pattern: passwordCapitalLetter,
                message: "Atleast 1 capital letter",
              },
              {
                pattern: passwordNumber,
                message: "Atleast 1 digit",
              },
              {
                pattern: passwordSpecialChar,
                message: "Atleast 1 special character",
              },
              {
                pattern: passwordLength,
                message: "Atleast 6 characters",
              },
            ]}
            >
              <Input.Password
                placeholder="Enter your new password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
              />
            </Form.Item>
            
            <center>
                <Space>

              <Form.Item>
                <Button
                onClick={onClose}
                >
                  CANCEL
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading_changeAdminUserPassword}
                >
                  SUBMIT
                </Button>
              </Form.Item>
                </Space>
            </center>
        </Form>

    </Modal>
  )
}

export default AdminUser_NewPass_Form