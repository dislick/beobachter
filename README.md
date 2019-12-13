# Beobachter 👀

> Early alpha! Everything is subject to change and certain features are not implemented yet.

## About

This Node.js service performs highly configurable, periodic web scraping. Results can be stored in time-series databases for further analysis using visualization tools like [Grafana](https://grafana.com).

## Short Example

A configuration like this lets you download a certain web page every 60 seconds and run a JavaScript function on it to extract the price of an item. It uses the simple `adapter-console` to record values to standard output.

```jsonc
{
  "adapters": [{ "name": "adapter-console", "options": { "colors": true } }],
  "tasks": [
    {
      "type": "browser",
      "name": "digitec-amd-ryzen-9-3950x",
      "description": "Watches the prize of the new 16-core Ryzen 3950X",
      "url": "https://www.digitec.ch/de/s1/product/amd-ryzen-9-3950x-am4-360ghz-16-core-prozessor-11239808",
      "fn": "return parseInt(document.querySelector('.productDetail strong').innerText.replace(/[^0-9]/g, ''), 10)",
      "interval": 60
    }
  ]
}
```

```
[2019-12-13T21:27:54] [digitec-amd-ryzen-9-3950x] [60s] 854
[2019-12-13T21:28:55] [digitec-amd-ryzen-9-3950x] [60s] 854
[2019-12-13T21:29:56] [digitec-amd-ryzen-9-3950x] [60s] 854
```

## Documentation

### Adapters

Adapters are required to record values. The following adapters are available/planned:

- `adapter-console` Logs to standard output. `[available]`
- `adapter-influxdb` Stores values in InfluxDB. `[planned]`

### Configuration

There are multiple ways of configuring Beobachter.

1. `config.json` in the same directory.
2. Environment variable `BEOBACHTER_CONFIG` set to the absolute path of your `config.json`.

#### Adapters

Beobachter needs you to configure at least one adapter. Specify its `name` and `config` which you will find at `packages/adapter-*` in this repository.

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

Tasks tell Beobachter what it needs to do. You can specify any number of tasks. There are different types of tasks:

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
