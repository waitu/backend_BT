import FooterClient from "./LayoutClient/FooterClient"
import HeaderClient from "./LayoutClient/HeaderClient"
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {Breadcrumb, Layout, theme} from 'antd';

const {Content} = Layout;

const LayoutClient = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken()
    const location = useLocation();
    const navigate = useNavigate();
    const handleBreadcrumbClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="mx-auto">
            <Layout>
                <HeaderClient/>
                <Content style={{padding: '0 48px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/home')}>Home</Breadcrumb.Item>
                        {location.pathname === '/trade' && (
                            <Breadcrumb.Item
                                onClick={() => handleBreadcrumbClick('/trade')}>Trade</Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 'calc(100vh - 124px)',
                            minWidth: 'calc(100vh - 124px)',
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* Nội dung của bạn */}
                        <Outlet/>{/* Content */}
                    </div>
                </Content>
                <FooterClient/>
            </Layout>
        </div>

    )
}
export default LayoutClient