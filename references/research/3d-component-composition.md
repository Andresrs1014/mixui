# 3D Component Composition

Use this reference when a UI task asks for 3D components, exploded views, product viewers, primitive geometry, interactive models, Spline scenes, or motion around 3D objects.

## Source Roles

- Motion: use for DOM/UI choreography, layout transitions, scroll storytelling, entrance states, and synchronized interface motion. Do not use it as the 3D renderer.
- React Three Fiber: use for React-controlled 3D scenes, reusable 3D components, interaction, state-driven animation, and model composition.
- Three.js examples: use as a technical reference bank for materials, shaders, cameras, loaders, geometry, post-processing, controls, and rendering patterns.
- Spline: use as a visual 3D design tool or asset source when the scene is better authored visually. Treat it as an embed or exported asset pipeline unless the user needs deep runtime control.

## Choosing The Technique

Use SVG or CSS when:
- The output is a lightweight isometric illustration.
- The scene is mostly static labels, lines, and simple depth cues.
- The component must stay very small and accessible in normal HTML flow.

Use CSS 3D when:
- The component is simple, card-like, and made from DOM layers.
- The goal is perspective, parallax, or stack depth without real 3D meshes.
- Text must remain selectable and accessible.

Use React Three Fiber when:
- The object needs real camera, lights, shadows, raycast interaction, or mesh-level control.
- The user asks for exploded views, assembly motion, product viewers, primitive geometry, or scroll-controlled 3D scenes.
- The app already uses React and can accept `three`, `@react-three/fiber`, and optionally `@react-three/drei`.

Use direct Three.js when:
- The project is not React-based.
- The scene needs lower-level renderer control than R3F provides.
- A Three.js example maps closely to the requested effect.

Use Spline when:
- The design is visually authored and can be embedded or exported.
- The user needs a fast art-directed 3D scene more than code-level geometry control.
- The scene can be treated as a controlled background, hero object, or exported GLB asset.

Avoid Spline when:
- The user expects every mesh, label, state, and interaction to be generated and edited in code.
- The product requires deterministic tests over individual 3D parts.
- The scene must be deeply integrated with app data and complex state.

## 3D Grammar For Components

Break every object into primitives before coding:

- Box: bases, panels, housings, cards, cases, blocks.
- Cylinder: knobs, discs, platters, wheels, pins, buttons, pipes.
- Sphere: joints, caps, rounded masses, ball forms.
- Cone: pointers, speaker cones, tapered caps, stylized indicators.
- Torus: rings, gaskets, rims, curved handles.
- Tube or curve: wires, cables, arms, arcs, paths.
- Lathe geometry: bottles, knobs, vases, rotational products.
- Extrude geometry: logos, flat profiles with thickness, panels, custom plates.

A good 3D UI component usually has:
- One readable silhouette.
- Clear primitive decomposition.
- Consistent camera angle.
- A ground/contact plane.
- Shadows that explain position.
- Materials that separate function, not just decoration.
- Labels or UI controls outside the canvas when accessibility matters.

## Exploded View Pattern

Use exploded views for technical objects, product education, repair flows, onboarding, and component architecture diagrams.

Required structure:
1. Define a root assembly and named parts.
2. Assign each part an assembled position and exploded offset.
3. Keep offsets mostly along one axis or one readable diagonal.
4. Add guide lines from exploded parts to assembled anchors.
5. Add labels or numbered callouts in HTML/SVG overlay when text clarity matters.
6. Animate between assembled and exploded states with a single progress value.
7. Keep camera stable; moving parts should explain the object, not disorient the user.

For a Numark-style technical diagram:
- Use orthographic or low-perspective camera.
- Use thin strokes, neutral material, and high contrast labels.
- Use cylinders for platter, knobs, screw heads, and ports.
- Use boxes or extruded rounded rectangles for casing and boards.
- Use line segments for part callouts.
- Keep labels in DOM overlay for crisp text and screen-reader alternatives.

## Motion Integration

Use Motion for the surrounding UI and R3F/Three.js for the 3D scene.

Good division:
- Motion controls panels, cards, top bars, scroll sections, layout transitions, and text reveals.
- R3F controls meshes, camera, lights, object rotation, exploded offsets, and raycast hover/click states.
- Shared React state connects both worlds.

State examples:
- `progress`: drives scroll story and exploded offsets.
- `selectedPartId`: highlights a mesh and opens a side panel.
- `isExploded`: toggles assembly animation and guide lines.
- `isReducedMotion`: disables continuous rotation and uses simple fades.

Avoid:
- Two animation systems fighting over the same transform.
- Animating camera, object positions, and DOM layout all at once.
- Continuous auto-rotation while the user is reading labels.

## Model Loading

Prefer GLTF/GLB for web product models. Use OBJ or FBX only when the source asset requires it.

React Three Fiber loading pattern:
- Use `useLoader` with the correct Three.js loader for simple imports.
- Convert important GLTF assets into JSX components with `gltfjsx` when the model needs part-level control.
- Wrap model loading in `Suspense`.
- Use Drei `Html` and `useProgress` for loading feedback when models are large.
- Preload important GLTF assets when the route needs immediate interaction.

Asset rules:
- Keep model files in `public/` or in the project's asset pipeline.
- Optimize polygon count, texture size, and material count before shipping.
- Prefer compressed GLB/GLTF for production when the project pipeline supports it.
- Provide fallback UI for unsupported WebGL or slow loading.

## UI Integration Rules

- Never let canvas text be the only label for critical UI; mirror it in accessible HTML when possible.
- Keep the 3D canvas inside a clear region with stable dimensions.
- Do not hide forms, navigation, or critical actions behind 3D interaction.
- Use pointer events carefully; orbit controls must not block normal page scroll unless the canvas is the primary task.
- Provide keyboard alternatives for selecting parts or opening detail panels.
- Respect `prefers-reduced-motion` and pause nonessential animation.

## Quality Checks

Before finalizing:
- Verify the canvas is nonblank on desktop and mobile.
- Check camera framing at common aspect ratios.
- Test hover/click selection and focusable HTML controls.
- Check loading, empty, and reduced-motion states.
- Inspect whether the 3D object feels integrated with UI depth, not pasted behind it.
- Confirm labels remain readable and do not drift away from their parts.
- Report model source, license, or placeholder status when external assets are used.

## Prototyping vs Production

When the user asks for a 3D component test or demo, start with primitives to validate the interaction model before investing in a real model:

### Primitive-First Prototyping
For product viewers and exploded views, build with primitives first:
```
Box (base) + Cylinder (platter) + Box (tonearm) + Cylinder × N (knobs)
```
- Prototyping validates: hover, selection, explode animation, panel integration
- Primitives can look polished with good materials (metalness, roughness) and lighting
- A visually simple primitive model is better than a broken imported model

### When to Use Real Models
- Interaction model is validated and stable
- The product design is finalized
- Art direction requires specific shapes or branding
- Use `gltfjsx` to convert to editable JSX components

### WebGL Fallback Strategy
The 3D canvas can fail silently. Always implement:
1. **Loading state**: Show skeleton or spinner during canvas initialization
2. **Error boundary**: Catch WebGL context loss or shader compilation failures
3. **Graceful degradation**: If WebGL is unavailable, show a high-quality static image or SVG fallback
4. **Detection**: Check `canvas.getContext('webgl')` or use `@react-three/fiber` error states

```jsx
// Minimal WebGL check
function FallbackImage() {
  return (
    <img 
      src="/orbit-deck-fallback.png" 
      alt="Orbit Deck product view" 
      className="w-full h-full object-contain"
    />
  )
}
```

## Source Links

- Motion docs: https://motion.dev/docs
- React Three Fiber loading models: https://r3f.docs.pmnd.rs/tutorials/loading-models
- Three.js examples: https://threejs.org/examples/
- Spline docs: https://docs.spline.design/