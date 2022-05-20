# slidev-component-zoom

[![NPM version](https://img.shields.io/npm/v/slidev-component-zoom?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-component-zoom)

Zoom commands for `Slidev`.  

## Feature

By default [slidev](https://sli.dev/) always scale the slide to fit the browser viewport.

This is nice, but you can't use the zoom feature of the browser anymore, the slide will automatically rescale to fit the viewport.

This library adds zoom buttons in the control bar to increase or decrease the font size.

For chrome and edge you can also use the native zoom feature of the browser, this will be catched by the plugin, and the font will be increased or decreased accordingly.

There is a little drawback to this: opening the devtools on the right or the left can trigger the zoom recalculation.

And if it happen, you can still click on the "Reset Zoom" button in the control bar to reset the zoom.

## Installation

```bash
npm i slidev-component-zoom
```

## Configuration

Define this package into your slidev addons.

In your slides metadata (using frontmatter):
```
---
addons:
  - slidev-component-zoom
---
```

Or in your `package.json`:
```json
{
  "slidev": {
    "addons": [
      "slidev-component-zoom"
    ]
  }
}
```

## Usage

Create a `./custom-nav-controls.vue` file in your `Slidev` project and use the component:
```vue
<template>
  <Zoom/>
</template>
```

## Components

### Zoom

Component for the zoom feature:
```vue
<Zoom/>
```
