## COMMANDS

|   `<>`   |   `[]`   |  `\|`  | `UPPER_CASE` | `lower_case` |    `...`    |
| :------: | :------: | :---: | :----------: | :----------: | :---------: |
| required | optional |  or   |   replace    |     keep     | array/chain |

---

- `announce [MESSAGE|MESSAGE_WITH_IMAGE]`:  
  Send an announcement to all users which share at least one server with the bot and that want to be notified (`notify`) about the (initialized) channel.  
  Hint: You can use Discord's limited version of Markdown alongside additional features like formatted links:  
  `[text](https://url.com "title")`

- `ban <@USER|USER_ID> <REASON>`:  
  Ban a user.

- `channel <init|reset|config|info>`:  
  Commands to manage and get information about channels.

    - `channel init <@USER> [@USER...]`:  
      Link a user/multiple users to a channel and automatically grant them channel overwrites for managing the channel, creating webhooks and access to light-weight moderation commands.

    - `channel reset`:  
      Reset the channel and delete its data in the database.

    - `channel config <text|link|thumbnail|reset>`:  
      Setup information for `download` and other commands that require information about the channel.

        - `channel config text <TEXT>`
        - `channel config link <URL>`
        - `channel config thumbnail <URL> [true|false]`:  
          `true` behind the `URL` makes the bot use the website's favicon as thumbnail.
        - `channel config reset`:  
          Reset the configuration of the channel and delete it from the database.

    - `channel info`:  
      Display information about the channel owner(s).

- `download`:  
  Send a download message containing the information specified with `channel config`.

- `help [PAGE]`:  
  Send a message with 6 commands per page and brief explanations/usage information.

- `kick <@USER|USER_ID> <REASON>`:  
  Kick a user.

- `lockdown [remove]`:  
  Lock/unlock the channel for everyone except whitelisted roles and the channel owner(s).

- `notify [remove]`:  
  Get notified via direct messages whenever the channel owner(s) make(s) an announcement.

- `optifine <download|server>`:  
  Send the link to OptiFine's download page/the invite link to the OptiFine Discord server. 

- `ping`:  
  Display the calculated latency of the bot.

- `purge <AMOUNT>`:  
  Delete up to 100 messages at once that are less than 2 weeks old.

- `server <config|prefix|autorole|nolockdown|sort>`:  
  Show and edit settings of the bot.

    - `server config`:  
      Display the current configuration of the bot in this server.

    - `server prefix <PREFIX>`:  
      Edit the prefix of the bot.  
      DEFAULT: `!`

    - `server autorole <@ROLE|ROLE_ID|remove>`:  
      Specify the role that is given to every user that joins the server or `remove` it to disable the feature.  
      DEFAULT: `NONE` (disabled)

    - `server nolockdown <@ROLE|ROLE_ID|remove> [@ROLE...|@ROLE_ID...]`:  
      Specify the roles that are whitelisted during `lockdown` or `remove` them to disable whitelisted roles.  
      DEFAULT: `NONE` (disabled)

    - `server sort <CATEGORY_NAME|CATEGORY_ID|remove> [CATEGORY_NAME...|CATEGORY_ID...]:`  
      Specify the channel categories that get sorted alphabetically whenever a channel gets updated or created or `remove` them to disable the feature.  
      DEFAULT: `NONE` (disabled).

- `unban <@USER|USER_ID> <REASON>`:  
  Unban a user.

- `uptime`:  
  Show the uptime of the bot.

- `wiki`:  
  Send a link to the shader wiki.
