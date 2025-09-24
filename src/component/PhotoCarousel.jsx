import React from "react";
import photo0 from "../assets/photo0.png"; // 你的頭像圖片

export default function HeaderPhoto() {
  return (
    <div className="col-xxl-7">
      <div className="d-flex justify-content-center mt-5 mt-xxl-0">
        <div className="profile bg-gradient-primary-to-secondary position-relative">
          <img src={photo0} alt="profile" className="profile-img" />

          {/* 裝飾用的 dots SVG */}
          {/* 1. 框框內右上兩排點 */}
          <div
            className="dots-inside position-absolute"
            style={{
              top: "30px", // 距離上邊界 10px
              right: "15px", // 距離右邊界 10px
              display: "flex",
              flexDirection: "column",
              gap: "5px", // 點點間距
              zIndex: 10,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <svg key={i} width="10" height="10">
                <circle cx="5" cy="5" r="5" fill="#1e30f3" />
              </svg>
            ))}
          </div>

          {/* 2. 框框外右中兩排點 */}
          <div
            className="dots-outside position-absolute"
            style={{
              overflow: "visible",
              position: "relative",
              top: "50%",
              right: "-20px", // 放在框框外右邊
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 10,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <svg key={i} width="10" height="10">
                <circle cx="5" cy="5" r="5" fill="#1e30f3" />
              </svg>
            ))}
          </div>
          <div className="dots-2"> {/* SVG 或裝飾元素 */} </div>
          <div className="dots-3"> {/* SVG 或裝飾元素 */} </div>
        </div>
      </div>
    </div>
  );
}
