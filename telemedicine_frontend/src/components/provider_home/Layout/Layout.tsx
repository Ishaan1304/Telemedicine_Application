import { ReactNode } from "react";
import Sidebar from "../SideBar/SideBar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{display:"flex",width:"100vw"}}>
            <Sidebar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
