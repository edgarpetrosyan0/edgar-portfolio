"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Node = {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
};

type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
};

const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 200;

export default function NetworkBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [nodes, setNodes] = useState<Node[]>([]);
    const [mouse, setMouse] = useState({
        x: -9999,
        y: -9999,
    });

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    const [reducedMotion, setReducedMotion] = useState(false);

    /**
     * Setup responsive canvas size + nodes
     */
    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setSize({
                width,
                height,
            });

            const count = Math.max(
                28,
                Math.min(90, Math.floor((width * height) / 16000))
            );

            setNodes(
                Array.from({ length: count }, (_, index) => ({
                    id: index,
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                }))
            );
        };

        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    /**
     * Reduced motion
     */
    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const update = () => {
            setReducedMotion(mediaQuery.matches);
        };

        update();

        mediaQuery.addEventListener("change", update);

        return () => {
            mediaQuery.removeEventListener("change", update);
        };
    }, []);

    /**
     * Mouse tracking
     */
    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            setMouse({
                x: event.clientX,
                y: event.clientY,
            });
        };

        const handlePointerLeave = () => {
            setMouse({
                x: -9999,
                y: -9999,
            });
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            window.removeEventListener(
                "pointerleave",
                handlePointerLeave
            );
        };
    }, []);

    /**
     * Animation
     */
    useEffect(() => {
        if (reducedMotion || size.width === 0 || size.height === 0) {
            return;
        }

        let animationFrame = 0;

        const animate = () => {
            setNodes((currentNodes) =>
                currentNodes.map((node) => {
                    let x = node.x + node.vx;
                    let y = node.y + node.vy;

                    let vx = node.vx;
                    let vy = node.vy;

                    /**
                     * Bounce from edges
                     */
                    if (x <= 0 || x >= size.width) {
                        vx *= -1;
                        x = Math.max(0, Math.min(size.width, x));
                    }

                    if (y <= 0 || y >= size.height) {
                        vy *= -1;
                        y = Math.max(0, Math.min(size.height, y));
                    }

                    /**
                     * Cursor attraction
                     */
                    const dx = mouse.x - x;
                    const dy = mouse.y - y;

                    const distanceSquared = dx * dx + dy * dy;

                    if (
                        distanceSquared < 180 * 180 &&
                        distanceSquared > 1
                    ) {
                        x += dx * 0.0025;
                        y += dy * 0.0025;
                    }

                    return {
                        ...node,
                        x,
                        y,
                        vx,
                        vy,
                    };
                })
            );

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [
        reducedMotion,
        size.width,
        size.height,
        mouse.x,
        mouse.y,
    ]);

    /**
     * Calculate lines
     */
    const lines = useMemo<Line[]>(() => {
        const result: Line[] = [];

        const hasMouse = mouse.x > -9000;

        /**
         * Node -> Node
         */
        for (let i = 0; i < nodes.length; i++) {
            for (
                let j = i + 1;
                j < nodes.length;
                j++
            ) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < LINK_DISTANCE) {
                    const opacity =
                        (1 - distance / LINK_DISTANCE) * 0.28;

                    result.push({
                        x1: nodes[i].x,
                        y1: nodes[i].y,
                        x2: nodes[j].x,
                        y2: nodes[j].y,
                        opacity,
                    });

                    if (result.length >= 700) {
                        return result;
                    }
                }
            }
        }

        /**
         * Node -> Mouse
         */
        if (hasMouse) {
            for (const node of nodes) {
                const dx = node.x - mouse.x;
                const dy = node.y - mouse.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < MOUSE_DISTANCE) {
                    const opacity =
                        (1 - distance / MOUSE_DISTANCE) * 0.6;

                    result.push({
                        x1: node.x,
                        y1: node.y,
                        x2: mouse.x,
                        y2: mouse.y,
                        opacity,
                    });

                    if (result.length >= 700) {
                        return result;
                    }
                }
            }
        }

        return result;
    }, [nodes, mouse]);

    return (
        <div
            ref={containerRef}
            className="network-background"
            aria-hidden="true"
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${size.width} ${size.height}`}
                preserveAspectRatio="none"
            >
                {/* Lines */}
                {lines.map((line, index) => (
                    <line
                        key={index}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="rgb(225, 28, 71)"
                        strokeWidth="1"
                        opacity={line.opacity}
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                    <circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r="2.5"
                        fill="rgb(255, 77, 94)"
                        opacity="0.85"
                    />
                ))}
            </svg>
        </div>
    );
}