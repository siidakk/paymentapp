import Image1 from "../../assets/image-Phoroom.png";
import Image2 from "../../assets/image-Photoroom.png";

export function Footer() {
    return (
        <footer style={{ width: "100%", overflowX: "hidden" }}>
            <div
                className="footer1"
                style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "rgb(6, 0, 86)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    boxSizing: "border-box"
                }}
            >
                <p
                    className="footer1content"
                    style={{
                        color: "whitesmoke",
                        fontSize: "25px",
                        margin: "0",
                        flexShrink: 0
                    }}
                >
                    Download SIDAKPAY App <br />
                    to Pay from anywhere
                </p>
                <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                    <img
                        className="footerimg1"
                        src={Image1}
                        alt="Download SIDAKPAY 1"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            width: "230px"
                        }}
                    />
                    <img
                        className="footerimg2"
                        src={Image2}
                        alt="Download SIDAKPAY 2"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            width: "210px"
                        }}
                    />
                </div>
            </div>
            <div
                className="footer2"
                style={{
                    width: "100%",
                    height: "100px",
                    backgroundColor: "rgb(4, 0, 65)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1200px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px",
                        margin: "0 auto",
                        boxSizing: "border-box"
                    }}
                >
                    <p
                        style={{
                            color: "whitesmoke",
                            fontSize: "small",
                            margin: "0"
                        }}
                    >
                        Corporate Identity Number (CIN) : U64990MH2024PLC427800
                    </p>
                    <p
                        style={{
                            color: "whitesmoke",
                            fontSize: "small",
                            textAlign: "center",
                            margin: "0"
                        }}
                    >
                        Copyright © 2025 NPCI ® All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
