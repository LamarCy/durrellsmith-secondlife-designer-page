import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_VERT = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform sampler2D uTex;

  attribute vec2 aUv;
  attribute float aSize;
  attribute float aOffset;

  varying float vBrightness;

  float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }

  void main() {
    vec4 tex = texture2D(uTex, aUv);
    float bright = (tex.r + tex.g + tex.b) / 3.0;
    vBrightness = bright;

    vec3 pos = position;
    float push = (bright - 0.45) * 50.0;
    pos.z += push;

    float n = sin(pos.x * 0.04 + uTime * 0.7 + aOffset) * cos(pos.y * 0.04 + uTime * 0.5);
    pos.z += n * 8.0 * (0.4 + bright);
    pos.x += sin(uTime * 0.4 + aOffset * 6.28) * 1.2 * bright;
    pos.y += cos(uTime * 0.35 + aOffset * 6.28) * 1.2 * bright;

    vec2 m = uMouse * 18.0;
    float dist = distance(pos.xy, m);
    float pull = smoothstep(80.0, 0.0, dist);
    pos.xy += (m - pos.xy) * pull * 0.08;
    pos.z += pull * 14.0;

    float scatter = uScroll;
    vec3 scatterDir = vec3(
      hash(position + 1.0) - 0.5,
      hash(position + 2.0) - 0.5,
      hash(position + 3.0) - 0.5
    );
    pos += scatterDir * scatter * 120.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float sizeScale = mix(1.0, 0.4, scatter);
    gl_PointSize = aSize * sizeScale * (300.0 / -mvPosition.z) * (0.6 + bright * 1.4);
  }
`;

const PARTICLE_FRAG = `
  precision highp float;
  uniform vec3 uColorDark;
  uniform vec3 uColorMid;
  uniform vec3 uColorHot;
  varying float vBrightness;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d);

    vec3 col = mix(uColorDark, uColorMid, smoothstep(0.15, 0.55, vBrightness));
    col = mix(col, uColorHot, smoothstep(0.55, 0.95, vBrightness));
    col += (1.0 - d * 2.0) * 0.15;

    gl_FragColor = vec4(col, alpha * (0.65 + vBrightness * 0.6));
  }
`;

export default function ParticleHead({ imgSrc, testid }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let width = mount.clientWidth;
        let height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            0.1,
            1000,
        );
        camera.position.set(0, 0, 90);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.pointerEvents = "none";

        // Geometry: grid of points
        const COLS = 200;
        const ROWS = 200;
        const PLANE_W = 110;
        const PLANE_H = 110;
        const count = COLS * ROWS;

        const positions = new Float32Array(count * 3);
        const uvs = new Float32Array(count * 2);
        const sizes = new Float32Array(count);
        const offsets = new Float32Array(count);

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const i = y * COLS + x;
                positions[i * 3 + 0] =
                    (x / (COLS - 1) - 0.5) * PLANE_W;
                positions[i * 3 + 1] =
                    (0.5 - y / (ROWS - 1)) * PLANE_H;
                positions[i * 3 + 2] = 0;
                uvs[i * 2 + 0] = x / (COLS - 1);
                uvs[i * 2 + 1] = 1.0 - y / (ROWS - 1);
                sizes[i] = 1.4 + Math.random() * 1.6;
                offsets[i] = Math.random();
            }
        }

        const geom = new THREE.BufferGeometry();
        geom.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        );
        geom.setAttribute("aUv", new THREE.BufferAttribute(uvs, 2));
        geom.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geom.setAttribute(
            "aOffset",
            new THREE.BufferAttribute(offsets, 1),
        );

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uScroll: { value: 0 },
            uTex: { value: null },
            uColorDark: { value: new THREE.Color("#2a1810") },
            uColorMid: { value: new THREE.Color("#c4432c") },
            uColorHot: { value: new THREE.Color("#f4d4a8") },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: PARTICLE_VERT,
            fragmentShader: PARTICLE_FRAG,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending,
        });

        const points = new THREE.Points(geom, material);
        scene.add(points);

        // Load texture
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "anonymous";
        loader.load(imgSrc, (t) => {
            t.minFilter = THREE.LinearFilter;
            t.magFilter = THREE.LinearFilter;
            t.generateMipmaps = false;
            uniforms.uTex.value = t;
        });

        // Mouse + scroll
        const target = { mx: 0, my: 0, scroll: 0 };
        const onMove = (e) => {
            target.mx = (e.clientX / window.innerWidth) * 2 - 1;
            target.my = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        const onScroll = () => {
            const max = window.innerHeight * 0.85;
            target.scroll = Math.min(window.scrollY / max, 1);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("scroll", onScroll, { passive: true });

        // Resize
        const onResize = () => {
            width = mount.clientWidth;
            height = mount.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        // Animate
        const clock = new THREE.Clock();
        let raf;
        const tick = () => {
            const dt = clock.getDelta();
            uniforms.uTime.value += dt;
            uniforms.uMouse.value.x +=
                (target.mx - uniforms.uMouse.value.x) * 0.06;
            uniforms.uMouse.value.y +=
                (target.my - uniforms.uMouse.value.y) * 0.06;
            uniforms.uScroll.value +=
                (target.scroll - uniforms.uScroll.value) * 0.05;
            points.rotation.y =
                Math.sin(uniforms.uTime.value * 0.25) * 0.08;
            points.rotation.x =
                Math.cos(uniforms.uTime.value * 0.2) * 0.04;
            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            geom.dispose();
            material.dispose();
            if (uniforms.uTex.value) uniforms.uTex.value.dispose();
            renderer.dispose();
            if (renderer.domElement.parentNode === mount) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [imgSrc]);

    return (
        <div
            ref={mountRef}
            data-testid={testid}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
        />
    );
}
