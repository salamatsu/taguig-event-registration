/* eslint-disable react/prop-types */
import { CalendarOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Image, List, Modal, Popconfirm, Typography } from "antd";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { trace } from "../../../assets/images/logos";

const TraceResults_Modal = ({
    open = false,
    onClose = () => {},
    handleOnSelectTraceUser = () => {}
  }) => {
    
  const {
    list_searchTraceUsers
  } = useSelector((state) => state.eventSlice);
  
  const confirm = (data) => () => {
    handleOnSelectTraceUser(data)
    onClose()
  };

  return (
    <Modal
      destroyOnClose={true}
      centered
      open={open}
      footer={[]}
      closable={false}
      onCancel={onClose}
    >
        <h3 className="text-4xl font-bold flex justify-center items-center"><Image src={trace} preview={false} width={100} />T.R.A.C.E. Results</h3>

      <List
        pagination={true}
        // size="small"
        dataSource={list_searchTraceUsers}
        renderItem={(item) => (
          <List.Item key={item.email} 
          actions={[
            <Popconfirm 
            key={'select'}
              title="Confirmation"
              description="Are you sure you want to load this account?"
              onConfirm={confirm(item)}
              okText="YES"
              cancelText="NO"
            >
              <Button type="primary" >Select</Button>
            </Popconfirm>
          ]}>
            <List.Item.Meta
              title={ <div><Typography.Title level={5} style={{margin: 0}}><IdcardOutlined /> {[item.firstName,item.middleName,  item.lastName, item.suffix].join(" ").trim().toUpperCase()}</Typography.Title></div>}
              description={
                <div className=" grid grid-cols-1">
                  {item.email && <Typography.Text><MailOutlined /> {item.email}</Typography.Text>}
                  {item.mobileNumber && <Typography.Text><PhoneOutlined /> {item.mobileNumber}</Typography.Text>}
                  {item.birthdate && <Typography.Text><CalendarOutlined /> {moment(item.birthdate).format('LL')}</Typography.Text>}
                  {
                    (item.contactPersonName || item.contactPersonNumber)
                    && <Typography.Text className=" font-bold" style={{margin: 0, padding:0}}>Contact Person:</Typography.Text>
                  }
                  {
                    item.contactPersonName && <Typography.Text> &nbsp;&nbsp;&nbsp;<UserOutlined /> {item.contactPersonName}</Typography.Text>
                  }
                  {
                    item.contactPersonNumber && <Typography.Text>&nbsp;&nbsp;&nbsp;<PhoneOutlined /> {item.contactPersonNumber}</Typography.Text>
                  }
                </div>
              }
            />
          </List.Item>
        )} 
      />
    </Modal>
    )
}

export default TraceResults_Modal