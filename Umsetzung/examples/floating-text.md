# Floating Text Example

The `color` attribute can be changed to `mint` and `red`.

The `direction` attribute can be `left` and `right`.

The `seconds-per-word` attribute determines how many time a period of the animations should last per word.

```html
<div class="floating-text" color="mint" direction="left" seconds-per-word="5">
  <div class="floating-text__black">Let a friend find your</div>
  <div class="floating-text__strong">shine</div>
  <div class="floating-text__black-outline">Let a friend find your</div>
  <div class="floating-text__strong">shine</div>
</div>
```

```html
<div class="floating-text" color="red" direction="left" seconds-per-word="5">
  <div class="floating-text__colored">without sugar</div>
  <div class="floating-text__colored-outline">without sugar</div>
</div>
```

Child elements are used to specify sections of text and their style that together make up the content of the **floating text** element.

| Class                            | Description            |
| -------------------------------- | ---------------------- |
| `floating-text__black`           | Solid black text       |
| `floating-text__black-outline`   | Black outline text     |
| `floating-text__colored`         | Solid colored text     |
| `floating-text__colored-outline` | Colored outline text   |
| `floating-text__white`           | Solid white text       |
| `floating-text__white-outline`   | White outline text     |
| `floating-text__strong`          | Prominent colored text |
