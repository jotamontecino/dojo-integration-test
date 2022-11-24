export const openApiSpec = {
    "openapi": "3.0.0",
    "servers": [
        {
            "url": "http://api.jusmundi.com/",
            "description": "production environnement"
        },
        {
            "url": "http://uat-api.jusmundi.com/",
            "description": "uat environnement"
        },
        {
            "url": "http://dev-api.jusmundi.com/",
            "description": "development environnement"
        }
    ],
    "info": {
        "description": "Users Rest API, to perform SCRUD operation on users repository.",
        "version": "1.0.0",
        "title": "Users Service",
        "contact": {
            "email": "technical@jusmundi.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "tags": [
        {
            "name": "user",
            "description": "All SCRUD on users"
        }
    ],
    "paths": {
        "/tenants/{tenantId}/users": {
            "get": {
                "summary": "",
                "description": "",
                "parameters": [
                    {
                        "name": "tenantId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id of the tenant Id"
                    }
                ],
                "operationId": "ListUsersByTenant",
                "responses": {
                    "200": {
                        "description": "The requested user",
                        "content": {
                            "application/json": {
                                "schema": {
                                  "$ref": "#/components/schemas/UserList"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "",
                "description": "",
                "parameters": [
                    {
                        "name": "tenantId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id of the tenant Id"
                    }
                ],
                "requestBody": {
                  "description": "User object that needs to be created",
                  "required": true,
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/User"
                      }
                    }
                  }
                },
                "operationId": "CreateUsersByTenant",
                "responses": {
                    "200": {
                        "description": "The created user",
                        "content": {
                            "application/json": {
                                "schema": {
                                  "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/tenants/{tenantId}/users/{userId}": {
            "get": {
                "summary": "",
                "description": "",
                "parameters": [
                    {
                        "name": "tenantId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "operationId": "ReadUser",
                "responses": {
                    "200": {
                        "description": "List of Users Under the given tenant",
                        "content": {
                            "application/json": {
                                "schema": {
                                  "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "summary": "",
                "description": "",
                "parameters": [
                    {
                        "name": "tenantId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id of the tenant Id"
                    },
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "description": "User object that needs to be updated",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                },
                "operationId": "UpdateUsersByTenant",
                "responses": {
                    "200": {
                        "description": "List of Users Under the given tenant",
                        "content": {
                            "application/json": {
                                "schema": {
                                  "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "summary": "",
                "description": "",
                "parameters": [
                    {
                        "name": "tenantId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        },
                        "description": "Id of the tenant Id"
                    },
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "operationId": "DeleteUsersByTenant",
                "responses": {
                    "204": {
                        "description": "The user has been deleted",
                        "content": {
                            "application/json": {
                                "schema": {}
                            }
                        }
                    }
                }
            }
        },
        "/users": {
            "get": {
                "summary": "",
                "description": "",
                "parameters": [
                    {
                        "name": "tenantIn",
                        "in": "header",
                        "required": false,
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                ],
                "operationId": "listUsers",
                "responses": {
                    "200": {
                        "description": "List of Users Under the given tenant",
                        "content": {
                            "application/json": {
                                "schema": {
                                  "$ref": "#/components/schemas/UserList"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "externalDocs": {
        "description": "See AsyncAPI example",
        "url": ""
    },
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "id": {
                        "readOnly": true,
                        "type": "string"
                    },
                    "legacy_id": {
                        "type": "integer",
                        "description": "Id inside the Legacy structure (for data consistancy)"
                    },
                    "organization_id": {
                        "type": "integer",
                        "description": "Id of the organization related to the user"
                    },
                    "default_language": {
                        "type": "integer"
                    },
                    "username": {
                        "type": "string",
                        "minLength": 5,
                        "maxLength": 180
                    },
                    "username_canonical": {
                        "type": "string",
                        "minLength": 5,
                        "maxLength": 180
                    },
                    "email": {
                        "type": "string",
                        "minLength": 5,
                        "maxLength": 180,
                        "format": "email"
                    },
                    "email_canonical": {
                        "type": "string",
                        "format": "email",
                        "minLength": 5,
                        "maxLength": 180
                    },
                    "enabled": {
                        "type": "boolean",
                        "description": "can the user access the platform"
                    },
                    "password": {
                        "writeOnly": true,
                        "type": "string",
                        "minLength": 5,
                        "maxLength": 255
                    },
                    "cgu_read_and_accepted": {
                        "type": "boolean",
                        "description": "Has the user accepted the CGU "
                    },
                    "administrator_of_key_account_id": {
                        "type": "integer",
                        "description": "Is the user administrator of a IP_CUSTOMER"
                    },
                    "tenant_id": {
                      "type": "string"
                    },
                    "settings": {
                        "$ref": "#/components/schemas/UserSettings"
                    },
                    "personal_data": {
                        "$ref": "#/components/schemas/PersonalData"
                    },
                    "created_at": {
                      "type": "string"
                    },
                    "updated_at": {
                      "type": "string"
                    }
                },
                "required": [
                    "password"
                ]
            },
            "UserList": {
              "type": "array",
              "items": {
                  "$ref": "#/components/schemas/User"
              }
            },
            "PersonalData": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "firstname": {
                        "type": "string"
                    },
                    "lastname": {
                        "type": "string"
                    },
                    "gender": {
                        "type": "string"
                    },
                    "address_text": {
                        "type": "string"
                    },
                    "zip_code": {
                        "type": "string"
                    },
                    "birth_date": {
                        "type": "string",
                        "format": "date"
                    },
                    "phone_number": {
                        "type": "string"
                    },
                    "phone_number_verification_date": {
                        "type": "string"
                    },
                    "phone_number_country_code": {
                        "type": "string"
                    },
                    "phone_number_validation_attempt": {
                        "type": "integer",
                        "default": "0",
                        "minimum": 0
                    },
                    "job_title": {
                        "type": "string",
                        "maxLength": 255,
                        "minLength": 0
                    },
                    "profile_picture_id": {
                        "type": "integer",
                        "description": "ID for the external collection of files (to fetch it)"
                    }
                },
                "title": "user_private_data",
                "required": [
                    "firstname",
                    "lastname"
                ]
            },
            "UserSettings": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "has_newsletter_subscription": {
                        "type": "boolean"
                    },
                    "commercial_offer_partner_date_choice": {
                        "type": "string"
                    },
                    "has_commercial_offer_partner_subscription": {
                        "type": "boolean"
                    }
                },
                "title": "user_preferences",
                "required": [
                    "has_news_letter_subscription",
                    "commercial_offer_partner_date_choice",
                    "has_commercial_offer_partner_subscription"
                ]
            }
        },
        "requestBodies": {},
        "securitySchemes": {
        },
        "links": {},
        "callbacks": {}
    },
    "security": []
}
