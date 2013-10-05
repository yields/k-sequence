
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

```js
var fn = seq('a b c', function(e){
  console.log('called only if "a b c" were pressed within 500ms');
});

el.addEventListener('keydown', fn);
```

## Tests

```bash
$ make test
```

## License

  MIT
