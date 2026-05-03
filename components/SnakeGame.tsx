'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure,
  Divider
} from '@heroui/react';
import { 
  Trophy, 
  Gamepad2, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Info,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Game state
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  const bombsRef = useRef<{ x: number, y: number }[]>([]);
  const directionRef = useRef({ dx: 0, dy: 0 });
  const nextDirectionsRef = useRef<{ dx: number, dy: number }[]>([]);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const speedRef = useRef(150);

  const gridSize = 40; // Increased from 20 for higher resolution

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { dx: 0, dy: 0 };
    nextDirectionsRef.current = [];
    bombsRef.current = [];
    setScore(0);
    setIsGameOver(false);
    speedRef.current = 150;
  }, []);

  useEffect(() => {
    // Show instruction modal only on first load
    onOpen();
  }, [onOpen]);

  useEffect(() => {
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
        ) || bombsRef.current.some(b => b.x === newFoodPosition.x && b.y === newFoodPosition.y);
        if (!overlap) break;
      }
      foodRef.current = newFoodPosition;
    };

    const generateBomb = () => {
      let newBombPosition = { x: 0, y: 0 };
      while (true) {
        newBombPosition = {
          x: Math.floor((Math.random() * canvas.width) / gridSize),
          y: Math.floor((Math.random() * canvas.height) / gridSize),
        };
        const overlap = snakeRef.current.some(
          (segment) => segment.x === newBombPosition.x && segment.y === newBombPosition.y
        ) || (foodRef.current.x === newBombPosition.x && foodRef.current.y === newBombPosition.y)
          || bombsRef.current.some(b => b.x === newBombPosition.x && b.y === newBombPosition.y);
        if (!overlap) break;
      }
      bombsRef.current = [...bombsRef.current, newBombPosition];
    };

    // Initialize bombs
    if (bombsRef.current.length === 0) {
      generateBomb();
      generateBomb();
    }

    const draw = () => {
      // Clear canvas with a slight grid pattern
      ctx.fillStyle = '#f8fafc'; // gray-50
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid
      ctx.strokeStyle = '#f1f5f9'; // gray-100
      ctx.lineWidth = 1;
      for (let i = 0; i <= canvas.width; i += gridSize) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw Food (Apple)
      ctx.fillStyle = '#ef4444'; // red-500
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
      ctx.beginPath();
      const centerX = foodRef.current.x * gridSize + gridSize / 2;
      const centerY = foodRef.current.y * gridSize + gridSize / 2;
      ctx.arc(centerX, centerY, gridSize / 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Bombs
      bombsRef.current.forEach(bomb => {
        ctx.fillStyle = '#1e293b'; // slate-800
        ctx.beginPath();
        const bX = bomb.x * gridSize + gridSize / 2;
        const bY = bomb.y * gridSize + gridSize / 2;
        ctx.arc(bX, bY, gridSize / 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw Fuse
        ctx.strokeStyle = '#f97316'; // orange-500
        ctx.lineWidth = 3; // Increased for resolution
        ctx.beginPath();
        ctx.moveTo(bX, bY - gridSize / 4);
        ctx.lineTo(bX + gridSize / 4, bY - gridSize / 2);
        ctx.stroke();
      });

      // Draw Snake
      snakeRef.current.forEach((segment, index) => {
        const isHead = index === 0;
        ctx.fillStyle = isHead ? '#3b82f6' : '#60a5fa'; // blue-500 / blue-400
        
        // Rounded rectangle for snake segments
        const r = gridSize / 5;
        const x = segment.x * gridSize + 2; // Adjusted padding
        const y = segment.y * gridSize + 2;
        const w = gridSize - 4;
        const h = gridSize - 4;
        
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();

        // Draw eyes on head
        if (isHead) {
          ctx.fillStyle = 'white';
          const eyeSize = gridSize / 7;
          const { dx, dy } = directionRef.current;
          
          let eyeX1, eyeY1, eyeX2, eyeY2;
          const offset1 = gridSize * 0.25;
          const offset2 = gridSize * 0.75;

          if (dy === -1) { eyeX1 = x + offset1; eyeY1 = y + offset1; eyeX2 = x + offset2; eyeY2 = y + offset1; }
          else if (dy === 1) { eyeX1 = x + offset1; eyeY1 = y + offset2; eyeX2 = x + offset2; eyeY2 = y + offset2; }
          else if (dx === -1) { eyeX1 = x + offset1; eyeY1 = y + offset1; eyeX2 = x + offset1; eyeY2 = y + offset2; }
          else { eyeX1 = x + offset2; eyeY1 = y + offset1; eyeX2 = x + offset2; eyeY2 = y + offset2; }
          
          ctx.beginPath(); ctx.arc(eyeX1, eyeY1, eyeSize, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(eyeX2, eyeY2, eyeSize, 0, Math.PI * 2); ctx.fill();
        }
      });
    };

    const moveSnake = () => {
      // Process next direction from queue if available
      if (nextDirectionsRef.current.length > 0) {
        const next = nextDirectionsRef.current.shift()!;
        directionRef.current = next;
      }

      const { dx, dy } = directionRef.current;
      if (dx === 0 && dy === 0) return;

      const head = { x: snakeRef.current[0].x + dx, y: snakeRef.current[0].y + dy };
      
      // Wrap around walls
      if (head.x < 0) head.x = canvas.width / gridSize - 1;
      else if (head.x >= canvas.width / gridSize) head.x = 0;
      if (head.y < 0) head.y = canvas.height / gridSize - 1;
      else if (head.y >= canvas.height / gridSize) head.y = 0;

      // Check collision with self (Removed as per user request)
      /*
      const selfCollision = snakeRef.current.some(s => s.x === head.x && s.y === head.y);
      if (selfCollision) {
        setIsGameOver(true);
        directionRef.current = { dx: 0, dy: 0 };
        return;
      }
      */

      const newSnake = [head, ...snakeRef.current];
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(s => s + 10);
        generateFood();
        // Occasionally add a bomb when eating food
        if (Math.random() > 0.7) generateBomb();
      } else if (bombsRef.current.some(b => b.x === head.x && b.y === head.y)) {
        // Hit a bomb
        setScore(s => Math.max(0, s - 5));
        bombsRef.current = bombsRef.current.filter(b => b.x !== head.x || b.y !== head.y);
        generateBomb();
        
        // Remove tail if length > 1
        if (newSnake.length > 2) {
          newSnake.pop(); // Remove the tail that was just added (head + original)
          newSnake.pop(); // Remove one more to shrink
        } else {
          newSnake.pop();
        }
      } else {
        newSnake.pop();
      }
      snakeRef.current = newSnake;
    };

    const update = () => {
      if (!isGameOver) {
        moveSnake();
        draw();
      }
    };

    // Use a self-correcting game loop instead of fixed interval to handle speed changes and avoid hiccups
    let timeoutId: NodeJS.Timeout;
    const loop = () => {
      update();
      timeoutId = setTimeout(loop, speedRef.current);
    };
    
    timeoutId = setTimeout(loop, speedRef.current);

    const handleKeyDown = (e: KeyboardEvent) => {
      const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'c', 'C'];
      if (gameKeys.includes(e.key)) e.preventDefault();

      const lastDir = nextDirectionsRef.current.length > 0 
        ? nextDirectionsRef.current[nextDirectionsRef.current.length - 1] 
        : directionRef.current;

      let nextDir = null;
      if (e.key === 'ArrowUp' && lastDir.dy === 0) nextDir = { dx: 0, dy: -1 };
      else if (e.key === 'ArrowDown' && lastDir.dy === 0) nextDir = { dx: 0, dy: 1 };
      else if (e.key === 'ArrowLeft' && lastDir.dx === 0) nextDir = { dx: -1, dy: 0 };
      else if (e.key === 'ArrowRight' && lastDir.dx === 0) nextDir = { dx: 1, dy: 0 };

      if (nextDir && nextDirectionsRef.current.length < 3) {
        nextDirectionsRef.current.push(nextDir);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      e.preventDefault();
      const dxTouch = e.touches[0].clientX - touchStartRef.current.x;
      const dyTouch = e.touches[0].clientY - touchStartRef.current.y;
      
      const lastDir = nextDirectionsRef.current.length > 0 
        ? nextDirectionsRef.current[nextDirectionsRef.current.length - 1] 
        : directionRef.current;

      let nextDir = null;
      if (Math.abs(dxTouch) > Math.abs(dyTouch)) {
        if (dxTouch > 30 && lastDir.dx === 0) nextDir = { dx: 1, dy: 0 };
        else if (dxTouch < -30 && lastDir.dx === 0) nextDir = { dx: -1, dy: 0 };
      } else {
        if (dyTouch > 30 && lastDir.dy === 0) nextDir = { dx: 0, dy: 1 };
        else if (dyTouch < -30 && lastDir.dy === 0) nextDir = { dx: 0, dy: -1 };
      }

      if (nextDir && nextDirectionsRef.current.length < 3) {
        nextDirectionsRef.current.push(nextDir);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isGameOver, onOpen]);

  // Separate effect for high score and speed to avoid game loop restarts
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
    // Update the speed ref so the game loop picks it up on the next frame
    speedRef.current = Math.max(50, 150 - Math.floor(score / 30) * 1);
  }, [score, highScore]);

  const handleManualControl = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    const { dx, dy } = directionRef.current;
    if (dir === 'UP' && dy === 0) directionRef.current = { dx: 0, dy: -1 };
    if (dir === 'DOWN' && dy === 0) directionRef.current = { dx: 0, dy: 1 };
    if (dir === 'LEFT' && dx === 0) directionRef.current = { dx: -1, dy: 0 };
    if (dir === 'RIGHT' && dx === 0) directionRef.current = { dx: 1, dy: 0 };
  };

  return (
    <div className="bg-gray-50/30 min-h-screen py-12 px-6 flex flex-col justify-center items-center">
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black tracking-tight text-gradient mb-2">貪吃蛇</h1>
            <p className="text-gray-500 font-medium">經典遊戲，全新體驗</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Game Canvas */}
          <Card className="border-none shadow-2xl bg-white p-2 sm:p-4 overflow-hidden">
            <CardBody className="p-0 flex items-center justify-center relative bg-gray-50 rounded-xl overflow-hidden aspect-square border-4 border-gray-100 max-h-[60vh] md:max-h-none">
               <canvas
                ref={canvasRef}
                width="800"
                height="800"
                className="w-full h-full object-contain"
                style={{ touchAction: 'none' }}
              />
              
              {isGameOver && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6 z-20">
                  <div className="bg-danger/10 p-4 rounded-full text-danger">
                    < RotateCcw size={48} />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900">遊戲結束</h2>
                  <div className="text-center">
                    <p className="text-gray-500 font-bold">最終得分</p>
                    <p className="text-6xl font-black text-primary">{score}</p>
                  </div>
                  <Button 
                    color="primary" 
                    size="lg" 
                    className="font-black px-12 py-7 text-xl" 
                    radius="full"
                    onPress={resetGame}
                  >
                    再玩一次
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Stats & Controls */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="flex gap-3 bg-gray-50/50 py-4">
                <Trophy className="text-yellow-500" size={20} />
                <p className="text-lg font-black tracking-tight">遊戲數據</p>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6 py-6">
                <div className="flex justify-between items-center bg-primary-50 p-3 rounded-2xl">
                  <span className="text-primary-700 font-bold ml-2">目前得分</span>
                  <Chip color="primary" variant="shadow" className="font-black text-xl px-4 py-3 h-auto">
                    {score}
                  </Chip>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">High Score</span>
                    <span className="font-black text-3xl text-gray-700">{highScore}</span>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded-xl">
                    <Trophy className="text-yellow-600" size={24} />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="flex gap-3 bg-gray-50/50 py-4">
                <Gamepad2 className="text-blue-500" size={20} />
                <p className="text-lg font-black tracking-tight">操作面板</p>
              </CardHeader>
              <Divider />
              <CardBody className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-3xl shadow-inner">
                    <div />
                    <Button 
                      isIconOnly 
                      variant="shadow" 
                      color="primary" 
                      onPress={() => handleManualControl('UP')} 
                      className="h-16 w-16 text-white rounded-2xl"
                    >
                      <ArrowUp size={28} strokeWidth={3} />
                    </Button>
                    <div />
                    
                    <Button 
                      isIconOnly 
                      variant="shadow" 
                      color="primary" 
                      onPress={() => handleManualControl('LEFT')} 
                      className="h-16 w-16 text-white rounded-2xl"
                    >
                      <ArrowLeft size={28} strokeWidth={3} />
                    </Button>
                    <Button 
                      isIconOnly 
                      variant="shadow" 
                      color="primary" 
                      onPress={() => handleManualControl('DOWN')} 
                      className="h-16 w-16 text-white rounded-2xl"
                    >
                      <ArrowDown size={28} strokeWidth={3} />
                    </Button>
                    <Button 
                      isIconOnly 
                      variant="shadow" 
                      color="primary" 
                      onPress={() => handleManualControl('RIGHT')} 
                      className="h-16 w-16 text-white rounded-2xl"
                    >
                      <ArrowRight size={28} strokeWidth={3} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="text-blue-400" size={16} />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">遊戲提示</span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    電腦玩家：使用鍵盤方向鍵控制。<br />
                    手機玩家：滑動螢幕或使用上方按鈕。
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Instruction Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">遊戲說明</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-2xl flex gap-4">
                    <div className="bg-blue-500 text-white p-2 rounded-xl h-fit">
                      <Gamepad2 size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-blue-900">控制方式</p>
                      <p className="text-sm text-blue-700">使用方向鍵或滑動螢幕來控制蛇的方向。蛇會不斷前進，碰到食物會變長。</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-2xl flex gap-4">
                    <div className="bg-red-500 text-white p-2 rounded-xl h-fit">
                      <RotateCcw size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-red-900">遊戲規則</p>
                      <p className="text-sm text-red-700">您現在可以自由穿過自己的身體而不會死亡。遊戲支援牆壁穿透（Wrap-around）。</p>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-2xl flex gap-4">
                    <div className="bg-orange-500 text-white p-2 rounded-xl h-fit">
                      <div className="w-6 h-6 flex items-center justify-center font-bold">!</div>
                    </div>
                    <div>
                      <p className="font-bold text-orange-900">小心炸彈</p>
                      <p className="text-sm text-orange-700">碰到黑色炸彈會扣 5 分，並且蛇的長度會減少一節。請盡量避開它們！</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" className="font-bold w-full" onPress={onClose}>
                  立即開始
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
