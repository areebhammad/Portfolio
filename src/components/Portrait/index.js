import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import {
  WebGLRenderer,
  ACESFilmicToneMapping,
  sRGBEncoding,
  PerspectiveCamera,
  Scene,
  Fog,
  Color,
  HalfFloatType,
  AmbientLight,
  RectAreaLight,
} from 'three';
import {
  EffectComposer,
  RenderPass,
  NormalPass,
  SSAOEffect,
  BlendFunction,
  BloomEffect,
  KernelSize,
  EffectPass,
} from 'postprocessing';
import { spring, value } from 'popmotion';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { usePrefersReducedMotion, useInViewport } from 'hooks';
import { cleanScene, cleanRenderer, removeLights } from 'utils/three';
import { rgbToThreeColor } from 'utils/style';
import { useTheme } from 'components/ThemeProvider';
import portraitModelPath from 'assets/portrait.glb';
import './index.css';

RectAreaLightUniformsLib.init();

const Portrait = ({ className, delay, ...rest }) => {
  const { rgbBackgroundLight, themeId } = useTheme();
  const container = useRef();
  const canvas = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const composer = useRef();
  const lights = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(container);

  // Init scene and models
  useEffect(() => {
    const { clientWidth, clientHeight } = container.current;

    renderer.current = new WebGLRenderer({
      alpha: true,
      antialias: false,
      stencil: false,
      depth: false,
      canvas: canvas.current,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(clientWidth, clientHeight);
    renderer.current.setPixelRatio(2);
    renderer.current.toneMapping = ACESFilmicToneMapping;
    renderer.current.outputEncoding = sRGBEncoding;

    camera.current = new PerspectiveCamera(45, clientWidth / clientHeight, 0.5, 2.25);
    camera.current.position.z = 0.8;

    scene.current = new Scene();
    scene.current.fog = new Fog(0xffffff, 0, 2.25);

    composer.current = new EffectComposer(renderer.current, {
      frameBufferType: HalfFloatType,
    });
    const renderPass = new RenderPass(scene.current, camera.current);
    composer.current.addPass(renderPass);

    const normalPass = new NormalPass(scene.current, camera.current);

    const ssaoEffect = new SSAOEffect(camera.current, normalPass.renderTarget.texture, {
      blendFunction: BlendFunction.MULTIPLY,
      samples: 21,
      rings: 4,
      distanceThreshold: 1.0,
      distanceFalloff: 0.0,
      rangeThreshold: 0.015,
      rangeFalloff: 0.002,
      luminanceInfluence: 0.9,
      radius: 20,
      scale: 0.25,
      bias: 0.25,
    });

    const bloomEffect = new BloomEffect({
      opacity: 1,
      blendFunction: BlendFunction.SCREEN,
      kernelSize: KernelSize.SMALL,
      luminanceThreshold: 0.65,
      luminanceSmoothing: 0.07,
      height: 600,
    });
    bloomEffect.blendMode.opacity.value = 1;

    const effectPass = new EffectPass(camera.current, ssaoEffect, bloomEffect);
    effectPass.renderToScreen = true;

    composer.current.addPass(normalPass);
    composer.current.addPass(effectPass);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

    const modelLoader = new GLTFLoader();
    modelLoader.setDRACOLoader(dracoLoader);

    modelLoader.load(portraitModelPath, model => {
      model.scene.position.y = -1.6;
      scene.current.add(model.scene);

      composer.current.render();
    });

    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  // Lights
  useEffect(() => {
    const ambientLight = new AmbientLight(0xffffff, themeId === 'dark' ? 0.1 : 0.2);

    const rectLight1 = new RectAreaLight(0xffffff, 6, 10, 10);
    rectLight1.position.set(4.5, -1.3, -3);
    rectLight1.lookAt(0, 0, 0);

    const rectLight2 = new RectAreaLight(0xffffff, 6, 15, 15);
    rectLight2.position.set(-10, 0.7, -10);
    rectLight2.lookAt(0, 0, 0);

    lights.current = [ambientLight, rectLight1, rectLight2];
    lights.current.forEach(light => scene.current.add(light));

    scene.current.fog.color = new Color(...rgbToThreeColor(rgbBackgroundLight));
    scene.current.fog.far = 10;

    return () => {
      removeLights(lights.current);
    };
  }, [themeId, rgbBackgroundLight]);

  // Handle mouse move animation
  useEffect(() => {
    let rotationSpring;
    let rotationSpringValue;

    const onMouseMove = event => {
      const { rotation } = scene.current;
      const { innerWidth, innerHeight } = window;

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      };

      if (!rotationSpringValue) {
        rotationSpringValue = value({ x: rotation.x, y: rotation.y }, ({ x, y }) => {
          rotation.set(x, y, rotation.z);
          composer.current.render();
        });
      }

      rotationSpring = spring({
        from: rotationSpringValue.get(),
        to: { x: position.y / 2, y: position.x / 2 },
        stiffness: 40,
        damping: 40,
        velocity: rotationSpringValue.getVelocity(),
        restSpeed: 0.00001,
        mass: 1.4,
      }).start(rotationSpringValue);
    };

    if (isInViewport && !prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);

      rotationSpring?.stop();
    };
  }, [isInViewport, prefersReducedMotion]);

  // Handles window resize
  useEffect(() => {
    const handleResize = () => {
      const { clientWidth, clientHeight } = container.current;

      renderer.current.setSize(clientWidth, clientHeight);
      composer.current.setSize(clientWidth, clientHeight);
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();

      // Render a single frame on resize
      composer.current.render();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={classNames('portrait', `portrait--${themeId}`, className)}
      ref={container}
      style={{ '--delay': delay }}
      role="img"
      aria-label="A 3D portrait of myself."
      {...rest}
    >
      <canvas aria-hidden className="portrait__canvas" ref={canvas} />
    </div>
  );
};

export default Portrait;
