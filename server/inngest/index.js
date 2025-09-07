import { Inngest } from "inngest";
import User from "../models/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

//ingest function to save user data to a database when a user is created in Clerk

const syncusercreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userdata={
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        image: image_url
    };
    await User.create(userdata);
  },
);


//ingest function to delete user data from database when user is deleted in clerk
const syncuserdeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findById(id)
  },
);

//ingest function to update user data in database when user is updated in clerk
const syncuserupdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userdata={
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        image: image_url
    };
    await User.findByIdAndUpdate(id, userdata);
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncusercreation,syncuserdeletion,syncuserupdate];

