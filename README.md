<img src="https://repository-images.githubusercontent.com/287357886/efdb9180-df0b-11ea-8713-b6107de93990" width=360px alt="Alderson.js Logo"/>

![Node.js Package](https://github.com/GeekFiftyFive/Alderson.js/workflows/Node.js%20Package/badge.svg) ![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)


# Alderson.js

## Introduction
Alderson.js is an API mocking utility, allowing for easy configuration via JSON files. Alderson is capable of supplying mock data, echoing requests back to the sender, forwarding requests to a backend endpoint and also introducing delays to requests.

By giving you more flexibility and control over API responses, testing your frontends is made easy.

## Usage

AldersonJS can be invoked using `npx`. Simply run `npx aldersonjs` and then a list of the config jsons you want to host mock APIs for, as shown below:

~~~
npx aldersonjs <config1.json> <config2.json> //etc
~~~

## Configuring Alderson

As mentioned previously, Alderson.js is configured via JSON files. Examples of which can be found in the `examples` directory. At the top level, these files look like the following:

~~~
{
    "origins": {
        "type": "object",
        "description": "defines a mapping of names to real APIs"
        "optional": true
    },
    "port": {
        "type": "integer",
        "description": "determines which port to host the mock API on",
        "optional": true,
        "default": 8080
    },
    "endpoints": {
        "type: "array",
        "description": "An array of all mock endpoints",
        "items": {
            "type": "Endpoint"
        }
    }
}
~~~

An `Endpoint` is defined as below:

~~~
{
    "uri": {
        "type": "string",
        "description": "The path that the endpoint will be hosted on, e.g. /api"
    },
    "method": {
        "type": "string",
        "description": "The HTTP method used to call this endpoint",
        "enum": ["get", "head", "post", "put", "delete", "connect", "options", "trace", "patch"]
    },
    "actions": {
        "type": "array",
        "description": "An array of actions to execute when this endpoint is called",
        "items": {
            "type": "Action"
        }
    }
}
~~~

An `Action` is defined as below:

~~~
{
    "type": {
        "type": "string",
        "description": "The type of action to execute",
        "enum": ["echo", "delay", "log", "origin", "static", "status_code"]
    },
    "parameters": {
        "type": "object",
        "description": "mapping of paramters for the action",
        "optional": true
    }
}
~~~

## Action Types

As documented above, there are many different types of actions available in Alderson.js. Below is a description of what each action does, and the paramaters that can be configured for it:

### Echo
Echoes the contents of the request body in the response body

#### Parameters

~~~
None
~~~

### Delay
Inserts a delay before executing the next action

~~~
{
    "duration": {
        "type": "integer",
        "description": "Duration in milliseconds to delay"
    }
}
~~~

### Log
Logs a message to Alderson.js's console

~~~
{
    "message": {
        "type": "string",
        "description": "The message to log to the console"
    }
}
~~~

### Origin
Forwards messages to a remove origin and returns the response

~~~
{
    "origin": {
        "type": "string",
        "description": "Name of the origin, as defined in the origins block at the root of the config"
    },
    "uri": {
        "type": "string",
        "description": "The path on the remote origin to hit"
    }
}
~~~

### Static
Servers up static content

~~~
{
    "body": {
        "type": "string | object",
        "description": "The body of the response"
    },
    "content_type": {
        "type": "string",
        "description": "The value to return in the Content-Type header"
    }
}
~~~

### Status Code
Sets the status code of the response

~~~
{
    "status_code": {
        "type": "integer",
        "description": "The status code to respond with"
    }
}
~~~
