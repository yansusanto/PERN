import React from "react";
import "./index.scss";

//Import components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

//Import containers


const TemplatePage = () => {
    return(
        <React.Fragment>
            <Navbar />
            <div className="TemplatePage">This is a Template Page</div>
            <Footer />
        </React.Fragment>
    )
}

export default TemplatePage;