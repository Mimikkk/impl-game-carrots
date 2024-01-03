import * as Three from "three";
import { Vector2, Vector3 } from "three";
import { createSignal, onCleanup, Show } from "solid-js";
import WaterShaderFs from "./watershader.fragment.glsl?raw";
import WaterShaderVs from "./watershader.vertex.glsl?raw";
import { createListener } from "@logic/createListener.js";

namespace WaterShader {
  const fs = WaterShaderFs;
  const vs = WaterShaderVs;

  export const create = () => {
    const uniforms = {
      globals: {
        value: {
          time: 100000,
          resolution: new Vector2(window.innerWidth, window.innerHeight),
        },
      },
      configuration: {
        value: {
          iterations_height: 3,
          iterations_geometry: 3,
          iterations_fragment: 3,
          height: 0.5,
          choppy: 4.0,
          speed: 2,
          frequency: 0.16,
          level_color: new Vector3(0.06, 0.2, 0.3),
          water_color: new Vector3(0.6, 0.1, 0.6),
        },
      },
    };

    const material = new Three.ShaderMaterial({ uniforms, vertexShader: vs, fragmentShader: fs });

    return { uniforms, material };
  };
}

const [isRunning, setIsRunning] = createSignal(true);

const createRenderer = (canvas: HTMLCanvasElement) => {
  const clock = new Three.Clock();
  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);
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
      uniforms.globals.value.time += clock.getDelta();
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
      <Show when={!isRunning()}>
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div class="bg-slate-800 p-4 rounded-sm border-t-2 border-amber-300 shadow">
            <p class="text-2xl text-white">Paused</p>
            <p class="text-lg text-white">Press P to continue</p>
          </div>
        </div>
      </Show>
    </div>
  );
};
