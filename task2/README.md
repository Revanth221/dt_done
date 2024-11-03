# Nudge API Documentation

Based on the given API description, the details of API are as follows

## API Structure

Base URL: `/api/v3/app`

## API Endpoints

| Request Type | API Endpoint  | Payload                                                                                     | Description                      |
| :----------: | :------------ | :------------------------------------------------------------------------------------------ | :------------------------------- |
|   **POST**   | `/nudges`     | uid, title, event_id, cover_image(image), send_time, description, icon, one_line_invitation | Creates a new nudge for an event |
|   **GET**    | `/nudges`     | -                                                                                           | Retrieves all nudges             |
|   **GET**    | `/nudges/:id` | -                                                                                           | Retrieves a specific nudge by ID |
|   **PUT**    | `/nudges/:id` | title, cover_image, send_time, description, icon, one_line_invitation                       | Updates an existing nudge by ID  |
|  **DELETE**  | `/nudges/:id` | -                                                                                           | Deletes a specific nudge by ID   |

## Object Data Model

```json
{
  "type": "nudge",
  "uid": "userId",
  "title": "Title of nudge",
  "event_id": "Id of the tagged event",
  "cover_image": "url of cover image(or file path)",
  "send_time": "timestamp for when to send the nudge",
  "description": "Description of nudge",
  "icon": "url of the icon",
  "one_line_invitation": "One line invitation for nudge"
}
```
