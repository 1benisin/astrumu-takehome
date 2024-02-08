# AstrumU Take-Home Project

This project was developed as part of a take-home interview for AstrumU. It showcases a basic API for managing universities, including operations to create, update, and delete universities, as well as associated cities and states. The project leverages NestJS, a progressive Node.js framework, for building efficient and scalable server-side applications.

## Installation

To set up the project environment, run the following command in the terminal:

$ npm install

## Running the App

To start the application in development mode, use the following command:

$ npm run start:dev

Once the application is running, you can access the GraphQL Playground at [http://localhost:3000/graphql](http://localhost:3000/graphql) to interact with the API.

## Testing

Run the following command to execute the unit tests:

$ npm run test

## GraphQL Playground

The GraphQL Playground is available when the project is up and running, enabling easy interaction with the API for querying and mutating data.

### Authorization

For mutations that create, update, or delete a university, an `authToken` must be provided in the request headers. This token can be set to any value for the purpose of this project, as authentication is mocked.

## Time Allocation

The project was developed within a 6-hour time frame, allocated as follows:

- 1.5 hours: Learning NestJS through tutorials.
- 4 hours: Building out the API.
- 0.5 hours: Writing tests and the README.

## Resources Used

The following resources were instrumental in the development of this project:

- NestJS documentation
- YouTube tutorials
- ChatGPT for guidance and troubleshooting

## Project Decisions

- **Mocked Database**: The project uses local arrays to mock a database for simplicity and to focus on API development.
- **Duplicate Entries**: The API is designed to prevent the creation of duplicate cities or states but does not check for duplicate universities. Cities and states can only be created or deleted, not updated.

## Reflections

Embarking on this project was a highly enjoyable experience, especially learning NestJS for the first time. It provided a valuable opportunity to delve into a new framework and apply its concepts to a real-world scenario. I am excited for the next interview stage to discuss and dissect this project further, sharing insights and learning outcomes from this experience.
