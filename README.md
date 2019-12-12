# Wetcher 👀

> Early alpha! Everything is subject to change.

## About

This lightweight Node.js service takes a link to a web page and a JavaScript function. It then periodically downloads the web page, runs the function on it and stores its result in a time-series database. This enables you to create graphs and alerts on that data using another tool like Grafana.

## Use Cases

- Watch prices from online shops.
- Get notififed when there is new content somewhere.
- Create a graph of your followers.

## Documentation

### Adapters

Adapters are required to record values. The following adapters are available/planned:

- `adapter-console` Logs to standard output. `[available]`
- `adapter-influxdb` Stores values in InfluxDB. `[planned]`

### Configuration

There are multiple ways of configuring Wetcher.

1. `config.json` in the same directory.
2. Environment variable `WETCHER_CONFIG` set to the absolute path of your `config.json`.

#### Adapters

Wetcher needs you to configure at least one adapter. Specify its `name` and `config` which you will find at `packages/adapter-*` in this repository.

```json
{
  "adapters": [
    {
      "name": "adapter-console",
      "config": {
        "colors": true
      }
    }
  ]
}
```

#### Tasks

Tasks tell Wetcher what it needs to do. You can specify any number of tasks. There are different types of tasks:

- `browser`
- `http-json`
- `http-text`

> You must not use spaces in `name`. This constraint allows adapters to record data more predictably.

```jsonc
{
  "tasks": [
    {
      "type": "browser",
      "name": "github-vscode-stargazers-browser",
      "description": "",
      "url": "https://github.com/microsoft/vscode/stargazers",
      "fn": "return parseInt(document.querySelector('#repos .Counter').innerText.replace(',', ''))",
      "interval": 60 // seconds
    },
    {
      "type": "http-json",
      "name": "github-vscode-stargazers-json",
      "description": "",
      "url": "https://api.github.com/repos/microsoft/vscode",
      "path": "stargazers_count",
      "interval": 60 // seconds
    }
  ]
}
```
