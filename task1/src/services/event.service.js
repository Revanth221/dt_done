//file to handle all CRUD operations on database
import { ObjectId } from "mongodb";
import { getDb } from "../config/db.js";
import debug from "debug";

const log = debug("app:service");

class EventService {
  constructor() {
    this.collection = getDb().collection("events");
    log("EventService initialized");
  }

  async getEventById(eventId) {
    return await this.collection.findOne({ _id: new ObjectId(eventId) });
  }

  async getLatestEvents(type, limit = 5, page = 1) {
    const skip = (page - 1) * limit;
    const query = type === "latest" ? {} : {}; // any additional filters
    return await this.collection
      .find(query)
      .sort({ schedule: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();
  }

  async createEvent(eventData) {
    const result = await this.collection.insertOne(eventData);
    return result.insertedId;
  }

  async updateEvent(eventId, eventData) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: eventData },
    );
    return result;
  }

  async deleteEvent(eventId) {
    const result = await this.collection.deleteOne({
      _id: new ObjectId(eventId),
    });
    return result;
  }
}

export default EventService;
