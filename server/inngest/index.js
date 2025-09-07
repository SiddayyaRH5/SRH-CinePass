import { Inngest } from "inngest";
import User from "../models/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Create user
const syncusercreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userdata = {
        _id: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        image: image_url,
      };

      await User.findByIdAndUpdate(id, userdata, { upsert: true, new: true });

      await step.run("log-user-created", async () => {
        console.log("User created/updated:", userdata);
      });

    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }
);

// Delete user
const syncuserdeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    try {
      const { id } = event.data;
      await User.findByIdAndDelete(id);

      await step.run("log-user-deleted", async () => {
        console.log("User deleted:", id);
      });

    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
);

// Update user
const syncuserupdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userdata = {
        _id: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address,
        image: image_url,
      };

      await User.findByIdAndUpdate(id, userdata, { new: true });

      console.log("User updated:", userdata);

    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  }
);

// Export functions
export const functions = [syncusercreation, syncuserdeletion, syncuserupdate];
