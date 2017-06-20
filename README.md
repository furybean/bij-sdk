# Breaking infinite jump

> A library for breaking infinite jump in browser.

## Install

You can use the library in two ways:

```Bash
npm i bij-sdk --save
```

```HTML
<script src="https://unpkg.com/bij-sdk/"></script>
```

## Usage

```JavaScript
BIJ.init({
  jumpTo: 'error.html',
  maxJump: 3
});
```

## Options

BIJ has two modes of breaking infinite jump:
 
- unload: notify user when this page is jumping. **This mode won't work in Firefox**
- jump: jump to another page on detecting infinite jump.

Method BIJ.init's options list below:

- breakMode: optional value: 'jump', 'unload', default value is jump.
- jumpTo: BIJ will jump to this page on detecting infinite jump.
- maxDuration: Not all page jump is considered as infinite jump, the maxDuration define the max duration of a infinite jump. This option's default value is 5000, in milliseconds.
- maxJump: When this number of jumps is exceeded, BIJ will consider that this is an infinite jump. This option's default value is 5.
- source: source page of the jump, default value is current page's location.

## Develop

* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher

## License
MIT
