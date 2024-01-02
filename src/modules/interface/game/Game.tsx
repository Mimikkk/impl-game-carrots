import * as Three from "three";
import { Vector2 } from "three";
import { createSignal, onCleanup } from "solid-js";
import WaterShaderFs from "./watershader.fragment.glsl?raw";
import WaterShaderVs from "./watershader.vertex.glsl?raw";
import { createListener } from "@logic/createListener.js";

namespace WaterShader {
  const fs = WaterShaderFs;
  const vs = WaterShaderVs;

  export const create = () => {
    const uniforms = {
      iGlobalTime: { value: 0.1 },
      iResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    };

    const material = new Three.ShaderMaterial({ uniforms, vertexShader: vs, fragmentShader: fs });

    return { uniforms, material };
  };
}

const [isRunning, setIsRunning] = createSignal(true);

const createRenderer = (canvas: HTMLCanvasElement) => {
  const clock = new Three.Clock();
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0, 0);
  const { uniforms, material } = WaterShader.create();
  const water = new Three.Mesh(new Three.PlaneGeometry(window.innerWidth, window.innerHeight), material);

  const geometry = new Three.SphereGeometry(10, 32, 32);
  const color = new Three.MeshBasicMaterial({ color: 0xffff00 });
  const sphere = new Three.Mesh(geometry, color);
  scene.add(camera);
  scene.add(water);
  scene.add(sphere);

  const renderer = new Three.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(() => {
    if (!isRunning()) {
    } else {
      uniforms.iGlobalTime.value += clock.getDelta();
    }

    renderer.render(scene, camera);
  });
  renderer.render(scene, camera);

  return { renderer, scene, clock, camera };
};

export const Game = () => {
  return (
    <div>
      <canvas
        ref={(ref) => {
          const { renderer, camera, clock } = createRenderer(ref);

          onCleanup(renderer.dispose);
          createListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          });
          createListener("keydown", (event) => {
            if (event.key !== "p") return;

            if (clock.running) clock.stop();
            else clock.start();
            setIsRunning(clock.running);
          });
        }}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  );
};
