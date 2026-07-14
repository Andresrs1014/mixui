# Spatial Depth And Environmental Transitions

Use this reference when a design critique says the page feels flat, the depth is only decorative, a scene should feel like a long road/corridor, or a transition should affect the area around the component instead of animating in isolation.

## Source Map

Primary sources and research reviewed:

- Depth cues overview: https://en.wikipedia.org/wiki/Depth_perception
- Occlusion-aware depth cues in displays: https://arxiv.org/abs/2005.00946
- Ocular parallax and realism: https://arxiv.org/abs/1906.09740
- Common fate in animated transitions: https://arxiv.org/abs/1908.00661
- Gemini animated transition grammar: https://arxiv.org/abs/2009.01429
- MDN View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- Chrome View Transitions guide: https://developer.chrome.com/docs/web-platform/view-transitions
- web.dev high-performance animations: https://web.dev/articles/animations-guide
- W3C WCAG animation from interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

## The User Critique To Encode

If depth only comes from card corners, shadows, or a few skewed squares, the interface may score as "some depth" but not as a spatial scene. Strong depth needs the user to understand where near, mid, far, and horizon are.

If a transition only happens inside one component, it may read as a component animation instead of a designed state change. Strong transitions create an environmental response: nearby elements, light, depth planes, progress indicators, or background geometry react to the same event.

## Depth Is A Scene, Not A Shadow

Build a depth skeleton before decoration:

1. Choose a horizon or vanishing point.
2. Create a corridor, road, runway, aisle, tunnel, gallery, shelf, product rail, or receding grid.
3. Add repeated markers that shrink, fade, blur, or compress toward the horizon.
4. Put occluding objects in the foreground so the eye can rank what is nearer.
5. Put the main product or task in the mid layer.
6. Keep the far layer lower contrast and lower detail.
7. Move near layers more than far layers during scroll or pointer motion.

Reliable depth cues for 2D UI:

- Linear perspective: lines, rails, tiles, shelves, or seams converge toward a point.
- Relative size: repeated objects get smaller as they recede.
- Texture gradient: detail density increases near the viewer and simplifies far away.
- Occlusion: near objects partially cover far objects.
- Contrast and atmospheric depth: far layers are lower contrast, cooler, softer, or dimmer.
- Motion parallax: near objects move faster than far objects.
- Elevation/horizon: objects near the horizon can read as farther away.
## Shared Spatial Plane

The hardest failure mode is a deep background with normal components pasted on top. It feels like watching a road projected on a wall instead of standing on the road. Fix that by connecting foreground UI to the same spatial model:

1. Give the page one shared vanishing point or horizon.
2. Let major layout groups sit on a local floor plane aligned with that horizon.
3. Add contact cues under foreground UI: compressed shadow, footprint, reflection, grid interruption, or light pooling.
4. Use occlusion intentionally: near panels can cover rails or markers; far decoration should never cover interactive content.
5. When an overlay opens, move or dim the environment in the same direction as the panel. The modal/drawer should feel like it entered the room, not like it appeared over a screenshot.
6. Keep hit targets mostly in normal 2D flow. Put the strongest perspective on pseudo-elements and decorative planes so the scene feels deep without breaking pointer interaction.

Checklist for "not a video beam":

- Can the user point to the floor/road that foreground components are standing on?
- Do cards, modals, drawers, or popovers cast a visible footprint into that floor?
- Does the background geometry align with the dashboard grid or content columns?
- Does a transition affect the subject, neighboring UI, and the environment together?
- Are interactive elements still easy to click because the 3D is mostly decorative?

### Depth Rubric

- 0-3: Flat background with decorative gradients, glows, or shadows.
- 4-6: Multiple layers exist, but there is no clear horizon, scale logic, or occlusion.
- 7: Some perspective hints are visible, usually from skewed cards, corners, or isolated planes, but the whole page does not share one spatial model.
- 8: The page has a clear corridor or scene with near/mid/far layers, repeated scale cues, and foreground occlusion.
- 9-10: The scene has a semantic viewpoint. Scroll, hover, or state changes preserve perspective and make distance understandable without extra explanation.

If a user asks for "carretera larga", "profundidad", "no plano", "runway", "tunnel", "3D", or "scrollytelling with depth", target 8+ by default.

## Environmental Transitions

Define transition choreography around the subject:

1. Subject: the component changing state.
2. Supporting cast: siblings, labels, nearby cards, top bar, progress rail, or CTA.
3. Environment: background plane, light, grid, texture, horizon, or depth corridor.
4. Anticipation: a small pre-state such as dim, compress, tilt, glow, or focus shift.
5. Action: the main transition.
6. Settle: the environment returns to stable readability.

The law of common fate says elements that change together are perceived as related. Apply that to UI: when a card slides, the neighboring cards, background rails, progress bar, and light field should react in the same direction or timing family.

### Transition Rubric

- 0-3: Isolated fade/slide with no context.
- 4-6: Component animates well, but surrounding UI stays static.
- 7: Nearby siblings respond, but the page environment still feels disconnected.
- 8: Component, siblings, and background plane share one transition event.
- 9-10: The transition changes the scene state with continuity, common fate, clear before/during/after phases, and a reduced-motion fallback.

## Recipes

### Depth Corridor

Use for login pages, catalog heroes, product drops, gaming scenes, or scrollytelling stages.

```css
.depth-scene {
  position: relative;
  overflow: hidden;
  perspective: 900px;
  isolation: isolate;
}

.depth-road {
  position: absolute;
  inset: 18% -12% -18%;
  transform: rotateX(64deg);
  transform-origin: 50% 100%;
  background:
    linear-gradient(90deg, transparent 0 46%, rgba(255,255,255,.28) 49% 51%, transparent 54%),
    repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 2px, transparent 2px 56px);
  opacity: .42;
}

.depth-marker {
  position: absolute;
  width: clamp(36px, 6vw, 96px);
  aspect-ratio: 1;
  transform: translate3d(var(--x), var(--y), 0) scale(var(--s));
  opacity: var(--alpha);
}
```

Implementation notes:

- Use CSS variables for `--x`, `--y`, `--s`, and `--alpha` so markers can be data-driven.
- Make at least 5 repeated markers; three is usually too few to imply distance.
- Let some foreground elements crop at viewport edges. Cropping helps the user feel inside the scene.

### Environmental Carousel Transition

Use when a featured product, game, shoe, card, or image changes.

```jsx
function FeaturedRail({ items }) {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  function select(index) {
    setTransitioning(true);
    setActive(index);
    window.setTimeout(() => setTransitioning(false), 520);
  }

  return (
    <section className={`transition-scene ${transitioning ? "is-transitioning" : ""}`}>
      <div className="scene-light" />
      <div className="scene-rails" />
      {items.map((item, index) => (
        <article
          key={item.id}
          className={`feature-card ${active === index ? "is-active" : "is-muted"}`}
        >
          {item.title}
        </article>
      ))}
      <button onClick={() => select((active + 1) % items.length)}>Next</button>
    </section>
  );
}
```

```css
.transition-scene {
  --scene-shift: 0px;
  position: relative;
  overflow: hidden;
}

.transition-scene.is-transitioning {
  --scene-shift: -24px;
}

.scene-rails {
  transform: translate3d(var(--scene-shift), 0, 0) skewX(-10deg);
  transition: transform 520ms cubic-bezier(.2, 0, 0, 1);
}

.scene-light {
  opacity: .3;
  transform: translate3d(calc(var(--scene-shift) * -1), 0, 0) scale(1.04);
  transition: opacity 520ms ease, transform 520ms ease;
}

.feature-card {
  transition: transform 520ms cubic-bezier(.2, 0, 0, 1), opacity 240ms ease;
}

.feature-card.is-active {
  transform: translate3d(0, -8px, 36px) scale(1.02);
}

.feature-card.is-muted {
  opacity: .48;
  transform: translate3d(-10px, 8px, 0) scale(.96);
}
```

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .transition-scene *,
  .transition-scene *::before,
  .transition-scene *::after {
    animation: none !important;
    transition-duration: 1ms !important;
  }
}
```

### Contact Plane For Foreground UI

Use this when a dashboard, login form, modal, drawer, or card group sits in front of a perspective scene.

```css
.spatial-workspace {
  position: relative;
  perspective: 1100px;
  transform-style: preserve-3d;
  isolation: isolate;
}

.spatial-grid {
  position: relative;
  display: grid;
  gap: 16px;
}

.spatial-grid::before {
  content: "";
  position: absolute;
  inset: 8% -4% -18%;
  z-index: -1;
  border-radius: 28px;
  transform: rotateX(64deg);
  transform-origin: 50% 100%;
  background:
    linear-gradient(90deg, transparent 0 48%, rgb(255 255 255 / .2) 50%, transparent 52%),
    repeating-linear-gradient(0deg, rgb(255 255 255 / .12) 0 1px, transparent 1px 34px);
  opacity: .5;
}

.spatial-card {
  position: relative;
}

.spatial-card::before {
  content: "";
  position: absolute;
  inset: auto 10% -14px;
  height: 24px;
  border-radius: 999px;
  background: radial-gradient(ellipse, rgb(0 0 0 / .3), transparent 70%);
  transform: rotateX(68deg);
  pointer-events: none;
}
```

Transition rule: animate the pseudo-element plane and contact cue with the same timing as the card, modal, or drawer. Avoid putting strong `translateZ` or 3D rotation on the clickable element itself unless browser hit testing has been verified.
## Agent Procedure

When applying this reference:

1. Write one sentence naming the scene metaphor: road, runway, tunnel, gallery, shelf, product rail, card canyon, or catalog stage.
2. Define the vanishing point and near/mid/far layers before choosing components.
3. Place interactive groups on the same spatial plane with contact cues before adding decorative light.
4. Add repeated scale cues and occlusion before adding decorative light.
5. For each major transition, define subject, supporting cast, environment, anticipation, action, and settle.
6. Use mostly `transform` and `opacity`.
7. Add `prefers-reduced-motion`.
8. Verify with screenshots: the user should be able to point at what is near, what is far, which plane the component belongs to, and what changed around the active component.

## Anti-Patterns

Avoid:

- Shadows as the only depth cue.
- Random 3D rotated rectangles without a shared vanishing point.
- Background decoration that does not align with the foreground layout.
- A carousel where only the image changes and the top bar, rail, light, or neighboring cards ignore the state change.
- Scroll effects where foreground and background move at the same speed.
- Large blur, width, height, top, or left animations during interaction.
- Removing depth entirely in reduced motion; reduce movement but preserve scale, contrast, and occlusion cues.