# Microservice Demo (Under development)
Microservices for Demo project (Webshop)

## Architecture

**Webshop** is composed of 09 microservices written in different
languages that talk to each other via events, REST API.

[![Architecture of
microservices](./architecture_.jpg)](./architecture_.jpg)


| Service                                              | Language      | Description                                                                                                                       |
| ---------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [frontend](./*)                                      | React.js      | Exposes an HTTP server to serve the website. Does not require signup/login and generates session IDs for all users automatically. |
| [cartService](./*)                                   | Node.js       | Stores the items in the user's shopping cart in Redis and retrieves it.                                                           |
| [orderService](./*)                                  | Node.js       | Handle order request from the cart service                        |
| [customerService](./*)                               | Node.js       | Provides customer information, status, paymentCredits etc . |
| [inventoryService](./*)                              | Node.js       | Provides the list of products from a JSON file and ability to search products and get individual products.                        |
| [paymentService](./*)                                | Node.js       | Gives shipping cost estimates based on the shopping cart.(mock)                                |
| [shippingService](./*)                               | Node.js       | Track shippment and send an order-complete event to the order history                                                                                  |
| [notificationService](./*)                           | Python        | Sends users an order confirmation email (mock).                                      |
| [orderhistoryService](./*)                           | Node.js       | Provides order history and product catelogues.                                      
| [userInformationService](./*)                        | Java          | Provides user information and authenticate users. (*under_development)                                                            |
| [reviewService](./*)                                 | C#            | Review service for the product. 
| [rabbitMq](./*)                                      | Java          | Passing messages between services.
  
## Microservice Patterns usages for development

- **[Domain-Driven Design Pattern](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html)**
  Define services corresponding to Domain-Driven Design (DDD) subdomains microservice pattern.
- **[Database per service Pattern](https://microservices.io/patterns/data/database-per-service.html)**
  Most services need to persist data in some kind of database.
- **[Saga Pattern](https://microservices.io/patterns/data/saga.html)**
  A saga is a sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction in the saga.
- **[Command Query Responsibility Segregation (CQRS)](https://microservices.io/patterns/data/cqrs.html)**
  The application keeps the replica up to data by subscribing to Domain events published by the service that own the data.
- **[Event sourcing Pattern](https://microservices.io/patterns/data/event-sourcing.html)**
  To reliably/atomically update the database and publish messages/events.
- **[API Gateway / Backends for Frontends Pattern](https://microservices.io/patterns/apigateway.html)**
  To give the clients of a Microservices-based application access the individual services.
- **[Messaging Pattern](https://microservices.io/patterns/communication-style/messaging.html)**
  To collaborate and communicate services in a microservice-based application.
- **[Circuit Breaker Pattern](https://microservices.io/patterns/reliability/circuit-breaker.html)**
  To prevent the network or service failure from cascading to other services.
- **[Service Instance per container pattern](https://kubernetes.io)**
  All the services will be built as a (Docker) container image and deploy each service instance as a container in the kubernetes.
