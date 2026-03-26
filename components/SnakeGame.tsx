'use client';

import { useEffect, useRef, useState } from 'react';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalBtnRef = useRef<HTMLButtonElement>(null);
  
  // Game state (using refs for the game loop)
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  const directionRef = useRef({ dx: 0, dy: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });

  const gridSize = 20;

  useEffect(() => {
    // Show modal on load
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const generateFood = () => {
      let newFoodPosition = { x: 0, y: 0 };
      while (true) {
        newFoodPosition = {
          x: Math.floor((Math.random() * canvas.width) / gridSize),
          y: Math.floor((Math.random() * canvas.height) / gridSize),
        };
        const overlap = snakeRef.current.some(
          (segment) => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
        );
        if (!overlap) break;
      }
      foodRef.current = newFoodPosition;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'orange';
      ctx.fillRect(foodRef.current.x * gridSize, foodRef.current.y * gridSize, gridSize, gridSize);
      snakeRef.current.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'blue' : 'green';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
    };

    const moveSnake = () => {
      const { dx, dy } = directionRef.current;
      if (dx === 0 && dy === 0) return;

      const head = { x: snakeRef.current[0].x + dx, y: snakeRef.current[0].y + dy };
      if (head.x < 0) head.x = canvas.width / gridSize - 1;
      else if (head.x >= canvas.width / gridSize) head.x = 0;
      if (head.y < 0) head.y = canvas.height / gridSize - 1;
      else if (head.y >= canvas.height / gridSize) head.y = 0;

      const newSnake = [head, ...snakeRef.current];
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        generateFood();
      } else {
        newSnake.pop();
      }
      snakeRef.current = newSnake;
    };

    const update = () => {
      moveSnake();
      draw();
    };

    const gameInterval = setInterval(update, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      const { dx, dy } = directionRef.current;
      const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'c', 'C'];
      if (gameKeys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' && dy === 0) directionRef.current = { dx: 0, dy: -1 };
      else if (e.key === 'ArrowDown' && dy === 0) directionRef.current = { dx: 0, dy: 1 };
      else if (e.key === 'ArrowLeft' && dx === 0) directionRef.current = { dx: -1, dy: 0 };
      else if (e.key === 'ArrowRight' && dx === 0) directionRef.current = { dx: 1, dy: 0 };
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      const dxTouch = e.touches[0].clientX - touchStartRef.current.x;
      const dyTouch = e.touches[0].clientY - touchStartRef.current.y;
      const { dx, dy } = directionRef.current;
      if (Math.abs(dxTouch) > Math.abs(dyTouch)) {
        if (dxTouch > 0 && dx === 0) directionRef.current = { dx: 1, dy: 0 };
        else if (dxTouch < 0 && dx === 0) directionRef.current = { dx: -1, dy: 0 };
      } else {
        if (dyTouch > 0 && dy === 0) directionRef.current = { dx: 0, dy: 1 };
        else if (dyTouch < 0 && dy === 0) directionRef.current = { dx: 0, dy: -1 };
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="container px-4">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bolder mb-0">
          <span className="text-gradient d-inline">Greedy Snake</span>
        </h1>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          style={{ border: '2px solid #ccc', borderRadius: '8px', background: '#fff' }}
        ></canvas>
      </div>

      <button
        type="button"
        ref={modalBtnRef}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#snakeModal"
      >
        Modal Trigger
      </button>

      <div className="modal fade" id="snakeModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">注意事項</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              請使用方向鍵 😊 <br />
              手機也可以玩了！但小心不要下拉過多變成重新整理 XD <br />
              建議壓著直接操作
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
