module.exports = [
"[project]/components/SnakeGame.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SnakeGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function SnakeGame() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const modalBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Game state (using refs for the game loop)
    const snakeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        {
            x: 10,
            y: 10
        }
    ]);
    const foodRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 15,
        y: 15
    });
    const directionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        dx: 0,
        dy: 0
    });
    const touchStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const gridSize = 20;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Show modal on load
        if (modalBtnRef.current) {
            modalBtnRef.current.click();
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const generateFood = ()=>{
            let newFoodPosition = {
                x: 0,
                y: 0
            };
            while(true){
                newFoodPosition = {
                    x: Math.floor(Math.random() * canvas.width / gridSize),
                    y: Math.floor(Math.random() * canvas.height / gridSize)
                };
                const overlap = snakeRef.current.some((segment)=>segment.x === newFoodPosition.x && segment.y === newFoodPosition.y);
                if (!overlap) break;
            }
            foodRef.current = newFoodPosition;
        };
        const draw = ()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'orange';
            ctx.fillRect(foodRef.current.x * gridSize, foodRef.current.y * gridSize, gridSize, gridSize);
            snakeRef.current.forEach((segment, index)=>{
                ctx.fillStyle = index === 0 ? 'blue' : 'green';
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            });
        };
        const moveSnake = ()=>{
            const { dx, dy } = directionRef.current;
            if (dx === 0 && dy === 0) return;
            const head = {
                x: snakeRef.current[0].x + dx,
                y: snakeRef.current[0].y + dy
            };
            if (head.x < 0) head.x = canvas.width / gridSize - 1;
            else if (head.x >= canvas.width / gridSize) head.x = 0;
            if (head.y < 0) head.y = canvas.height / gridSize - 1;
            else if (head.y >= canvas.height / gridSize) head.y = 0;
            const newSnake = [
                head,
                ...snakeRef.current
            ];
            if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
                generateFood();
            } else {
                newSnake.pop();
            }
            snakeRef.current = newSnake;
        };
        const update = ()=>{
            moveSnake();
            draw();
        };
        const gameInterval = setInterval(update, 100);
        const handleKeyDown = (e)=>{
            const { dx, dy } = directionRef.current;
            const gameKeys = [
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                ' ',
                'c',
                'C'
            ];
            if (gameKeys.includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp' && dy === 0) directionRef.current = {
                dx: 0,
                dy: -1
            };
            else if (e.key === 'ArrowDown' && dy === 0) directionRef.current = {
                dx: 0,
                dy: 1
            };
            else if (e.key === 'ArrowLeft' && dx === 0) directionRef.current = {
                dx: -1,
                dy: 0
            };
            else if (e.key === 'ArrowRight' && dx === 0) directionRef.current = {
                dx: 1,
                dy: 0
            };
        };
        const handleTouchStart = (e)=>{
            touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        };
        const handleTouchMove = (e)=>{
            if (e.touches.length > 1) return;
            const dxTouch = e.touches[0].clientX - touchStartRef.current.x;
            const dyTouch = e.touches[0].clientY - touchStartRef.current.y;
            const { dx, dy } = directionRef.current;
            if (Math.abs(dxTouch) > Math.abs(dyTouch)) {
                if (dxTouch > 0 && dx === 0) directionRef.current = {
                    dx: 1,
                    dy: 0
                };
                else if (dxTouch < 0 && dx === 0) directionRef.current = {
                    dx: -1,
                    dy: 0
                };
            } else {
                if (dyTouch > 0 && dy === 0) directionRef.current = {
                    dx: 0,
                    dy: 1
                };
                else if (dyTouch < 0 && dy === 0) directionRef.current = {
                    dx: 0,
                    dy: -1
                };
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);
        return ()=>{
            clearInterval(gameInterval);
            window.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "display-5 fw-bolder mb-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gradient d-inline",
                        children: "Greedy Snake"
                    }, void 0, false, {
                        fileName: "[project]/components/SnakeGame.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/SnakeGame.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SnakeGame.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "d-flex justify-content-center mb-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    width: "400",
                    height: "400",
                    style: {
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        background: '#fff'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/SnakeGame.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SnakeGame.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                ref: modalBtnRef,
                className: "btn btn-primary d-none",
                "data-bs-toggle": "modal",
                "data-bs-target": "#snakeModal",
                children: "Modal Trigger"
            }, void 0, false, {
                fileName: "[project]/components/SnakeGame.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal fade",
                id: "snakeModal",
                tabIndex: -1,
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-dialog",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "modal-title fs-5",
                                        children: "注意事項"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SnakeGame.tsx",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-close",
                                        "data-bs-dismiss": "modal",
                                        "aria-label": "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SnakeGame.tsx",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SnakeGame.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-body",
                                children: [
                                    "請使用方向鍵 😊 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/SnakeGame.tsx",
                                        lineNumber: 156,
                                        columnNumber: 25
                                    }, this),
                                    "手機也可以玩了！但小心不要下拉過多變成重新整理 XD ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/components/SnakeGame.tsx",
                                        lineNumber: 157,
                                        columnNumber: 42
                                    }, this),
                                    "建議壓著直接操作"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SnakeGame.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-footer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "btn btn-secondary",
                                    "data-bs-dismiss": "modal",
                                    children: "關閉"
                                }, void 0, false, {
                                    fileName: "[project]/components/SnakeGame.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SnakeGame.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SnakeGame.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/SnakeGame.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SnakeGame.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SnakeGame.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_SnakeGame_tsx_e649ff7e._.js.map