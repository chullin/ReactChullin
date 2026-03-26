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
            className="dots-wrapper position-absolute"
            style={{
              top: "30px",
              right: "15px",
              display: "flex", // 這裡改成水平排列
              flexDirection: "row",
              gap: "7px", // 兩排之間的間距
              zIndex: 10,
            }}
          >
            {/* 第一排 */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {[...Array(4)].map((_, i) => (
                <svg key={i} width="10" height="10">
                  <circle cx="5" cy="5" r="5" fill="#F9F9F9" />
                </svg>
              ))}
            </div>

            {/* 第二排 */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10">
                  <circle cx="5" cy="5" r="5" fill="#F9F9F9" />
                </svg>
              ))}
            </div>
          </div>

          {/* 2. 框框外右中兩排點 */}
          <div
            className="dots-outside position-absolute"
            style={{
              overflow: "visible",
              position: "relative",
              top: "73%",
              right: "260px", // 放在框框外右邊
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "row", // 這裡改成 row，讓兩排並排
              gap: "8px", // 兩排之間間距
              alignItems: "flex-end", // ⭐ 讓兩排往下對齊
              zIndex: 10,
            }}
          >
            {/* 第一排 */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {[...Array(4)].map((_, i) => (
                <svg key={`col1-${i}`} width="10" height="10">
                  <circle cx="5" cy="5" r="5" fill="#1e30f3" />
                </svg>
              ))}
            </div>

            {/* 第二排 */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {[...Array(5)].map((_, i) => (
                <svg key={`col2-${i}`} width="10" height="10">
                  <circle cx="5" cy="5" r="5" fill="#1e30f3" />
                </svg>
              ))}
            </div>
          </div>
          <div className="dots-2"> {/* SVG 或裝飾元素 */} </div>
          <div className="dots-3"> {/* SVG 或裝飾元素 */} </div>
        </div>
      </div>
    </div>
  );
}
