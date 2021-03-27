# create-streamelements-widget

Welcome to the tiny sandbox to help you develop a custom [StreamElements Widget](https://github.com/StreamElements/widgets/blob/master/CustomCode.md)

This relies on websocket and StreamElements to simulate the events.

## Getting Started

### config.js

Please copy [config.example.js](config.example.js) and rename it `config.js`.

JWT: Get your JWT from StreamElements [here](https://docs.streamelements.com/docs/getting-started)

Widgets: List of widgets, based on the directory name inside `widgets/`

### widgets/

In the `widgets/` directory, you'll find a `default/` directory with the corresponding files to that are found in StreamElements.

You can have as many widgets as you like!

You can copy and paste between the StreamElements environment and here for best results.

You _can_ use `{{variables}}` in your html, css and js!

### start

Open up index.html (preferably with Live Server), use URL hashes e.g. `index.html#default` to get to the relevant widget and have fun!
