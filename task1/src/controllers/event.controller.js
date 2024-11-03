import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ObjectId } from "mongodb";
// import fileUploadOnCloudinary from "../utils/cloudinary.js";

import EventService from "../services/event.service.js";
import debug from "debug";
import fileUploadOnCloudinary from "../utils/cloudinary.js";

const log = debug("app:controller");
//TODO: add validations

let eventService;
export const initEventService = () => {
  eventService = new EventService();
};

export const handleGetEvents = asyncHandler(async (req, res) => {
  log(`fetching events with queryParams ${req.query}`);
  const { id, type = "latest", limit, page } = req.query;
  try {
    // Check if `id` is provided to fetch a single event
    if (id) {
      if (!ObjectId.isValid(id))
        return res.status(400).json(new ApiError(400, "invalid id"));
      const event = await eventService.getEventById(id);

      if (!event)
        return res.status(404).json({ error: `No event found with id ${id}` });
      return res.status(200).json(new ApiResponse(200, event, `Event found`));
    }

    // if id is not provided
    const limitNum = parseInt(limit, 10) || 5; //default size limit=5
    const pageNum = parseInt(page, 10) || 1; //default page=1
    const events = await eventService.getLatestEvents(type, limitNum, pageNum);
    res.status(200).json(
      new ApiResponse(
        200,
        {
          data: events,
          page: pageNum,
          limit: limitNum,
        },
        "Events fetched successfully",
      ),
    );
  } catch (error) {
    throw new ApiError(500, `error GET /api/v3/app/events`, error);
  }
});
export const handleCreateEvent = asyncHandler(async (req, res) => {
  const {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    sub_category,
    rigor_rank,
  } = req.body;
  if (
    [
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    ].some((field) => !field)
  )
    return res.status(400).json(new ApiError(400, "all fields are required"));

  const eventData = {
    type: "event",
    name: name,
    tagline: tagline,
    schedule: new Date(schedule),
    description: description,
    files: {
      image: req.file ? req.file.path : null,
    },
    moderator: moderator,
    category: category,
    sub_category: sub_category,
    rigor_rank: parseInt(rigor_rank),
    attendees: [],
    created_at: new Date(),
    updated_at: new Date(),
  };
  const imageLocalPath = req.file?.path;
  const avatar = await fileUploadOnCloudinary(imageLocalPath);
  if (!avatar)
    return res
      .status(500)
      .json(new ApiError(500, "failed to upload image to cloudinary"));

  eventData.files.image = avatar.url ?? eventData.files.image;

  const eventId = await eventService.createEvent(eventData);
  log(`Event created with ID: ${eventId}`);

  res
    .status(201)
    .json(new ApiResponse(201, { id: eventId }, "event created successfully"));
});
export const handleUpdateEvent = asyncHandler(async (req, res) => {
  log(`updating event for ${req.params.id}`);
  if (!req.params.id || !ObjectId.isValid(req.params?.id))
    return res.status(400).json(new ApiError(400, "Invalid event id"));
  if (
    [
      req.body.name,
      req.body.tagline,
      req.body.schedule,
      req.body.description,
      req.body.moderator,
      req.body.category,
      req.body.sub_category,
      req.body.rigor_rank,
    ].some((field) => !field)
  )
    return res.status(400).json(new ApiError(400, "all fields are required"));
  const eventData = {
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: new Date(req.body.schedule),
    description: req.body.description,
    moderator: req.body.moderator,
    category: req.body.category,
    sub_category: req.body.sub_category,
    rigor_rank: parseInt(req.body.rigor_rank),
    updated_at: new Date(),
  };

  const localFilePath = req.file?.path;
  if (!localFilePath)
    return res.status(400).json(new ApiError(400, `image is required`));
  const image = await fileUploadOnCloudinary(localFilePath);
  if (!image)
    return res
      .status(500)
      .json(new ApiError(500, "error uploading file to cloudinary"));

  eventData.files = { image: image.url ?? req.file.path };

  const result = await eventService.updateEvent(req.params.id, eventData);
  if (result.matchedCount === 0) {
    return res.status(400).json(new ApiError(400, "Event not found to update"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Event updated successfully" }));
});
export const handleDeleteEvent = asyncHandler(async (req, res) => {
  if (!req.params.id || !ObjectId.isValid(req.params.id))
    return res.status(400).json(new ApiError(404, "Invalid Event Id"));
  log(`Deleting event: ${req.params.id}`);
  const result = await eventService.deleteEvent(req.params.id);
  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json(new ApiError(404, `Event not found for deletion`));
  }
  res.json(
    new ApiResponse(
      200,
      { message: "Event deleted successfully" },
      "Event deleted successfully",
    ),
  );
});
