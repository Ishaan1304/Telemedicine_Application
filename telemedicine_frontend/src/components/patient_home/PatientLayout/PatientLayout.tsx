import { ReactNode } from "react";
import PatientSidebar from "../PatientSideBar/PatientSidebar";


interface LayoutProps {
    children: ReactNode;
}

const PatientLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{display:"flex",width:"100vw"}}>
            <PatientSidebar />
            <main>{children}</main>
        </div>
    );
};

export default PatientLayout;
