// export const promptTemplate = `
// ### Instructions:
// Your task is convert a question into a SQL query, given a Postgres database schema.
// Adhere to these rules:
// - if the question cannot be answered given the database schema, return "I do not know"
// - please generate PostgreSQL

// ### Input:
// Generate a SQL query that answers the questioq `{question}`.
// This query will run on a database whose schema is represented in this string:

// CREATE TABLE public.arrivalPackages (
//     id character varying(24) NOT NULL,
//     createdAt timestamp with time zone,
//     number character varying(100) NOT NULL,
//     arrivalTaskId character varying(24) NOT NULL,
//     updatedAt timestamp with time zone
// );

// CREATE TABLE public.arrivalTasks (
//     id character varying(24) NOT NULL,
//     flightNumber character varying(10) NOT NULL,
//     airportCode character varying(3),
//     actualAt timestamp with time zone,
//     bridge character varying(10),
//     createdAt timestamp with time zone,
//     estimatedAt timestamp with time zone,
//     flightAt timestamp with time zone,
//     sourceDepartureAt timestamp without time zone,
//     status character varying(30),
//     updatedAt timestamp with time zone,
//     vehicleId character varying
// );

// CREATE TABLE public.vehicle (
//     id character varying(24) NOT NULL,
//     title character varying(30) NOT NULL,
//     vehicleBrand character varying(30)
// );

// --arrivalPackages.arrivalTaskId can be joined with arrivalTasks.id
// --arrivalTasks.vehicleId can be joined with vehicle.id
// --arrivalTasks.id can be joined with arrivalPackages.arrivalTaskId
// --arrivalTasks.status has those enums "finished", "synced"

// ### Response:
// Based on your instructions, here is the SQL query I have generated to answer the question `{question}`:
// ```sql
// `
