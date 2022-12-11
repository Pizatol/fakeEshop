import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans&family=EB+Garamond&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Amaranth&family=DM+Sans&family=EB+Garamond&family=Montserrat&family=Roboto+Mono&display=swap"
                    rel="stylesheet"
                />

                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css"
                    rel="stylesheet"
                ></link>

                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                    crossOrigin=""
                />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
                />
                <script
                    src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
                    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
                    crossOrigin=""
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
