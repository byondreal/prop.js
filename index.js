// props = prop({ get: getter, set: setter });
// props('key', value) calls setter and returns `this`
// props('key') returns value from getter
// props({ key: value }) calls setter for each key and returns `this`
function prop(opts) {
  var noop = function () {},
      getter = opts.get || noop,
      setter = opts.set || noop;
  return function props(key, value, callback, context) {
    if ('string' === typeof key) {
      if (value !== undefined) {
        setter.call(this, key, value, callback, context);
        return this;
      }
      return getter.call(this, key);
    }

    if ('object' === typeof key) {
      if (typeof value === 'function') callback = value;
      Object.keys(key).forEach(function (prop) {
        props.call(this, prop, key[prop], callback, context);
      }, this);
      return this;
    }
  };
}

module.exports = prop;

