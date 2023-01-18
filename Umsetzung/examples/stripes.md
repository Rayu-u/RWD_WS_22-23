# Stripes Example

The `color` attribute can be changed to `mint` or `gray` in addition to `red`.

```html
<div class="stripes" color="red"></div>
```

The state of the animation is changed to either go to the middle, where the whole object will be covered by alternating colors of stripes, by adding the class `half-active`, or go all the way past by adding the class `full-active`.

The `initial-play` class represents that the animation should go from zero to the selected state on load.

```html
<div class="stripes half-active" color="red"></div>
<div class="stripes initial-play full-active" color="red"></div>
```
