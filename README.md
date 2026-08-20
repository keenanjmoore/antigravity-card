# 🚀 Antigravity No-Icon Card (Default) for Home Assistant

An ultra-streamlined, high-performance custom Lovelace card merging the fluid aesthetics of **Bubble Card** with the interactive control power of **Mushroom Card** and **Slider-Button Card**, optimized with **zero icon overhead** for edge-to-edge typography, full-width multi-domain sliders, and multi-stage physical-time fade transitions.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024+-blue.svg)
![HACS](https://img.shields.io/badge/HACS-Custom%20Card-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Why No-Icon?

- ⚡ **100% Usable Card Width**: No icon flexboxes or horizontal margins cutting into your text. Labels like `"Laundry Room"` and `"Sabrina's Room Motion"` take the full horizontal surface without premature truncation.
- 🎨 **10 Built-In Aesthetic Theme Presets**: Frosted Glassmorphism, Soft Neumorphism, Cyberpunk Neon, Minimal Flat, Sunset Gradient, OLED Pitch Black, Nordic Aurora, Material You Pill, and 80s Synthwave.
- 🎛️ **Universal Multi-Domain Sliders**: Dimmable lights, Kelvin color temperature, 360° RGB hue sliders, covers, fans, humidifiers, media volume, and climate targets.
- ⏳ **Physical-Time Multi-Stage Color Fade Transitions**: Customizable 0–120 min multi-step occupancy cooldowns and warmup decays computed directly from `last_changed` timestamps with live decay progress bars.
- 🔘 **Up to 4 Integrated Sub-Buttons**: Media transport, HVAC modes, service actions, scene toggles, and compact sliders.
- ⚡ **Full Visual Editor**: Every single parameter, padding, margin, font size, and color is configurable directly from the Home Assistant card editor with live preview.

---

## 📦 Installation via HACS

1. Open **HACS** in Home Assistant.
2. Go to **Frontend** > Top Right 3-dots > **Custom Repositories**.
3. Add this repository URL and select Category: **Lovelace**.
4. Click **Install**.
5. Reload your Lovelace dashboard resources.

---

## 🛠️ YAML Configuration Example

```yaml
type: custom:antigravity-no-icon-card # (or custom:antigravity-card)
entity: binary_sensor.laundry_room_motion
name: Laundry Room
color_type: card
fade_transition_enabled: true
fade_trigger: on_inactive
show_decay_slider: true
decay_slider_position: bottom
decay_slider_height: 8
fade_stage_1_duration: 60
fade_stage_1_pickup: true
fade_stage_1_color: [255, 152, 0]
fade_stage_2_duration: 600
fade_stage_2_pickup: true
fade_stage_2_color: [205, 220, 57]
fade_stage_3_duration: 1800
fade_stage_3_pickup: true
fade_stage_3_color: [3, 177, 0]
```

---

## 📄 License
MIT License © 2026 Keenan
