# Wetcher

> Early alpha! Everything is subject to change.

## About

This tool takes a link to a web page and a JavaScript function. It then periodically downloads the web page, runs the function on it and stores its result in a time-series database. You can then create graphs and alerts on that data.

## Use Cases

- Watch prices from online shops.
- Get notififed when there is new content somewhere.
- Create a graph of your followers.

## Documentation

### Adapters

Adapters are required to record values. The following adapters are planned:

- `adapter-console` Logs to standard output
- `adapter-influxdb` Stores values in InfluxDB

### Configuration

```json
{
  "adapters": [{ "name": "adapter-console", "options": { "colors": true } }],
  "tasks": [
    {
      "name": "vscode-github-stargazers",
      "description": "Not very useful because there is an official API available, but good enough for testing",
      "url": "https://github.com/microsoft/vscode/stargazers",
      "fn": "return parseInt(document.querySelector('#repos .Counter').innerText.replace(',', ''))",
      "interval": 3
    }
  ]
}
```
