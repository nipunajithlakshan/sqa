import { Button, Drawer } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

export default function MobileMenu({ visible, onClose }) {
  return (
    <Drawer
      title="Menu"
      placement="right"
      onClose={onClose}
      open={visible}
      width={200}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <HomeOutlined className="mr-2" />
          Home
        </div>
        <div className="flex items-center">
          <InfoCircleOutlined className="mr-2" />
          About Us
        </div>
        <div className="flex items-center">
          <ContactsOutlined className="mr-2" />
          Contact Us
        </div>
        <div className="flex items-center">
          <AppstoreAddOutlined className="mr-2" />
          Services
        </div>
        </div>
        <div className="flex flex-col items-center p-5">
          <Button
            type="primary"
            className=" !flex-col w-[115px] h-[50px] !rounded-full !items-center "
          >
            Sign up
          </Button>
      </div>
    </Drawer>
  );
}
