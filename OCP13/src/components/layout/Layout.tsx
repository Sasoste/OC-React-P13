import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import { LayoutProps } from "@/types/types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout; 