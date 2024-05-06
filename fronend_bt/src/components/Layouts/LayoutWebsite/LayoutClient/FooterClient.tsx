
import {Layout} from "antd";

const { Footer} = Layout;
const FooterClient = () => {
    return (
        <Footer style={{textAlign: 'center'}}>
            {new Date().getFullYear()} Created by Goro
        </Footer>
    )
}

export default FooterClient