/* eslint-disable react/prop-types */
import { Image, Modal } from "antd"
import { trace } from "../../../assets/images/logos"

const SearchTrace_Modal = ({
    open = false,
    onClose = () => {},
  }) => {
  return (
    <Modal
      destroyOnClose={true}
      centered
      open={open}
      footer={[]}
      closable={false}
      onCancel={onClose}
    >
        <h3 className="text-4xl font-bold flex"><Image src={trace} preview={false} /> Search T.R.A.C.E.</h3>
    </Modal>
  )
}

export default SearchTrace_Modal