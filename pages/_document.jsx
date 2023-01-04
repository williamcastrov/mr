import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { withRouter } from "next/router";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body className="bodysinimagen">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
