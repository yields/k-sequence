
# k-sequence

  keyboard sequences.

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/k-sequence

## API

### seq(keys[, ms], fn)

Create a function that will be invoked only if
the given `keys` sequence is matched, `ms` can be omitted
and defaulted to `500ms`.

if `ms` is `500ms` the keys must be pressed within `500ms` for
the callback to be called.

```js
var a = seq('a b c', function(e){});
var b = seq('a * b * c', function(e){});
el.addEventListener('keydown', a);
el.addEventListener('keydown', b);

press('a b c'); // => a is called
press('a a b b c'); // => b is called
```

## Tests

```bash
$ make test
```

## License

  MIT
