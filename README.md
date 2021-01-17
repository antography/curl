# Curl
# faq
## What is this thing?

My attempt at an open-source decentralized messaging program that's a bit more powerful than the rest.


## Why is the Curl codebase such a nightmare?
### (Also: "Why are the UI, auth providers, and Block Managers all broken up?) 

I though that seperating the UI, authentication, and communication was a good idea. I doubt it will get any less divvied up once blocks need to start handling voice, video, and other fun™ things

## Why not just call it a "Server" like everyone else?

"Buildings" and "Offices" literally can't be ambiguous

---
---

## UI Goals:

* ~~Building panel~~ - Done
* ~~Floor panel~~ - Done
* ~~Settings popups~~ - Done
* Login/signup page - Done
* User settings page
* Building settings page
* Building members panel
* File attachments
* Image messages
* File messages
* Easy account switching
* Easy auth-prov switching

## Client JS Goals:
* Loading buildings - Done
* Loading Floors & offices - Done
* Loading messages in an office
* Loading active users into the right panel
* Edit personal status

## Backend Goals:

* Handle messages in different channels from different users
* Anonymous access
* Authentication servers - Done

--- 
## Primary goals:
* Text
* Voice
* Anonymous access to servers
* Self-hosting servers
* Contacts

## Some day:
* Video calls
* Pinboard channel
* Shared whiteboard channels
* Extensions
* Screenshots


## Hierarchy:

* Blocks (server groups)
  * Buildings (servers)
    * Floors (channel groups)
      * Offices (channels)
