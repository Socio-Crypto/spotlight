import React from "react";

import { NextPage } from "next";
import { Button } from "antd";

const DemoVideo: NextPage = () => {
  return (
    <main className="main bg-image overflow-hidden">
      <div className="grid mx-10 my-5  fadeInUp-animation">
        <div className="p-2 rounded-md bg-white">
          <h1 className="mb-5 mt-2 text-center font-bold text-xl">
            Demo Video
          </h1>
          <div style={{}}>
            <iframe
              src="https://www.loom.com/embed/e2ab92acd1014f088bacad6d64356f00"
              style={{
                width: "100%",
                height: "calc(100vh - 300px)",
              }}
            ></iframe>
            <Button className="mt-5 mb-4" block>
              <a
                href="https://www.loom.com/share/e2ab92acd1014f088bacad6d64356f00"
                target="_blank"
                rel="noopener noreferrer"
              >
                view in loom
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DemoVideo;
