
describe('k-sequence', function(){

  var seq = require('k-sequence')
    , assert = require('assert')
    , code = require('keycode')
    , el = window;

  describe('("a b c", fn)', function(){
    describe('press("a b c")', function(){
      it('should work', function(){
        var calls = counter();
        var fn = seq('a b c', calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('b');
        press('c');
        assert(1 == calls());
      })
    })

    describe('press("a")', function(){
      it('should not work', function(){
        var calls = counter();
        var fn = seq('a b c', calls);
        el.addEventListener('keydown', fn);
        press('a');
        assert(0 == calls());
      })
    })

    describe('press("a c b")', function(){
      it('should not work', function(){
        var calls = counter();
        var fn = seq('a b c', calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('c');
        press('b');
        assert(0 == calls());
      })
    })

    describe('press("enter")', function(){
      it('should not be invoked', function(){
        var calls = counter();
        var fn = seq('a b c', calls);
        el.addEventListener('keydown', fn);
        press('enter');
        assert(0 == calls());
      })
    })

    describe('press("b")', function(){
      it('should not be invoked', function(){
        var calls = counter();
        var fn = seq('a b c', calls);
        el.addEventListener('keydown', fn);
        press('b');
        assert(0 == calls());
      })
    })

    describe('press("c")', function(){
      it('should not be invoked', function(){
        var calls = counter();
        var fn = seq('a b c', calls);
        el.addEventListener('keydown', fn);
        press('c');
        assert(0 == calls());
      })
    })
  })

  describe('("a b c", 50, fn)', function(){
    describe('press("a b") and after ~51ms "c"', function(){
      it('should not work', function(done){
        var calls = counter();
        var fn = seq('a b c', 50, calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('b');
        setTimeout(function(){
          press('c');
          assert(0 == calls());
          done();
        }, 51);
      })
    })

    describe('press("a b") and after ~40ms "c"', function(){
      it('should work', function(done){
        var calls = counter();
        var fn = seq('a b c', 50, calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('b');
        setTimeout(function(){
          press('c');
          assert(1 == calls());
          done();
        }, 40);
      })
    })

    describe('press("a") and after ~40ms "b c"', function(){
      it('should work', function(done){
        var calls = counter();
        var fn = seq('a b c', 50, calls);
        el.addEventListener('keydown', fn);
        press('a');
        setTimeout(function(){
          press('b');
          press('c');
          assert(1 == calls());
          done();
        }, 40);
      })
    })

    describe('press("a") and after ~51ms "b c"', function(){
      it('should not work', function(done){
        var calls = counter();
        var fn = seq('a b c', 50, calls);
        el.addEventListener('keydown', fn);
        press('a');
        setTimeout(function(){
          press('b');
          press('c');
          assert(0 == calls());
          done();
        }, 51);
      })
    })
  })

  describe('("a b c", fn), ("a b d", fn)', function(){
    describe('press("a b c")', function(){
      it('should invoke the correct callback', function(){
        var calls = counter();
        var a = seq('a b c', 50, calls);
        var b = seq('a b d', 50, calls);
        el.addEventListener('keydown', a);
        el.addEventListener('keydown', b);
        press('a');
        press('b');
        press('c');
        assert(1 == calls());
      })
    })
  })

  describe('("a b c", fn), ("a b c", fn)', function(){
    describe('press("a b c")', function(){
      it('should invoke both callbacks', function(){
        var calls = counter();
        var a = seq('a b c', calls);
        var b = seq('a b c', calls);
        el.addEventListener('keydown', a);
        el.addEventListener('keydown', b);
        press('a');
        press('b');
        press('c');
        assert(2 == calls());
      })
    })
  })

  describe('("a b c", fn)', function(){
    it('should work every time', function(){
      var calls = counter();
      var fn = seq('a b c', calls);
      el.addEventListener('keydown', fn);
      press('a');
      press('b');
      press('c');
      press('a');
      press('b');
      press('c');
      assert(2 == calls());
    })
  })

  describe('("a * b * c")', function(){
    describe('press("a f b d c")', function(){
      it('should work', function(){
        var calls = counter();
        var fn = seq('a * b * c', calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('f');
        press('b');
        press('d');
        press('c');
        assert(1 == calls());
      })
    })

    describe('press("a a b b c")', function(){
      it('should work', function(){
        var calls = counter();
        var fn = seq('a * b * c', calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('a');
        press('b');
        press('b');
        press('c');
        assert(1 == calls());
      })
    })

    describe('press("a a a b c")', function(){
      it('should not work', function(){
        var calls = counter();
        var fn = seq('a * b * c', calls);
        el.addEventListener('keydown', fn);
        press('a');
        press('a');
        press('a');
        press('b');
        press('c');
        assert(0 == calls());
      })
    })
  })

  function counter(){
    var calls = 0;
    return function(){
      return calls++;
    }
  }

  function press(k){
    k = code(k);
    var e = document.createEvent('Event');
    e.initEvent('keydown', true, true);
    e.keyCode = e.which = k;
    el.dispatchEvent(e);
    e = document.createEvent('Event');
    e.initEvent('keyup', true, true);
    e.keyCode = e.which = k;
    el.dispatchEvent(e);
  }
})
