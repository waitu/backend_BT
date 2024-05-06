import {Button, Drawer, Form, FormProps, Input, Layout, Menu} from 'antd';
import {useEffect, useState} from 'react';
import ReactJson from 'react-json-view';
import {usePostConfigMutation} from '../../../../services/uploadConfig.ts';

const {Header} = Layout;

interface MenuItem {
    key: string;
    label: string;
    title: string;
    href: string;
}

type FieldType = {
    Config?: string;
};

const items: Record<string, MenuItem> = {
    item1: {
        key: 'Home',
        label: 'Home',
        title: 'Home of menu',
        href: '/Home',
    },
    item2: {
        key: 'list-trade',
        label: 'list-trade',
        title: 'trade for Menu 2',
        href: '/trade',
    },
    item3: {
        key: 'item3',
        title: 'Title for Menu 3',
        href: '/link-3',
    },
    // Thêm các mục khác tùy ý
};

const HeaderClient: React.FC = () => {
    // const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [backTestData, setBackTestData] = useState({});
    const [jsonData, setJsonData] = useState({});
    const [postConfig] = usePostConfigMutation();
    const localBT = localStorage.getItem('backTestConfig')
    useEffect(() => {
        if (localBT !== null) {
            setJsonData(JSON.parse(localBT))
        }
    }, [])
    const handleManageClick = () => {
        showDrawer()
    };
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleTextAreaChange = (event: any) => {
        const {value} = event.target;
        try {
            // Chuyển đổi dữ liệu JSON từ chuỗi thành một đối tượng JavaScript và cập nhật state
            setJsonData(JSON.parse(value));
        } catch (error) {
            console.error('Invalid JSON format:', error);
            // Xử lý lỗi khi dữ liệu JSON không hợp lệ
        }
    };
    const handleTextJsonChange = (newJsonData: any) => {
        try {
            // Chuyển đổi dữ liệu JSON từ chuỗi thành một đối tượng JavaScript và cập nhật state
            setJsonData(newJsonData);
        } catch (error) {
            console.error('Invalid JSON format:', error);
            // Xử lý lỗi khi dữ liệu JSON không hợp lệ
        }
    };
    const onFinish: FormProps<FieldType>['onFinish'] = async () => {
        // setLoading(true); // Đặt trạng thái là đang gửi dữ liệu
        try {
            localStorage.setItem("backTestConfig", JSON.stringify(jsonData));
            const response = await postConfig(jsonData);
            setBackTestData(response);
            console.log('Post successful', response);
        } catch (err) {
            console.error('Failed to post config', err);
            // setError(err.message); // Lưu lỗi vào biến trạng thái
        } finally {
            // setLoading(false); // Hủy trạng thái đang gửi dữ liệu
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['item1']}
                selectedKeys={['item1']}
                style={{flex: 1, minWidth: 0}}
            >
                {Object.values(items).map(item => (
                    <Menu.Item key={item.key} title={item.title}>
                        <a href={item.href}>{item.label}</a>
                    </Menu.Item>
                ))}
            </Menu>
            <div style={{margin: '20px'}}>
                <Button style={{margin: '10px'}} type="primary" onClick={handleManageClick}>Quản lý Config</Button>
                <Drawer width={720} title="Config settings" onClose={onClose} open={open}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="max-w-md mx-auto"
                    >
                        <Form.Item
                            name="Config"
                            rules={[{required: true, message: 'Please input your config!'}]}
                        >
                            <Input.TextArea placeholder="Enter JSON data here" onChange={handleTextAreaChange}/>
                        </Form.Item>
                        <Form.Item
                            name="strategy"
                            rules={[{required: true, message: 'Please input your config!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        {/* Đặt ReactJson bên ngoài Form.Item */}
                        <ReactJson
                            src={jsonData} // yourConfigData là dữ liệu JSON của bạn
                            theme="monokai" // Chọn một chủ đề theo sở thích của bạn
                            collapsed={1} // Số cấp độ JSON mặc định bị thu gọn
                            displayDataTypes={false} // Ẩn loại dữ liệu của mỗi giá trị
                            enableClipboard={false} // Tắt tính năng copy vào clipboard
                            style={{borderRadius: '0.5rem', padding: '1rem'}} // Thêm kiểu cho ReactJson
                            onEdit={handleTextJsonChange} // Call handleJsonChange when JSON data is edited
                            onDelete={handleTextJsonChange} // Call handleJsonChange when JSON data is deleted
                            onAdd={handleTextJsonChange} // Call handleJsonChange when new property is added to JSON data
                        />


                        <Form.Item wrapperCol={{offset: 10}} className="py-10">
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{marginTop: '10px'}}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-center"
                            >
                                Load config
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>

            </div>
        </Header>
    )
        ;
}

export default HeaderClient;
