import { ReactNode } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";


interface LayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{display:"flex",width:"100vw"}}>
            <AdminSidebar />
            <main>{children}</main>
        </div>
    );
};

export default AdminLayout;
