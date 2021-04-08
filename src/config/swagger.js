export default {
  "title": "Social Chat API Documentation",
  "description": "Social Chat API using Express and MongoDB",
  "swagger": "2.0",
  "host": "localhost:3000",
  "basePath": "/api",
  "tags": [
    {
      "name": "Social Chat",
      "description": "API for Tweets Endpoints"
    }
  ],
  "schemes": "http",
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths": {
    "/tweets": {
      "post": {
        "tags": ["Tweets"],
        "summary": "API endpoint to create tweet",
        "description": "Create new tweet in database",
        "parameters": [
          {
            "name": "tweet",
            "description": "Tweet params to create new tweet",
            "in": "body",
            "required": "true",
            "schema": {
              "$ref": "#definitions/Tweet"
            }
          }
        ],
        "produces": ["application/json"],
        "responses": {
          "200": {
            "description": "New tweet created",
            "schema": {
              "$ref": "#definitions/Tweet"
            }
          }
        }
      },
      "get": {
        "tags": ["Tweets"],
        "summary": "API endpoint to find all tweets",
        "description": "Find all tweets from the database",
        "parameters": [
          {
            "name": "page",
            "type": "integer",
            "description": "Define the page index for the records",
            "in": "query"
          },
          {
            "name": "perPage",
            "type": "integer",
            "description": "Define the limit for the records i.e. 10",
            "in": "query"
          }
        ],
        "produces": ["application/json"],
        "responses": {
          "200": {
            "description": "All the tweets",
            "schema": {
              "$ref": "#definitions/Tweets"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Tweet": {
      "required": ["body"],
      "properties": {
        "_id": {
          "type": "string"
        },
        "body": {
          "type": "string"
        }
      }
    },
    "Tweets": {
      "properties": {
        "docs": {
          "type": "array",
          "items": {
            "$ref": "#definitions/Tweet"
          }
        },
        "total": {
          "type": "integer"
        },
        "pages": {
          "type": "integer"
        },
        "limit": {
          "type": "integer"
        },
        "page": {
          "type": "integer"
        }
      }
    }
  }
}
