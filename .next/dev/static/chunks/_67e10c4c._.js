(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/tetris-battle/Constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOCK_SIZE",
    ()=>BLOCK_SIZE,
    "COLS",
    ()=>COLS,
    "PIECES",
    ()=>PIECES,
    "ROWS",
    ()=>ROWS,
    "WALL_KICKS",
    ()=>WALL_KICKS,
    "WALL_KICKS_I",
    ()=>WALL_KICKS_I
]);
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const PIECES = {
    I: {
        shape: [
            [
                0,
                0,
                0,
                0
            ],
            [
                1,
                1,
                1,
                1
            ],
            [
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0
            ]
        ],
        color: '#00f0f0'
    },
    J: {
        shape: [
            [
                1,
                0,
                0
            ],
            [
                1,
                1,
                1
            ],
            [
                0,
                0,
                0
            ]
        ],
        color: '#0000f0'
    },
    L: {
        shape: [
            [
                0,
                0,
                1
            ],
            [
                1,
                1,
                1
            ],
            [
                0,
                0,
                0
            ]
        ],
        color: '#f0a000'
    },
    O: {
        shape: [
            [
                1,
                1
            ],
            [
                1,
                1
            ]
        ],
        color: '#f0f000'
    },
    S: {
        shape: [
            [
                0,
                1,
                1
            ],
            [
                1,
                1,
                0
            ],
            [
                0,
                0,
                0
            ]
        ],
        color: '#00f000'
    },
    T: {
        shape: [
            [
                0,
                1,
                0
            ],
            [
                1,
                1,
                1
            ],
            [
                0,
                0,
                0
            ]
        ],
        color: '#a000f0'
    },
    Z: {
        shape: [
            [
                1,
                1,
                0
            ],
            [
                0,
                1,
                1
            ],
            [
                0,
                0,
                0
            ]
        ],
        color: '#f00000'
    }
};
const WALL_KICKS = {
    '0-1': [
        [
            0,
            0
        ],
        [
            -1,
            0
        ],
        [
            -1,
            -1
        ],
        [
            0,
            2
        ],
        [
            -1,
            2
        ]
    ],
    '1-0': [
        [
            0,
            0
        ],
        [
            1,
            0
        ],
        [
            1,
            1
        ],
        [
            0,
            -2
        ],
        [
            1,
            -2
        ]
    ],
    '1-2': [
        [
            0,
            0
        ],
        [
            1,
            0
        ],
        [
            1,
            1
        ],
        [
            0,
            -2
        ],
        [
            1,
            -2
        ]
    ],
    '2-1': [
        [
            0,
            0
        ],
        [
            -1,
            0
        ],
        [
            -1,
            -1
        ],
        [
            0,
            2
        ],
        [
            -1,
            2
        ]
    ],
    '2-3': [
        [
            0,
            0
        ],
        [
            1,
            0
        ],
        [
            1,
            -1
        ],
        [
            0,
            2
        ],
        [
            1,
            -2
        ]
    ],
    '3-2': [
        [
            0,
            0
        ],
        [
            -1,
            0
        ],
        [
            -1,
            1
        ],
        [
            0,
            -2
        ],
        [
            -1,
            2
        ]
    ],
    '3-0': [
        [
            0,
            0
        ],
        [
            -1,
            0
        ],
        [
            -1,
            1
        ],
        [
            0,
            -2
        ],
        [
            -1,
            2
        ]
    ],
    '0-3': [
        [
            0,
            0
        ],
        [
            1,
            0
        ],
        [
            1,
            -1
        ],
        [
            0,
            2
        ],
        [
            1,
            -2
        ]
    ]
};
const WALL_KICKS_I = {
    '0-1': [
        [
            0,
            0
        ],
        [
            -2,
            0
        ],
        [
            1,
            0
        ],
        [
            -2,
            1
        ],
        [
            1,
            -2
        ]
    ],
    '1-0': [
        [
            0,
            0
        ],
        [
            2,
            0
        ],
        [
            -1,
            0
        ],
        [
            2,
            -1
        ],
        [
            -1,
            2
        ]
    ],
    '1-2': [
        [
            0,
            0
        ],
        [
            -1,
            0
        ],
        [
            2,
            0
        ],
        [
            -1,
            -2
        ],
        [
            2,
            1
        ]
    ],
    '2-1': [
        [
            0,
            0
        ],
        [
            1,
            0
        ],
        [
            -2,
            0
        ],
        [
            1,
            2
        ],
        [
            -2,
            -1
        ]
    ],
    '2-3': [
        [
            0,
            0
        ],
        [
            2,
            0
        ],
        [
            -1,
            0
        ],
        [
            2,
            -1
        ],
        [
            -1,
            2
        ]
    ],
    '3-2': [
        [
            0,
            0
        ],
        [
            -2,
            0
        ],
        [
            1,
            0
        ],
        [
            -2,
            1
        ],
        [
            1,
            -2
        ]
    ],
    '3-0': [
        [
            0,
            0
        ],
        [
            1,
            0
        ],
        [
            -2,
            0
        ],
        [
            1,
            2
        ],
        [
            -2,
            -1
        ]
    ],
    '0-3': [
        [
            0,
            0
        ],
        [
            -1,
            0
        ],
        [
            2,
            0
        ],
        [
            -1,
            -2
        ],
        [
            2,
            1
        ]
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tetris-battle/gameLogic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addGarbageLines",
    ()=>addGarbageLines,
    "calculateAttack",
    ()=>calculateAttack,
    "checkCollision",
    ()=>checkCollision,
    "clearLines",
    ()=>clearLines,
    "createEmptyBoard",
    ()=>createEmptyBoard,
    "generateBag",
    ()=>generateBag,
    "getPiece",
    ()=>getPiece,
    "getShadowPos",
    ()=>getShadowPos,
    "rotateMatrix",
    ()=>rotateMatrix,
    "shuffle",
    ()=>shuffle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/Constants.ts [app-client] (ecmascript)");
;
const createEmptyBoard = ()=>Array.from({
        length: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]
    }, ()=>Array(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]).fill(null));
const shuffle = (array)=>{
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [
            array[j],
            array[i]
        ];
    }
    return array;
};
const generateBag = ()=>{
    const types = [
        'I',
        'J',
        'L',
        'O',
        'S',
        'T',
        'Z'
    ];
    return shuffle([
        ...types
    ]);
};
const getPiece = (type)=>{
    return {
        type,
        pos: {
            x: Math.floor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"] / 2) - 1,
            y: 0
        },
        rotation: 0,
        shape: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PIECES"][type].shape,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PIECES"][type].color
    };
};
const rotateMatrix = (matrix)=>{
    return matrix[0].map((_, index)=>matrix.map((col)=>col[index]).reverse());
};
const checkCollision = (board, piece, pos = piece.pos, shape = piece.shape)=>{
    for(let y = 0; y < shape.length; y++){
        for(let x = 0; x < shape[y].length; x++){
            if (shape[y][x]) {
                const boardX = pos.x + x;
                const boardY = pos.y + y;
                if (boardX < 0 || boardX >= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"] || boardY >= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] || boardY >= 0 && board[boardY][boardX]) {
                    return true;
                }
            }
        }
    }
    return false;
};
const getShadowPos = (board, piece)=>{
    let shadowY = piece.pos.y;
    while(!checkCollision(board, piece, {
        ...piece.pos,
        y: shadowY + 1
    })){
        shadowY++;
    }
    return {
        x: piece.pos.x,
        y: shadowY
    };
};
const clearLines = (board)=>{
    const newBoard = board.filter((row)=>row.some((cell)=>cell === null));
    const linesCleared = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] - newBoard.length;
    const emptyRows = Array.from({
        length: linesCleared
    }, ()=>Array(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]).fill(null));
    return {
        newBoard: [
            ...emptyRows,
            ...newBoard
        ],
        linesCleared
    };
};
const addGarbageLines = (board, lines)=>{
    const linesToAdd = Math.min(lines, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]);
    const newBoard = board.slice(linesToAdd);
    for(let i = 0; i < linesToAdd; i++){
        const row = Array(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]).fill('#a0a0a0');
        const hole = Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]);
        row[hole] = null;
        newBoard.push(row);
    }
    return newBoard;
};
const calculateAttack = (lines, combo, level = 1, isTSpin = false)=>{
    let baseAttack = 0;
    if (isTSpin) {
        // T-Spin bonuses are usually linesCleared * 2
        if (lines === 1) baseAttack = 2;
        if (lines === 2) baseAttack = 4;
        if (lines === 3) baseAttack = 6;
        if (lines === 0) baseAttack = 0; // T-Spin with no clear is 0 attack in some rules, or just bonus points
    } else {
        if (lines === 2) baseAttack = level > 2 ? 1 : 0;
        if (lines === 3) baseAttack = level > 1 ? 2 : 1;
        if (lines === 4) baseAttack = level > 1 ? 4 : 2;
    }
    if (lines > 0 && combo > 0) {
        baseAttack += Math.floor(combo / 2);
    }
    return baseAttack;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tetris-battle/TetrisCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/Constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/gameLogic.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const TetrisCanvas = ({ board, activePiece, isPlayer })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TetrisCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw Grid (Subtle)
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 0.5;
            for(let x = 0; x <= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]; x++){
                ctx.beginPath();
                ctx.moveTo(x * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"], 0);
                ctx.lineTo(x * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"]);
                ctx.stroke();
            }
            for(let y = 0; y <= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]; y++){
                ctx.beginPath();
                ctx.moveTo(0, y * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"]);
                ctx.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"] * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"], y * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"]);
                ctx.stroke();
            }
            // Draw Board
            board.forEach({
                "TetrisCanvas.useEffect": (row, y)=>{
                    row.forEach({
                        "TetrisCanvas.useEffect": (color, x)=>{
                            if (color) {
                                drawBlock(ctx, x, y, color);
                            }
                        }
                    }["TetrisCanvas.useEffect"]);
                }
            }["TetrisCanvas.useEffect"]);
            // Draw Active Piece
            if (activePiece) {
                // Draw Shadow
                const shadowPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getShadowPos"])(board, activePiece);
                activePiece.shape.forEach({
                    "TetrisCanvas.useEffect": (row, y)=>{
                        row.forEach({
                            "TetrisCanvas.useEffect": (value, x)=>{
                                if (value) {
                                    drawBlock(ctx, shadowPos.x + x, shadowPos.y + y, activePiece.color, 0.3);
                                }
                            }
                        }["TetrisCanvas.useEffect"]);
                    }
                }["TetrisCanvas.useEffect"]);
                // Draw Piece
                activePiece.shape.forEach({
                    "TetrisCanvas.useEffect": (row, y)=>{
                        row.forEach({
                            "TetrisCanvas.useEffect": (value, x)=>{
                                if (value) {
                                    drawBlock(ctx, activePiece.pos.x + x, activePiece.pos.y + y, activePiece.color);
                                }
                            }
                        }["TetrisCanvas.useEffect"]);
                    }
                }["TetrisCanvas.useEffect"]);
            }
        }
    }["TetrisCanvas.useEffect"], [
        board,
        activePiece
    ]);
    const drawBlock = (ctx, x, y, color, alpha = 1)=>{
        if (y < 0) return;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"], y * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"]);
        // Highlight
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"] + 1, y * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"] + 1, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"] - 2, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"] - 2);
        ctx.globalAlpha = 1;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tw-relative tw-border-4 tw-border-gray-700 tw-bg-black tw-shadow-2xl tw-rounded-lg tw-overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            width: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"] * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] * __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCK_SIZE"],
            className: "tw-block"
        }, void 0, false, {
            fileName: "[project]/components/tetris-battle/TetrisCanvas.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/tetris-battle/TetrisCanvas.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TetrisCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = TetrisCanvas;
const __TURBOPACK__default__export__ = TetrisCanvas;
var _c;
__turbopack_context__.k.register(_c, "TetrisCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tetris-battle/GameUI.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameStats",
    ()=>GameStats,
    "PieceBox",
    ()=>PieceBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/Constants.ts [app-client] (ecmascript)");
'use client';
;
;
const PieceBox = ({ label, pieceType })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tw-flex tw-flex-col tw-items-center tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600 tw-min-w-[100px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase tw-mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-w-20 tw-h-20 tw-flex tw-items-center tw-justify-center tw-bg-black tw-rounded",
                children: pieceType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tw-grid",
                    style: {
                        gridTemplateColumns: `repeat(${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PIECES"][pieceType].shape[0].length}, 1fr)`,
                        gap: '1px'
                    },
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PIECES"][pieceType].shape.map((row, y)=>row.map((val, x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-w-4 tw-h-4",
                                style: {
                                    backgroundColor: val ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PIECES"][pieceType].color : 'transparent'
                                }
                            }, `${x}-${y}`, false, {
                                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                                lineNumber: 27,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))))
                }, void 0, false, {
                    fileName: "[project]/components/tetris-battle/GameUI.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tetris-battle/GameUI.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PieceBox;
const GameStats = ({ score, level, lines, isTSpin })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tw-flex tw-flex-col tw-gap-2 tw-w-full",
        children: [
            isTSpin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-bg-purple-600 tw-text-white tw-text-xs tw-font-black tw-py-1 tw-px-2 tw-rounded tw-text-center tw-animate-bounce tw-uppercase tw-tracking-widest",
                children: "T-SPIN!"
            }, void 0, false, {
                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase",
                        children: "Score"
                    }, void 0, false, {
                        fileName: "[project]/components/tetris-battle/GameUI.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-white tw-text-xl tw-font-mono",
                        children: score.toLocaleString()
                    }, void 0, false, {
                        fileName: "[project]/components/tetris-battle/GameUI.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase",
                        children: "Level"
                    }, void 0, false, {
                        fileName: "[project]/components/tetris-battle/GameUI.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-white tw-text-xl tw-font-mono",
                        children: level
                    }, void 0, false, {
                        fileName: "[project]/components/tetris-battle/GameUI.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-border-2 tw-border-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-gray-400 tw-text-xs tw-font-bold tw-uppercase",
                        children: "Lines"
                    }, void 0, false, {
                        fileName: "[project]/components/tetris-battle/GameUI.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-white tw-text-xl tw-font-mono",
                        children: lines
                    }, void 0, false, {
                        fileName: "[project]/components/tetris-battle/GameUI.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/tetris-battle/GameUI.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/tetris-battle/GameUI.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = GameStats;
var _c, _c1;
__turbopack_context__.k.register(_c, "PieceBox");
__turbopack_context__.k.register(_c1, "GameStats");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tetris-battle/useTetris.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTetris",
    ()=>useTetris
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/gameLogic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/Constants.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const useTetris = (onLinesCleared)=>{
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        board: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyBoard"])(),
        activePiece: null,
        nextPiece: 'I',
        holdPiece: null,
        canHold: true,
        score: 0,
        lines: 0,
        level: 1,
        isGameOver: false,
        combo: -1,
        bag: [],
        pendingGarbage: 0,
        lastMoveTSpin: false
    });
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(state);
    stateRef.current = state;
    const spawnPiece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[spawnPiece]": ()=>{
            setState({
                "useTetris.useCallback[spawnPiece]": (prev)=>{
                    let newBag = [
                        ...prev.bag
                    ];
                    if (newBag.length <= 1) {
                        newBag = [
                            ...newBag,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBag"])()
                        ];
                    }
                    const nextType = newBag.shift();
                    const piece = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPiece"])(nextType);
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(prev.board, piece)) {
                        return {
                            ...prev,
                            isGameOver: true
                        };
                    }
                    return {
                        ...prev,
                        activePiece: piece,
                        nextPiece: newBag[0],
                        bag: newBag,
                        canHold: true
                    };
                }
            }["useTetris.useCallback[spawnPiece]"]);
        }
    }["useTetris.useCallback[spawnPiece]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[reset]": (newLevel)=>{
            const initialBag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBag"])();
            const firstType = initialBag.shift();
            setState({
                board: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEmptyBoard"])(),
                activePiece: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPiece"])(firstType),
                nextPiece: initialBag[0],
                holdPiece: null,
                canHold: true,
                score: 0,
                lines: 0,
                level: newLevel || 1,
                isGameOver: false,
                combo: -1,
                bag: initialBag,
                pendingGarbage: 0,
                lastMoveTSpin: false
            });
        }
    }["useTetris.useCallback[reset]"], []);
    const setLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[setLevel]": (l)=>{
            setState({
                "useTetris.useCallback[setLevel]": (prev)=>({
                        ...prev,
                        level: l
                    })
            }["useTetris.useCallback[setLevel]"]);
        }
    }["useTetris.useCallback[setLevel]"], []);
    const move = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[move]": (dx, dy)=>{
            setState({
                "useTetris.useCallback[move]": (prev)=>{
                    if (!prev.activePiece || prev.isGameOver) return prev;
                    const newPos = {
                        x: prev.activePiece.pos.x + dx,
                        y: prev.activePiece.pos.y + dy
                    };
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(prev.board, prev.activePiece, newPos)) {
                        return {
                            ...prev,
                            activePiece: {
                                ...prev.activePiece,
                                pos: newPos
                            },
                            lastMoveTSpin: false
                        };
                    }
                    if (dy > 0) {
                        // Landing
                        return landPiece(prev);
                    }
                    return {
                        ...prev,
                        lastMoveTSpin: false
                    };
                }
            }["useTetris.useCallback[move]"]);
        }
    }["useTetris.useCallback[move]"], []);
    const checkTSpin = (board, piece)=>{
        if (piece.type !== 'T') return false;
        const corners = [
            {
                x: piece.pos.x,
                y: piece.pos.y
            },
            {
                x: piece.pos.x + 2,
                y: piece.pos.y
            },
            {
                x: piece.pos.x,
                y: piece.pos.y + 2
            },
            {
                x: piece.pos.x + 2,
                y: piece.pos.y + 2
            }
        ];
        let occupied = 0;
        corners.forEach((c)=>{
            if (c.x < 0 || c.x >= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"] || c.y >= __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] || c.y >= 0 && board[c.y][c.x]) {
                occupied++;
            }
        });
        return occupied >= 3;
    };
    const rotate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[rotate]": ()=>{
            setState({
                "useTetris.useCallback[rotate]": (prev)=>{
                    if (!prev.activePiece || prev.isGameOver) return prev;
                    const newShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotateMatrix"])(prev.activePiece.shape);
                    const startRotation = prev.activePiece.rotation;
                    const endRotation = (startRotation + 1) % 4;
                    const kickTable = prev.activePiece.type === 'I' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_KICKS_I"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_KICKS"];
                    const kicks = kickTable[`${startRotation}-${endRotation}`] || [
                        [
                            0,
                            0
                        ]
                    ];
                    for (const [dx, dy] of kicks){
                        const newPos = {
                            x: prev.activePiece.pos.x + dx,
                            y: prev.activePiece.pos.y + dy
                        };
                        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(prev.board, prev.activePiece, newPos, newShape)) {
                            const isTSpin = checkTSpin(prev.board, {
                                ...prev.activePiece,
                                pos: newPos,
                                shape: newShape
                            });
                            return {
                                ...prev,
                                activePiece: {
                                    ...prev.activePiece,
                                    pos: newPos,
                                    shape: newShape,
                                    rotation: endRotation
                                },
                                lastMoveTSpin: isTSpin
                            };
                        }
                    }
                    return prev;
                }
            }["useTetris.useCallback[rotate]"]);
        }
    }["useTetris.useCallback[rotate]"], []);
    const hardDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[hardDrop]": ()=>{
            setState({
                "useTetris.useCallback[hardDrop]": (prev)=>{
                    if (!prev.activePiece || prev.isGameOver) return prev;
                    let newY = prev.activePiece.pos.y;
                    while(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(prev.board, prev.activePiece, {
                        ...prev.activePiece.pos,
                        y: newY + 1
                    })){
                        newY++;
                    }
                    return landPiece({
                        ...prev,
                        activePiece: {
                            ...prev.activePiece,
                            pos: {
                                ...prev.activePiece.pos,
                                y: newY
                            }
                        }
                    });
                }
            }["useTetris.useCallback[hardDrop]"]);
        }
    }["useTetris.useCallback[hardDrop]"], []);
    const hold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[hold]": ()=>{
            setState({
                "useTetris.useCallback[hold]": (prev)=>{
                    if (!prev.activePiece || !prev.canHold || prev.isGameOver) return prev;
                    let newHold = prev.activePiece.type;
                    let newActive = null;
                    let newNext = prev.nextPiece;
                    let newBag = [
                        ...prev.bag
                    ];
                    if (prev.holdPiece) {
                        newActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPiece"])(prev.holdPiece);
                    } else {
                        newActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPiece"])(newNext);
                        if (newBag.length <= 1) newBag = [
                            ...newBag,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBag"])()
                        ];
                        newNext = newBag.shift();
                    }
                    return {
                        ...prev,
                        activePiece: newActive,
                        holdPiece: newHold,
                        nextPiece: newNext,
                        bag: newBag,
                        canHold: false
                    };
                }
            }["useTetris.useCallback[hold]"]);
        }
    }["useTetris.useCallback[hold]"], []);
    const landPiece = (prevState)=>{
        const { board, activePiece, pendingGarbage, combo } = prevState;
        if (!activePiece) return prevState;
        const newBoard = board.map((row)=>[
                ...row
            ]);
        activePiece.shape.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if (value) {
                    const by = activePiece.pos.y + y;
                    const bx = activePiece.pos.x + x;
                    if (by >= 0 && by < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] && bx >= 0 && bx < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]) {
                        newBoard[by][bx] = activePiece.color;
                    }
                }
            });
        });
        const { newBoard: boardAfterClear, linesCleared } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearLines"])(newBoard);
        // Battle logic: Pending Garbage
        let finalBoard = boardAfterClear;
        let newPendingGarbage = pendingGarbage;
        let newCombo = linesCleared > 0 ? combo + 1 : -1;
        if (linesCleared === 0 && pendingGarbage > 0) {
            finalBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addGarbageLines"])(boardAfterClear, pendingGarbage);
            newPendingGarbage = 0;
        }
        if (linesCleared > 0) {
            onLinesCleared(linesCleared, newCombo, prevState.lastMoveTSpin);
        }
        // Check game over again
        if (finalBoard[0].some((cell)=>cell !== null)) {
            return {
                ...prevState,
                board: finalBoard,
                isGameOver: true
            };
        }
        // Spawn next piece
        let nextBag = [
            ...prevState.bag
        ];
        if (nextBag.length <= 1) nextBag = [
            ...nextBag,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBag"])()
        ];
        const nextType = nextBag.shift();
        const nextPieceObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPiece"])(nextType);
        return {
            ...prevState,
            board: finalBoard,
            activePiece: nextPieceObj,
            nextPiece: nextBag[0],
            bag: nextBag,
            canHold: true,
            lines: prevState.lines + linesCleared,
            score: prevState.score + linesCleared * 100 * prevState.level,
            combo: newCombo,
            pendingGarbage: newPendingGarbage
        };
    };
    const receiveGarbage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTetris.useCallback[receiveGarbage]": (lines)=>{
            setState({
                "useTetris.useCallback[receiveGarbage]": (prev)=>({
                        ...prev,
                        pendingGarbage: prev.pendingGarbage + lines
                    })
            }["useTetris.useCallback[receiveGarbage]"]);
        }
    }["useTetris.useCallback[receiveGarbage]"], []);
    return {
        state,
        move,
        rotate,
        hardDrop,
        hold,
        reset,
        receiveGarbage,
        spawnPiece,
        setLevel
    };
};
_s(useTetris, "nNGhm4TnPHTVj++eVxYiXFuBpDU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/tetris-battle/ai.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findBestMove",
    ()=>findBestMove
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/Constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/gameLogic.ts [app-client] (ecmascript)");
;
;
const getColumnHeights = (board)=>{
    const heights = Array(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]).fill(0);
    const rows = board.length;
    for(let x = 0; x < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]; x++){
        for(let y = 0; y < rows; y++){
            if (board[y][x]) {
                heights[x] = rows - y;
                break;
            }
        }
    }
    return heights;
};
const countHoles = (board)=>{
    let holes = 0;
    const rows = board.length;
    for(let x = 0; x < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]; x++){
        let blockFound = false;
        for(let y = 0; y < rows; y++){
            if (board[y][x]) {
                blockFound = true;
            } else if (blockFound) {
                holes++;
            }
        }
    }
    return holes;
};
const getBumpiness = (heights)=>{
    let bumpiness = 0;
    for(let i = 0; i < heights.length - 1; i++){
        bumpiness += Math.abs(heights[i] - heights[i + 1]);
    }
    return bumpiness;
};
// Evaluate a board state
const evaluateBoard = (board)=>{
    const heights = getColumnHeights(board);
    const aggregateHeight = heights.reduce((a, b)=>a + b, 0);
    const holes = countHoles(board);
    const bumpiness = getBumpiness(heights);
    // Weights (Standard heuristic weights for Tetris AI)
    const a = -0.510066;
    const c = -0.35663;
    const d = -0.184483;
    return a * aggregateHeight + c * holes + d * bumpiness;
};
const findBestMove = (board, piece)=>{
    let bestAction = {
        x: 0,
        rotation: 0,
        score: -Infinity
    };
    // Try all 4 rotations
    for(let r = 0; r < 4; r++){
        let currentShape = piece.shape;
        for(let i = 0; i < r; i++){
            currentShape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotateMatrix"])(currentShape);
        }
        // Try all horizontal positions
        for(let x = -2; x < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]; x++){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(board, piece, {
                x,
                y: 0
            }, currentShape)) continue;
            // Find landing Y
            let y = 0;
            while(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCollision"])(board, piece, {
                x,
                y: y + 1
            }, currentShape)){
                y++;
            }
            // Simulate landing
            const tempBoard = board.map((row)=>[
                    ...row
                ]);
            let linesCleared = 0;
            for(let py = 0; py < currentShape.length; py++){
                for(let px = 0; px < currentShape[py].length; px++){
                    if (currentShape[py][px]) {
                        const by = y + py;
                        const bx = x + px;
                        if (by >= 0 && by < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] && bx >= 0 && bx < __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLS"]) {
                            tempBoard[by][bx] = piece.color;
                        }
                    }
                }
            }
            // Check for line clears
            const boardAfterLines = tempBoard.filter((row)=>row.some((cell)=>cell === null));
            linesCleared = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$Constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] - boardAfterLines.length;
            const score = evaluateBoard(boardAfterLines) + linesCleared * 0.760666 * 10; // Weight for line clears
            if (score > bestAction.score) {
                bestAction = {
                    x,
                    rotation: r,
                    score
                };
            }
        }
    }
    return bestAction;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/tetris-battle/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TetrisBattlePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$TetrisCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/TetrisCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/GameUI.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$useTetris$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/useTetris.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/gameLogic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tetris-battle/ai.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function TetrisBattlePage() {
    _s();
    const [isStarted, setIsStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [overallLevel, setOverallLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [playerFlash, setPlayerFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [botFlash, setBotFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Player Hook
    const player = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$useTetris$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTetris"])({
        "TetrisBattlePage.useTetris[player]": (lines, combo, isTSpin)=>{
            setPlayerFlash(true);
            setTimeout({
                "TetrisBattlePage.useTetris[player]": ()=>setPlayerFlash(false)
            }["TetrisBattlePage.useTetris[player]"], 200);
            const attack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAttack"])(lines, combo, player.state.level, isTSpin);
            if (attack > 0) bot.receiveGarbage(attack);
        }
    }["TetrisBattlePage.useTetris[player]"]);
    // Bot Hook
    const bot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$useTetris$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTetris"])({
        "TetrisBattlePage.useTetris[bot]": (lines, combo, isTSpin)=>{
            setBotFlash(true);
            setTimeout({
                "TetrisBattlePage.useTetris[bot]": ()=>setBotFlash(false)
            }["TetrisBattlePage.useTetris[bot]"], 200);
            const attack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$gameLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAttack"])(lines, combo, bot.state.level, isTSpin);
            if (attack > 0) player.receiveGarbage(attack);
        }
    }["TetrisBattlePage.useTetris[bot]"]);
    // Level Up Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TetrisBattlePage.useEffect": ()=>{
            if (bot.state.isGameOver && !player.state.isGameOver && isStarted) {
                // Player won! Incremental level for next round
                setOverallLevel({
                    "TetrisBattlePage.useEffect": (prev)=>prev + 1
                }["TetrisBattlePage.useEffect"]);
            }
        }
    }["TetrisBattlePage.useEffect"], [
        bot.state.isGameOver
    ]);
    // Player Controls
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TetrisBattlePage.useEffect": ()=>{
            if (!isStarted || player.state.isGameOver || bot.state.isGameOver) return;
            const handleKeyDown = {
                "TetrisBattlePage.useEffect.handleKeyDown": (e)=>{
                    switch(e.key){
                        case 'ArrowLeft':
                            e.preventDefault();
                            player.move(-1, 0);
                            break;
                        case 'ArrowRight':
                            e.preventDefault();
                            player.move(1, 0);
                            break;
                        case 'ArrowDown':
                            e.preventDefault();
                            player.move(0, 1);
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            player.rotate();
                            break;
                        case ' ':
                            e.preventDefault();
                            player.hardDrop();
                            break;
                        case 'c':
                        case 'C':
                            e.preventDefault();
                            player.hold();
                            break;
                    }
                    // Alternate check for C key
                    if (e.code === 'KeyC') {
                        player.hold();
                    }
                }
            }["TetrisBattlePage.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "TetrisBattlePage.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["TetrisBattlePage.useEffect"];
        }
    }["TetrisBattlePage.useEffect"], [
        isStarted,
        player,
        bot.state.isGameOver
    ]);
    // Game Loop (Gravity)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TetrisBattlePage.useEffect": ()=>{
            if (!isStarted || player.state.isGameOver || bot.state.isGameOver) return;
            const gravitySpeed = Math.max(150, 1200 - (overallLevel - 1) * 80);
            const interval = setInterval({
                "TetrisBattlePage.useEffect.interval": ()=>{
                    player.move(0, 1);
                }
            }["TetrisBattlePage.useEffect.interval"], gravitySpeed);
            return ({
                "TetrisBattlePage.useEffect": ()=>clearInterval(interval)
            })["TetrisBattlePage.useEffect"];
        }
    }["TetrisBattlePage.useEffect"], [
        isStarted,
        player.state.isGameOver,
        bot.state.isGameOver,
        overallLevel
    ]);
    // Bot AI Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TetrisBattlePage.useEffect": ()=>{
            if (!isStarted || bot.state.isGameOver || player.state.isGameOver) return;
            const botSpeed = Math.max(100, 1500 - (overallLevel - 1) * 100);
            const botInterval = setInterval({
                "TetrisBattlePage.useEffect.botInterval": ()=>{
                    if (bot.state.activePiece) {
                        const bestMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$ai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findBestMove"])(bot.state.board, bot.state.activePiece);
                        // Simulate BOT actions
                        // 1. Rotate to targets
                        for(let i = 0; i < bestMove.rotation; i++)bot.rotate();
                        // 2. Move to target X
                        const diffX = bestMove.x - bot.state.activePiece.pos.x;
                        if (diffX !== 0) {
                            const dir = diffX > 0 ? 1 : -1;
                            for(let i = 0; i < Math.abs(diffX); i++)bot.move(dir, 0);
                        }
                        // 3. Drop
                        bot.hardDrop();
                    }
                }
            }["TetrisBattlePage.useEffect.botInterval"], botSpeed);
            return ({
                "TetrisBattlePage.useEffect": ()=>clearInterval(botInterval)
            })["TetrisBattlePage.useEffect"];
        }
    }["TetrisBattlePage.useEffect"], [
        isStarted,
        bot.state.activePiece,
        bot.state.isGameOver,
        player.state.isGameOver,
        overallLevel
    ]);
    const startGame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TetrisBattlePage.useCallback[startGame]": ()=>{
            player.reset(overallLevel);
            bot.reset(overallLevel);
            setIsStarted(true);
        }
    }["TetrisBattlePage.useCallback[startGame]"], [
        overallLevel,
        player,
        bot
    ]);
    // Start Key Listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TetrisBattlePage.useEffect": ()=>{
            const handleGlobalKey = {
                "TetrisBattlePage.useEffect.handleGlobalKey": (e)=>{
                    if (e.key === 'Enter') {
                        if (!isStarted || player.state.isGameOver || bot.state.isGameOver) {
                            e.preventDefault();
                            startGame();
                        }
                    }
                }
            }["TetrisBattlePage.useEffect.handleGlobalKey"];
            window.addEventListener('keydown', handleGlobalKey);
            return ({
                "TetrisBattlePage.useEffect": ()=>window.removeEventListener('keydown', handleGlobalKey)
            })["TetrisBattlePage.useEffect"];
        }
    }["TetrisBattlePage.useEffect"], [
        isStarted,
        player.state.isGameOver,
        bot.state.isGameOver,
        startGame
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tw-bg-gray-900 tw-text-white tw-flex tw-flex-col tw-justify-center tw-px-2 tw-py-1 sm:tw-px-3 tw-font-sans tw-overflow-hidden",
        style: {
            height: 'calc(100dvh - 120px)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tw-max-w-6xl tw-mx-auto tw-w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tw-flex tw-items-center tw-gap-3 tw-mb-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "tw-text-2xl lg:tw-text-3xl tw-font-black tw-italic tw-tracking-tighter tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-red-500 tw-to-yellow-500",
                            children: "TETRIS BATTLE"
                        }, void 0, false, {
                            fileName: "[project]/app/tetris-battle/page.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        isStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-px-2 tw-py-0.5 tw-bg-yellow-500 tw-text-black tw-text-xs tw-font-black tw-rounded tw-uppercase",
                            children: [
                                "Round ",
                                overallLevel
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/tetris-battle/page.tsx",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this),
                        isStarted && !player.state.isGameOver && !bot.state.isGameOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-text-xs tw-font-bold tw-animate-pulse tw-text-yellow-400 tw-ml-2",
                            children: "● BATTLE IN PROGRESS"
                        }, void 0, false, {
                            fileName: "[project]/app/tetris-battle/page.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/tetris-battle/page.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tw-flex tw-flex-col lg:tw-flex-row tw-gap-3 lg:tw-gap-6 tw-justify-center tw-items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-flex tw-flex-col tw-items-center tw-gap-1 lg:tw-gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "tw-text-base tw-font-bold tw-text-blue-400",
                                    children: "PLAYER (YOU)"
                                }, void 0, false, {
                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-flex tw-gap-2 lg:tw-gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-flex tw-flex-col tw-gap-2 lg:tw-gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceBox"], {
                                                    label: "Hold",
                                                    pieceType: player.state.holdPiece
                                                }, void 0, false, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameStats"], {
                                                    score: player.state.score,
                                                    level: player.state.level,
                                                    lines: player.state.lines,
                                                    isTSpin: player.state.lastMoveTSpin
                                                }, void 0, false, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `tw-relative tw-transition-all tw-duration-200 ${playerFlash ? 'tw-scale-[1.02] tw-brightness-125 tw-shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$TetrisCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            board: player.state.board,
                                                            activePiece: player.state.activePiece,
                                                            isPlayer: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 175,
                                                            columnNumber: 19
                                                        }, this),
                                                        player.state.pendingGarbage > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-absolute -tw-left-2 lg:-tw-left-3 tw-bottom-0 tw-w-1.5 tw-bg-red-500",
                                                            style: {
                                                                height: `${Math.min(100, player.state.pendingGarbage * 5)}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this),
                                                !isStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "tw-absolute tw-inset-0 tw-bg-gray-900/80 tw-backdrop-blur-sm tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded tw-gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-lg tw-font-black tw-text-white tw-text-center tw-leading-tight",
                                                            children: [
                                                                "TETRIS",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                                    lineNumber: 184,
                                                                    columnNumber: 115
                                                                }, this),
                                                                "BATTLE"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: startGame,
                                                            className: "tw-px-5 tw-py-2 tw-bg-red-600 hover:tw-bg-red-700 tw-rounded-full tw-font-bold tw-text-sm tw-transition-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-red-900/50",
                                                            children: "START GAME"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 185,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-xs tw-text-gray-400",
                                                            children: "or press Enter"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, this),
                                                isStarted && (player.state.isGameOver || bot.state.isGameOver) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "tw-absolute tw-inset-0 tw-bg-gray-900/85 tw-backdrop-blur-sm tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded tw-gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-xl tw-font-black tw-text-yellow-400 tw-text-center tw-leading-tight",
                                                            children: player.state.isGameOver ? 'GAME\nOVER' : 'YOU\nWIN!'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-xs tw-text-gray-300 tw-text-center",
                                                            children: player.state.isGameOver ? 'Bot wins this round' : `Ready for Round ${overallLevel}?`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: startGame,
                                                            className: "tw-px-5 tw-py-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-rounded-full tw-font-bold tw-text-sm tw-transition-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-blue-900/50",
                                                            children: player.state.isGameOver ? 'RETRY' : 'NEXT ROUND'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-xs tw-text-gray-400",
                                                            children: "or press Enter"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-flex tw-flex-col tw-gap-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceBox"], {
                                                label: "Next",
                                                pieceType: player.state.nextPiece
                                            }, void 0, false, {
                                                fileName: "[project]/app/tetris-battle/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/tetris-battle/page.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-hidden lg:tw-flex tw-flex-col tw-items-center tw-justify-start tw-pt-4 tw-gap-4 tw-flex-shrink-0",
                            style: {
                                minWidth: '110px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-text-4xl tw-font-black tw-text-gray-700 tw-opacity-50",
                                    children: "VS"
                                }, void 0, false, {
                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-p-3 tw-bg-gray-800 tw-rounded-xl tw-border tw-border-gray-700 tw-w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "tw-text-xs tw-font-bold tw-mb-2 tw-text-gray-300 tw-text-center tw-uppercase tw-tracking-wider",
                                            children: "Controls"
                                        }, void 0, false, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-flex tw-flex-col tw-gap-1.5 tw-text-xs tw-text-gray-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tw-text-white tw-font-bold",
                                                            children: "Enter:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Start/Retry"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tw-text-white tw-font-bold",
                                                            children: "← →:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Move"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tw-text-white tw-font-bold",
                                                            children: "↑:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Rotate"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tw-text-white tw-font-bold",
                                                            children: "↓:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Soft Drop"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tw-text-white tw-font-bold",
                                                            children: "Space:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Hard Drop"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "tw-text-white tw-font-bold",
                                                            children: "C:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 22
                                                        }, this),
                                                        " Hold Piece"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/tetris-battle/page.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-flex tw-flex-col tw-items-center tw-gap-1 lg:tw-gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "tw-text-base tw-font-bold tw-text-red-400",
                                    children: "BOT (AI)"
                                }, void 0, false, {
                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-flex tw-gap-2 lg:tw-gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-flex tw-flex-col tw-gap-2 lg:tw-gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceBox"], {
                                                    label: "Hold",
                                                    pieceType: bot.state.holdPiece
                                                }, void 0, false, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameStats"], {
                                                    score: bot.state.score,
                                                    level: bot.state.level,
                                                    lines: bot.state.lines,
                                                    isTSpin: bot.state.lastMoveTSpin
                                                }, void 0, false, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `tw-relative tw-transition-all tw-duration-200 ${botFlash ? 'tw-scale-[1.02] tw-brightness-125 tw-shadow-[0_0_20px_rgba(239,68,68,0.6)]' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$TetrisCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    board: bot.state.board,
                                                    activePiece: bot.state.activePiece,
                                                    isPlayer: false
                                                }, void 0, false, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this),
                                                bot.state.pendingGarbage > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "tw-absolute -tw-left-2 lg:-tw-left-3 tw-bottom-0 tw-w-1.5 tw-bg-blue-500",
                                                    style: {
                                                        height: `${Math.min(100, bot.state.pendingGarbage * 5)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-flex tw-flex-col tw-gap-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$GameUI$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieceBox"], {
                                                label: "Next",
                                                pieceType: bot.state.nextPiece
                                            }, void 0, false, {
                                                fileName: "[project]/app/tetris-battle/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/tetris-battle/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/tetris-battle/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/tetris-battle/page.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/tetris-battle/page.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/tetris-battle/page.tsx",
            lineNumber: 145,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/tetris-battle/page.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(TetrisBattlePage, "aXMe07tsZ9TJcX8zk8FPbd/0E8w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$useTetris$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTetris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tetris$2d$battle$2f$useTetris$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTetris"]
    ];
});
_c = TetrisBattlePage;
var _c;
__turbopack_context__.k.register(_c, "TetrisBattlePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_67e10c4c._.js.map